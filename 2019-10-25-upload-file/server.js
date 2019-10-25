const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const os = require('os');
let formatData = require('./formatData.js');

let mongoDB = null; // 声明一个代表数据库的变量
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbUrl = 'mongodb://127.0.0.1:27017';
const dbName = 'practice';
const dbClient = new MongoClient(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});

const serverPort = 8080;
const server = http.createServer();

server.on('request', (req, res) => {
  const { url: requestUrl } = req;
  let parsedUrl = url.parse(requestUrl);
  let pathName = parsedUrl.pathname;
  if (/^\/api/.test(pathName)) { // 以/api开头的表示接口请求
    fileUploadRequest(req, res, parsedUrl);
  } else { // 否则是资源请求
    requestResource(req, res, parsedUrl)
      .catch(err => {
        handleError(JSON.stringify(err), res)
      });
  }
});

server.listen(serverPort, () => {
  console.log(`server is running at http://127.0.0.1:${serverPort}`);
  // 连接数据库
  dbClient.connect((err) => {
    assert.equal(null, err);
    mongoDB = dbClient.db(dbName);
    console.log('mongodb connected successfully');
  });
});

// 请求资源的处理方式
async function requestResource (req, res, parsedUrl) {
  let pathname = parsedUrl.pathname;
  let filePath = pathname.substr(1);
  filePath = filePath === '' ? 'index.html' : filePath;
  let suffix = path.extname(filePath).substr(1);
  let fileData = await readFile(filePath);
  res.writeHead(200, {'Content-Type': `text/${suffix}`});
  res.write(fileData.toString());
  res.end();
}

// 文件上传请求的处理方式
function fileUploadRequest (req, res) {
  req.on('error', (err) => {
    handleError(err.message, res);
  });
  let body = [];
  req.on('data', (chunk) => {
    body.push(chunk);
  });
  req.on('end', () => {
    body = Buffer.concat(body);
    let formattedData = formatData(body);
    storeFile(formattedData, res);
  });
}

// 存储分片
async function storeFile (formattedData, res) {
  const collection = mongoDB.collection('documents');
  let { fileId, fileName, blockContent, blockIndex, blockLength } = formattedData;
  blockLength = parseInt(blockLength);
  let storageData = {
    fileId,
    fileName,
    blockLength,
    uploadedFilesUrls: [],
    uploadedIndexs: {},
    fileUrl: ''
  };
  const result = await findData(collection, {fileId});
  if (!result) { // 第一次上传
    if (blockLength === 1) { // 只有一个分片，直接存储为一个文件
      let path = `./upload/${fileName}`;
      let fileUrl = await writeFile(path, blockContent, true);
      storageData.fileUrl = fileUrl;
      await insertData(collection, storageData);
      handleSuccess(storageData, res);
    } else { // 不止一个分片，将当前分片存储为一个分片文件
      let path = `./upload/${fileName}.${blockIndex}`;
      let blockUrl = await writeFile(path, blockContent, false);
      storageData.uploadedFilesUrls[blockIndex] = blockUrl;
      storageData.uploadedIndexs[blockIndex] = true;
      await insertData(collection, storageData);
      handleSuccess(storageData, res);
    }
  } else { // 不是第一次上传
    let { fileUrl, blockLength, uploadedIndexs, uploadedFilesUrls } = result;
    if (fileUrl || uploadedIndexs[blockIndex]) { // 文件已经上传完成过或者当前分片已经上传过
      handleSuccess(result, res);
    } else {
      let path = `./upload/${fileName}.${blockIndex}`;
      let blockUrl = await writeFile(path, blockContent, false);
      uploadedFilesUrls[blockIndex] = blockUrl;
      uploadedIndexs[blockIndex] = true;
      let blocksUploadCompleted = Object.keys(uploadedIndexs).length === blockLength;
      if (blocksUploadCompleted) { // 分块上传完毕，将所有分片合成为一个文件，并删除分块文件
        let blockFileUrls = uploadedFilesUrls.slice(0); // 复制分片文件路径的数组
        let path = `./upload/${fileName}`;
        let uploadedFileUrl = await combineBlocksIntoFile(uploadedFilesUrls, path);
        storageData.fileUrl = uploadedFileUrl;
        await updateData(collection, { fileId }, storageData);
        blockFileUrls.forEach((item) => { // 删除分片文件
          fs.unlink(item, (err) => {
            if (err) throw err;
          });
        });
        handleSuccess(storageData, res);
      } else {
        storageData.uploadedFilesUrls = uploadedFilesUrls;
        storageData.uploadedIndexs = uploadedIndexs;
        await updateData(collection, { fileId }, storageData);
        handleSuccess(storageData, res);
      }
    }
  }
}

// 将分片文件合并成一个文件
function combineBlocksIntoFile (uploadedFilesUrls, fileUrl) {
  return new Promise((resolve) => {
    let writeStream = fs.createWriteStream(fileUrl); // 在fileUrl的位置创建一个可写流
    let readStream; // 定义一个可读流
    combineFile();
    function combineFile () {
      if (!uploadedFilesUrls.length) { // 分片已经合并完毕
        writeStream.end(); // 在这里结束写入
        let uploadedFileUrl = getAbsolutePath(fileUrl);
        resolve(uploadedFileUrl);
      } else {
        let currentBlockUrl = uploadedFilesUrls.shift();
        readStream = fs.createReadStream(currentBlockUrl);
         // 将可读流的数据放在可写流中，第二个参数的设置表示当读取完成后不结束写入，因为需要从多个文件读取
        readStream.pipe(writeStream, { end: false });
        readStream.on('end', () => {
          combineFile(); // 在当前分片文件读取完成后重新调用函数
        });
      }
    }
  });
}
// 读取文件
function readFile (path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) { 
        reject();
      } else {
        resolve(data); 
      }
    });
  });
}

// 写入文件
function writeFile (path, fileContent, needAbsolutePath) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, fileContent, (err) => {
      if (err) { 
        reject(err);
      } else {
        let fileUrl = needAbsolutePath ? getAbsolutePath(path) : path;
        resolve(fileUrl);
      }
    });
  });
}

// 从数据库读取数据
function findData (collection, queryConditions) {
  return new Promise((resolve, reject) => {
    collection.findOne(queryConditions, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  });
}
// 向数据库插入数据
function insertData (collection, storageData) {
  return new Promise((resolve, reject) => {
    collection.insertOne(storageData, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
// 更新数据库的数据
function updateData (collection, queryConditions, storageData) {
  return new Promise((resolve, reject) => {
    collection.updateOne(queryConditions, { $set: storageData }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// 错误处理
function handleError (errorMsg, res) {
  let returnObj = {
    code: 0, // code 0 表示请求失败
    msg: errorMsg
  };
  res.writeHead(500);
  res.end(JSON.stringify(returnObj));
}

// 成功处理
function handleSuccess (data, res) {
  let returnObj = {
    code: 1,
    data
  };
  res.writeHead(200, {'Content-Type': 'multipart/form-data'});
  res.end(JSON.stringify(returnObj));
}

// 更具相对地址得到绝对地址
function getAbsolutePath (path) {
  // 这里只处理了路径为'./upload/...'这种情况
  const pathName = path.substr(1);
  const network = os.networkInterfaces(); // 通过os系统拿到网络信息
  const address = network.lo0[0].address; // 拿到当前服务器的ip地址
  let fileUrl = `http://${address}:8080${pathName}`;// 将文件上传后的地址返回
  return fileUrl;
}

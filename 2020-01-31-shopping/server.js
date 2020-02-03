  
const http = require('http');
const fs = require('fs');
const url = require('url');

const serverPort = 8080;
const server = http.createServer();

const mysql = require('mysql');
const createConnection = () => {
  return mysql.createConnection({
    host: 'localhost',
    user: 'shopping_manager',
    password : '9980253az;',
    database : 'shopping',
    multipleStatements: true, // 允许一次使用多个查询语句，这在定义sql变量@inserted_order_id的时候需要用到
  });
};

const requestHandlers = require('./serverRequestHandlers.js');

server.on('request', (req, res) => {
  const { url: requestUrl, method } = req;
  let parsedUrl = url.parse(requestUrl);
  let pathName = parsedUrl.pathname;
  if (/^\/api/.test(pathName)) { // 以/api开头的表示接口请求
    switch (method) {
      case 'GET':
        handleGetRequest(req, res, parsedUrl);
        break;
      case 'POST':
        handlePostRequest(req, res, parsedUrl);
        break;
    }
  } else { // 否则是资源请求
    requestResource(req, res, parsedUrl);
  }
});

server.listen(serverPort, () => {
  console.log(`server is running at http://localhost:${serverPort}`);
});

// GET请求的处理方式
function handleGetRequest (req, res, parsedUrl) {
  const { query, pathname } = parsedUrl;
  let parsedData = {};
  if (query) {
    let queryString = decodeURIComponent(query);
    let items = queryString.split('&');
    for (let item of items) {
      let arr = item.split('=');
      let key = arr[0];
      let value = JSON.parse(arr[1]);
      parsedData[key] = value;
    }
  }
  requestHandlers({ api: pathname, req, res, params: parsedData, createConnection });
}

// POST请求的处理方式
function handlePostRequest (req, res, parsedUrl) {
  const { pathname } = parsedUrl;
  req.on('error', (err) => {
    res.end(`请求失败：${err}`);
  });
  let body = [];
  req.on('data', (chunk) => {
    body.push(chunk);
  });
  req.on('end', () => {
    const bodyBuffer = Buffer.concat(body);
    const bodyString = bodyBuffer.toString();
    let parsedData = JSON.parse(bodyString);
    requestHandlers({ api: pathname, req, res, params: parsedData, createConnection });
  });
}

// 请求资源的处理方式
function requestResource (req, res, parsedUrl) {
  let pathname = parsedUrl.pathname;
  let filePath = pathname.substr(1); // 去掉路径前的/
  filePath = filePath === '' ? 'index.html' : filePath;
  let stream = fs.createReadStream(filePath);
  let responseData = [];
  if (stream) {
    stream.on('data', (chunk) => {
      responseData.push(chunk);
    });
    stream.on('end', () => {
      let total = Buffer.concat(responseData);
      res.writeHead(200);
      res.write(total);
      res.end();
    });
  }
}

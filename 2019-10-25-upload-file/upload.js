
let globalData = {
  selectedFile: null, // 当前选中的文件
  selectedFileHash: '', // 代表选中文件的hash字符串
  uploadProgressElement: null, // 进度条元素
  progressTextElement: null, // 进度的文本元素
  controller: new AbortController() // 中止控制器的实例
}

window.addEventListener('load', main, false);

// 初始化
function main () {
  let fileUploadElement = document.getElementById('fileUpload'); // 文件输入框
  let uploadButton = document.getElementById('uploadButton'); // 文件上传按钮
  let toggleButton = document.getElementById('toggleButton'); // 暂停上传和继续上传的按钮
  globalData.uploadProgressElement = document.getElementById('uploadProgress'); // 进度元素
  globalData.progressTextElement = document.getElementById('progressText'); // 进度的文本元素
  fileUploadElement.addEventListener('change', changeSelectedFile, false);
  uploadButton.addEventListener('click', uploadFile, false);
  toggleButton.addEventListener('click', toggleUpload, false);
}

// 改变当前选中的文件
function changeSelectedFile (event) {
  let fileUploadElement = event.target;
  let selectedFile = fileUploadElement.files[0];
  globalData.selectedFile = selectedFile;
  // 使用SHA-512算法生成一个标志文件的hash字符串
  const { name, lastModified, size, type, webkitRelativePath } = selectedFile;
  let fileStr = `${name}${lastModified}${size}${type}${webkitRelativePath}`;
  let shaObj = new jsSHA('SHA-512', 'TEXT');
  shaObj.update(fileStr);
  globalData.selectedFileHash = shaObj.getHash('HEX'); // 得到代表文件的hash值
}

// 点击上传按钮
async function uploadFile () {
  const { selectedFile, selectedFileHash } = globalData;
  if (!selectedFile) {
    alert('请先选择文件');
    return;
  }
  const fileSize = selectedFile.size;
  const fileName = selectedFile.name;
  let fiftyMillionBytes = 50 * 1024 * 1024;
  let blockSize = fiftyMillionBytes; // 每个分片的大小
  let blockLength = Math.ceil(fileSize / blockSize);
  let start = 0, end = blockSize;
  let blockContent = selectedFile.slice(start, end);

  let formData = new FormData();
  formData.set('fileId', selectedFileHash);
  formData.set('fileName', fileName);
  formData.set('blockLength', blockLength);
  formData.set('blockIndex', 0);
  formData.set('blockContent', blockContent);
  const { response } = await uploadBlock(formData);
  if (response.code === 1) { // 请求成功
    const { data } = response;
    const { fileUrl, uploadedIndexs } = data;
    if (fileUrl) { // 文件已经上传完成过
      setProgress(100);
    } else {
      let uploadedIndexsArr = Object.keys(uploadedIndexs); // 已上传的分片索引
      let allIndexs = Array.from({ length: blockLength }, (item, index) => `${index}`); // 所有分片的索引数组
      let notUploadedIndexsArr = allIndexs.filter((item) => uploadedIndexsArr.indexOf(item) === -1); // 没有上传的分片的索引
      let notUploadedIndexsArrLength = notUploadedIndexsArr.length;
      for (let i = 0; i < notUploadedIndexsArrLength; i++) {
        let item = notUploadedIndexsArr[i];
        start = item * blockSize;
        end = (item + 1) * blockSize;
        end = end > fileSize ? fileSize : end;
        let blockContent = selectedFile.slice(start, end);
        formData.set('blockIndex', item);
        formData.set('blockContent', blockContent);
        const { response } = await uploadBlock(formData);
        const { data } = response;
        const { fileUrl, uploadedIndexs } = data;
        if (fileUrl) {
          setProgress(100);
        } else {
          let completedPart = Math.ceil((Object.keys(uploadedIndexs).length / blockLength) * 100);
          setProgress(completedPart);
        }
      }
    }
  }
}

// 将文件的分片上传
function uploadBlock (body) {
  const controller = globalData.controller;
  let url = '/api/uploadFile';
  let headersObj = {
    'Content-Type': 'multipart/form-data'
  };
  return fetch(url, {
    method: 'POST',
    body,
    headers: new Headers(headersObj),
    signal: controller.signal
  }).then(res => res.json())
  .catch(error => ({ error }))
  .then(response => ({ response }));
}

// 设置进度
function setProgress (completedPart) {
  let { uploadProgressElement, progressTextElement } = globalData;
  uploadProgressElement.value = completedPart;
  progressTextElement.textContent = `${completedPart}%`;
}

// 暂停上传和继续上传
function toggleUpload (event) {
  let element = event.target;
  const { value } = element;
  const { controller } = globalData;
  if (value === '暂停上传') {
    if (controller) controller.abort();
    element.value = '继续上传';
  } else {
    globalData.controller = new AbortController(); // 重新创建一个中止控制器的实例
    uploadFile();
    element.value = '暂停上传';
  }
}

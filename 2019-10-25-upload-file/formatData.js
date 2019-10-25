// 将Content-Type为multipart/form-data情况下的请求的消息正文整理成一个对象
function formatData (buffer) {
  if (!buffer) return;
  let firstWrapIndex = buffer.indexOf('\r\n');
  let signifier = buffer.slice(0, firstWrapIndex);
  let signifierIndex = buffer.indexOf(signifier);
  let formattedData = {}; // 存放整理出来的对象
  while (signifierIndex !== -1) {
    let blockItem = buffer.slice(0, signifierIndex);
    if (Boolean(blockItem[0])) { // 这里判断blockItem是否包含内容，如果没包含内容的话，buffer索引位置为0的地方就是假值，这样就避免了将整个blockItem块都转换为字符串之后进行判断
      let { name, value } = formatBuffer(blockItem);
      formattedData[name] = value;
    }
    buffer = buffer.slice(signifierIndex + signifier.length);
    signifierIndex = buffer.indexOf(signifier);
  }
  return formattedData;
}
// 整理请求体中的每一段二进制数据
function formatBuffer (bufferItem) {
  let firstIndex = bufferItem.indexOf('\r\n') + 2;
  let lastIndex = bufferItem.lastIndexOf('\r\n');
  let content = bufferItem.slice(firstIndex, lastIndex); // 去掉首部和尾部的\r\n
  let centerWrapIndex = content.indexOf('\r\n\r\n');
  let description = content.slice(0, centerWrapIndex).toString(); // 请求头的描述部分的buffer
  let value = content.slice(centerWrapIndex + 4);
  let { name } = formatDescription(description);
  if (name !== 'blockContent') { // 当请求的参数名称不为blockContent的时候表示不是分片，将请求内容转换为字符串
    value = value.toString();
  }
  return {
    name,
    value
  };
}

// 将拿到的description整理成对象
function formatDescription (description) {
  let arr = description.split('\r\n');
  let obj = {};
  arr.forEach((item) => {
    if (item) {
      let arr = item.split(': '); // 请求头的名称和请求头的内容以：分隔
      let propertyValue = arr[1];
      let valueArr = propertyValue.split('; ');
      valueArr.forEach((item) => {
        let equalIndex = item.indexOf('=');
        if (equalIndex !== -1) {
          let arr = item.split('=');
          let key = arr[0];
          let value = arr[1].slice(1, -1); // 去掉首尾的"
          obj[key] = value;
        }
      });
    }
  });
  return obj;
}

module.exports = formatData;
exports.a1 = '111';

let b = require('./b.js');
console.log(b, 'a中拿到的b');

exports.a2 = '222';

b.ab = 'test';
b = require('./b.js');
console.log(b, '在a中修改之后拿到的b');
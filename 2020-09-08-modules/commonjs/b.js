const a = require('./a.js');
console.log(a, 'b中拿到的a');

console.log('b 执行了');

module.exports = {
  b1: '111',
  b2: '222',
  b3: '333',
  ba: a,
};

/*
module.exports.b1 = '111';
module.exports.b2 = '222';
module.exports.b3 = '333';


exports.b1 = '111';
exports.b2 = '222';
exports.b3 = '333';

exports = {
	b1: '111',
	b2: '222',
	b3: '333',
};
*/
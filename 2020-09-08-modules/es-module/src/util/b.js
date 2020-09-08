import a from './a.js';

if (!a) {
  import('./d.js').then((moduleD) => {
    moduleD.default();
  });
}
console.log('b 执行了');

export default {
  b: 'bbb',
  ba: a,
};
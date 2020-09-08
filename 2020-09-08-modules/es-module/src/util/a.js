import b from './b.js';
import { printC } from './c.js';

b.ba = 'test';

if (b.ba) {
  import('./b.js').then((moduleB) => {
    console.log(moduleB.default, 'moduleB.default');
  });
}

printC();

export default {
  a: 'aaa',
  ab: b,
};
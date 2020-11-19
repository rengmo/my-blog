const a: boolean = false;

// let a: boolean = false;
// a = ''; // 报错：Type '""' is not assignable to type 'boolean'.

const b: number = 123; // 十进制
const b1: number = 0xabc; // 十六进制
const b2: number = 0b10; // 二进制
const b3: number = 0o567; // 八进制

const c: bigint = 123n;
const c1: bigint = 1234567891012345678910123n;
const c2: bigint = BigInt('1234567891012345678910123');

const d: string = 'd';
const d1: string = "d1";
const d2: string = `组合${d}和${d1}`;

// const e1: symbol = Symbol('e');
// const e2: symbol = Symbol('e');
const e3: symbol = Symbol('e2');

const e1: unique symbol = Symbol('e');
const e2: unique symbol = Symbol('e');

// console.log(e1 === e2); // e1 === e2会永远返回false，e1和e2是不同的，虽然它们传给Symbol的都是'e'

// 用symbol类型的值声明对象属性
const e4 = {
  [e1]: '1',
  [e2]: '12',
  [e3]: '123',
};

console.log(e4[e1], e4[e2]); // 打印结果：1 12

// 用symbol类型的值声明类成员
class E {
  [e1](): string {
    return 'e1';
  }
}

const e = new E();
console.log(e[e1]()); // 打印结果：e1

// let f: string = 'f';
// f = null; // 报错：Type 'null' is not assignable to type 'string'.
// f = undefined; // 报错：Type 'undefined' is not assignable to type 'string'.

let g: object = {
  m1: '1'
};

// 这里只是为了说明object类型包含函数、数组、元组、枚举等类型，后者可以赋给前者
const g1 = (): string => { return '2'; }; // 函数
const g2 = [1, 2, 3]; // 数组
const g3: [string, number] = ['1', 1]; // 元组
enum G4 { // 枚举
  M1,
  M2,
  M3
}

g = g1;
g = g2;
g = g3;
g = G4;

const h: number[] = [1, 2];
const h1: Array<number> = [1, 2];

/* 只读数组不能被修改
let h2: ReadonlyArray<string> = ['1', '2'];
h2[0] = '3'; // 报错：Index signature in type 'readonly string[]' only permits reading.
h2.push('3'); // 报错：Property 'push' does not exist on type 'readonly string[]'.
*/

// const i: [string, number, number] = ['1', 2, 3];
// i[0] = 1; // 报错：Type '1' is not assignable to type 'string'.
// i[1].split(''); // 报错：Property 'split' does not exist on type 'number'.
// i[10]; // 报错：Tuple type '[string, number, number]' of length '3' has no element at index '10'.

enum J {
  M1,
  M2 = 2,
  M3
}

console.log(J.M1, J.M2, J.M3); // 打印：0 2 3

function k (): void {
  console.log('k');
}

const k1: void = undefined;
// const k2: void = null; // 报错：Type 'null' is not assignable to type 'void'.

// 抛出错误的函数
function l (): never {
  throw new Error('error');
}

// 永远不会返回的函数
function l1 (): never {
  l1();
}

// 类型推断为never类型
// const l3: never = function () { throw new Error('error'); }();

let m: unknown;
m = '1';
m = {
  m1: '2'
};
// console.log(m.m1); // 报错：Object is of type 'unknown'.

// 比较检查
if (m === '1') {
  console.log(m);
}

// typeof检查
if (typeof m === 'string') {
  console.log(m);
}

// 类型守卫
function m1 (x): void {
  if ('m1' in x) {
    console.log(x.m1);
  }
}

m1(m);

let n: any = 1;
n = '1';
// n.join(', '); // 这个地方运行前不会给出TypeScript报错，代码运行时会报错Uncaught TypeError: n.join is not a function

const o: 'a' = 'a';
const o1: 1 = 1;
const o2: false = false;

const p: unknown = 'abc';
// p.split(','); // 报错：Object is of type 'unknown'.
(p as string).split(',');
// (<string>m).split(',');

// 命名一个包含数字类型的m1成员和m2成员的类型
interface Q {
  readonly m1: number;
  m2: number;
  m4?: string;
}

// x的类型为Q，函数返回值的类型也为Q
// function q (x: Q): Q {
//   const { m1, m2 } = x;
//   // x.m1 = 1; // 报错：Cannot assign to 'm1' because it is a read-only property.
//   return {
//     m1: m1 + m2,
//     m2: m1 - m2,
//   };
// }

interface Q1 {
  (y: Q): Q;
}

const q: Q1 = function q (x) {
  const { m1, m2 } = x;
  return {
    m1: m1 + m2,
    m2: m1 - m2,
  };
}

// function q (
//   x: {
//     m1: number;
//     m2: number;
//   } 
//  ): {
//     m1: number;
//     m2: number;
//   }
//   {
//   const { m1, m2 } = x;
//   return {
//     m1: m1 + m2,
//     m2: m1 - m2,
//   };
// }

const q1 = {
  m1: 1,
  m2: 2,
  m3: 3,
};

q(q1);

interface Q2 {
  [index: number]: boolean;
}

const q2: Q2 = [true, false];
console.log(q2[0]);

interface Q3 {
  [index: number]: boolean;
  [index: string]: boolean | object;
}
// interface Q4 {
//   [index: number]: boolean | object; // 报错：Numeric index type 'boolean | object' is not assignable to string index type 'boolean'.
//   [index: string]: boolean;
// }

// interface Q5 {
//   [index: number]: boolean;
//   [index: string]: boolean | object;
//   m1: void; // 报错：Property 'm1' of type 'void' is not assignable to string index type 'boolean | object'.
// }

interface Q6 {
  [index: number]: boolean;
  [index: string]: boolean | object | void;
  m1: void;
}

// interface Q7 {
//   m1?: number;
//   m2: string;
// }

// const q3: Q7 = {
//   m2: '2',
//   m3: '3', 
//   // 报错：Type '{ m2: string; m3: string; }' is not assignable to type 'Q7'.
//   //      Object literal may only specify known properties, and 'm3' does not exist in type 'Q7'.
// };

// const q3: Q7 = {
//   m2: '2',
//   m3: '3', 
// } as Q7;

// const q4 = {
//   m2: '2',
//   m3: '3', 
// };

// const q3: Q7 = q4;

// interface Q8 {
//   m1?: number;
//   m2?: string;
// }

// const q5 = { 
//   m1: 1, 
//   m3: '2',
// };
// const q6: Q8 = q5; // 不报错，因为有q1

// const q7 = { m3: 2 };
// const q8: Q8 = q7; // 报错：Type '{ m3: number; }' has no properties in common with type 'Q8'.

// interface Q9 {
//   m1?: string;
//   m2: number;
//   [index: string]: any;
// }

// const q9: Q9 = {
//   m2: 2,
//   m3: '3',
// };


interface Q10 {
  m1: string;
  m2(x: number): number;
}

interface Q12 {
  new (x: string): void;
}

// class Q11 implements Q10 {
//   m1 = '1';
//   m2(x: number): number {
//     return x;
//   }
//   constructor(x) {
//     this.m1 = x;
//   }
// }

const Q11: Q12 = class Q11 implements Q10 {
  m1 = '1';
  m2(x: number): number {
    return x;
  }
  constructor(x) {
    this.m1 = x;
  }
}

interface Q13 {
  (x: number): number;
  m1?: number;
  m2?: boolean;
}

// const q10: Q13 = () => { return 1; };
const q10: Q13 = (x) => { return x; };
q10.m1 = 1;
q10.m2 = false;

interface Q14 {
  m1: number;
}

interface Q15 extends Q14 {
  m2: string;
}

interface Q16 extends Q15 {
  m3: boolean;
}

const q11: Q16 = {
  m1: 1,
  m2: '2',
  m3: false,
};

class Q17 {
  private m1: number;
  protected m2: number;
  public m3: string;
}

interface Q18 extends Q17 {
  m4: boolean;
}

// 类Q19扩展自类Q17 ，并执行接口Q18
class Q19 extends Q17 implements Q18 {
  m4: boolean;
  m5: string;
}

// class Q20 implements Q18 {
//   m3: string;
//   m4: boolean;
// }


type R = number;
const r: R = 1; // R是类型number的别名

type R1 = {
  m1: number;
  m2: R1; // 类型别名可以在属性中使用自身
}

type R2<T> = {
  m1: T;
}

const r2: R2<number> = {
  m1: 1,
}

interface R3 {
  m1: string;
}

interface R4 extends R3 {
  m2: number;
}
interface R4 {
  m3: number;
}

const r3: R4 = {
  m1: '1',
  m2: 1,
  m3: 1,
};

type R5 = {
  m1: string;
};
// type R5 = { // 报错：Duplicate identifier 'R5'.
//   m3: string;
// };

type R6 = R5 & {
  m2: number;
};

const r4: R6 = {
  m1: '1',
  m2: 1,
};

class P {
  m1: string;
  m2: number;
}

const p1: P = {
  m1: '1',
  m2: 2,
}

function s({ m1, m2 }) {
  const arr = m1.split(', '); // 字符串对象有split方法
  const str = m2.toFixed(2); // 数字对象有toFixed方法
  console.log(arr, str);
}

/* 解法1
interface S {
  m1: string;
  m2: number;
}

function s({ m1, m2 }: S): void {
  const arr = m1.split(', '); // 字符串对象有split方法
  const str = m2.toFixed(2); // 数字对象有toFixed方法
  console.log(arr, str);
}

const s1 = {
  m1: 'a, b, c',
  m2: 1.034
}

s(s1);
*/

/* 解法2
interface S1 {
  m1: string;
  m2: number;
}

interface S2 {
  (x: S1): void;
}

const s: S2 = ({ m1, m2 }) => {
  const arr = m1.split(', '); // 字符串对象有split方法
  const str = m2.toFixed(2); // 数字对象有toFixed方法
  console.log(arr, str);
}

const s1 = {
  m1: 'a, b, c',
  m2: 1.034
}

s(s1);
*/

console.log(a, b, b1, b2, b3, c, c1, c2, d, d1, d2, g, h, h1, k, k1, l, l1, n, o, o1, o2, Q11, q11, Q19, r, r2);
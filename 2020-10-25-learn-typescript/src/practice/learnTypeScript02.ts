(function (): void {
  let a: number | string | boolean;
  a = 1;
  a = '1';

  interface A1 {
    m1: number;
    m2: number;
  }

  interface A2 {
    m1: string;
    m3: boolean;
  }

  function a1 (x: A1 | A2): void {
    x.m1;
    // x.m3; // 报错
  }


  interface A3 {
    m1: 'One';
    m2: number;
  }

  interface A4 {
    m1: 'Two';
    m3: boolean;
  }

  function a2 (x: A3 | A4 ): string {
    const { m1 } = x;
    switch(m1) {
      case 'One':
        return String((x as A3).m2);
      case 'Two':
        return String((x as A4).m3);
    }
  }

  interface A5 {
    m1: number;
    m2: string;
  }

  interface A6 {
    m3: number;
  }

  interface A7 {
    m4: string;
    m3: string;
  }

  type A8 = A5 & A6 & A7;

  function a3 (x: A8): void {
    const { m1, m2, m3, m4 } = x;

    console.log(m1, m2, m3, m4);
  }
  const x123 = {
    m1: 1,
    m2: '1',
    m3: 1,
    m4: '1',
  };

  // a3(x123);

  function a4(x: string): string {
    return x;
  }

  function a5<T>(x: T): T {
    return x;
  }

  const a8 = a5<string>('a');
  const a9 = a5('a');

  function a6<T>(x: T[]): T[] {
    return x;
  }

  function a7<T1, T2>(x: T1 | T2): T1 | T2 {
    return x;
  }

  function b<T>(x: T): T {
    return x;
  }

  const b1: <T>(x: T) => T = b; 
  const b2: <U>(x: U) => U = b;
  const b3: { <U>(x: U): U } = b;

  interface B<T> {
    (x: T): T;
  }

  
  const b4: B<string> = b;
  // b4(1); // 报错：Argument of type '1' is not assignable to parameter of type 'string'.

  interface B1 {
    <T>(x: T): T;
  }
  const b5: B1 = b;
  b5(1);

  class B2<T> {
    // static m3: T; // 报错：Static members cannot reference class type parameters.
    m1: T;
    m2: (x: T) => T;
  }

  const b6 = new B2<number>();
  b6.m1 = 1;
  b6.m2 = (x: number): number => x;

  interface B3 {
    m1: number;
  }

  function b7<T extends B3>(x: T): T {
    console.log(x.m1);
    return x;
  }

  function b8<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
  }

  function b9<T>(x: { new (): T }): T {
    return new x();
  }

  class B4 {
    m1: number;
  }

  class B5 extends B4 {
    m2: string;
  }

  class B6 {
    // m1: number;
    m3: boolean;
  }

  function b10<T extends B4>(x: { new (): T }): T {
    return new x();
  }
  b10(B4);
  b10(B5);
  // b10(B6); // 报错

  interface C {
    m1: number;
    m2?: string;
  }

  interface C1 {
    m3: number;
  }

  type C2 = C | C1;

  function c(x: C2): void {
    if ('m1' in x) {
      console.log(x.m1);
    }
    if ('m4' in x) {
      // console.log(x.m4); // 报错：Property 'm4' does not exist on type 'never'.
    }
  }

  interface C3 {
    m1: number;
  }

  interface C4 {
    m2: number;
  }

  type C5 = C3 | C4;

  function isC3Type(x: C5): x is C3 {
    return (x as C3).m1 !== undefined;
  }

  function c1(x: C5): void {
    if (isC3Type(x)) {
      console.log(x.m1);
    }
  }

  function c2(x: string | number): void {
    if (typeof x === 'string') {
      console.log(x.split(','));
    } else {
      x.toFixed(2);
    }
  }

  class C3 {
    m1: number;
  }

  function c3 (x: unknown): void {
    if (x instanceof C3) {
      console.log(x.m1);
    }
  }
  
  // let d = 1;
  // d = '1'; // 报错：Type '"1"' is not assignable to type 'number'.
  
  // let d1 = {
  //   m1: 1,
  // };
  // d1.m1 = '1'; // 报错：Type '"1"' is not assignable to type 'number'.

  // function d2(x = 1) {
  //   return x;
  // }

  // d2('1'); // 报错：Argument of type '"1"' is not assignable to parameter of type 'number | undefined'.

  // function d3() {
  //   return 'd';
  // }

  // const d4 = d3();
  // d4.split(',');
  // d4.toFixed(2); // 报错：Property 'toFixed' does not exist on type 'string'.

  window.onload = (): void => {
    console.log('d');
  };
/*
  // 假装x是用来放接口返回的数据的变量，它初始值为空对象{}，我们不知道接口返回的数据会是什么，所以给它的类型是unknown
  let x: unknown = {};

  class E {
    m1: string;
    m2: number;
  }

  function requestData (response: unknown): void {
    x = response;
    if (x instanceof E) {
      s(x);
    }
  }

  function s({ m1, m2 }: E): void {
    const arr = m1.split(', '); // 字符串对象有split方法
    const str = m2.toFixed(2); // 数字对象有toFixed方法
    console.log(arr, str);
  }
*/
  
  console.log(a, a1, a2, a3, a4, a6, a7, a8, a9, b1, b2, b3, b4, b7, b8, b9, B6, c, c1, c2, c3, );
})();

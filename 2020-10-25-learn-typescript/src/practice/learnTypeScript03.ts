(function (): void {
  enum A {
    M1,
    M2
  }

  enum A1 {
    M1, 
    M2 = 5,
    M3
  }
  console.log(A1.M1, A1.M2, A1.M3); // 打印：0 5 6

  function a (x: A1): A1 {
    return x;
  }

  a(A1.M1);

  enum A2 {
    M1 = 1, // 数字枚举在第一个位置
    M2
  }
  enum A3 {
    M1 = 2, 
    M2 // 数字枚举在被数字常量2初始化的枚举成员A后面
  }
  enum A4 {
    M1, 
    M2 = M1,
    M3 // 数字枚举在被常量枚举成员初始化的成员B后面
  }
  // enum A5 {
  //   M1 = '', 
  //   M2 // 报错：Enum member must have initializer.
  // }

  enum A6 {
    M1 = 'A_A',
    M2 = 'B_B',
    M3 = 'C_C',
  }

  enum A7 {
    M1 = 'A_A',
    M2 = 1,
  }

  enum A8 {
    M1,
  }

  enum A9 {
    M1 = 5,
    M2,
  }

  enum A10 {
    M1 = 1,
    M2 = (1 + 1),
    M3 = -1,
    M4 = 1 * 2,
  }

  enum A11 {
    M1,
    M2,
    M3
  }
  
  interface A12 {
    m1: A11.M1;
  }

  const a1: A12 =  {
    m1: A11.M1,
  };


  enum A13 {
    M1 = 'A_A',
    M2 = 'B_B',
    M3 = 'C_C'
  }
  
  interface A14 {
    m1: A13.M1;
  }

  const a2: A14 =  {
    m1: A13.M1,
    // m1: 'A_A', // 报错：Type '"A_A"' is not assignable to type 'A13.M1'.
  };

  enum A15 {
    M1,
    M2,
    M3
  }

  const a3: A15 = 0;
  const a4: A15.M1 | A15.M2 | A15.M3 = a3;


  enum A16 {
    M1,
    M2
  }

  function a5 (x: { M1: number }): void {
    console.log(x.M1);
  }

  a5(A16); // 直接将枚举A16作为一个参数传入，打印：0

  enum A17 {
    M1,
    M2,
    M3,
  }

  const a6: 'M1' | 'M2' | 'M3' = 'M1';
  const a7: keyof typeof A17 = a6;

  enum A18 {
    M1,
    M2,
    M3,
  }

  enum A19 {
    M1 = 'A_A',
    M2 = 'B_B',
    M3 = 'C_C',
  }

  console.log(A18);
  console.log(A19);

  // function b(x) { // 名字为b的函数
  //   return x;
  // }
  // const b1 = function (x) {  // 没有名字的函数声明，直接将函数值赋给变量b1
  //   return x;
  // }

  function b2(x: number): number {
    return x;
  }

  const b3: (x: number) => number = function (x: number): number {
    return x;
  }

  const b4: (y: number) => number = function (x: number): number {
    return x;
  }

  // interface B {
  //   m1: number;
  //   m2: string;
  // }

  // function b5 ({ m1, m2 }: B): void {
  //   console.log(m1, m2);
  // }

  interface B {
    m1?: number;
    m2?: string;
  }

  interface B1 {
    (x: B): void;
  }

  const b6: B1 = function ({ m1, m2 }) {
    console.log(m1, m2);
  }

  function b7 ({ m1, m2 }: B = {}): void {
    console.log(m1, m2);
  }

  const b8 = function (x: number): number {
    return x;
  }
  
  const b9: (x: number) => number = function (x) {
    return x;
  }

  function b10 (x: number, y?: number, z?: number): number {
    return 1;
  }
  
  b10(1);
  b10(1, 2);
  b10(1, 2, 3);

  function b11 (x: number, y = 2): number {
    return 1;
  }

  function b12 (x: number, ...rest: number[]): void {
    console.log(x);
    console.log(rest);
  }

  b12(1, 2, 3); // 打印: 1 和 [2, 3]

  // const b14 = {
  //   m1: 1,
  //   m2: function (): () => void { // 返回一个函数
  //     return function (): void {
  //       console.log(this.m1);
  //     };
  //   },
  // }
  
  // b14.m2()(); // 打印：undefined
  
  const b14 = {
    m1: 1,
    m2: function (): () => void { // 返回一个函数
      return (): void => {
        console.log(this.m1);
      };
    },
  }
  
  b14.m2()(); // 打印：1


  // const b15 = {
  //   m1: 1,
  //   m2: function (x: () => void): void { // 将函数作为一个参数
  //     x();
  //   },
  // };
  
  // const b16 = function (): void {
  //   console.log(this.m1);
  // }
  
  // b15.m2(b16); // 打印：undefined

  interface B2 {
    m1: number;
    m2(this: B2): () => void;
  }

  const b17: B2 = {
    m1: 1,
    m2: function (this: B2): () => void {
      console.log(this, 'aaa===');
      return (): void => {
        console.log(this.m1);
      }
    },
  };

  const b18 = b17.m2();
  b18();

  const b19 = {
    m3: 3,
  };

  b17.m2.call(b19);

  // class B3 {
  //   m1 = 1;
  //   m2 = (x: number) => {
  //     this.m1 = x;
  //   }
  // }

  // const b20 = new B3();
  // someLib.libMethod(b20.m2);

  function b21(x: number): { m1: string };
  function b21(x: string): number;
  function b21 (x: any): any {
    if (typeof x === 'number') {
      return { m1: 'abc' };
    }
    if (typeof x === 'string') {
      return 123;
    }
  }
  console.log(b21(1));
  console.log(b21('b'));

  class C {
    m1: string;
    constructor(x: string) {
      this.m1 = x;
    }
    m2(): void {
      console.log(this.m1);
    }
  }
  
  const c = new C('ccc');
  c.m2(); // 打印：ccc

  class C1 {
    m1: string = 'memberM1OfC1';
    m2 (): void {
      console.log('memberM2OfC1');
    }
  }

  class C2 extends C1 {
    m3: string = 'memberM3OfC2';
  }

  const c2 = new C2();
  console.log(c2.m1);
  c2.m2();

  class C3 {
    m1: number;
    constructor (x) {
      this.m1 = x;
    }
    m2 (): void {
      console.log(this.m1);
    }
  }

  class C4 extends C3 {
    m3: number;
    constructor (x) {
      super(x);
      this.m3 = x;
    }
    m2 (): void {
      console.log(this.m1 + this.m3);
    }
  }

  const c3 = new C3(5);
  c3.m2();  // 打印： 5

  const c4 = new C4(5);
  c4.m2(); // 打印：10


  class C5 {
    public m1: string; // 公有属性
    public constructor (x) { // 公有构造函数
      this.m1 = x;
    }
    public m2 (): void { // 公有方法
      console.log('c5');
    }
  }

  class C6 {
    #m1: number = 1;
    constructor (x) {
      this.#m1 = x;
    }
    m2 (): void {
      console.log(this.#m1);
    }
  }

  const c6 = new C6(1);
  c6.m2();
  // c6.#m1; // 报错：Property '#m1' is not accessible outside class 'C6' because it has a private identifier.

  
  class C7 {
    private m1: number = 1;
    constructor (x) {
      this.m1 = x;
    }
    m2 (): void {
      console.log(this.m1);
    }
  }

  const c7 = new C7(1);
  c7.m2();
  // c7.m1; // 报错：Property 'm1' is private and only accessible within class 'C7'.

  class C8 {
    private m1: number;
    m2: string;
  }
  
  class C9 extends C8 {
    m3: string;
  }
  
  class C10 {
    private m1: number;
    m2: string;
  }
  
  let c8 = new C8();
  const c9 = new C9();
  const c10 = new C10();
  
  c8 = c9;
  // c8 = c10; // 报错


  class C11 {
    protected m1: number = 123;
  }

  class C12 extends C11 {
    m2 (): void {
      console.log(this.m1);
    }
  }

  const c12 = new C12();
  c12.m2(); // 打印：123
  // c12.m1; // 报错：Property 'm1' is protected and only accessible within class 'C11' and its subclasses.

  class C13 {
    m1: number;
    protected constructor (x) {
      this.m1 = x;
    }
  }

  class C14 extends C13 {
    constructor (x) {
      super(x);
    }
  }

  // const c13 = new C13(1); // 报错：Constructor of class 'C13' is protected and only accessible within the class declaration.
  const c14 = new C14(1);
  console.log(c14.m1); // 打印：1

  class C15 {
    readonly m1: number = 1;
    readonly m2: number;
    constructor (x) {
      this.m2 = x;
    }
    // m3 (): void {
    //   this.m2 = 1; // 报错：Cannot assign to 'm2' because it is a read-only property.
    // }
  }

  const c15 = new C15(2);
  console.log(c15.m1); // 打印：1
  console.log(c15.m2); // 打印：2

  class C16 {
    constructor (readonly m1: number) {
      console.log(this.m1);
    }
  }
  const c16 = new C16(123); // 打印：123

  class C17 {
    readonly m1: number;
    constructor (x) {
      this.m1 = x;
    }
  }

  class C18 {
    constructor (protected readonly m1: number) {
      console.log(this.m1);
    }
  }

  class C19 {
    private m1: number = 1;
    get m2(): number {
      return this.m1;
    }
    set m2(x) {
      this.m1 = this.m1 * x;
    }
  }

  const c19 = new C19();
  c19.m2 = 3;
  c19.m2 = 2;
  console.log(c19.m2); // 打印：6

  class C20 {
    static m1: number = 1;
  }
  console.log(C20.m1);

  abstract class C21 {
    abstract m1: number;
    abstract m2(x: number): number;
    m3 (): void {
      console.log('333');
    }
  }

  class C22 extends C21 {
    m1: number = 2;
    m2 (x: number): number {
      return x * this.m1;
    }
  }

  let c21: C21; // 创建抽象类型的引用是ok的
  // c21 = new C21(); // 不能创建抽象类型的实例，这里报错：Cannot create an instance of an abstract class.

  const c22 = new C22();
  console.log(c22.m1);
  c22.m2(3);
  c22.m3();

  class C23 {
    m1: number;
    constructor(x: number) {
      this.m1 = x;
    }
  }

  let c23: C23 = new C23(1);
  const c23Maker: typeof C23 = C23;
  c23 = new c23Maker(2);

  class C24 {
    m1: number;
    m2: number;
  }

  interface InterfaceC24 extends C24 {
    m3: number;
  }

  const c24: InterfaceC24 = {
    m1: 1,
    m2: 2,
    m3: 3
  };

  @decoratorC25
  class C25 {
    m1: number = 1;
  }

  function decoratorC25 (constructor: Function) {
    constructor.prototype.m2 = 2;
  }

  const c25 = new C25();
  console.log(c25);

  // class C26 {
  //   @writable(false)
  //   m1() {
  //     console.log('aaa');
  //   }
  // }
  
  // function writable (x) {
  //   return function (
  //     target: any,
  //     propertyKey: string,
  //     descriptor: PropertyDescriptor
  //   ) {
  //     return {
  //       writable: false,
  //     };
  //   }
  // }

  // const c26 = new C26();
  // c26.m1 = () => {
  //   console.log('bbb');
  // };

  class C27 {
    m1: number;
    constructor (x) {
      this.m1 = x;
    }

    @decoratorC27
    get m2() {
      return this.m1 + 5;
    }

    m3 () {
      console.log('666');
    }
  }
  
  function decoratorC27 (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    target.m3();
  }


  const c27 = new C27(1); // 打印：666
  console.log(c27.m2); // 打印 6

  class C28 {
    @decoratorC28
    m1: number = 1;
    
    m2 (): void {
      console.log('123');
    }
  }
  function decoratorC28 (
    target: any,
    propertyKey: string,
  ) {
    target.m2();
  }

  const c28 = new C28(); // 打印 123

  class C29 {
    m1 (@decoratorC29 x: number) {
      console.log(x);
    }

    m2 () {
      console.log('456');
    }
  }

  function decoratorC29 (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    target.m2();
  }



  console.log(`======\n`,
    A, A1, A2, A3, A4, A6, A7, A8, A9, A10, a1, a2, a4, a7, b2, b3, b4, b6);
})();
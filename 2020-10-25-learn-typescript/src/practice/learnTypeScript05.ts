(function (): void {
  interface A {
    m1: number;
    m2: number;
  }

  const a: Partial<A> = {
  };

  const a1: Readonly<A> = {
    m1: 1,
    m2: 2,
  }
  // a1.m1 = 123; // 报错：Cannot assign to 'm1' because it is a read-only property.

  interface A1 {
    a1: number;
  }

  type Keys = 'm1' | 'm2';
  
  const a2: Record<Keys, A1> = {
    m1: { a1: 1 },
    m2: { a1: 1 },
  }

  interface A2 {
    m1: number;
    m2: string;
    m3: string;
  }

  const a3: Pick<A2, 'm1' | 'm2'> = {
    m1: 1,
    m2: '2',
  }

  const a4: Omit<A2, 'm1' | 'm2'> = {
    m3: 'string',
  }

  type A3 = Exclude<'m1' | 'm2' | 'm3', 'm1'>;

  let a5: A3 = 'm2';
  a5 = 'm3';

  type A4 = Extract<'m1' | 'm2' | 'm3', 'm1'>;

  const a6: A4 = 'm1';

  type T5 = NonNullable<undefined | null | number>;

  let a7: T5 = 1;
  // a7 = undefined; // 报错：Type 'undefined' is not assignable to type 'number'.

  type T6 = Parameters<(x: number, y: number) => number>;

  const a8: T6 = [1, 2];

  interface A5 {
    new (x: number, y: string): number;
  }

  type T7 = ConstructorParameters<A5>;

  const a9: T7 = [1, '2'];


  type T8 = ReturnType<() => number>;

  const a10: T8 = 123;


  class ClassA {
    m1: number;
    constructor (x) {
      this.m1 = x;
    }
    m2 (y: number) {
      return y;
    }
  }

  type T9 = InstanceType<typeof ClassA>;

  const a11: T9 = {
    m1: 1,
    m2: (y) => {
      return y;
    },
  }

  interface A5 {
    m1?: number;
    m2?: string;
  }

  type T10 = Required<A5>;

  const a12: T10 = {
    m1: 1,
    m2: '2'
  }

  interface A6 {
    (this: number, x: string, y: number): void;
  }

  type T11 = ThisParameterType<A6>;

  const a13: T11 = 1;

  type T12 = OmitThisParameter<A6>;

  const a14: T12 = function (x: string, y: number) {
    console.log('a');
  }

  type ObjectDescriptor<D, M> = {
    data?: D;
    methods?: M & ThisType<D & M>; // Type of 'this' in methods is D & M
  };
  
  function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
    let data: object = desc.data || {};
    let methods: object = desc.methods || {};
    return { ...data, ...methods } as D & M;
  }
  
  let obj = makeObject({
    data: { x: 0, y: 0 },
    methods: {
      moveBy(dx: number, dy: number) {
        this.x += dx; // Strongly typed this
        this.y += dy; // Strongly typed this
      },
    },
  });
  
  obj.x = 10;
  obj.y = 20;
  obj.moveBy(5, 5);
  
})()
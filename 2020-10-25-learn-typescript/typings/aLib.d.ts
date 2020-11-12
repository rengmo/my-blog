// declare namespace aLib {
//   function m1(x: number): number;
// }

declare function aLibM2(x: number): string;
declare function aLibM2(x: string): boolean;

interface ALibA {
  m1: string;
  m2: number;
}

declare function aLibM3(x: ALibA): void;

type ALibB = string | number;

declare function aLibM4(x: ALibB): void;

declare namespace ALib {
  interface ALibC {
    m1: number;
  }
  interface ALibD {
    m1: string;
  }
}
declare namespace ALib.TypeA {
  interface C {
    m1: number;
  }
  interface D {
    m1: string;
  }
}

declare class ALibC {
  constructor(x: number);
  m1: number;
  m2(x: number): number;
}

declare var aLibD1: number;
declare let aLibD2: number;
declare const aLibD3: number;

declare function aLibE (): void;
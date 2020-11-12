declare module 'B1' {
  export const m1: string;
  export function m2(x: number): number;
  export interface M3 {
    m1: string;
    m2: number;
  }
}


declare module 'B2' {
  export const m4: string;
}
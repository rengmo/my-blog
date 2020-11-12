/// <reference path="Validation.ts" />

namespace Validation {
  const lettersRegexp = /^[A-Za-z]+$/;
  
  // 验证字符串包含的字符全部为字母
  export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string): boolean {
      return lettersRegexp.test(s);
    }
  }
}
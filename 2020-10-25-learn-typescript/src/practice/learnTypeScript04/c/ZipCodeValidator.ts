/// <reference path="Validation.ts" />

namespace Validation {
  const numberRegexp = /^[0-9]+$/;

  // 验证邮政编码
  export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string): boolean {
      return s.length === 5 && numberRegexp.test(s);
    }
  }
}
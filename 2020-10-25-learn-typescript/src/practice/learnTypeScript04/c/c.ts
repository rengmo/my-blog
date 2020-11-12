// d3.aaa;

// namespace Validation {
//   export interface StringValidator {
//     isAcceptable(s: string): boolean;
//   }
  
//   const lettersRegexp = /^[A-Za-z]+$/;
//   const numberRegexp = /^[0-9]+$/;
  
//   // 验证字符串包含的字符全部为字母
//   export class LettersOnlyValidator implements StringValidator {
//     isAcceptable(s: string): boolean {
//       return lettersRegexp.test(s);
//     }
//   }
  
//   // 验证邮政编码
//   export class ZipCodeValidator implements StringValidator {
//     isAcceptable(s: string): boolean {
//       return s.length === 5 && numberRegexp.test(s);
//     }
//   }
// }

// // 一些用来验证的字符串
// const strings = ["Hello", "98052", "101"];

// // 要使用的验证器
// const validators: { [s: string]: Validation.StringValidator } = {};
// validators["ZIP code"] = new Validation.ZipCodeValidator();
// validators["Letters only"] = new Validation.LettersOnlyValidator();

// // 查看是否每一个字符串都通过了对应的验证器
// for (const s of strings) {
//   for (const name in validators) {
//     const isMatch = validators[name].isAcceptable(s);
//     console.log(`'${s}' ${isMatch ? "匹配" : "不匹配"} '${name}'.`);
//   }
// }
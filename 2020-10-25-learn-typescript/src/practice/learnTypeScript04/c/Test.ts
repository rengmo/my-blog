/// <reference path="Validation.ts" />
/// <reference path="LettersOnlyValidator.ts" />
/// <reference path="ZipCodeValidator.ts" />

// 一些用来验证的字符串
const strings = ["Hello", "98052", "101"];

// 要使用的验证器
const validators: { [s: string]: Validation.StringValidator } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();

// 查看是否每一个字符串都通过了对应的验证器
for (const s of strings) {
  for (const name in validators) {
    const isMatch = validators[name].isAcceptable(s);
    console.log(`'${s}' ${isMatch ? "匹配" : "不匹配"} '${name}'.`);
  }
}
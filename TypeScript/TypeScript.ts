// interface Person {
//   readonly id: number; // 使用 readonly 标识只读属性，一旦定义不可再更改，只读
//   name: string;
//   age: number | string; // 联合类型
//   gender?: string; // 可选属性
//   [propName: string]: any; // 使用 [propName: string] 定义了任意属性取 string 类型的值
//   // 任意属性,一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集,
//   // 一个接口中只能定义一个任意属性。
// }

// let nic: Person = {
//   id: 123,
//   name: 'aaa',
//   age: '24',
//   gender: 'male',
//   handsome: 'very handsome',
//   isBoy: true
// };


// // TS定义数组的几种方法
// // 方法1：「类型 + 方括号」表示法
// let arr1: number[] = [1, 2, 3];
// // 已经指定数组的类型为number，如果出现其他类型的数组元素会报错
// // 数组的一些方法的参数也会根据数组在定义时约定的类型进行限制，比如 arr1.push('12') 也会报错

// // 方法2：数组泛型 => 使用数组泛型（Array Generic） Array<elemType> 来表示
// let arr2: Array<number> = [2, 4, 6];

// // 方法3：用接口表示数组
// // step1: 定义接口
// interface NumberArray {
//   [index: number]: number
// }
// // step2: 定义数组
// let arr3: NumberArray = [1, 2, 3, 4, 5, 6];

// // 如果想要在数组中定义任何类型的数组元素，可以使用 any
// // 举个例子
// let anyTypeList: any[] = [1, 2, '3', { aa: '1' }, true, null, undefined];



// 类数组(Array-like Object)，实际上不是数组类型，类数组不能使用普通的数组方式(上述数组方法1、2)来描述，而是要使用接口
// 举个例子
// function sum() {
//   let args: {
//     [index: number]: number;
//     length: number;
//     callee: Function;
//   } = arguments;
// }

// 在TS中，常用的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection
// 其中 IArguments 是 TypeScript 中定义好了的类型，它实际上就是：
// interface IArguments {
//   [index: number]: any;
//   length: number;
//   callee: Function;
// }
// // 如此说来，上面的sum函数实际上可以这样写：
// function sum() {
//   let args: IArguments = arguments;
// }


// function add(x: number, y: number ): number {
//   return x + y;
// }

// 注意不要混淆了 TypeScript 中的 => 和 ES6 中的 =>。
// 在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。

// 下面两个函数编译出来是一样的
// const mySum1: (x: number, y: number) => number = function (x: number, y: number): number {
//   return x + y;
// };

// const mySum2: (x: number, y: number) => number = (x: number, y: number): number => x + y;


// interface SearchFunc {
//   (source: string, subString: string): boolean;
// }
// let mySearch: SearchFunc;
// mySearch = (source: string, subString: string) => source.search(subString) !== -1;

// 函数的可选参数(类似于接口的可选属性，使用 ? 表示)
// 可选参数必须接在必需参数后面。换句话说，可选参数后面不允许再出现必需参数!!!
// function concatName(firstName: string, lastName?: string): string {
//   if (lastName) {
//     return `${firstName} ${lastName}`;
//   } else {
//     return firstName;
//   }
// }
// const n = concatName('Nicholas')
// const nf = concatName('Nicholas', 'Fung')

// 函数参数默认值
// TypeScript 会将添加了默认值的参数识别为可选参数
// 此时就不受「可选参数必须接在必需参数后面」的限制了
// function concatName1(firstName: string = 'Nicholas', lastName: string): string {
//   if (lastName) {
//     return `${firstName} ${lastName}`;
//   } else {
//     return firstName;
//   }
// }

// 函数剩余参数 (ES6中的 rest参数)
// rest 参数只能是最后一个参数
// function push(array: any[], ...items: any[]) {
//   items.forEach(function(item) {
//     array.push(item);
//   });
// }

// let a = [];
// push(a, 1, 2, 3);

// 重载
// 重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。
// 我们重复定义了多次函数 reverse，前几次都是函数定义，最后一次是函数实现。在编辑器的代码提示中，可以正确的看到前两个提示。
// 注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。
// function reverse(x: number): number;
// function reverse(x: string): string;
// function reverse(x: number | string): number | string {
//   if (typeof x === 'number') {
//     return Number(x.toString().split('').reverse().join(''));
//   } else if (typeof x === 'string') {
//     return x.split('').reverse().join('');
//   }
// }


// 类型断言
// 使用类型断言可以手动指定一个值的类型
// 有两种表示法
// 1、 值 as 类型
// 2、 <类型>值
// 建议使用第一种

// 类型断言的用途
// 1、将一个联合类型断言为其中一个类型
// 2、将一个父类断言为更加具体的子类
// 3、将 任何一个类型断言为any

// // 一、将一个联合类型断言为其中一个类型
// interface Cat {
//   name: string;
//   run(): void;
// }
// interface Fish {
//   name: string;
//   swim(): void;
// }

// function getName(animal: Cat | Fish) {
//   return animal.name;
// }

// function swim(animal: Cat | Fish) {
//   (animal as Fish).swim(); // 这段代码隐藏了animal可能为Cat的情况，使用类型断言时一定要格外小心，尽量避免断言后调用方法或引用深层属性，以减少不必要的运行时错误。
// }
// const tom: Cat = {
//   name: 'Tom',
//   run() { console.log('run') }
// };
// swim(tom) // TypeError: animal.swim is not a function


// // 尚未确定类型就访问其中一个类型特有的属性或方法
// function isFish(animal: Cat | Fish) {
//   // 在获取animal.name 的时候就报错了
//   if (typeof animal.swim === 'function') {
//     return true;
//   }
//   return false;
// }
// // 这种情况，就可以使用断言，将animal断言成Fish，即可解决访问 animal.swim时报错的问题
// function isFish(animal: Cat | Fish) {
//   if (typeof (animal as Fish).swim === 'function') {
//     return true;
//   }
//   return false;
// }
// // OR
// function isFish(animal: Cat | Fish) {
//   if (typeof (<Fish>animal).swim === 'function') {
//     return true;
//   }
//   return false;
// }


// // 二、将一个父类断言为更加具体的子类
// class ApiError extends Error {
//   code: number;
// }
// class HttpError extends Error {
//   statusCode: number;
// }

// function isApiError(error: Error) {
//   // 由于父类Error中没有code属性，所以直接使用error.code会报错，因此需要将父类断言为更加具体的具有code属性的ApiError类
//   if (typeof (error as ApiError).code === 'number') {
//     return true;
//   }
//   return false;
// }

// // 三、将任何一个类型断言为any
// const foo: number = 1;
// // window.foo = 1;
// // 上行代码在window上添加一个属性foo，但是ts编译时报错，提示window上没有这个属性，
// // 这个时候就可以使用 as any 临时将window断言为any类型
// (window as any).foo = 1; // 在 any 类型的变量上，访问任何属性都是允许的

// // 四、将any断言为一个具体的类型
// // getacheData 函数返回的值是any
// function getacheData(key: string): any {
//   return (window as any).cache[key];
// }

// interface Cat {
//   name: string;
//   run(): void;
// }

// const tom = getacheData('tom') as Cat;
// tom.run();



// 类型断言的限制
// 1. 联合类型可以断言为其中的一个类型
// 2. 父类可以断言为子类
// 3. 任何类型都可以断言为any
// 4. any类型可以断言为任何类型







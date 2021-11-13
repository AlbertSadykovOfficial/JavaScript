/*
		
		Композиция

				Композиция - создание сложной функциональности за счет объединения более простых функций.

				Суть: 
						У нас есть несколько функций, которые вызывают друг дргуа поочереди:
						function1(function2(function3(param1,param2)))

						Как видно, это цепочка тяжелочитаема

*/

// Пример:

const upperCase = str => str.toUpperCase();
const exclaim = str => `${str}!`;
const repeat = str => `${str} `.repeat(3);


console.log(
  repeat(exclaim(upperCase("I love coding"))) // I LOVE CODING! I LOVE CODING! I LOVE CODING!
);

const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);
const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

const withСompose = compose(
  repeat,
  exclaim,
  upperCase
);

const withСompose2 = pipe(
  upperCase,
  exclaim,
  repeat
);

console.log(withСompose("I love coding")); // I LOVE CODING! I LOVE CODING! I LOVE CODING!
console.log(withСompose2("I love coding")); // I LOVE CODING! I LOVE CODING! I LOVE CODING!
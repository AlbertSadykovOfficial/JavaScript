/*

		Каррирование

				Каррирование – это трансформация, которая превращает вызов f(a, b, c) в f(a)(b)(c).
				Каррирование не вызывает функцию. Оно просто трансформирует её.

*/

function curry(f) { // curry(f) выполняет каррирование
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}

// использование
function sum(a, b) {
  return a + b;
}

// Результат - две обёртки.
let carriedSum = curry(sum);

alert( carriedSum(1)(2) ); // 3

// Более продвинутые реализации каррирования, как например _.curry из библиотеки lodash, 
// возвращают обёртку, которая позволяет запустить функцию как обычным образом, так и частично.
function sum(a, b) {
  return a + b;
}

let carriedSum = _.curry(sum); // используем _.curry из lodash

alert( carriedSum(1, 2) ); // 3, можно вызывать как обычно
alert( carriedSum(1)(2) ); // 3, а можно частично



// Продвинутая реализация каррирования
function curry2(func) {

  return function curried(...args) 
  {
  	// Если аргументов столько же или больше, чем в исходной func:
  	// curriedSum(1,2,3), то все ок, вызываем функцию
    if (args.length >= func.length) {
      return func.apply(this, args);
    }
  	// Если аргументов меньше, чем в исходной func:
  	// curriedSum(1,2)(3), то сливам аргументы->(1,2,3)
    else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };

}

function sum2(a, b, c) {
  return a + b + c;
}

let curriedSum = curry2(sum2);

alert( curriedSum(1, 2, 3) ); // 6, всё ещё можно вызывать нормально
alert( curriedSum(1)(2,3) ); // 6, каррирование первого аргумента
alert( curriedSum(1)(2)(3) ); // 6, каррирование всех аргументов

/*
		Декораторы (call, apply)

				Декоратор – это обёртка вокруг функции, которая изменяет поведение последней.
				Основная работа по-прежнему выполняется функцией.

				Методы:
				    func.call(context, arg1, arg2…) – вызывает func с данным контекстом и аргументами.
				    func.apply(context, args) – вызывает func, передавая context как this и псевдомассив args как список аргументов.

				    В основном переадресация вызова выполняется с помощью apply, потому что он более оптимизирован.

				«Перенаправлением вызова» (call forwarding) - называется передача всех аргументов с контекстом другой функции.
*/

// Перенаправление вызова
let wrapper = function(original, arguments) {
  return original.apply(this, arguments);
};


/**
* 	Пример - обертка функции  - кэширование
*		
*		Допустим, есть метод объекта slow, который имеет много вычислений и долго выполняется
*		Логично будет кэшировать результаты. Но нам запретили менять код исходного метода.
*
*		Чтобы ничего не сломать и не менять код исходной фукнции, воспользуемся декоратором,
*		который расширит возможноси функции, добавив кэширование.
*
*/

// Исходный объект
let worker = {
  slow(min, max) {
    console.log(`Called with ${min},${max}`);
    return min + max;
  }
};


/*
*
*		(*)	 - Делаем из (3, 5) ключ "3,5" для Map 
*		(**) - передача контекста и всех аргументов, полученных обёрткой (независимо от их количества), в исходную функцию
*
*/
function cachingDecorator(func, hash) {
  let cache = new Map();
  return function() {
    let key = hash(arguments); // (*)
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    // Вместо func.call(this, ...arguments) мы могли бы написать func.apply(this, arguments).
    let result = func.call(this, ...arguments); // (**)

    cache.set(key, result);
    return result;
  };
}


function hash(args) {
  return args[0] + ',' + args[1];
}

/**
*		Альтернатива - hash для большого кол-ва аргументов, а не только для 2х
* 	Конструкция в return называется - заимствование метода
*		Так, мы заимствуем метод массива ([]) - join 
*		и отдаем этот метод нашему псевдомассиву arguments
* 	Псевдомассив - перебираемый объект, но не является массивом.
*/
function hash2() {
  return [].join.call(arguments);
}


worker.slow = cachingDecorator(worker.slow, hash);

console.dir( worker.slow(3, 5) ); // работает
console.dir( "Again " + worker.slow(3, 5) ); // аналогично (из кеша)
/*
		
		Остаточные параметры и оператор расширения
				
				Данные инструменты заменяют Function.prototype.apply для переадчи параметров в функцию.
				
				Остаточные параметры

						Многие встроенные функции JavaScript поддерживают произвольное количество аргументов.
						Это позволяю делать остаточные параметры (...)

						Ранее использовалася параметр arguments, но он включал в себя все переданные аргументы,
						а не остаотчные.

				Остаточные расширения

						Остотчные расширения - противоположность остаточным параметрам, они - разбирают массив в список.
						Это может понадобится для некоторых функций, к приемеру, Max, которая требует список, а не массив:

						Альтернатива для строк -  Array.from(str)




*/


// Пример - остаточные параметры
function sumAll(a, b, ...args) { // args — имя массива
  let sum = 0;
  sum = a+b;
  for (let arg of args) sum += arg;

  return sum;
}

// Пример - остаотчные расширения 
let arr1 = [1, 2, 3];
let arr2 = [7, 8, 9, 10];

console.log( Math.max(...arr1, 4,5,6, ...arr2) );

// Слияние массивов.
let merged = [...arr1, 4,5,6, ...arr2];

// Разбор строк:
let str = 'ПРИВЕТ';
console.log([...str]);
console.log( Array.from(str) ); 
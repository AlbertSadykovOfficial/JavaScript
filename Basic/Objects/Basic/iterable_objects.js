/*
		
		Итерируемые объекты

				Перебираемые (или итерируемые) объекты – это концепция, которая позволяет использовать любой объект в цикле for..of.

				Есть два официальных термина, которые очень похожи, но в то же время сильно различаются

				    Итерируемые объекты – это объекты, которые реализуют метод Symbol.iterator.
				    Псевдомассивы – это объекты, у которых есть индексы и свойство length, то есть, они выглядят как массивы.
				
				Отличия псевдомассива и итериремого объекта от массивов:

						Они не имеют таких методов как pop() и push()
				
				Сделать массив из псевдомассива или итериремого объекта:

						Array.from(obj[, mapFn, thisArg])

								mapFn - «трансформирующая» функция, которая проводит манипуляцию над элементом, прежде чем вернет его
								thisArg  - позволяет установить this для этой функции.

						Пример:

								arr = Array.from(arrayLike);

*/


// Обычный, не перебираемый объект
let range = {
  from: 1,
  to: 5
};

// Не работает - обеъект не итерируемый
for (let num of range) {
  alert(num); // 1, затем 2, 3, 4, 5
}

/* Делаем объект итерируемы

		Особенность итераторов:

			У самого range нет метода next().
			Вместо этого другой объект, так называемый «итератор», создаётся вызовом range[Symbol.iterator](), и именно его next() генерирует значения
			Таким образом, итератор отделён от самого итерируемого объекта.

*/
range[Symbol.iterator] = function() {

  // ...она возвращает объект итератора:
  // 2. Далее, for..of работает только с этим итератором, запрашивая у него новые значения
  return {
    current: this.from,
    last: this.to,

    // 3. next() вызывается на каждой итерации цикла for..of
    next() {
      // 4. он должен вернуть значение в виде объекта {done:.., value :...}
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
};

// Работает
for (let num of range) {
  alert(num); // 1, затем 2, 3, 4, 5
}

// прмиер работы Array.from
let arr = Array.from(range, num => num * num);

/*
		
		Явный вызов итератора

*/
let str = "Hello";

// делает то же самое, что и
// for (let char of str) alert(char);

let iterator = str[Symbol.iterator]();

while (true) {
  let result = iterator.next();
  if (result.done) break;
  alert(result.value); // выводит символы один за другим
}


/*
		Пример - slice, который поддерживает сурогатные пары
*/

function slice(str, start, end) {
  return Array.from(str).slice(start, end).join('');
}
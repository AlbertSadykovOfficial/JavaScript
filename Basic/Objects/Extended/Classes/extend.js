/*
		

		
		У встроенных объектов есть собственные статические методы, например Object.keys, Array.isArray и т. д.
		Как мы уже знаем, встроенные классы расширяют друг друга.
		Обычно, когда один класс наследует другой, то наследуются и статические методы. 
		(Это было подробно разъяснено в главе Статические свойства и методы.)

		Но встроенные классы – исключение. Они не наследуют статические методы друг друга.

		Например, и Array, и Date наследуют от Object, так что в их экземплярах доступны методы из Object.prototype. 
		Но Array.[[Prototype]] не ссылается на Object, поэтому нет методов Array.keys() или Date.keys().
		Нет связи между Date и Object. Они независимы, только Date.prototype наследует от Object.prototype.

		В этом важное отличие наследования встроенных объектов от того, что мы получаем с использованием extends.


		При помощи специального статического геттера Symbol.species можно вернуть конструктор, 
		который JavaScript будет использовать в filter, map и других методах для создания новых объектов.
		Если бы мы хотели, чтобы методы map, filter и т.д. возвращали обычные массивы, мы могли бы вернуть Array в Symbol.species.

*/

class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }

  // встроенные методы массива будут использовать этот метод как конструктор
  static get [Symbol.species]() {
    return Array;
  }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

// filter создаст новый массив, используя arr.constructor[Symbol.species] как конструктор
let filteredArr = arr.filter(item => item >= 10);

// filteredArr не является PowerArray, это Array
alert(filteredArr.isEmpty()); // Error: filteredArr.isEmpty is not a function
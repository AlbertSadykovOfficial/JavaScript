/*

		F.prototype

			Как мы помним, новые объекты могут быть созданы с помощью функции-конструктора new F().

			!! Если в F.prototype содержится объект, 
				 оператор new устанавливает его в качестве [[Prototype]] 
				 для нового объекта.


			Прототип по умолчанию:

					Rabbit.prototype = { constructor: Rabbit };

					Чтобы добавить свойств в прототип, не стирая его:
							
							function Rabbit() {}
							Rabbit.prototype.jumps = true
					
					или:
							function Rabbit() {}
							Rabbit.prototype = {
							  jumps: true,
							  constructor: Rabbit
							};

					НО НЕ ТАК, ТАК СОТРЕТСЯ СВОЙСТВО constructor:
							function Rabbit() {}
							Rabbit.prototype = {
							  jumps: true
							};

					!! Таким образом, чтобы сохранить верное свойство "constructor", 
						 мы должны добавлять/удалять/изменять свойства у прототипа по умолчанию вместо того, чтобы перезаписывать его целиком:


			F.prototype используется только в момент вызова new F()

					F.prototype используется только при вызове new F() и присваивается в качестве свойства [[Prototype]] нового объекта. 
					После этого F.prototype и новый объект ничего не связывает. Следует понимать это как «единоразовый подарок» объекту.

					После создания F.prototype может измениться,
					и новые объекты, созданные с помощью new F(), будут иметь другой объект в качестве [[Prototype]],
					но уже существующие объекты сохранят старый.


			КЛЮЧЕВАЯ ОСОБЕННОСТЬ:

					Мы можем использовать свойство constructor существующего объекта для создания нового.
					Это удобно, когда у нас есть объект, но мы не знаем, какой конструктор использовался для его создания
					(например, он мог быть взят из сторонней библиотеки), а нам необходимо создать ещё один такой объект.
					

					let rabbit = new Rabbit("White Rabbit");
					let rabbit2 = new rabbit.constructor("Black Rabbit");

*/


let animal = {
  	eats: true
};

// Функция-конструтор (F.prototype)
function Rabbit(name) {
	  this.name = name;
	  /* прототип по умолчанию
		Rabbit.prototype = { constructor: Rabbit };
		*/
}

// Проверим прототип по-умолчанию
console.log( Rabbit.prototype.constructor == Rabbit ); // true

// Устанавливаем прототип [[Prototype]] -> animal
Rabbit.prototype = animal;

//  rabbit.__proto__ == animal, т.к в конструктор было установлено [[Prototype]] -> animal
let rabbit = new Rabbit("White Rabbit");
console.log( rabbit.eats ); // true
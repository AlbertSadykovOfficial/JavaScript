/*

		Наследование классов:


		   1) Чтобы унаследовать от класса: class Child extends Parent:
		        При этом Child.prototype.__proto__ будет равен Parent.prototype, так что методы будут унаследованы,
		        если есть одинаковые методы, то они будут переопределены. 
		   2) При переопределении конструктора:
		        Обязателен вызов конструктора родителя super() в конструкторе Child до обращения к this.
		   3) При переопределении другого метода:
		        Мы можем вызвать super.method() в методе Child для обращения к методу родителя Parent.
		   4) Внутренние детали:
		        Методы запоминают свой объект во внутреннем свойстве [[HomeObject]]. 
            Благодаря этому работает super, он в его прототипе ищет родительские методы.
		        Поэтому копировать метод, использующий super, между разными объектами небезопасно.

					Также:

					    У функций-стрелок нет своего this и super, поэтому они «прозрачно» встраиваются во внешний контекст.

			Выражения после extend:
					
					После extends разрешены любые выражения^ (пример функции-генератора класса)

							function f(phrase) {
							  return class {
							    sayHi() { alert(phrase) }
							  }
							}
							class User extends f("Привет") {}

					Это может быть полезно для продвинутых приёмов проектирования, 
					где мы можем использовать функции для генерации классов в зависимости от многих условий и затем наследовать их.

*/

class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed = speed;
    alert(`${this.name} бежит со скоростью ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} стоит.`);
  }
}

// Наследуем от Animal указывая "extends Animal"
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} прячется!`);
  }
}

let rabbit = new Rabbit("Белый кролик");


// Пролблема цикличности:

let animal = {
  name: "Животное",
  eat() {
    alert(`${this.name} ест.`);
  }
};

let rabbit = {
  __proto__: animal,
  eat() {
    // ...делаем что-то специфичное для кролика и вызываем родительский (animal) метод
    this.__proto__.eat.call(this); // (*)
  }
};

let longEar = {
  __proto__: rabbit,
  eat() {
    // ...делаем что-то, связанное с длинными ушами и вызываем родительский (rabbit) метод
    this.__proto__.eat.call(this); // (**)
  }
};

longEar.eat(); // Error: Maximum call stack size exceeded

/*
		// внутри longEar.eat() у нас this = longEar
		this.__proto__.eat.call(this) // (**)
		// становится
		longEar.__proto__.eat.call(this)
		// то же что и
		rabbit.eat.call(this);

		// внутри rabbit.eat() у нас также this = longEar
		this.__proto__.eat.call(this) // (*)
		// становится
		longEar.__proto__.eat.call(this)
		// или (снова)
		rabbit.eat.call(this);

		rabbit.eat вызывает себя в бесконечном цикле, потому что не может подняться дальше по цепочке
		и решение только с использованием this не можнет быть достигнуто, для этого  используют super()
*/

let animal = {
  name: "Животное",
  eat() {         // animal.eat.[[HomeObject]] == animal
    alert(`${this.name} ест.`);
  }
};

let rabbit = {
  __proto__: animal,
  name: "Кролик",
  eat() {         // rabbit.eat.[[HomeObject]] == rabbit
    super.eat();
  }
};

let longEar = {
  __proto__: rabbit,
  name: "Длинноух",
  eat() {         // longEar.eat.[[HomeObject]] == longEar
    super.eat();
  }
};

// работает верно
longEar.eat();  // Длинноух ест.
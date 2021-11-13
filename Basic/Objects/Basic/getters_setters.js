/*
		
		Геттеры и сеттеры

				Есть два типа свойств объекта.
						
						1. свойства-данные (data properties). 
						2. свойства-аксессоры (accessor properties).

				Свойства аксессоры - это функции, которые используются для присвоения и получения значения, 
				но во внешнем коде они выглядят как обычные свойства объекта.

				Свойства-аксессоры представлены методами: «геттер» – для чтения и «сеттер» – для записи. 
				При литеральном объявлении объекта они обозначаются get и set

				Дескрипторы свойств доступа (defineProperty)

				    get – функция без аргументов, которая сработает при чтении свойства,
				    set – функция, принимающая один аргумент, вызываемая при присвоении свойства,
				    enumerable – то же самое, что и для свойств-данных,
				    configurable – то же самое, что и для свойств-данных.


				Умные геттеры/сеттеры

						Геттеры/сеттеры можно использовать как обёртки над «реальными» значениями свойств, чтобы получить больше контроля над операциями с ними.
						Например, если мы хотим запретить устанавливать короткое имя для user, мы можем использовать сеттер name для проверки, 
						а само значение хранить в отдельном свойстве _name
*/

/*
		
		Шаблон

*/
let obj = {
  get propName() {
    // геттер, срабатывает при чтении obj.propName
  },

  set propName(value) {
    // сеттер, срабатывает при записи obj.propName = value
  }
};


/*
		
		Пример

*/
let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
};

// set fullName запустится с данным значением
user.fullName = "Alice Cooper";

alert(user.name); // Alice
alert(user.surname); // Cooper

/*

		Дескрипторы свойств доступа (defineProperty)

				Cвойство объекта может быть либо свойством-аксессором (с методами get/set), либо свойством-данным (со значением value)

*/

let user = {
  name: "John",
  surname: "Smith"
};

Object.defineProperty(user, 'fullName', {
  get() {
    return `${this.name} ${this.surname}`;
  },

  set(value) {
    [this.name, this.surname] = value.split(" ");
  }
});

// Cвойство объекта может быть либо свойством-аксессором (с методами get/set), либо свойством-данным (со значением value)
// Error: Invalid property descriptor.
Object.defineProperty({}, 'prop', {
  get() {
    return 1
  },

  value: 2
});


/*

		Умные геттеры/сеттеры

*/

let user = {
  get name() {
    return this._name;
  },

  set name(value) {
    if (value.length <= 4) {
      alert("Имя слишком короткое, должно быть более 4 символов");
      return;
    }
    this._name = value;
  }
};

user.name = "Pete";
alert(user.name); // Pete

user.name = ""; // Имя слишком короткое...
/*

		instanceof - Проверка на объект.
				
				Другие разновидности проверки на объект:
						
						typeof 	для примитивов 	(Возвращает строку)
						instanceof 	для объектов 	Возвращаяет true/false)
						{}.toString 	для примитивов, встроенных объектов, объектов с Symbol.toStringTag 	(Возвращает строку типа)
													Symbol.toStringTag - повзоляет настраивать поведение

		Оператор instanceof позволяет проверить, к какому классу принадлежит объект, с учётом наследования.
		Обычно оператор instanceof просматривает для проверки цепочку прототипов. 
		Но это поведение может быть изменено при помощи статического метода Symbol.hasInstance.

		Алгоритм работы obj instanceof Class работает примерно так:

				1) Если имеется статический метод Symbol.hasInstance, тогда вызвать его: Class[Symbol.hasInstance](obj). 
						Он должен вернуть либо true, либо false, и это конец. (Мы можем его переопределить)
						(Пример 1)

				2) Большая часть классов не имеет метода Symbol.hasInstance. 
					 В этом случае используется стандартная логика: проверяется, 
					 равен ли Class.prototype одному из прототипов в прототипной цепочке obj.
					 		Пример 2:
							 		obj.__proto__ === Class.prototype?
									obj.__proto__.__proto__ === Class.prototype?

*/

// Пример 1
// проверка instanceof будет полагать,
// что всё со свойством canEat - животное Animal
class Animal {
  static [Symbol.hasInstance](obj) {
    if (obj.canEat) return true;
  }
}

let obj = { canEat: true };
alert(obj instanceof Animal); // true: вызван Animal[Symbol.hasInstance](obj)


// Настрйока поведения toString()
let user = {
  [Symbol.toStringTag]: "User"
};

alert( {}.toString.call(user) ); // [object User]
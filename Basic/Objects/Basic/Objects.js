/*

		Объекты
			
			Объект - ассоциативный массисв.

			Создание:
				let user = new Object(); // синтаксис "конструктор объекта"
				let user = {};  // синтаксис "литерал объекта"

*/

/*
		Добавление и удаление данных из объекта

			Создание:
				let user = {
					  name: "John",
					  age: 30,
					  "likes birds": true  // имя свойства из нескольких слов должно быть в кавычках
					};


			Добавить: 
					user.isAdmin = true;
					user["likes cats"] = false;
			Удалить:
					delete user.age;
					delete user["likes birds"];

			Достать:
					key = 'name';
					console.log(user[key]);	
					console.log(user.key);  // НЕ сработает, так как ключ - через переменную


*/


/*
		Упорядочение свойств

			Если в объекте есть целочисленные свойсвта, то они будут упорядочены.
			Остальные свойства будут в порядке добавления.
*/


/*	
		Имена свойств

			Имена свойств могут иметь любой тип, но они все равно переведутся в строку.

			Имена могут быть любыми, даже (for, if, return),
			Но не __proto__
		
*/

/*
			Проверить наличие свойства (in):
			this_key in my_object
*/



/*
		Объект как константа может быть изменен

			Дело в том, что объявление const защищает от изменений только саму переменную user, а не её содержимое.
			Определение const выдаст ошибку только если мы присвоим переменной другое значение: user=....

*/

/*	Вычисляемые свойства.

				let fruit = prompt("Какой фрукт купить?", "apple");

				// Запись будет следующей: {apple: 5}.
				let bag = {
				  [fruit]: 5, // имя свойства будет взято из переменной fruit
				};

				// Альтернатива
				let bag = {};
				bag[fruit] = 5;

				alert( bag.apple ); // 5, если fruit="apple"


*/
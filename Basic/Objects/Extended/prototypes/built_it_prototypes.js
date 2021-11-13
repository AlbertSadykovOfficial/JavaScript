/*

		Встроенные прототипы:


				Свойство "prototype" широко используется внутри самого языка JavaScript. 
				Все встроенные функции-конструкторы используют его.

				! Небольшое правило:

						 Мы можем наследовать только от одного объекта одновременно.

				
				Обо всех встроенных объкектах (функциях, массивах, дате и др.)

						Встроенные объекты, такие как Array, Date, Function и другие, хранят свои методы в прототипах,
						а не в себе. Такая ссылочная модель, конечно, позволяет экономить память, храня только данные
						и ссылку на вышестоящий объект.
						
						( Object.prototype ) - находится наверху иерархии встроенных прототипов (Согласно спецификации)
						
						!! Поэтому иногда говорят, что «всё наследует от объектов».


Связи:																			 null
[[Prototype]]																	|
																							|
																			 Object.prototype		
[[Prototype]]												/					|					 \
																	 /					|						\
									Arrray.prototype 		Function.prototype 		Number.prototype
[[Prototype]]							|										|										 |
											 [1,2,3]				function(args) {}						 5
				

						Некоторые методы в прототипах могут пересекаться, например, у Array.prototype есть свой метод toString, 
						который выводит элементы массива через запятую, но у Object.prototype тоже есть метод String...
						Вызывается тот метод, который ближе в цепочке прототипов. и для Array вызовется Array.prototype.toString;


				Просмотр цепочки наследований __proto__:

						В браузере можно посмотреть цепочку наследований __proto__, используя команду консоли - dir:

								console.dir(...)
				

				Вершина цепочки - Object.prototype

						Доказательсво вышесказанному - вывод пустого объекта - он выдаст ответ "[object Object]".

						Вспомним, что  obj = {} и obj = new Object() две одинаковые операции, 
						Object здесь выступает как функция-конструктор у которой есть свойство prototype,
						которое ссылается на объект с другими методами, одним из методов и явлется - toString.

								Object ---->  Object.prototype (constructor: Object, toString: function)


				Объекты примитивов (String, Number, Boolean):

						String, Number, Boolean

								Примитивы также хранят свои методы в прототипах объектов-обёрток: 
								Number.prototype, String.prototype, Boolean.prototype

								Как мы помним, они не объекты. 
								Но если мы попытаемся получить доступ к их свойствам, 
								то тогда будет создан временный объект-обёртка с использованием встроенных конструкторов String, Number и Boolean, 
								который предоставит методы и после этого исчезнет.

								Эти объекты создаются невидимо для нас, и большая часть движков оптимизирует этот процесс, 
								но спецификация описывает это именно таким образом. Методы этих объектов также находятся в прототипах, 
								доступных как String.prototype, Number.prototype и Boolean.prototype.

					
						А где же undefined и null?

								У значений undefined и null нет объектов-обёрток.

				
				Изменение встроенных прототипов
						
						Встроенные прототипы можно изменить, но делать этого не рекомендуется, потому что такое изменение
						глобально.

						Таким приемом рекомендуется пользоваться только тогда, когда метод существует в спецификации JavaScript, 
						но ещё не поддерживается текущим движком JavaScript.


				Заимствование чего-либо у каких-то прототипов:

						Некоторые методы встроенных прототипов часто одалживают.
						Например, если мы создаём объект, похожий на массив (псевдомассив), 
						мы можем скопировать некоторые методы из Array в этот объект.




*/


		let obj = {};
		console.log( obj ); // "[object Object]"
		console.log((obj.__proto__ === Object.prototype); // Доказательство, что прототип объекта obj - Object.prototype
		console.log(Object.prototype.__proto__)); // По цепочке прототипов выше Object.prototype нет свойства [[Prototype]]

		// Посмотреть цепочку прототипов:

				console.dir(obj);

		// Проверим теорию о том, что все в JS - наследуется от объектов:

				let arr = [1, 2, 3];

				// наследует ли от Array.prototype?
				console.log( arr.__proto__ === Array.prototype ); // true

				// затем наследует ли от Object.prototype?
				console.log( arr.__proto__.__proto__ === Object.prototype ); // true

				// и null на вершине иерархии
				console.log( arr.__proto__.__proto__.__proto__ ); // null


		// Именнеие встроенных прототипов:

				if (!String.prototype.repeat) { // Если такого метода нет
				  // добавляем его в прототип

					  String.prototype.repeat = function(n) {
						    // повторить строку n раз

						    // на самом деле код должен быть немного более сложным
						    // (полный алгоритм можно найти в спецификации)
						    // но даже неполный полифил зачастую достаточно хорош для использования
						    return new Array(n + 1).join(this);
					  };
				}

				console.log( "La".repeat(3) ); // LaLaLa


		// Заимствование метода у прототипа
		
			let obj = {
				  0: "Hello",
				  1: "world!",
				  length: 2,  // Join требует доину массива, поэтому он тут нужен
			};

			obj.join = Array.prototype.join;

			alert( obj.join(',') ); // Hello,world!
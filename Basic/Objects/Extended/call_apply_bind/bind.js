/*

		Bind
				
				При передаче методов объекта в качестве колбэков, например для setTimeout, возникает известная проблема – потеря this.
				Метод bind возвращает «привязанный вариант» функции func, фиксируя контекст this и первые аргументы arg1, arg2…, если они заданы.

				Проблема - потеря "this":

						let user = {
						  firstName: "Вася",
						  sayHi() {
						    alert(`Привет, ${this.firstName}!`);
						  }
						};

						setTimeout(user.sayHi, 1000); // Привет, undefined!

						Объяснение:

								SetTimeout получил функцию sayHi отдельно от объекта user.
								Метод setTimeout в браузере имеет особенность: он устанавливает this=window для вызова функции.
								Таким образом, для this.firstName он пытается получить window.firstName, которого не существует. 
								В других подобных случаях this обычно просто становится undefined.

				
				Решение 1: сделать функцию-обёртку.

						Такой вариант плох тем, что:
						ЕСЛИ произойдет перезапись метода sayHi() у user, 
						ТО вызовется уже перезаписанный метод, а не тот, который мы передали изначально в SetTimeout


				Решение 2: привязать контекст с помощью bind

						В JavaScript у функций есть встроенный метод bind, который позволяет зафиксировать this.
								
								Сокращенный синтакис:
										let boundFunc = func.bind(context);

								Результатом вызова func.bind(context) является особый «экзотический объект» (термин взят из спецификации), 
								который вызывается как функция и прозрачно передаёт вызов в func, при этом устанавливая this=context.

								Другими словами, вызов boundFunc подобен вызову func с фиксированным this.


				Синтаксис:
						
						Чтобы привязать контекст this и начальные аргументы функции:

								let bound = func.bind(context, [arg1], [arg2], ...);


				Частичное применение 

						Частичное применение – когда мы создаём новую функцию, фиксируя некоторые из существующих параметров.
						
						Польза от этого в том, что возможно создать независимую функцию с понятным названием (double, triple).
						Мы можем использовать её и не передавать каждый раз первый аргумент, т.к. он зафиксирован с помощью bind.


*/

		// Пример - привязать контекст к методу:
				let user = {
				  firstName: "Вася",

			    sayHi() {
				    alert(`Привет, ${this.firstName}!`);
				  }
				};

				function func() {
				  alert(this.firstName);
				}

				// Привяжем к сторонней фукнции объект
				let funcUser = func.bind(user);
				funcUser(); // Вася

				// Привяжем к методу объекта сам объект
				// Теперь sayHi – это «связанная» функция, которая может быть вызвана отдельно или передана в setTimeout (контекст всегда будет правильным).
				let sayHi = user.sayHi.bind(user);



		// BindAll

				for (let key in user) 
				{
				  if (typeof user[key] == 'function') {
				    user[key] = user[key].bind(user);
				  }
				}


		// Частичное применение

				function mul(a, b) {
				  return a * b;
				}

				let double = mul.bind(null, 2);
				let triple = mul.bind(null, 3);

				alert( double(3) ); // = mul(2, 3) = 6
				alert( double(4) ); // = mul(2, 4) = 8

				alert( triple(3) ); // = mul(3, 3) = 9
				alert( triple(4) ); // = mul(3, 4) = 12
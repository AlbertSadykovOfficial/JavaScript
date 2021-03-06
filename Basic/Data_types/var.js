/*

		Тип данных var
				
				Всего есть 3 типа переменных:

				    1. let
				    2. const
				    3. var

				Существует 2 основных отличия var от let/const:

				    1. Переменные var не имеют блочной области видимости, они ограничены, как минимум, телом функции.
				    2. Объявления (инициализация) переменных var производится в начале исполнения функции (или скрипта для глобальных переменных).
				       (Это поведение называется «hoisting» (всплытие, поднятие), потому что все объявления переменных var «всплывают» в самый верх функции.)
				
				В браузере глобальные функции и переменные, объявленные с помощью var (не let/const!), становятся свойствами глобального объекта:
		
						var gVar = 5;
						alert(window.gVar); // 5 (становится свойством глобального объекта)

						Пожалуйста, не полагайтесь на это. Такое поведение поддерживается для совместимости. 
						В современных проектах, использующих JavaScript-модули, такого не происходит.


	
				Пример №1, отличия №2:

						function sayHi() {
						  phrase = "Привет";

						  alert(phrase);

						  var phrase; // <--- вот это поднимается автоматически вверх
						}
						sayHi();


						function sayHi() {
						  var phrase; // <--- сююда поднима.тся объявления var.

						  phrase = "Привет";

						  alert(phrase);
						}
						sayHi();

					Пример №2, отличия №2:

							function sayHi() {
							  alert(phrase);

							  var phrase = "Привет";
							}

							function sayHi() {
							  var phrase; // объявление переменной срабатывает вначале...

							  alert(phrase); // undefined

							  phrase = "Привет"; // ...присвоение - в момент, когда исполнится данная строка кода.
							}

*/
/*

		Замыкания

			Замыкание – это функция, которая запоминает свои внешние переменные и может получить к ним доступ.
			В JavaScript, все функции изначально являются замыканиями (есть только одно исключение: в Синтаксис "new Function").

			Функции автоматически запоминают, где были созданы, с помощью скрытого свойства [[Environment]] 
			и все они могут получить доступ к внешним переменным.

			[[Environment]] - скрытое свойство функции со ссылкой на уровень выше.


			Лексическое окружение существует для любых блоков кода {...}, а не только для фукнций.
			Лексическое окружение создаётся при выполнении блока кода и содержит локальные переменные для этого блока.
			У циклов вообще у каждой итерации свое лексическое окружение.
			Объект лексического окружения умирает, когда становится недоступным (как и любой другой объект). 
			Другими словами, он существует только до того момента, пока есть хотя бы одна вложенная функция, которая ссылается на него.

			ИЗОЛЯЦИЯ скриптов друг от друга
					НОВЫЙ ВАИАНТ:
							Если у нас есть несколько разных скриптов от разных авторов, то при их подключении к странице у них общее 
							глобальное окружение. Может произойти такое, что 2 скрипта используют одноименную глоабльну переменную,
							тогда данные могу перемешиваться и программа будет рабоать некорректно. Чтобы избежать этого, можо заключить
							кждый отельный код в свое лексическое окружение, посредством заключения их в скобки:
								{
										let data = [1,2,3];
										function main(){};
										...				
								}
								{
										let data = [2,3,4];
										function main(){};
										...
								}
								console.log(data) // Ошибка, переменной data нет в глобальном окруженииж

					СТАРЫЙ ВАРИАНТ:
							До появелния в JS лексического окружения на уровне блоков пользовались другим приемом изоляции.
							Изоляцией черз Function Expression: Immediately-Invoked Function Expressions (IIFE).
							Суть:
									Создать функцию FE, поместить в нее код вашей библиотеки и немедленно вызвать эту функцию.
									Магия в том, что когда мы помещаем код библиотеки в фукнцию, то наш код помещается уже не
									в глобальное лексическое окружение, а в окружение этой функции
									Пример:
											Код нашей библиотеки:
													let message = "Hello";
													alert(message);
											Вид IIFE:
													(function() { 
														тут будет наш код
													})();
													()->Делает вызов нашей Function Expression

													А так же:
															(function() { })();
															(function() { }());
															!function() { }();
															+function() { }();

											Окончательный вид:
													(function() {
															let message = "Hello";
															alert(message);
													})();

								Для Function Declaration так сделать не получится, так как вызвать ее немедленно нельзя.
								function go() {}();  // -> ОШИБКА


*/
		// Лексическое окружение функции
																	// Глобавльный уровень лексического окружения
				function makeWorker() {		//{ 
				  let name = "Pete";			// 2й уровень лексического окружения
				  												//
				  return function() {			//		{
				    alert(name);					// 			1й уровень лексического окружения
				  };											//		}
				}													// }
				let work = makeWorker();
				let name = "John";
				// Ответ - Pete, потому что лексическое окружение найдет переменную let name на 2 уровне
				// Если бы переменная была бы не let, то вывелось бы John,потому что поиск был бы вышестоящему окружению (Глобальному)
				work();

		// Лексическое окружение блоков кода

				let phrase = 'Hello';

				if (true){
						let user = 'John';

						alert(`${phrase}, ${user}`);	// phrase найдется по ссылке в глобальном окружении.
				} 

				// !! Ошибка, переменная User в лексическом окружении блока if, а не в глобальном окружении
				// Переменной user не существует в глобальном окружении
				alert(user);  // !! Ошибка


		// Сортировка с использованием замыканий:
			let users = [
			  { name: "John", age: 20, surname: "Johnson" },
			  { name: "Pete", age: 18, surname: "Peterson" },
			  { name: "Ann", age: 19, surname: "Hathaway" }
			];

			// Обычнй вариант:
				users.sort((a, b) => a.name > b.name ? 1 : -1);
		
			// Через замыкания.
			function byField(field) {
			  return (a, b) => a[field] > b[field] ? 1 : -1;
			}

			users.sort(byField('name'));
			users.forEach(user => alert(user.name)); // Ann, John, Pete

			users.sort(byField('age'));
			users.forEach(user => alert(user.name)); // Pete, Ann, John
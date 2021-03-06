/*
		
		Деструктуризация

				Деструктуризация позволяет разбивать массив/объект на переменные при присвоении:
					let [width, height, depth=5] = [100, 200];
					let [name, ...other] = ['John', '20 years', 'New-York'] 

					В ...other будут отправлены данные, кототорые не поместились в переменные ДО. 

				Полный синтаксис:

						Объект: let {prop : varName = default, ...rest} = object
						Массив: let [item1 = default, item2, ...rest] = array
						Функция:
								function({
								  incomingProperty: varName = defaultValue
								  ...
								})

						Деструктуризация может быть вложенной.


				Деструктуризация в функциях:

						Есть ситуации, когда функция имеет много параметров, большинство из которых не обязательны.

						Проблема:
						 		Как вызвать функцию, когда большинство параметров передавать не надо, и значения по умолчанию вполне подходят.
						 		Пример:
						 				// undefined там, где подходят значения по умолчанию
										showMenu("My Menu", undefined, undefined, ["Item1", "Item2"])

						Решение:
								Мы можем передать параметры как объект, и функция немедленно деструктурирует его в переменные.

								Суть - передать объект в функцию с парметрами, которые у нас есть,
								а деструктуризация сама разберет, что у нас есть и что выставлять по умолчанию. 


*/

		// Пример простой деструктуризации:
			let options = { title: "Menu", height: 200, width: 100 }
			let {width: w, height: h, title} = options; // w=100, h=200, title='Menu'

		// Или так - заключение в скобки дает понять, что это {} - не блок кода, а деструктуризация. 
				let title, width, height;
				({title, width, height} = options);

		// Пример вложенной деструктуризации
				options = {
				  size: {
				    width: 100,
				    height: 200
				  },
				  items: ["Cake", "Donut"],
				  extra: true
				};

				// деструктуризация разбита на несколько строк для ясности
				let {
				  size: { // положим size сюда
				    width,
				    height
				  },
				  items: [item1, item2], // добавим элементы к items
				  title = "Menu" // отсутствует в объекте (используется значение по умолчанию)
				} = options;

				alert(title);  // Menu
				alert(width);  // 100
				alert(height); // 200
				alert(item1);  // Cake
				alert(item2);  // Donut


		// Пример деструктуризации функицй:

				// Суть - передать объект в функцию с парметрами, которые у нас есть,
				// а деструктуризация сама разберет, что у нас есть и что выставлять по умолчанию. 
				let options = {
				  title: "My menu",
				  width: w = 200,
				  items: ["Item1", "Item2"]
				};

				// ...и она немедленно извлекает свойства в переменные
				// ОТМЕТИМ конструкцию {...} = {}:
				// Она говорит то, что объект по умолчанию - пустой объект
				// Это позволяет нам вызывать функцию даже без пармаметров, чтобы все параметры были по умолчанию:
				// showMenu()
				// Без такой конструкции мы будем обязаны использовать:
				// showMenu({})
				function showMenu({title = "Untitled", width = 200, height = 100, items = []} = {}) {
				  // title, width, items – взято из options,
				  // height – используются значения по умолчанию
				  alert( `${title} ${width} ${height}` ); // My Menu 200 100
				  alert( items ); // Item1, Item2
				}

				showMenu(options);
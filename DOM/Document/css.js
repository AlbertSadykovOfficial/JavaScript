/*

		Работа со стилями

			
			Виды значений свойств:
				Вычисленное (относительное) - Проценты и em: (height:1em или font-size:125%.) 
				Окончательные - Переведенные в пиксельный формат.

			Установть css свйосва все и сразу:

					elem.style.cssText - записать несколько стилей сразу, а не по одному. 
					
					Пример:
					elem.style.cssText = `color: red; text-decoration: none; text-align: center;` 
					или
					setAttribute('style','color: red; text-decoration: none; text-align: center;').


			Получить все свойства объекта и их значания:

					Как известно, значение стилей объекта мы не можем получить через прямое обращение:

							let marginL = elem.style.marginLeft; // ''

					Для решения данной проблемы подойдет функция getComputedStyle, 
					которая возвращает ОКОНЧАТЕЛЬНОЕ значение свойства,
					при этом свйоство должно быть точным (не margin, а MarginLeft)

							getComputedStyle(element, [pseudo])
									element - Элемент, значения для которого нужно получить
									pseudo - Указывается, если нужен стиль псевдоэлемента, например ::before. Пустая строка или отсутствие аргумента означают сам элемент.

							Пример:

									let computedStyle = getComputedStyle(document.body);
									console.log(computedStyle.marginTop)



*/
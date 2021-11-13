/*

		Экран

			Размеры:

					Получить Ширину/высоту видимой части документа (ширина/высота области содержимого):

							document.documentElement.clientWidth/Height
					
					Получить Ширину/высоту всего документа с прокрученной частью (почему фукнция такая большая - обусловлено исторически):

							let scrollHeight = Math.max(
								  document.body.scrollHeight, document.documentElement.scrollHeight,
								  document.body.offsetHeight, document.documentElement.offsetHeight,
								  document.body.clientHeight, document.documentElement.clientHeight
								);


				Прокрутка:

						Получить прокрутку:
								
								window.pageYOffset/pageXOffset.

						Изменить текущую прокрутку:

								window.scrollTo(pageX,pageY) – абсолютные координаты,
								window.scrollBy(x,y) – прокрутка относительно текущего места,
								elem.scrollIntoView(top) – прокрутить страницу так, чтобы сделать elem видимым (выровнять относительно верхней/нижней части окн)


				Цветопередача:

						screen.colorDepth

*/
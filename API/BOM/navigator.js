/*

		Navigtor

				
				navigator.appName - Имя браузера как приложения (Netscape)
				navigator.appCodeName - Кодовое имя браузера (Mozila)
				navigator.product - Движок (Gecko)
				navigator.appVersion - Версия (5.0 (Windows))
				navigator.userAgent - Пгент (Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0)
				navigator.platform - платформа (win32)
				navigator.language - Язык (ru-RU)
				navigator.onLine - Браузер подлючен к сети - Интернет?
				navigator.javaEnabled() - Java влкючнен? (Когда-то на Java возагалось будущее интрнета, поэтому есть такая проверка).

				Информация из объекта navigator может вводить в заблуждение. Ее не следует использовать для определения версии браузера, так как:

		    разные браузеры могут использовать одно и то же имя
		    данные объекта navigator могут изменяться владельцем браузера
		    некоторые браузеры дают неверные идентификаторы о себе, чтобы обходить проверку сайтов
		    браузеры не могут сообщать о новых операционных системах, вышедших после самих браузеров

*/
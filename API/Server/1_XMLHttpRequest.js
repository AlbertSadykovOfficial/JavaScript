/*

		XMLHttpRequest

				1. Инициалиация:

						let xhr = new XMLHttpRequest(); 

				2. Параметры инициализации запроса:

						xhr.open(method, URL, [async, user, password])

						    method 				 – HTTP-метод. Обычно это "GET" или "POST".
						    URL 	 				 – URL, куда отправляется запрос: строка, может быть и объект URL.
						    async  				 – если указать false, тогда запрос будет выполнен синхронно, это мы рассмотрим чуть позже.
						    user, password – логин и пароль для базовой HTTP-авторизации (если требуется).

				3. Установка заголовков 

						Заголокви можно установить, но нельзя удалиь

						Установить:

								setRequestHeader(name, value)

						Получить:

								getResponseHeader(name)
								getAllResponseHeaders()

				4. Послать запрос
						
						xhr.send([body])

						Отменить:
								xhr.abort();

						Прогресс отправки:

						    loadstart – начало загрузки данных.
						    progress – генерируется периодически во время отправки на сервер.
						    abort – загрузка прервана.
						    error – ошибка, не связанная с HTTP.
						    load – загрузка успешно завершена.
						    timeout – вышло время, отведённое на загрузку (при установленном свойстве timeout).
						    loadend – загрузка завершена, вне зависимости от того, как – успешно или нет.
						
						Можно создать объект FormData и отправить его через метод send.
						

				5. События при получении ответа

						Сколько ждать ответ:
								xhr.timeout = 10000; // таймаут указывается в миллисекундах, т.е. 10 секунд

						Три наиболее используемых события:

						    load – происходит, когда получен какой-либо ответ, включая ответы с HTTP-ошибкой, например 404.
						    error – когда запрос не может быть выполнен, например, нет соединения или невалидный URL.
						    progress – происходит периодически во время загрузки ответа, сообщает о прогрессе.


*/

function request()
{
		// 1. Создаём новый XMLHttpRequest-объект
		let xhr = new XMLHttpRequest();

		// 2. Настраиваем его: GET-запрос по URL /article/.../load
		xhr.open('GET', '/article/xmlhttprequest/example/load');

		// 3. Отсылаем запрос
		xhr.send();

		// 4. Этот код сработает после того, как мы получим ответ сервера
		xhr.onload = function() {
			  if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
			    	alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
			  } else { // если всё прошло гладко, выводим результат
			    	alert(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
			  }
		};

		xhr.onprogress = function(event) {
			  if (event.lengthComputable) {
			    	alert(`Получено ${event.loaded} из ${event.total} байт`);
			  } else {
			   		alert(`Получено ${event.loaded} байт`); // если в ответе нет заголовка Content-Length
			  }

		};

		xhr.onerror = function() {
		  	alert("Запрос не удался");
		};
}


// Предполагается, что если два заголовка имеют одинаковое имя, то последний перезаписывает предыдущий
function parse_headers()
{
		let headers = xhr
	  .getAllResponseHeaders()
	  .split('\r\n')
	  .reduce((result, current) => {
	    let [name, value] = current.split(': ');
	    result[name] = value;
	    return result;
	  }, {});

	  console.log(headers);
}
/*
		Fetch

			1. Запрос:

				1.1 Инициалиация, ее параметры:

							let promise = fetch(url, [options])

							    url – URL для отправки запроса.
							    options – дополнительные параметры: метод, заголовки и так далее.
							
							Важное замечание:
									(*)  Во-первых, promise выполняется с объектом встроенного класса Response в качестве результата, как только сервер пришлёт заголовки ответа.
									(**) Во-вторых, для получения тела ответа нам нужно использовать дополнительный вызов метода.

				1.2 Отправка запроса

						Типичный запрос с помощью fetch состоит из двух операторов await:

							let response 	= await fetch(url, options); // завершается с заголовками ответа (*)
							let result 		= await response.json(); // читать тело ответа в формате JSON 	 (**)
					
						Или без await на promise:

								fetch(url, options)
									  .then(response => response.json())
									  .then(result => обрабатываем результат )
			

			2. Установка заголовков:
					
					let response = fetch(protectedUrl, {
						  headers: {
						    	Authentication: 'secret'
						  }
					});

					Есть список запрещённых HTTP-заголовков, которые мы не можем установить:


			3. Ответ:				

					Параметры ответа:

					    response.status – HTTP-код ответа,
					    response.ok – true, если статус ответа в диапазоне 200-299.
					    response.headers – похожий на Map объект с HTTP-заголовками.

					Методы для получения тела ответа:

					    response.text() – возвращает ответ как обычный текст,
					    response.json() – преобразовывает ответ в JSON-объект,
					    response.formData() – возвращает ответ как объект FormData (кодировка form/multipart, см. следующую главу),
					    response.blob() – возвращает объект как Blob (бинарные данные с типом),
					    response.arrayBuffer() – возвращает ответ как ArrayBuffer (низкоуровневые бинарные данные),


*/


function parse_headers()
{
		let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

		// получить один заголовок
		console.log(response.headers.get('Content-Type')); // application/json; charset=utf-8

		// перебрать все заголовки
		for (let [key, value] of response.headers) 
		{
				console.log(`${key} = ${value}`);
		}
}


// Мы можем отправить бинарные данные при помощи fetch, используя объекты Blob или BufferSource.
function send_image()
{
		canvasElem.onmousemove = function(e) {
      let ctx = canvasElem.getContext('2d');
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    };

    async function submit() {
      let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
      let response = await fetch('/article/fetch/post/image', {
        method: 'POST',
        body: blob
      });

      // сервер ответит подтверждением и размером изображения
      let result = await response.json();
      alert(result.message);
    }
}
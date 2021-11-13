/*

		FormData

				Если передать в конструктор элемент HTML-формы form, то создаваемый объект автоматически прочитает из неё поля.
				Его особенность заключается в том, что методы для работы с сетью, например fetch, позволяют указать объект FormData в свойстве тела запроса body.
				Он будет соответствующим образом закодирован и отправлен с заголовком Content-Type: form/multipart.
				То есть, для сервера это выглядит как обычная отправка формы.

				Объекты FormData используются, чтобы взять данные из HTML-формы и отправить их с помощью fetch или другого метода для работы с сетью.
				Мы можем создать такой объект уже с данными, передав в конструктор HTML-форму – new FormData(form), 
				или же можно создать объект вообще без формы и затем добавить к нему поля с помощью методов.

				Методы объекта FormData:
						ormData.append(name, value) – добавляет к объекту поле с именем name и значением value,
						formData.append(name, blob, fileName) – добавляет поле, как будто в форме имеется элемент <input type="file">, третий аргумент fileName устанавливает имя файла (не имя поля формы), как будто это имя из файловой системы пользователя,
						formData.delete(name) – удаляет поле с заданным именем name,
						formData.get(name) – получает значение поля с именем name,
						formData.has(name) – если существует поле с именем name, то возвращает true, иначе false

						Методы, альтернативные append, но которые удаляют все значения с name перед вставкой.
				    formData.set(name, value),
				    formData.set(name, blob, fileName).


*/

// Пример - отправка формы с Blob-данными:

<body style="margin:0">
  <canvas id="canvasElem" width="100" height="80" style="border:1px solid"><canvas>

  <input type="button" value="Отправить" onclick="submit()">

  <script>
    canvasElem.onmousemove = function(e) {
      let ctx = canvasElem.getContext('2d');
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    };

    async function submit() {
      let imageBlob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));

      let formData = new FormData();
      formData.append("firstName", "John");
      formData.append("image", imageBlob, "image.png");

      let response = await fetch('/article/formdata/post/image-form', {
        method: 'POST',
        body: formData
      });
      let result = await response.json();
      alert(result.message);
    }

  </script>
</body>
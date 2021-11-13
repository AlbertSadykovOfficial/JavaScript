/*

		Callback-функции

				Многие функции в JS асинхронны, при вызове одной функции, она может не выполниться до конца,
				и вызывается следующая, не дожидаясь окончания. (Пример 1)
				Скрипт загружается, а потом выполняется. Но нам нужно точно знать, когда это произойдёт, 
				чтобы использовать функции и переменные из этого скрипта.

				Для решения этой проблемы есть callback-функции. 
						Такие функции помогут добавить упорядоченности в асинхронность, но из-за своей вложенности 
						при большом количестве породят проблемы с нечитаемостью кода (Адская пирамида колбэков).

						При этом при нескольких функциях (1-2), это вполне рабочий вариант.
						Для большого кол-ва вызовов используются Промисы (Promise)

*/


// Пример 1 - Проблемы при подгрузкмскрипта
// Функция loadScript выполнится,
// но скрипт подгрузится чуть позже.
		function loadScript(src) {
		  let script = document.createElement('script');
		  script.src = src;
		  document.head.append(script);
		}

		// загрузит и выполнит скрипт
		loadScript('/my/script.js');
		// код, написанный после вызова функции loadScript,
		// не будет дожидаться полной загрузки скрипта
		// ...
		newFunction_from_script(); // такой функции не существует!


// Callback - функции как решение упорядоченности
		function loadScript(src, callback) {
		  let script = document.createElement('script');
		  script.src = src;
		  
		  // Обработчик ошибок «error-first callback»
			script.onload = () => callback(null, script);
		  script.onerror = () => callback(new Error(`Не удалось загрузить скрипт ${src}`));

		  document.head.append(script);
		}

		// Адская пирамида колбэков
    // Мы загружаем 1.js. Продолжаем, если нет ошибок.
    // Мы загружаем 2.js. Продолжаем, если нет ошибок.
    // Мы загружаем 3.js. Продолжаем, если нет ошибок. И так далее (*).
		loadScript('1.js', function(error, script) {

		  if (error) {
		    handleError(error);
		  } else {
		    // ...
		    loadScript('2.js', function(error, script) {
		      if (error) {
		        handleError(error);
		      } else {
		        // ...
		        loadScript('3.js', function(error, script) {
		          if (error) {
		            handleError(error);
		          } else {
		            // ...и так далее, пока все скрипты не будут загружены (*)
		          }
		        });

		      }
		    })
		  }
		});


		// РАЗРЕШЕНИЕ проблемы адской пирамида колбэков
		// Код делает всё то же самое, но вложенность отсутствует, 
		// потому что все действия вынесены в отдельные функции.
		loadScript('1.js', step1);

		function step1(error, script) {
		  if (error) {
		    handleError(error);
		  } else {
		    // ...
		    loadScript('2.js', step2);
		  }
		}

		function step2(error, script) {
		  if (error) {
		    handleError(error);
		  } else {
		    // ...
		    loadScript('3.js', step3);
		  }
		}

		function step3(error, script) {
		  if (error) {
		    handleError(error);
		  } else {
		    // ...и так далее, пока все скрипты не будут загружены (*)
		  }
		};
/*
		
		Promise

				Проблема:
						Нам надо выполнить асинхронный запрос и по его завершении выполнить что-то.
						Можно использовать callback, но они порождают Адскую пирамиду колбэков.
						Так же callback предполагает заранее указывать функцию, котороую мы будем
						выполнять и она может быть только одна.
						Поэтому нужен другой механизм, который будет более локаничен и функционален.

						Такой механим - Promise.

				Суть:
						Суть Promise просто сделать более удобочитаемый callback
						Вместо пирамиды вложенности, которая растет вправо,
						он предоставлет цепочку, которая растет вниз,
						что удобнее читать и легче поддерживать. 

						Если обработчик в .then (или в catch/finally, без разницы) возвращает промис, 
						последующие элементы цепочки ждут, пока этот промис выполнится. 
						Когда это происходит, результат его выполнения (или ошибка) передаётся дальше.


				Особенности:

						Результат promise.then возвращает объект Promise, поэтому мы можем снова вызывать then:
								promise.then().then().then()

						Добавить несколько обработчиков к одному promise:
								promise.then()
								promise.then()

						Thenable
								Thenable-объекты - объекты, которые содержат метод .then (promise-совместимые объекты).
								Любой Thenable-объект будет обработан как Promise, если его вернуть.

								class Thenable {
										name = 'Thenable-object'

										then(resolve, reject) {
											resolve(2*2);
										}
								}


				Сравнение callback и promise:

						callback:

								loadScript('1.js', function(error, script) 
								{
								  if (error) { handleError(error); } 
								  else 
								  { 
								  		loadScript('2.js', function(error, script) 
								  		{
									      if (error) { handleError(error); } 
									      else 
									      {
									        	loadScript('3.js', function(error, script) {
										          if (error) { handleError(error); } 
										          else 
										          {
										            	one();
															    two();
															    three();
										          }
										        	});

									      }
									    })
								  }
								});


							promise:

									loadScript("/article/promise-chaining/one.js")
										  .then(script => loadScript("/article/promise-chaining/two.js"))
										  .then(script => loadScript("/article/promise-chaining/three.js"))
										  .then(script => {
										    // скрипты загружены, мы можем использовать объявленные в них функции
										    one();
										    two();
										    three();
									  });

						Промисы позволяют улучшить порядок кода и дают нам гибкость.


*/


function loadScript(src) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Ошибка загрузки скрипта ${src}`));

    document.head.append(script);
  });
}

let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

promise.then(
	  script => alert(`${script.src} загружен!`),
	  error => alert(`Ошибка: ${error.message}`)
);

promise.then(script => alert('Ещё один обработчик...'));
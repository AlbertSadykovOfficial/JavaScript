/*

		Promise API

				В класе Promise есть 5 статических методов:

						1) Promise.all(promises) – ожидает выполнения всех промисов и возвращает массив с результатами. 
						2) Promise.allSettled(promises) – ждёт, пока все промисы завершатся и возвращает их результаты в виде массива с объектами: 	
						3) Promise.race(promises) – ожидает первый выполненный промис, который становится его результатом, остальные игнорируются.
						4) Promise.resolve(value) – возвращает успешно выполнившийся промис с результатом value.
						5) Promise.reject(error) – возвращает промис с ошибкой error.
				

				Promise.all (Самый часто используемый)

						Допустим, нам нужно запустить множество промисов параллельно и дождаться, пока все они выполнятся.
						Например, параллельно загрузить несколько файлов и обработать результат, когда он готов.

						Синтаксис:
								
								let promise = Promise.all([...промисы...]);

								Если любой из промисов завершится с ошибкой, то промис, возвращённый Promise.all, немедленно завершается с этой ошибкой.

				
				Promise.allSettled

						Например, мы хотели бы загрузить информацию о множестве пользователей. 
						Даже если в каком-то запросе ошибка, нас всё равно интересуют остальные.


				Promise.race

						Метод очень похож на Promise.all, но ждёт только первый промис, из которого берёт результат (или ошибку).


				Promise.resolve/reject

						Этот метод используют для совместимости: когда ожидается, что функция возвратит именно промис.
						Методы Promise.resolve и Promise.reject редко используются в современном коде, так как ЕСТЬ async/await.

						Promise.reject(error) создаёт промис, завершённый с ошибкой error.То же самое, что:

								let promise = new Promise((resolve, reject) => reject(error));



*/

// Promise.all

		Promise.all([
		  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
		  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
		  new Promise(resolve => setTimeout(() => resolve(3), 1000)),  // 3
		  4,
		  5
		]).then(alert); // когда все промисы выполнятся, результат будет 1,2,3,4,5
		// каждый промис даёт элемент массива


// Promise.allSettled
		let urls = [
		  'https://api.github.com/users/iliakan',
		  'https://api.github.com/users/remy',
		  'https://no-such-url'
		];

		Promise.allSettled(urls.map(url => fetch(url)))
		  .then(results => { // (*)
		    results.forEach((result, num) => {
		      if (result.status == "fulfilled") {
		        alert(`${urls[num]}: ${result.value.status}`);
		      }
		      if (result.status == "rejected") {
		        alert(`${urls[num]}: ${result.reason}`);
		      }
		    });
		  });

		 /*
				Результат

				[
				  {status: 'fulfilled', value: ...объект ответа...},
				  {status: 'fulfilled', value: ...объект ответа...},
				  {status: 'rejected', reason: ...объект ошибки...}
				]
		 */

/*
		Promise.resolve

		Мы можем писать loadCached(url).then(…), потому что функция loadCached всегда возвращает промис. 
		Мы всегда можем использовать .then после loadCached. Это и есть цель использования Promise.resolve в строке (*).
*/
		let cache = new Map();

		function loadCached(url) {
		  if (cache.has(url)) {
		    return Promise.resolve(cache.get(url)); // (*)
		  }

		  return fetch(url)
		    .then(response => response.text())
		    .then(text => {
		      cache.set(url,text);
		      return text;
		    });
		}
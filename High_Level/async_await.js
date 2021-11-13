/*

		Async/await

				Async/await - современная замена Promise, которая более интуитивная и логична в использовании,
											внутри функции async последовательность асинхронных действий достигается через await,
											вынуждающий ждать завершения работы, не переходя на следующую стрроку. 
											Работает со всеми Thenable-объектами.

				Ключевое слово async перед объявлением функции:
				    Обязывает её всегда возвращать промис.
				    Позволяет использовать await в теле этой функции.

			 	Ключевое слово await перед промисом заставит JavaScript дождаться его выполнения, после чего:
				    Если промис завершается с ошибкой, будет сгенерировано исключение, как если бы на этом месте находилось throw.
				    Иначе вернётся результат промиса.

				Promise.all

						Await Promise-совместим, поэтому Promise.all работает мы можем дожидаться несколько промисов одновременно.

*/

		async function f() {

		  try {
				  // запрашиваем JSON с данными пользователя
				  let response = await fetch('/article/promise-chaining/user.json');
				  let user = await response.json();

		      // запрашиваем информацию об этом пользователе из github
				  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
				  let githubUser = await githubResponse.json();

		  } catch(err) {
		    // перехватит любую ошибку в блоке try: и в fetch, и в response.json
		    alert(err);
		  }
		}

		f();


		// Async/await работает со всеми Thenable-объектами
		class Thenable {
		  constructor(num) {
		    this.num = num;
		  }
		  then(resolve, reject) {
		    alert(resolve);
		    // выполнить resolve со значением this.num * 2 через 1000мс
		    setTimeout(() => resolve(this.num * 2), 1000); // (*)
		  }
		};

		async function f() {
		  // код будет ждать 1 секунду,
		  // после чего значение result станет равным 2
		  let result = await new Thenable(1);
		  alert(result);
		}

		f();
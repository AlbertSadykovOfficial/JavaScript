/*
		
		Промисификация

			Допустим, у нас есть функция на callback'aх (из какой-нибудь библиотеки).
			Мы пишем все приложение на Promise и нужно бы, чтобы все было унифицировано
			и эта callback работала через Promise.

			Мы можем написать конструктор, который делает из callback-фкнции, Promise-функцию.

			Промисификация – это отличный подход, особенно, если вы будете использовать async/await , 
			но она не является тотальной заменой любых колбэков.
			
			Помните, промис может иметь только один результат, 
			НО колбэк технически может вызываться сколько угодно раз.
			
			Поэтому промисификация используется для функций, которые вызывают колбэк только один раз. 
			Последующие вызовы колбэка будут проигнорированы.



*/

// Принцип промисификации:
let loadScriptPromise = function(src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err)
      else resolve(script);
    });
  })
}

// использование:
loadScriptPromise('path/script.js').then(...)


// Конструктор - промисификатор  
// promisify(f, true), чтобы получить массив результатов
// Если исходная f ожидает колбэк с большим количеством аргументов callback(err, res1, res2, ...)

function promisify(f, manyArgs = false) 
{
		// Вернуть функцию, которая работает через Promise.
	  return function (...args) 
	  {
	  		// Эта фукнция, конечно, возвращает Promise
		    return new Promise((resolve, reject) => 
		    {
			      // наш специальный колбэк для f
			      function callback(err, ...results) 
			      {
				        if (err) 
				        {
				          return reject(err);
				        } 
				        else 
				        {
				          // делаем resolve для всех results колбэка, если задано manyArgs
				          resolve(manyArgs ? results : results[0]);
				        }
			      }
			      args.push(callback); 		// добавляем колбэк в конец аргументов f
			      f.call(this, ...args);  // вызываем оригинальную функцию
		    });
		};
};

// использование:
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...)
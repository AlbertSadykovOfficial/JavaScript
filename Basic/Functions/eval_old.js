/*

		eval
				
				Лучше использовать new Function

				Стинтаксис

						let result = eval(code);

				Вызов eval(code) выполняет строку кода и возвращает результат последней инструкции.

				    Это редко используется в современном JavaScript, так как в этом обычно нет необходимости.
				    Возможен доступ к внешним локальным переменным. Это считается плохой практикой.
				    Чтобы выполнить строку кода с помощью eval в глобальной области видимости, используйте window.eval(code).
				    Или же, если ваш код нуждается в каких-то данных из внешней области видимости, то используйте new Function, 
				    передав эти данные в качестве аргументов.

				Особенности при минимизации:

						Функции с eval не сжимаются, локальные переменные не переписываются в болееминималистичный вид

*/

let value = eval('let i = 0; ++i');
alert(value); // 1

/*
		Доступ eval к внешним переменным
*/
let x = 1;
{
  let x = 5;
  window.eval('alert(x)'); // 1 (глобальная переменная)
}
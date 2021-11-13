/*
		
		Named Function Expression (Именованное функциональное выражение)

				(Работает во всех браузерах, при этом в IE > 9 версии)

				Имя функционального выражения (sayHi) имеет особый смысл. 
				Оно доступно только изнутри самой функции (f), но не доступно снаружи.

				Зачем:
					К примеру:
						f = function(n) { return n ? n * f(n - 1) : 1; };
						g = f;
						f = null;

					В таком случае, после f=null функция g не будет рабоать, потому что
					она зависит от f, так как в самой функции есть вызов: f(n-1), которой уже нет.

					Проблема: как же тогда организовывать рекурсии?? 
					Ответ: использовать NFE

					К примеру: 
						f = function factorial(n) { return n ? n * factorial(n - 1) : 1; };
						g = f;
						f = null;
						console.log(g(5));

					В таком случае, даже после f=null функция g будет исправно работать,
					потому что она больше не зависит от f.

*/

// Обычное функциональное выражение
var f = function(...) { /* тело функции */ };

//  Именованное функциональное выражение
var f = function sayHi(...) { /* тело функции */ };
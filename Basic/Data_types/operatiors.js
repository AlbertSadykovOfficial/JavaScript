/*

		Оператор ||:
			
			Оператор или возвращает первое отличное от false (а так же от 0, '', undefined, null) значение.

		Оператор ??:

			Оператор объединения с null ?? — это быстрый способ выбрать первое «определённое» значение из списка.
			Используется для присвоения переменным значений по умолчанию.
			Оператор ?? имеет очень низкий приоритет, лишь немного выше, чем у ? и =, поэтому при использовании его в выражении, скорее всего, потребуются скобки.
			Запрещено использовать вместе с || или && без явно указанных круглых скобок.



		Важное различие между ними заключается в том, что:

		    || возвращает первое истинное значение.
		    ?? возвращает первое определённое значение.

		    Проще говоря, оператор || не различает false, 0, пустую строку "" и null/undefined. Для него они все одинаковые, т.е. являются ложными значениями. 
		    Если первым аргументом для оператора || будет любое из перечисленных значений, то в качестве результата мы получим второй аргумент.
*/

// будет height=100, если переменная height равна null или undefined
height = height ?? 100;


let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
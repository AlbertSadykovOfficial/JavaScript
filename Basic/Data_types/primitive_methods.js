/*
		
		Методы примитивов


				Примитив как объект:
				   1. Примитивы остаются примитивами. Одно значение, как и хотелось.
				   2. Язык позволяет осуществлять доступ к методам и свойствам строк, чисел, булевых значений и символов.
				   3. Чтобы это работало, при таком доступе создаётся специальный «объект-обёртка», который предоставляет нужную функциональность, а после удаляется.

						Пример:
								let str = "Привет";
								alert( str.toUpperCase() ); // ПРИВЕТ
						
						Вот, что на самом деле происходит в str.toUpperCase():
						    1) Строка str – примитив. В момент обращения к его свойству, создаётся специальный объект, 
						    который знает значение строки и имеет такие полезные методы, как toUpperCase().
						    2) Этот метод запускается и возвращает новую строку (показывается в alert).
						    3) Специальный объект удаляется, оставляя только примитив str.



*/
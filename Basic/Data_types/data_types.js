/*

		Типы данных JS.

			Узнать тип данныз можно функцией typeof:
				typeof(x)
				typeof x

				typeof(null) // object - это ошибка языка.
*/

/*

		BigInt 
		
			! Все операции с числами типа bigint возвращают bigint
			(253-1) (т. е. 9007199254740991), или меньше, чем -(253-1)
			Тип данных для очень больших чисел, чтобы создать такое число, нужно приписать (n) в конце числа:

				const bigInt = 1234567890123456789012345678901234567890n;
				const sameBigint = BigInt("1234567890123456789012345678901234567890");
				
				const bigintFromNumber = BigInt(10); // то же самое, что и 10n


			Нельзя смешивать с обычными числами, требуется конвертация.
					let bigint = 1n;
					let number = 2;

					// конвертируем number в bigint
					alert(bigint + BigInt(number)); // 3

					// конвертируем `bigint` в number
					alert(Number(bigint) + number); // 3

		
*/

/*

		Строки

			В строки можо встраивать другие строки, используя обрачные кавычки:
			
			let str = 'Hello'.
			let phrase = `Обратные кавычки позволяют встраивать переменные ${str}`;
*/

/*
		Null и undefined

			Null - пустота (а не нулевой указатель как в других языках)
			undefined - 'значение не было присвоено':
				Пример:
					 let value;
					 console.log(value); undefined;
*/

/*
		Объекты и Symbol

			Объекты ассмотрены в отдельном файле (Objects.js)
			Symbol используется для создания уникальных идентификаторов объекта.
*/
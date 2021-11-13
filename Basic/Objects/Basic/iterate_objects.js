/*
		
		Перебор объектов
				
				Основные функции

				    Object.keys(obj) – возвращает массив ключей.
				    Object.values(obj) – возвращает массив значений.
				    Object.entries(obj) – возвращает массив пар [ключ, значение].

			
				Трансформация в объект из массива:

						Object.fromEntries(array)

						Порядок действий:
								1) Делаем из объекта массив (Object.entries)
								2) Работаем с каждым его элементом через (map)
								3) Упаковываем массив обратно в объект (Object.fromEntries)
*/

/*
		Пример - увеличить в 2 раза каждое значение 
*/
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

let doublePrices = Object.fromEntries(
  // преобразовать в массив, затем map, затем fromEntries обратно объект
  Object.entries(prices).map(([key, value]) => [key, value * 2])
);

alert(doublePrices.meat); // 8
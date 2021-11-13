/*

		Получение элементов DOM

				Самые верхние элементы дерева доступны как свойства объекта document:

				<html> = document.documentElement
				<body> = document.body
				<head> = document.head

				Нельзя получить доступ к элементу, которого ещё не существует в момент выполнения скрипта.
				В частности, если скрипт находится в <head>, document.body в нём недоступен, потому что браузер его ещё не прочитал. 
				<head>
					<script> console.log(document.body) </script>
				</head>
				<body></body>

*/

/*
		Дети: childNodes, firstChild, lastChild

			childNodes - все дочерние элементы в виде КОЛЛЕКЦИИ (не массив)
			firstChild - первый дочерний элемент
			lastChild - последний дочерний элеент

			hasChildNodes() - проверка на существование элемента.

			elem.childNodes[0] === elem.firstChild
			elem.childNodes[elem.childNodes.length - 1] === elem.lastChild

			Так как childNodes - Коллекция, методы массивов рабоать не будут ( к примеру: filter )

*/

		// Перебор коллекции через (for ... of)
		// Не надо использовать for ... in, он перебирает свойства объекта 
		for (let node of document.body.childNodes) 
		{
			  console.log(node); // покажет все узлы из коллекции
		}

		// Преобразовании коллекции в массив:
			Array.from(document.body.childNodes)

/*
		Соседи и родитель.

			Родитель - элемент на уровень вложенности выше
			Сосед - элемент на том же уровне вложенности, что и сам объект

			Доступ:
				Пусть elem - body 
				elem.parentNode - любой родитель (в это случае ничего особенного - html)
				elem.parentElement - Родитель элемента (html)
				elem.nextSibling - следующий сосед  (footer)
				elem.previousSibling  - предыдущий сосед (head)

			Разница parentNode и parentElement
				Разницы почти нет, но, к примеру, если взять рожителя у html, то
						document.documentElement.parentNode     // document
						document.documentElement.parentElement  // null, т.к document - не узел-элемент
				Зачем:
					Это может быть полезно при проходе от какого-то элемента вверх до <html>, но не до document:

*/
		// идти наверх до <html>
		while(elem = elem.parentElement) 
		{ 
		  console.log( elem );
		}

/*
		Таблицы

			Некоторые типы DOM-элементов предоставляют для удобства дополнительные свойства, специфичные для их типа.
			
			Элемент <table>, в дополнение к свойствам, о которых речь шла выше, поддерживает следующие:

			    table.rows – коллекция строк <tr> таблицы.
			    table.caption/tHead/tFoot – ссылки на элементы таблицы <caption>, <thead>, <tfoot>.
			    table.tBodies – коллекция элементов таблицы <tbody> (по спецификации их может быть больше одного).


			<thead>, <tfoot>, <tbody> предоставляют свойство rows:

    			tbody.rows – коллекция строк <tr> секции.

			<tr>:

			    tr.cells – коллекция <td> и <th> ячеек, находящихся внутри строки <tr>.
			    tr.sectionRowIndex – номер строки <tr> в текущей секции <thead>/<tbody>/<tfoot>.
			    tr.rowIndex – номер строки <tr> в таблице (включая все строки таблицы).


			<td> and <th>:

			    td.cellIndex – номер ячейки в строке <tr>.

*/
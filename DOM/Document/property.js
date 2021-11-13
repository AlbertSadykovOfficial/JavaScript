/*

		Документ

				Чтобы узнать подробности об элементе и его свойсвах, можно ввести:

						console.dir(elem)

				Узнать к какому классу относится элемент:

						elem.constructor.name
						elem.nodeType
						elem.nodeName
				

				Свойства элементов:

						elem.innerHTML - вернуть/перезаписать содрежимое внутри элемента elem
						elem.outerHTML - вернуть/перезаписать элемент elem, НО при перезаписи, 
														 мы будем иметь дело не с новым объектом, а с тем, 
														 который мы перезаписали. (Не живая коллекция).
														 Пример:
																<div class='target'></div>
																<script>
																		x = document.getElementsByClassName('target')[0];
																		x.outerHTML = <p>Првиет</p>				// В DOM элемент div заменится на p
																		x.outerHTML; 											// НО переменная сохранит <div class='target'></div>
																</script>

				Свойства других типов (текста, комментариев...):
					
						elem.data - получает содержиомое
						elem.nodeValue -- получает содержимое

				Другие свойства:
		
						elem.textContent - получить весь текстовый контент без тегов.

								Свойство textContent поможет безопасно включать данные, даже если они сожержат теги 
								(предотвращение HTML-инъекции):

									user_input = <b>Hello</p>;
									elem.textContent = user_input;   

*/
/*
			
			Введение

			Стандарт DOM Events описывает 3 фазы прохода события:

			    Фаза погружения (перeхвата) (capturing phase) – событие сначала идёт сверху вниз до целевого элемента (обычно не используется)
			    Фаза цели (target phase) – событие достигло целевого(исходного) элемента.
			    Фаза всплытия (bubbling stage) – событие начинает всплывать (обычно используется она с файзой цели)


			    Каждый обработчик имеет доступ к свойствам события event:
			    
					    event.target – самый глубокий элемент, на котором произошло событие.
					    event.currentTarget (=this) – элемент, на котором в данный момент сработал обработчик (тот, на котором «висит» конкретный обработчик)
					    event.eventPhase – на какой фазе он сработал (погружение=1, фаза цели=2, всплытие=3).


			Остановка фазы всплытия:

					Всплытие идёт с «целевого» элемента прямо наверх. По умолчанию событие будет всплывать до элемента <html>, а затем до объекта document, а иногда даже до window, 
					вызывая все обработчики на своём пути. 
					НО любой промежуточный обработчик может решить, что событие полностью обработано, и остановить всплытие:

							event.stopPropagation() - Остановить продвижение наверх (вызвав все обработчиики этого уровня)
							event.stopImmediatePropagation() - Остановить все следующие обработчики (включая и обработчии этого уровня)

					Пример:
							<body onclick="alert(`сюда всплытие не дойдёт`)">
							  	<button onclick="event.stopPropagation()">Кликни меня</button>
							</body>

					Всплытие – это удобно. Не прекращайте его без явной нужды, очевидной и архитектурно прозрачной. 
					Зачастую прекращение всплытия через event.stopPropagation() имеет свои подводные камни, которые со временем могут стать проблемами.
					Так, если мы ведем общий подсчет нажатий на странице, то назанчим событие click на body, а если мы будем вызывать метод остановки
					всплытия на какой-нибдь элемент, то при нажатии на этот элемент подсчет произведен не будет.  

			
			Способы назначения обработки обытий

			    1) Атрибут HTML: onclick="...". 
			    2) DOM-свойство: elem.onclick = function. // Именно fucntion, а не function(). Т.к мы присваиваем фукнцию, а не ее результат.
			    3) Специальные методы: 
			    		3.1) addEventListener (event, handler[, phase]) для добавления, 
			    		3.2) removeEventListener (event, handler[, phase]) для удаления.
					
					Что вабрать?
					   	1. HTML-атрибуты используются редко потому, что JavaScript в HTML-теге выглядит немного странно. К тому же много кода там не напишешь.
							2. DOM-свойства вполне можно использовать, но мы не можем назначить больше одного обработчика на один тип события.
							3. Последний способ самый гибкий, однако нужно писать больше всего кода. Есть несколько типов событий, которые работают только через него, 
								к примеру transitionend и DOMContentLoaded. 
								Также addEventListener поддерживает объекты в качестве обработчиков событий. В этом случае вызывается метод объекта handleEvent.


			Специальные методы:
					event   - Имя события, например "click".
					handler - Ссылка на функцию-обработчик.
					options - Дополнительный объект со свойствами:
			        once: если true, тогда обработчик будет автоматически удалён после выполнения.
			        capture: фаза, на которой должен сработать обработчик, подробнее об этом будет рассказано в главе Всплытие и погружение. 
			        				 Так исторически сложилось, что options может быть false/true, это то же самое, что {capture: false/true}.
			        passive: если true, то указывает, что обработчик никогда не вызовет preventDefault()


			Доступ к элементу из обработчика:
					
					Внутри обработчика события this ссылается на текущий элемент, 
					то есть на тот, на котором, как говорят, «висит» (т.е. назначен) обработчик.


			!! Не используйте setAttribute для обработчиков.

					// при нажатии на body будут ошибки,
					// атрибуты всегда строки, и функция станет строкой
					document.body.setAttribute('onclick', function() { alert(1) });

*/

	// Пример обработчика 
		elem.addEventListener('click', 
		{
			event_name = 'my_click_event',
	    handleEvent(event) {
	      alert('Произошла обработка обработчиком'+ this.my_click_event + event.type + " на " + event.currentTarget);
	    }
	  });
	// Пример добавления обработки нажатия объектом через метод handelEvent

  class Menu {
    handleEvent(event) {
      // mousedown -> onMousedown
      let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
      this[method](event);
    }

    onMousedown() {
      elem.innerHTML = "Кнопка мыши нажата";
    }

    onMouseup() {
      elem.innerHTML += "...и отжата.";
    }
  }

  let menu = new Menu();
  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
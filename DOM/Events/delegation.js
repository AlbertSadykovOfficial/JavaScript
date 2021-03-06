/*

		Делегирование

				Всплытие и перехват событий позволяет реализовать один из самых важных приёмов разработки – делегирование
				Идея в том, что если у нас есть много элементов, события на которых нужно обрабатывать похожим образом, то вместо того, 
				чтобы назначать обработчик каждому, мы ставим один обработчик на их общего предка.
				Из него можно получить целевой элемент event.target, понять на каком именно потомке произошло событие и обработать его.

				Алгоритм:

				    Вешаем обработчик на контейнер.
				    В обработчике проверяем исходный элемент event.target.
				    Если событие произошло внутри нужного нам элемента, то обрабатываем его.


			Ограничения:
				  Во-первых, событие должно всплывать. Некоторые события этого не делают. 
				  					 Также, низкоуровневые обработчики не должны вызывать event.stopPropagation().
   				Во-вторых, делегирование создаёт дополнительную нагрузку на браузер, ведь обработчик запускается, когда событие происходит в любом месте контейнера, 
   									 не обязательно на элементах, которые нам интересны. Но обычно эта нагрузка настолько пустяковая, что её даже не стоит принимать во внимание.


			Приём проектирования «поведение»:

					Делегирование событий можно использовать для добавления элементам «поведения» (behavior),
					декларативно задавая хитрые обработчики установкой специальных HTML-атрибутов и классов.

					Приём проектирования «поведение» состоит из двух частей:

					  	1) Элементу ставится пользовательский атрибут, описывающий его поведение.
					    2) При помощи делегирования ставится обработчик на документ, который ловит все клики (или другие события) и, 
					    		если элемент имеет нужный атрибут, производит соответствующее действие.


*/

// Пример 1. Прием проектирования «поведение»
		Счётчик: <input type="button" value="1" data-counter>
		Ещё счётчик: <input type="button" value="2" data-counter>

		<script>
		  document.addEventListener('click', function(event) {

		    if (event.target.dataset.counter != undefined) { // если есть атрибут...
		      event.target.value++;
		    }

		  });
		<script>


// Пример 2. Прием проектирования «поведение»
		<button data-toggle-id="subscribe-mail">
		  Показать форму подписки
		</button>

		<form id="subscribe-mail" hidden>
		  Ваша почта: <input type="email">
		</form>

		<script>
		  document.addEventListener('click', function(event) {
		    let id = event.target.dataset.toggleId;
		    if (!id) return;

		    let elem = document.getElementById(id);

		    elem.hidden = !elem.hidden;
		  });
		<script>


// Пример 3. Применение делегирования: действия в разметке
			<div id="menu">
			  <button data-action="save">Сохранить</ button>
			  <button data-action="load">Загрузить</button>
			  <button data-action="search">Поиск</button>
			</div>

			<script>
			  class Menu {
			    constructor(elem) {
			      this._elem = elem;
			      elem.onclick = this.onClick.bind(this); // (*)
			    }

			    save() {
			      alert('сохраняю');
			    }

			    load() {
			      alert('загружаю');
			    }

			    search() {
			      alert('ищу');
			    }

			    onClick(event) {
			      let action = event.target.dataset.action;
			      if (action) {
			        this[action]();
			      }
			    };
			  }

			  new Menu(menu);
			</script>
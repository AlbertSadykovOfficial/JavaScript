/*

			Модули

					Модуль – это просто файл. Один скрипт – это один модуль.
					
					По мере роста нашего приложения, мы обычно хотим разделить его на много файлов, так называемых «модулей». 
					Модуль обычно содержит класс или библиотеку с функциями.
					
					Система модулей на уровне языка появилась в стандарте JavaScript в 2015 году и постепенно эволюционировала

					Модули могут загружать друг друга и использовать директивы export и import, чтобы обмениваться функциональностью, 
					вызывать функции одного модуля из другого:

					    export - отмечает переменные и функции, которые должны быть доступны вне текущего модуля.
					    import - позволяет импортировать функциональность из других модулей.

					Особенности модулей:

							1) Код в модулях всегда использует режим "use strict"
							2) У каждого модуля своя область видимости (если мы не экспортируем что-то, то оно будет не видно из вне)
							3) Код в модуле выполняется только один раз при импорте
							4) this в модуле не определен, он не равен window

					Особенности поведения в браузерах:

							1) Модули всегда отложены: (defer), т.е он не блокируют загрузку html и выполняются по его завершении
							2) Можно установить async
							3) Старые браузеры могут не понимать type='module', поэтмоу нужно учитывать альтернативный варант
									Пример:
											<script type="module">
											  alert("Работает в современных браузерах");
											</script>

											<script nomodule>
											  alert("Современные браузеры понимают оба атрибута - и type=module, и nomodule, поэтому пропускают этот тег script")
											  alert("Старые браузеры игнорируют скрипты с неизвестным атрибутом type=module, но выполняют этот.");
											</script>

					Внешние модули:

							1) Требуют заголовков Access-Control-Allow-Origin, т.е. требуют разрешение загрузки скрипта

*/


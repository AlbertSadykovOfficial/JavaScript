/*
		
		Паттерн throttle
				
				(Тормозящий декоратор).

				Отличие от debounce – если проигнорированный вызов является последним во время «задержки», то он выполняется в конце.

				Вызов throttle(func, ms) возвращает wrapper.

				    1) Во время первого вызова обёртка просто вызывает func и устанавливает состояние задержки (isThrottled = true).
					     В этом состоянии все вызовы запоминаются в saveArgs / saveThis. Обратите внимание, что контекст и аргументы одинаково важны и должны быть запомнены. 
					     Они нам нужны для того, чтобы воспроизвести вызов позднее.
				    2) Затем по прошествии ms миллисекунд срабатывает setTimeout. Состояние задержки сбрасывается (isThrottled = false). 
				    	 И если мы проигнорировали вызовы, то «обёртка» выполняется с последними запомненными аргументами и контекстом.

						3) На третьем шаге выполняется не func, а wrapper, потому что нам нужно не только выполнить func, 
							 но и ещё раз установить состояние задержки и таймаут для его сброса.
*/

function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) { // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments); // (1)

    isThrottled = true;

    setTimeout(function() {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
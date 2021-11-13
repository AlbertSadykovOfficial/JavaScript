/*
		
		Анимация
			
				setInterval

						Что, если у нас есть несколько анимаций, работающих одновременно.
						Если мы запустим их независимо с помощью setInterval(..., 20), тогда браузеру будет необходимо выполнять отрисовку гораздо чаще, чем раз в 20ms.
						Это происходит из-за того, что каждая анимация имеет своё собственное время старта и «каждые 20 миллисекунд» для разных анимаций – разные. 
						Интервалы не выравнены и у нас будет несколько независимых срабатываний в течение 20ms.
					
						Т.е вот это: 
								setInterval(function() {
									  animate1();
									  animate2();
									  animate3();
								}, 20)

						Загружает браузер меньше, чем это:
								setInterval(animate1, 20); // независимые анимации
								setInterval(animate2, 20); // в разных местах кода
								setInterval(animate3, 20);


						Эти независимые перерисовки лучше сгруппировать вместе, тогда они будут легче для браузера, а
						значит – не грузить процессор и более плавно выглядеть.

						Спецификация Animation timing описывает функцию requestAnimationFrame, которая решает все описанные проблемы и делает даже больше.


				requestAnimationFrame

						Синтаксис:

								let requestId = requestAnimationFrame(callback)

								Функция callback имеет один аргумент – время прошедшее с момента начала загрузки страницы в миллисекундах. 
								Это значение может быть получено с помощью вызова performance.now().
						
								Принцип:

										Такой вызов планирует запуск функции callback на ближайшее время, когда браузер сочтёт возможным осуществить анимацию.
										Если в callback происходит изменение элемента, тогда оно будет сгруппировано с другими requestAnimationFrame и CSS-анимациями. 
										Таким образом браузер выполнит один геометрический пересчёт и отрисовку, вместо нескольких.


						Отмена анимации:

								cancelAnimationFrame(requestId);

						
						Стркуктура анимации:
								
								animate({timing, draw, duration})
										
										
										duration - Продолжительность анимации.
										draw(progress) - Функция отрисовки, которая получает аргументом значение прогресса анимации и отрисовывает его. 
										timing(timeFraction) - Функция расчёта времени как CSS-свойство transition-timing-function, которая будет вычислять прогресс анимации

								В отличие от CSS-анимаций, можно создать любую функцию расчёта времени и любую функцию отрисовки. 


*/

// Время между первыми 10 запусками requestAnimationFrame. Обычно оно 10-20 мс:
function requestAnimationExample()
{
	  let prev = performance.now(); // время прошедшее с момента начала загрузки страницы (мс)
	  let times = 0;

	  requestAnimationFrame(function measure(time) 
	  {
		    document.body.insertAdjacentHTML("beforeEnd", Math.floor(time - prev) + " ");
		    prev = time;

	    	if (times++ < 10) requestAnimationFrame(measure);
	  })
}


// Структура анимации
function animate({timing, draw, duration}) {

  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction изменяется от 0 до 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // вычисление текущего состояния анимации
    let progress = timing(timeFraction);

    draw(progress); // отрисовать её

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }

  });
}

elem.onclick = function() {
	 	animate({
			  duration: 1000,
			  // Характер изменнени параметров (линейный, показательный и др)
			  timing(timeFraction) {
			  		// Math.pow(timeFraction, 2); - для квадратичного времени
			  		// 1 - Math.sin(Math.acos(timeFraction))  - дуга
			  		// Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x) - выстрел из лука
			    	return timeFraction;
			  },
			  // Что мы делаем (отрисовка)
			  draw(progress) {
			    	elem.style.width = progress * 100 + '%';
			  }
		});
}

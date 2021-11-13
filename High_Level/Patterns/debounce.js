/*
		Паттерн debounce

				Чтобы можно было вызывать функцию не раньше какого-то промежутка времени (t),
				с момента послежнего вызова, используют паттерн debounce.

*/

// Реализация паттерна через декоратор

function debounce(f, ms) {

  let isCooldown = false;

  return function() {
    if (isCooldown) return; // Функция еще не готова к выполнению 

    f.apply(this, arguments);

    isCooldown = true;

    setTimeout(() => isCooldown = false, ms); // Через промежуток времени разрешаем пользоваться функцией
  };

}
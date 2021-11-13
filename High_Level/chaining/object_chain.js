/*

		Объектный чейнинг

			По материалам из главы this: Basic->Object->Basic->this.js

*/

let ladder = {
  step: 0,
  up() {
    this.step++;
  },
  down() {
    this.step--;
  },
  showStep: function() { // показывает текущую ступеньку
    alert( this.step );
  }
};


ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
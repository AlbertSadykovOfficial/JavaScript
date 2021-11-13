/**
*    Пример - перехват ообращения к закрытым свойствам
*
*       В JS закрытые свойсва - те, которе начинаются с (_)
*       
*       Если свойство закрыто, значит к нему не следует давать доступ,
*       Чтобы предотвратить такой доступ напишем Proxy-функцию.
*/
let user = {
  name: "Вася",
  _password: "***"
};

user = new Proxy(user, {
  get(target, prop) {
    if (prop.startsWith('_')) {
      throw new Error("Отказано в доступе");
    } else {
      let value = target[prop];
      return (typeof value === 'function') ? value.bind(target) : value; // (*)
    }
  },
  set(target, prop, val) { // перехватываем запись свойства
    if (prop.startsWith('_')) {
      throw new Error("Отказано в доступе");
    } else {
      target[prop] = val;
      return true;
    }
  },
  deleteProperty(target, prop) { // перехватываем удаление свойства
    if (prop.startsWith('_')) {
      throw new Error("Отказано в доступе");
    } else {
      delete target[prop];
      return true;
    }
  },
  ownKeys(target) { // перехватываем попытку итерации
    return Object.keys(target).filter(key => !key.startsWith('_'));
  }
});

// "get" не позволяет прочитать _password
try {
  alert(user._password); // Error: Отказано в доступе
} catch(e) { alert(e.message); }

// "set" не позволяет записать _password
try {
  user._password = "test"; // Error: Отказано в доступе
} catch(e) { alert(e.message); }

// "deleteProperty" не позволяет удалить _password
try {
  delete user._password; // Error: Отказано в доступе
} catch(e) { alert(e.message); }

// "ownKeys" исключает _password из списка видимых для итерации свойств
for(let key in user) alert(key); // name
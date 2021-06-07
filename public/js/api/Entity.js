/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  static URL = "";
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback = f => f) {
    return createRequest({
      url: this.URL,
      method: 'GET',
      responseType: 'json',
      data,
      callback,
    });
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback = f => f) {
    return createRequest({
      url: this.URL,
      data,
      responseType: 'json',
      method: 'PUT',
      callback,
    })
  }

  static get(id = '', data, callback = f => f) {
    return createRequest({
      method: 'GET',
      url: `${this.URL}/${id}`,
      data,
      callback,
    })
  }


  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(id = '', data, callback = f => f) {
    const newData = { ...data, id };
    return createRequest({
      url: this.URL,
      data: newData,
      method: 'DELETE',
      responseType: 'json',
      callback,
    });
  }
}


  /**
   * Класс User управляет авторизацией, выходом и
   * регистрацией пользователя из приложения
   * Имеет свойство URL, равное '/user'.
   * */
  class User {
    URL = '/user';
    /**
     * Устанавливает текущего пользователя в
     * локальном хранилище.
     * */
    static setCurrent(user) {
       for(let key in user.data) {
      localStorage.setItem(`${key}`, `${user.data[key]}`);
      }
        console.log(localStorage);
    }
  

    /**
     * Удаляет информацию об авторизованном
     * пользователе из локального хранилища.
     * */
    static unsetCurrent() {
      localStorage.removeItem('user');
    }

    /**
     * Возвращает текущего авторизованного пользователя
     * из локального хранилища
     * */
    static current() {
      return JSON.parse(localStorage.getItem('user'))
    }

    /**
     * Получает информацию о текущем
     * авторизованном пользователе.
     * */
    static async fetch( data, callback = f => f ) {
      return await createRequest({
        data,
        url: this.URL + '/current',
        method: 'GET',
        responseType: 'json',
        callback,
      });
    }

    /**
     * Производит попытку авторизации.
     * После успешной авторизации необходимо
     * сохранить пользователя через метод
     * User.setCurrent.
     * */
    static login( data, callback = f => f ) {
      createRequest({
        url: this.URL + '/login',
        method: 'POST',
        responseType: 'json',
        data,
        callback: (err, response) => {
          if (response && response.user) {
            this.setCurrent(response.user);
          }
          callback(err, response);
        }
      });
    }

    /**
     * Производит попытку регистрации пользователя.
     * После успешной авторизации необходимо
     * сохранить пользователя через метод
     * User.setCurrent.
     * */
    static async register( data, callback = f => f) {
      return await createRequest({
        url: this.URL + '/register',
        method: 'POST',
        responseType: 'json',
        data,
        callback,
      });
    }

    /**
     * Производит выход из приложения. После успешного
     * выхода необходимо вызвать метод User.unsetCurrent
     * */
    static async logout( data, callback = f => f) {
      return await createRequest({
        url: this.URL + '/logout',
        method: 'POST',
        data,
        callback: (response) => {
          if (response.success) {
            User.unsetCurrent();
            App.setState('init');
          }
        },
      });
    }
  }
  

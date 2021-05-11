/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(options) {
    User.register(options, (err, response) => {
      if (err) {
        throw new Error('Ошибка регистрации:' + err);
      }
      else {
      App.setState('user-logged');
      User.setCurrent(response.user);
      this.element.reset();
      App.getModal('register').unregisterEvents();
      App.getModal('register').close();
    }
  });
  }
}
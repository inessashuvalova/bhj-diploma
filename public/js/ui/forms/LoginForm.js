/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(options)  {
    User.login(options, (err, response) => {
      if (err) {
        throw new Error('Ошибка входа:' + err);
      }
      else if (response.success) {
      App.setState('user-logged');
      User.setCurrent(response.user);
      this.element.reset();
      App.getModal('login').unregisterEvents();
      App.getModal('login').close();
    };
  })
}
}
/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.element = element;
    this.renderAccountsList();
  }


  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */

  renderAccountsList() {
    Account.list(User.current(), (err, response) => {
      accounts.innerHTML = ""

      response.data.forEach(value => {
        accounts.innerHTML += `<option value="${value.id}">${value.name}</option>`
      });
    })
  }
  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(options) {
    Transaction.create(options, (err, response) => {
      if (!response.success) {
        return;
      }
      this.element.reset()
      App.getModal(`new${options.type.slice(0, 1).toUpperCase()}${options.type.slice(1)}`).close()
      App.update();
    }
    )
  }
}
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
    Account.list( User.current(), ( err, response ) => {
      Array.from( this.element.querySelector( 'select.form-control.accounts-select' ).children ).forEach( elem => elem.remove() )
      if ( !err ) {
        response.data.forEach(account => {
          let acc = document.createElement( 'option' );
          acc.value = account.id;
          acc.innerText = account.name;
          this.element.querySelector( 'select.form-control.accounts-select' ).insertAdjacentElement( 'beforeend', acc );
        })
      }}) 
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
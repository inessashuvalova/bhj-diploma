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
      if (App.setState === 'user-logged') {
        this.renderAccountsList();
      }
    }

    /**
     * Получает список счетов с помощью Account.list
     * Обновляет в форме всплывающего окна выпадающий список
     * */
    renderAccountsList() {
      Account.list(User.current(), (data) => {
        const selectElement = this.element.querySelector('select');
        selectElement.innerHTML = '';
        selectElement.insertAdjacentHTML('afterbegin', data.data.map((item) => `<option value="${item.id}">${item.name}</option>`).join(' '));
      })
    }

    /**
     * Создаёт новую транзакцию (доход или расход)
     * с помощью Transaction.create. По успешному результату
     * вызывает App.update(), сбрасывает форму и закрывает окно,
     * в котором находится форма
     * */
     onSubmit(options) {
      const modal = this.element.closest('.modal').dataset.modalId;
      Transaction.create(options, App.update.bind(App));
      this.element.reset()
      App.modals[modal].close();
    }
  }
/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (!element) {
      throw new Error('Элемент должен быть передан!');
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    if (this.lastOptions) {
      this.render(this.lastOptions);
      return;
    }
    this.render();
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    const content = document.querySelector('.content');
    const removeAccount = document.querySelector('.remove-account');

    content.addEventListener(
      'click', (evt) => {
        evt.preventDefault();
        const transactionRemove = evt.target.closest('.transaction__remove');
        if (transactionRemove) {
          const transactionID = transactionRemove.dataset.id;
          this.removeTransaction(transactionID);
        }
      },
      false
    );
    removeAccount.addEventListener(
      'click', (evt) => {
        evt.preventDefault();
        this.removeAccount();
      },
      false
    );
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets(),
   * либо обновляйте только виджет со счетами
   * для обновления приложения
   * */
  removeAccount() {
      if (!this.lastOptions) {
        return;
      }
      if (!confirm('Вы действительно хотите удалить счёт?')) {
        return;
      }
        Account.remove(this.lastOptions.account_id, {}, (err, response) => {
          if (!response.success) {
            this.clear();
              App.update();

    }
  })
}

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction(id) {
    if (!id) {
      return;
    }
    const transactionElement = document.querySelector(`button[data-id="${id}"]`).closest('.transaction');
    const transactionTitle = transactionElement.querySelector('.transaction__title').innerText;
    const isConfirm = confirm(`Вы действительно хотите удалить транзакцию: ${transactionTitle}`);
    if (isConfirm) {
      transactionElement.remove();
      Transaction.remove(id, {}, (err, response) => {
        if (response, response.success) {
          App.update();
        }
    })
    }
}

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options){
    if (!options) {
      return;
    }
      this.lastOptions = options;
        Account.get(options.account_id, User.current(), this.renderTitle.bind(this)
    );
        Transaction.list(options, this.renderTransactions.bind(this));

  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTitle({data: { name: 'Название счета' } });
    this.renderTransactions({data: []});
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name){
    const titleElement = this.element.querySelector('.content-title');
    titleElement.innerText = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date){
    const d = new Date(date.replace(' ', 'T')),
    day = d.getDate(),
    months = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря',
    ],
    month = months[d.getMonth()],
    year = d.getFullYear(),
    hours = d.getHours(),
    minutes = d.getMinutes(),
    formatTime = (x) => (x < 10 ? '0' + x : x);

  return `${day} ${month} ${year} г. в ${formatTime(hours)}:${formatTime(
    minutes
  )}`;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item){
    return `
    <div class="transaction transaction_${item.type.toLowerCase()} row">
    <div class="col-md-7 transaction__details">
      <div class="transaction__icon">
          <span class="fa fa-money fa-2x"></span>
      </div>
      <div class="transaction__info">
          <h4 class="transaction__title">${item.name}</h4>         
          <div class="transaction__date">${this.formatDate(item.created_at)}</div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="transaction__summ">${item.sum}<span class="currency">₽</span>
      </div>
    </div>
    <div class="col-md-2 transaction__controls">        
        <button class="btn btn-danger transaction__remove" data-id="${item.id}">
            <i class="fa fa-trash"></i>  
        </button>
    </div>
</div>
    `;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data) {
    const template = data.map(el => this.getTransactionHTML(el)).join(' ');
    const transactionContent = this.element.querySelector('.content');
    transactionContent.innerHTML = '';
    transactionContent.insertAdjacentHTML('afterbegin', template);
  }
  }

  
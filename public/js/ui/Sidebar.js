  /**
   * Класс Sidebar отвечает за работу боковой колонки:
   * кнопки скрытия/показа колонки в мобильной версии сайта
   * и за кнопки меню
   * */
  class Sidebar {
    /**
     * Запускает initAuthLinks и initToggleButton
     * */
    static init() {
      this.initAuthLinks();
      this.initToggleButton();
    }

    /**
     * Отвечает за скрытие/показа боковой колонки:
     * переключает два класса для body: sidebar-open и sidebar-collapse
     * при нажатии на кнопку .sidebar-toggle
     * */
    static initToggleButton() {
      const skinBlue = document.querySelector('.skin-blue');
      const sidebarToggle = document.querySelector('.sidebar-toggle');
      sidebarToggle.onclick = function() {
      skinBlue.classList.toggle("sidebar-open");
      skinBlue.classList.toggle("sidebar-collapse");
  }
    }

    /**
     * При нажатии на кнопку входа, показывает окно входа
     * (через найденное в App.getModal)
     * При нажатии на кнопку регастрации показывает окно регистрации
     * При нажатии на кнопку выхода вызывает User.logout и по успешному
     * выходу устанавливает App.setState( 'init' )
     * */
    static initAuthLinks() { 
     const itemLogin = document.querySelector('li.menu-item_login').querySelector('a');
      itemLogin.addEventListener('click',(evt) => {
        evt.preventDefault();
        App.getModal('login').open();
      },
      false
    );
      
      const itemRegister = document.querySelector('li.menu-item_register').querySelector('a');
      itemRegister.addEventListener('click',(evt) => {
        evt.preventDefault();
        App.getModal('register').open();
      },
      false
    );

      

      const itemLogout = document.querySelector('li.menu-item_logout').querySelector('a');
      itemLogout.addEventListener('click', (evt) => {
        evt.preventDefault();
        User.logout(User.current());
      },
      false
    );
    }
  }

  
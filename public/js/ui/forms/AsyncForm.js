/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (!element) {
      throw new Error('Переданный в качестве параметра элемент не существует');
    };
    this.element = element;
    this.registerEvents();
    
      }
      

  /**
   * Необходимо запретить отправку формы и в момент отправки
   * вызывает метод submit()
   * */
  registerEvents() {
    const btnPrimary = document.querySelectorAll('.btn-primary');
    btnPrimary.forEach( elem => {
      elem.addEventListener( "click" , (evt) => {
       evt.preventDefault();
       this.submit();
      }) 
    })
    
  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {

       let data = {}
       for (let input of Array.from(this.element.querySelectorAll( 'input' )).concat(Array.from(this.element.querySelectorAll( 'select' )))) {
         data[ input.getAttribute( 'name' ) ] = input.value;
       }
       return data;
  }

  onSubmit( options ) {

  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
    this.onSubmit(this.getData());
      }
    
}
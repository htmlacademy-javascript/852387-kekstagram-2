// #data-error - получить данные для галлереи не получилось
// #success - отправка данных прошла успешно
// Сообщение должно удаляться со страницы после
// нажатия на кнопку .success__button, по нажатию
// на клавишу Esc и по клику на произвольную область
// экрана за пределами блока с сообщением.
// #error - при отправке данных произошла ошибка запроса
// то же самое как при успешно

const showMessage = (value) => {
  //const arrContainer = document.createDocumentFragment();
  const MessageTemplate = document.querySelector(value)
    .content
    .querySelector(value);

  const MessageElement = MessageTemplate.cloneNode(true);

  document.body.append(MessageElement);

};

const showMessageFail = () => showMessage('#success');

const showMessageSuccess = () => showMessage('#error');


export { showMessageFail, showMessageSuccess };

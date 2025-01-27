import { showMessage, showMessageError } from './util.js';

const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const messageTemplate = {
  GET_DATA_FAIL: 'data-error',
  SENT_DATA_SUCCESS: 'success',
  SEND_DATA_FAIL: 'error',
};

const getData = () => fetch(
  `${BASE_URL}${Route.GET_DATA}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  })
  .catch(() => {
    showMessageError(messageTemplate.GET_DATA_FAIL);
  });

const sendData = (body) => fetch(
  `${BASE_URL}${Route.SEND_DATA}`,
  {
    method: 'POST',
    body,
  })
  .then((response) => {
    if (response.ok) {
      showMessage(messageTemplate.SENT_DATA_SUCCESS);
    } else {
      showMessage(messageTemplate.SEND_DATA_FAIL);
    }
  })
  .catch(() => {
    showMessage(messageTemplate.SEND_DATA_FAIL);
  });

export {getData, sendData};


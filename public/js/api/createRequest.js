/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

  const createRequest = async (options = {}) => {
    if (!options.data) {
      return;
    };

    const requestData = new FormData();
    let requestUrl = options.url;
    const xhr = new XMLHttpRequest();
  
    if (options.method == 'GET' && Object.keys(options.data).length != 0) {
      requestUrl = `${options.url}?${getUrl(options.data)}`;
    } else {
      Object.entries(options.data).forEach(([key, value]) => requestData.append(key, value));
    }
  
    xhr.addEventListener('readystatechange', function () {
      if (xhr.readyState == xhr.DONE) {
          let responseJSON = response.json();
          return responseJSON;
        } else {
          console.error('Ошибка HTTP: ' + response.status);
        }
      });
    
  
    try {
      xhr.open(options.method, requestUrl);
      xhr.send(requestData);
    } catch (error) {
      options.callback(error);
    }
    return xhr;
  };

  function getUrl(obj) {
    return Object.entries(obj).map(([key, value]) => `${key}=${value}`).join('&');
  }
  
 

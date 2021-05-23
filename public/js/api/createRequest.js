/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

  const createRequest = (options = {}) => {
    if (!options.data) {
      return;
    };

    const requestData = new FormData();
    let requestUrl = options.url;
    const xhr = new XMLHttpRequest();

    if (options.data) {
    if (options.method == 'GET' && Object.keys(options.data).length != 0) {
      requestUrl = `${options.url}?${getUrl(options.data)}`;
    } else {
      Object.entries(options.data).forEach(([key, value]) => requestData.append(key, value));
    }
    }
    
    xhr.open(options.method, requestUrl);
    xhr.withCredentials = true;
    xhr.responseType = options.responseType;

    xhr.addEventListener('readystatechange', function() {
      if (this.readyState === xhr.DONE && xhr.status === 200) {
          options.callback(xhr.response);
      }
  });

  
    try {
      xhr.open(options.method, requestUrl);
      xhr.send(requestData);
    } catch (err) {
      options.callback(err);
    }
    return xhr;
  };

  function getUrl(obj) {
    return Object.entries(obj).map(([key, value]) => `${key}=${value}`).join('&');
  }
  
 
    
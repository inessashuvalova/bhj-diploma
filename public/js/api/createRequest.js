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
      if (xhr.readyState == xhr.DONE) {
        const response = xhr.responseText;
        options.callback(JSON.parse(response));
      };
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
  
 
    
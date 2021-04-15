/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

  const createRequest = async (options = {}) => {
    if (!options.data) {
      return;
    }
    let requestURL = options.url;
    const requestData = new FormData();
    
    if (options.data) {
        const urlArray = Object.entries(data).map(([key, value]) => key + '=' + value);
        const urlAppend = urlArray.join('&'); 
        requestURL += '?' + urlAppend;
      } else {
        Object.entries(data).forEach(([key, value]) =>
          requestData.append(key, value)
        );
      }
    }
  
    try {
      let response = await fetch(requestURL, {
        method: options.method,
        body: options.method === 'GET' ? null : requestData,
      });
      if (response.ok) {
        let responseJSON = await response.json();
        return responseJSON;
      } else {
        console.error('Ошибка HTTP: ' + response.status);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  
  
 
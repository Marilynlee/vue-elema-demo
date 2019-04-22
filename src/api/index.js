import axios from 'axios';

export const request = (url, data = {}, type = "GET") => {
  return new Promise(function (resolve, reject) {
    let promise;
    if (type === 'GET') {
      // 将data中所有数据转换成query参数字符串接到url中
      let queryString = '';
      Object.keys(data).forEach(key => {
        const value = data[key];
        queryString += key + '=' + value + '&';
      });
      if (queryString) {
        queryString = queryString.substring(0, queryString.length - 1);
        url += '?' + queryString;
      }
      promise = axios.get(url);
    } else {
      promise = axios.post(url, data);
    }
    promise.then(
      response => {
        resolve(response.data);
      },
      error => {
        reject(error);
      }
    );
  });
};

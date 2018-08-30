import 'whatwg-fetch';
const http = {};

http.base = function(method, url, data) {
  return new Promise((resolve, reject) => {
    fetch(
      url,
      createFetchParams(method, data)
    ).then((response) => {
      return response.json();
    }).then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error);
    });
  });
};

http.get = function(url) {
  return this.base('GET', url, undefined);
};

http.post = function(url, data) {
  return this.base('POST', url, data);
};

http.patch = function(url, data) {
  return this.base('PATCH', url, data);
};

http.put = function(url, data) {
  return this.base('PUT', url, data);
};

http.delete = function(url, data) {
  return this.base('DELETE', url, data);
};

export default http;

function createFetchParams(method, bodyData) {
  const params = {
    method: method,
    mode: 'cors',
    // redirect: 'follow',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  }

  if (bodyData) {
    params.body = JSON.stringify(bodyData);
  }

  return params;
}

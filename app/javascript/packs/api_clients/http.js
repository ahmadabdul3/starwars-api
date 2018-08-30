import 'whatwg-fetch';
const http = {};

http.base = function(method, url, data) {
  return fetch(url, fetchParams(method, data)).then((response) => {
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  }).catch((err) => {
    console.log('error', err);
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

function fetchParams(method, bodyData) {
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

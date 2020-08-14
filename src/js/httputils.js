// TODO: Use fetch API instead?

export function sendHttpRequest(method, url, headers, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.responseType = 'json';
    if (headers && Array.isArray(headers)) {
      for (let i = 0; i < headers.length; i++)
        xhr.setRequestHeader(headers[i].name, headers[i].value);
    }
    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject({ httpStatus: xhr.status, response: xhr.response });
      } else {
        resolve({ httpStatus: xhr.status, response: xhr.response });
      }
    };
    xhr.onerror = () => {
      reject({ httpStatus: 0, response: 'Error' });
    };
    xhr.send(JSON.stringify(data));
  });
}

export function sendHttpRequestGet(url, headers) {
  return sendHttpRequest('GET', url, headers);
}
export function sendHttpRequestPost(url, headers, data) {
  return sendHttpRequest('POST', url, headers, data);
}

export default {
  sendHttpRequest,
  sendHttpRequestGet,
  sendHttpRequestPost,
};

// TODO: Use fetch API instead?

export function sendHttpRequest(method, url, data) {
  console.log('sending a request...');
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject({ httpsStatus: xhr.status, response: xhr.response });
      } else {
        resolve({ httpsStatus: xhr.status, response: xhr.response });
      }
    };
    xhr.onerror = () => {
      reject({ httpsStatus: 0, response: 'Error' });
    };
    xhr.send(JSON.stringify(data));
  });
}

export function sendHttpRequestPost(url, headers, data) {
  return sendHttpRequest('POST', url, headers, data);
}

export default {
  sendHttpRequest,
  sendHttpRequestPost,
};

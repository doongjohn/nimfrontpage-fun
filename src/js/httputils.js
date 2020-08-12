// TODO: Use fetch API instead?

export function sendHttpRequest(method, url, data) {
  console.log('sending a request...');
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.responseType = 'json';
    if (data) {
      xhr.setRequestHeader('Content-Type', 'application/json'); // unnecessary?
    }
    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.status, xhr.response);
      } else {
        resolve(xhr.status, xhr.response);
      }
    };
    xhr.onerror = () => {
      reject(0, '');
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

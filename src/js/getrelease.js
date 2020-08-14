import HttpUtils from './httputils.js';

const stableLabel = document.getElementById('stable-release');
const nightlyLabel = document.getElementById('nightly-release');

HttpUtils.sendHttpRequestGet(
  'https://api.github.com/repos/nim-lang/Nim/tags',
  null
)
  .then(({ httpStatus, response }) => {
    stableLabel.textContent = `Stable ${response[0].name}`;
  })
  .catch(({ httpStatus, response }) => {
    console.log('Error has occurred while trying to get the latest release!');
    stableLabel.textContent = `Stable v?.?.?`;
  });

HttpUtils.sendHttpRequestGet(
  'https://api.github.com/repos/nim-lang/nightlies/releases/latest',
  null
)
  .then(({ httpStatus, response }) => {
    const publishedAt = response.tag_name.split('-');
    const month = publishedAt[1];
    const day = publishedAt[2];
    nightlyLabel.textContent = `Nightly ${month}-${day}`;
  })
  .catch(({ httpStatus, response }) => {
    console.log('Error has occurred while trying to get the latest release!');
    nightlyLabel.textContent = `Nightly ??-??`;
  });

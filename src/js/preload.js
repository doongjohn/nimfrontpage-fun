// Don't use transitions on load
// https://joshfrankel.me/blog/prevent-css-transitions-on-page-load-with-es6/
// https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
window.addEventListener('load', () => {
  let node = document.querySelector('.no-onload-transitions');
  node.classList.remove('no-onload-transitions');
});

function removeNoOnloadTransitions() {
  let node = document.querySelector('.no-onload-transitions');
  node.classList.remove('no-onload-transitions');
}

window.addEventListener('load', () => {
  removeNoOnloadTransitions();
});

const colorMain = '#ffdc9a';
const colorMainStrong = '#f5cb7d';

const setStylesOnElement = (element, styles) => {
  Object.assign(element.style, styles);
};

const exampleButtons = [
  document.getElementById('nim-example1-btn'),
  document.getElementById('nim-example2-btn'),
  document.getElementById('nim-example3-btn'),
];
const examples = [
  document.getElementById('nim-example1'),
  document.getElementById('nim-example2'),
  document.getElementById('nim-example3'),
];

// Initialize State
setStylesOnElement(exampleButtons[0], {
  color: 'white',
  backgroundColor: colorMain,
});
examples[1].style.display = 'none';
examples[2].style.display = 'none';

// On Tab Button Click
function onTabBtnClick(num) {
  for (let i = 0; i < 3; i++) {
    if (num !== i) {
      setStylesOnElement(exampleButtons[i], {
        color: colorMainStrong,
        backgroundColor: 'transparent',
      });
      examples[i].style.display = 'none';
    } else {
      setStylesOnElement(exampleButtons[i], {
        color: 'white',
        backgroundColor: colorMain,
      });
      examples[i].style.display = 'block';
    }
  }
}

// Setup click event
for (let i = 0; i < 3; i++) {
  exampleButtons[i].addEventListener('click', () => {
    onTabBtnClick(i);
  });
}

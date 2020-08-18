import Prism from 'prismjs';
import CodeFlask from 'codeflask';
import HttpUtils from './httputils.js';

const colorMain = '#ffd782';
const colorMainStrong = '#ffc251';

const setStylesOnElement = (element, styles) => {
  if (Array.isArray(element)) {
    for (let i = 0; i < element.length; i++)
      Object.assign(element[i].style, styles);
    return;
  }
  Object.assign(element.style, styles);
};

// Example Tab
const exampleButtons = [
  document.getElementById('nim-example-btn1'),
  document.getElementById('nim-example-btn2'),
  document.getElementById('nim-example-btn3'),
];
const exampleTabs = [
  document.getElementById('nim-example-tab1'),
  document.getElementById('nim-example-tab2'),
  document.getElementById('nim-example-tab3'),
];

// Editor (Code Flask)
const editorOptions = {
  language: 'nim',
  defaultTheme: false,
  tabSize: 2,
  handleTabs: true,
  handleNewLineIndentation: true,
};
const editors = [
  new CodeFlask(exampleTabs[0], editorOptions),
  new CodeFlask(exampleTabs[1], editorOptions),
  new CodeFlask(exampleTabs[2], editorOptions),
];

// Result Tab
const runButton = document.getElementById('run-nim');
const stdoutButton = document.getElementById('nim-result-stdout-btn');
const compileLogButton = document.getElementById('nim-result-complog-btn');
const resultTabs = [
  document.getElementById('nim-result-tab1'),
  document.getElementById('nim-result-tab2'),
  document.getElementById('nim-result-tab3'),
];
const compileLogBoxes = [
  resultTabs[0].getElementsByClassName('compile-log')[0],
  resultTabs[1].getElementsByClassName('compile-log')[0],
  resultTabs[2].getElementsByClassName('compile-log')[0],
];
const stdoutBoxes = [
  resultTabs[0].getElementsByClassName('stdout')[0],
  resultTabs[1].getElementsByClassName('stdout')[0],
  resultTabs[2].getElementsByClassName('stdout')[0],
];

// Variables
let curTabIndex = 0;
var isCompiling = [false, false, false];
const runningMsg = `<i class="fas fa-spinner fa-spin"></i> Run`;
const runMsg = `<i class="fas fa-play"></i> Run`;

// Initialize
setStylesOnElement(exampleButtons[0], {
  color: 'white',
  backgroundColor: colorMain,
});
setStylesOnElement(exampleTabs.slice(1), {
  display: 'none',
});

editors[0].updateCode(`import strformat

type
  Person = object
    name: string
    age: Natural # Ensures the age is positive

let people = [
  Person(name: "John", age: 45),
  Person(name: "Kate", age: 30)
]

for person in people:
  # Type-safe string interpolation,
  # evaluated at compile time.
  echo(fmt"{person.name} is {person.age} years old")`);
editors[1].updateCode(`# Thanks to Nim's 'iterator' and 'yield' constructs,
# iterators are as easy to write as ordinary
# functions. They are compiled to inline loops.
iterator oddNumbers[Idx, T](a: array[Idx, T]): T =
  for x in a:
    if x mod 2 == 1:
      yield x

for odd in oddNumbers([3, 6, 9, 12, 15, 18]):
  echo odd`);
editors[2].updateCode(`# Use Nim's macro system to transform a dense
# data-centric description of x86 instructions
# into lookup tables that are used by
# assemblers and JITs.
import macros, strutils

macro toLookupTable(data: static[string]): untyped =
  result = newTree(nnkBracket)
  for w in data.split(';'):
    result.add newLit(w)

const
  data = "mov;btc;cli;xor"
  opcodes = toLookupTable(data)

for o in opcodes:
  echo o`);
for (let i = 0; i < 3; i++)
  editors[i].addLanguage('nim', Prism.languages['nim']);

setStylesOnElement(stdoutButton, {
  color: 'white',
  backgroundColor: colorMain,
});
setStylesOnElement(compileLogBoxes.concat(resultTabs.slice(1)), {
  display: 'none',
});

// On Tab Button Click
function onExampleTabBtnClick(index) {
  curTabIndex = index;
  runButton.innerHTML = isCompiling[index] ? runningMsg : runMsg;

  for (let i = 0; i < 3; i++) {
    if (index != i) {
      setStylesOnElement(exampleButtons[i], {
        color: colorMainStrong,
        backgroundColor: 'transparent',
      });
      setStylesOnElement([exampleTabs[i], resultTabs[i]], {
        display: 'none',
      });
    } else {
      setStylesOnElement(exampleButtons[i], {
        color: 'white',
        backgroundColor: colorMain,
      });
      setStylesOnElement([exampleTabs[i], resultTabs[i]], {
        display: 'block',
      });
    }
  }
}
function onResultTabBtnClick(tabName) {
  if (tabName == 'stdout') {
    setStylesOnElement(stdoutButton, {
      color: 'white',
      backgroundColor: colorMain,
    });
    setStylesOnElement(compileLogButton, {
      color: colorMainStrong,
      backgroundColor: 'transparent',
    });
    setStylesOnElement(compileLogBoxes, {
      display: 'none',
    });
    setStylesOnElement(stdoutBoxes, {
      display: 'block',
    });
  } else {
    setStylesOnElement(stdoutButton, {
      color: colorMainStrong,
      backgroundColor: 'transparent',
    });
    setStylesOnElement(compileLogButton, {
      color: 'white',
      backgroundColor: colorMain,
    });
    setStylesOnElement(compileLogBoxes, {
      display: 'block',
    });
    setStylesOnElement(stdoutBoxes, {
      display: 'none',
    });
  }
}

// Setup click event
for (let i = 0; i < 3; i++) {
  exampleButtons[i].onclick = () => {
    onExampleTabBtnClick(i);
  };
}
compileLogButton.onclick = () => {
  onResultTabBtnClick('compile-log');
};
stdoutButton.onclick = () => {
  onResultTabBtnClick('stdout');
};
runButton.onclick = () => {
  if (isCompiling[curTabIndex]) return;
  isCompiling[curTabIndex] = true;
  runButton.innerHTML = runningMsg;

  let resultTabIndex = curTabIndex;

  HttpUtils.sendHttpRequestPost('https://play.nim-lang.org/compile', null, {
    code: editors[curTabIndex].getCode(),
    compilationTarget: 'c',
    outputFormat: 'HTML',
    // version: 'latest',
  })
    .then(({ httpStatus, response }) => {
      isCompiling[resultTabIndex] = false;
      if (resultTabIndex == curTabIndex) runButton.innerHTML = runMsg;

      compileLogBoxes[resultTabIndex].innerHTML = response.compileLog;
      stdoutBoxes[resultTabIndex].innerHTML = response.log;
    })
    .catch(({ httpStatus, response }) => {
      isCompiling[resultTabIndex] = false;
      if (resultTabIndex == curTabIndex) runButton.innerHTML = runMsg;

      console.log('Error has occurred while trying to compile it!');
      console.log(`httpStatus: ${httpStatus}\n${response}`);
    });
};

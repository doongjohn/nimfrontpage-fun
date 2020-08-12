import Prism from 'prismjs';
import CodeFlask from 'codeflask';
import HttpUtils from './js/httputils.js';

const editor = new CodeFlask('.code-editor', {
  language: 'nim',
  defaultTheme: false,
  tabSize: 2,
  handleTabs: true,
  handleNewLineIndentation: true,
});
editor.addLanguage('nim', Prism.languages['nim']);
editor.updateCode(`import strutils, strformat

let
  hello = "hello"
  world = "world"

proc toUpper(text: string, section: Slice[int]): string =
  result = text
  result[section] = text[section].toUpperAscii()

proc helloWorld() =
  echo toUpper(fmt"{hello}, {world}!", 0 .. 0)

helloWorld()`);

const compileUrl = 'https://play.nim-lang.org/compile';
var isCompiling = false;

const runBtn = document.getElementById('run-nim');
runBtn.onclick = () => {
  if (isCompiling) {
    runBtn.textContent = 'Running...';
    return;
  }
  isCompiling = true;

  HttpUtils.sendHttpRequestPost(compileUrl, {
    code: editor.getCode(),
    compilationTarget: 'c',
    outputFormat: 'HTML',
    // version: 'latest',
  })
    .then((httpStatus, response) => {
      if (httpStatus == 200) {
        runBtn.textContent = 'Run';
        isCompiling = false;
        const jsonResponse = JSON.parse(response);
        const log = jsonResponse.log;
        console.log(log);
      } else {
        console.log(`httpStatus: ${httpStatus}`);
      }
    })
    .catch(() => {
      console.log('Error has occurred while trying to compile it!');
    });
};

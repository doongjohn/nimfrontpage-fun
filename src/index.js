import Prism from 'prismjs';
import CodeFlask from 'codeflask';

const playground = new CodeFlask('.code-editor', {
  language: 'nim',
  defaultTheme: false,
  handleNewLineIndentation: true,
  handleTabs: true,
  tabSize: 2,
});
playground.addLanguage('nim', Prism.languages['nim']);
playground.updateCode(`import strutils, strformat

let
  hello = "hello"
  world = "world"

proc toUpper(text: string, section: Slice[int]): string =
  result = text
  result[section] = text[section].toUpperAscii()

proc helloWorld() =
  echo toUpper(fmt"{hello}, {world}!", 0 .. 0)

helloWorld()`);

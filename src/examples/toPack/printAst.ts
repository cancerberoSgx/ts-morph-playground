import Project, { Node, TypeGuards } from 'ts-morph';
import { State } from '../../store/types';

export default function printAstExample(state: State) {
  const project = new Project()
  const selected = state.files.find(f => !!f.selected)
  const sourceFiles = (selected ? [selected] : state.files)
    .map(f => project.createSourceFile(f.filePath, f.content))
  const printed = sourceFiles.map(f => ({ name: f.getFilePath(), ast: printDescendants(f, 0) }))
  console.log(printed);
  return printed.map(p => `
${p.name}
--------------

${p.ast}
`)
    .join('')

}

function printDescendants(n: Node, level: number) {
  let s = printNode(n, level) + '\n'
  n.forEachChild(c => (s += printDescendants(c, level + 1)))
  return s
}
function indent(i: number = 1, tabSize = 2): string {
  return new Array(i * tabSize).fill(' ').join('')
}
function printNode(n: Node, level: number) {
  const name = TypeGuards.isNameableNode(n) ? n.getName() : ''
  const kind = n.getKindName()
  const text = n.getText().substring(0, Math.min(30, n.getText().length)).trim().replace(/\n/g, '')
  return `${indent(level)} ${name} ${kind} ${text}`
}
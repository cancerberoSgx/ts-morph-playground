import * as tsMorph from 'ts-morph'

export default class implements PackedExample {
  execute(files: File[]) {
    const project = new tsMorph.Project()
    const text = files
      .filter(f => (files.find(f => !!f.selected) ? f.selected : true))
      .map(f => project.createSourceFile(f.filePath, f.content))
      .map(f => ({ name: f.getFilePath(), ast: printAst(f, 0) }))
      .map(
        p => `
${p.name}
--------------

${p.ast}
`
      )
      .join('')
      .trim()

    return { text }

    function printAst(n: tsMorph.Node, level: number) {
      let s = printNode(n, level) + '\n'
      n.forEachChild(c => (s += printAst(c, level + 1)))
      return s
    }
    function indent(i: number = 0, tabSize = 2): string {
      return new Array(i * tabSize).fill(' ').join('')
    }
    function printNode(n: tsMorph.Node, level: number) {
      const name = tsMorph.TypeGuards.isNameableNode(n) ? n.getName() : ''
      const kind = n.getKindName()
      const text = n
        .getText()
        .substring(0, Math.min(30, n.getText().length))
        .trim()
        .replace(/\n/g, '')
      return `${indent(level)} ${name} ${kind} ${text}`
    }
  }

  filePath = '/src/examples/printAst.ts'
  name = 'Print AST'
  description = 'Prints a textual AST representation of selected file or all files of none selected'
  content = printAst_ts
}

interface File {
  filePath: string
  content: string
  selected?: boolean
  selection?: {
    endColumn: number
    endLineNumber: number
    startColumn: number
    startLineNumber: number
  }
}

import { PackedExample } from '../packedExamples'
import { printAst_ts } from '../packed/printAst_ts'

import * as tsMorph from 'ts-morph'

export default class implements PackedExample {

  execute(files: {filePath: string, content: string}[]) {

    const project = new tsMorph.Project()
    const text = files
      .map(f => project.createSourceFile(f.filePath, f.content))
      .map(f => ({ name: f.getFilePath(), ast: this.printAst(f, 0) }))
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
  }

  private printAst(n: tsMorph.Node, level: number) {
    let s = this.printNode(n, level) + '\n'
    n.forEachChild(c => (s += this.printAst(c, level + 1)))
    return s
  }

  private indent(i: number = 1, tabSize = 2): string {
    return new Array(i * tabSize).fill(' ').join('')
  }

  private printNode(n: tsMorph.Node, level: number) {
    const name = tsMorph.TypeGuards.isNameableNode(n) ? n.getName() : ''
    const kind = n.getKindName()
    const text = n
      .getText()
      .substring(0, Math.min(30, n.getText().length))
      .trim()
      .replace(/\n/g, '')
    return `${this.indent(level)} ${name} ${kind} ${text}`
  }

  filePath = 'examples/printAst.ts'
  name = 'print AST'
  description = 'Prints a textual AST representation of selected file or all of none selected'
  content = printAst_ts
  selected = false
}

import { State } from '../../store/types'
import { PackedExample } from '../packedExamples'
import { printAst_ts } from '../packed/printAst_ts'
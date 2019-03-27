import * as tsMorph from 'ts-morph'

export default class implements PackedExample {
  execute(files: File[]) {
    const project = new tsMorph.Project()
    const text = files
      .filter(f => f.selection)
      .map(f => ({
        file: project.createSourceFile(f.filePath, f.content),
        selection: f.selection
      }))
      .map(f => ({
        ...f,
        selectedNode: findDescendantIncludingPosition(f.file, f.selection!)
      }))
      .filter(f => f.selectedNode)
      .map(f =>
        `
In file ${f.file.getFilePath()}, the ${f.selectedNode!.getKindName()} with text "${f
          .selectedNode!.getText()
          .replace(/[\n\s]+/gm, ' ')}" is the smaller node containing the selection ${JSON.stringify(
          f.selection
        ).replace(/"/g, '')}"
    `.trim()
      )
      .join('\n\n')
    return { text }

    function findDescendantIncludingPosition(n: tsMorph.Node, p: Selection): tsMorph.Node | undefined {
      const d = findDescendant(n, d => nodeIncludesPosition(d, p))
      if (d) {
        let c: tsMorph.Node | undefined
        getChildrenForEachChild(d).some(child => {
          const found = findDescendantIncludingPosition(child, p)
          if (found) {
            c = found
            return true
          } else {
            return false
          }
        })
        return c || d
      }
    }

    function nodeIncludesPosition(n: tsMorph.Node, p: Selection) {
      const r = getStartEndLineNumbersAndColumns(n)
      return (
        r.startColumn <= p.startColumn &&
        r.endColumn >= p.endColumn &&
        r.startLineNumber <= p.startLineNumber &&
        r.endLineNumber >= p.endLineNumber
      )
    }
    function findDescendant(
      n: tsMorph.Node,
      fn: (node: tsMorph.Node) => boolean,
      dontIncludeSelf = true
    ): tsMorph.Node | undefined {
      return !dontIncludeSelf && fn(n) ? n : getChildrenForEachChild(n).find(c => !!findDescendant(c, fn, false))
    }
    function getChildrenForEachChild(n: tsMorph.Node): tsMorph.Node[] {
      const result: tsMorph.Node[] = []
      n.forEachChild(n => result.push(n))
      return result
    }
    function getStartEndLineNumbersAndColumns(d: tsMorph.Node) {
      return {
        startColumn:
          tsMorph.ts.getLineAndCharacterOfPosition(d.getSourceFile()!.compilerNode, d.getStart()!).character + 1,
        startLineNumber:
          tsMorph.ts.getLineAndCharacterOfPosition(d.getSourceFile()!.compilerNode, d.getStart()!).line + 1,
        endColumn: tsMorph.ts.getLineAndCharacterOfPosition(d.getSourceFile()!.compilerNode, d.getEnd()!).character + 1,
        endLineNumber: tsMorph.ts.getLineAndCharacterOfPosition(d.getSourceFile()!.compilerNode, d.getEnd()!).line + 1
      }
    }
  }

  filePath = '/src/examples/nodeContainingSelection.ts'
  name = 'Node containing selection'
  description =
    'Select some text in sample files and it will return the smallest node that contains the selection, on each file'
  content = nodeContainingSelection_ts
}

interface File {
  filePath: string
  content: string
  selected?: boolean
  selection?: Selection
}

interface Selection {
  endColumn: number
  endLineNumber: number
  startColumn: number
  startLineNumber: number
}

import { PackedExample } from '../packedExamples'
import { nodeContainingSelection_ts } from '../packed/nodeContainingSelection_ts'

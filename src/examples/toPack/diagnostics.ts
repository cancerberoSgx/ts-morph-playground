import * as tsMorph from 'ts-morph'

export default class implements PackedExample {
  execute(files: File[]) {
    const project = new tsMorph.Project()
    files.forEach(f => project.createSourceFile(f.filePath, f.content))
    const base = project.createSourceFile('base.ts', '')
    // we create a base dummy source file to calculate the relative paths of other files
    const text = project
      .getSourceFiles()
      .filter(f => f.getBaseName() !== 'base.ts')
      .map(f => ({
        text: buildJsxAstDiagnostics(f)
          .map(d =>
            `
 * ${d.code} ${d.file ? base.getRelativePathTo(d.file) : 'unknown file'}:${d.lineNumber} "${d.message}"
          `.trim()
          )
          .join('\n'),
        f
      }))
      .flat()
      .filter(e => e.text.trim())
      .map(e =>
        `
${base.getRelativePathTo(e.f)}:
${e.text}
`.trim()
      )
      .join(`\n\n--------------------------------------------\n`)
    return { text }

    function buildJsxAstDiagnostics(f: tsMorph.SourceFile) {
      return f
        .getPreEmitDiagnostics()
        .filter(d => d && d.compilerObject && d.getSourceFile())
        .map(d => ({
          message: tsMorph.ts.flattenDiagnosticMessageText(d.compilerObject.messageText, '\n'),
          code: d.getCode(),
          file: d.getSourceFile(),
          length: d.getLength(),
          lineNumber: d.getLineNumber(),
          start: d.getStart()
        }))
    }
  }

  filePath = '/src/examples/diagnostics.ts'
  name = 'Project Diagnostics'
  description = "Extract project's diagnostics information with positions compatible with monaco-editor"
  content = diagnostics_ts
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
import { diagnostics_ts } from '../packed/diagnostics_ts'

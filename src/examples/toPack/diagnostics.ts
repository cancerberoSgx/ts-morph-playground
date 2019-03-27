import * as tsMorph from 'ts-morph'

export default class implements PackedExample {
  execute(input: { files: { filePath: string; content: string }[] }) {
    const project = new tsMorph.Project()
    input.files.forEach(f => project.createSourceFile(f.filePath, f.content))
    const base = project.createSourceFile('base.ts', '')
    // we create a base dummy source file to calculate the relative paths
    const text = project
      .getSourceFiles()
      .filter(f => f.getBaseName() !== 'base.ts')
      .map(f => ({
        text: this.buildJsxAstDiagnostics(f)
          .map(d =>
            `
 * ${d.code} ${d.file ? base.getRelativePathTo(d.file) : 'unknown file'}:${d.startLineNumber}:${d.startColumn} "${
              d.message
            }"
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
  }

  private buildJsxAstDiagnostics(f: tsMorph.SourceFile) {
    // const f = project.getSourceFiles().find(s => s.getFilePath().endsWith('t1.tsx'))!
    return f
      .getPreEmitDiagnostics()
      .filter(d => d && d.compilerObject && d.getSourceFile())
      .map(d => ({
        message: tsMorph.ts.flattenDiagnosticMessageText(d.compilerObject.messageText, '\n'),
        code: d.getCode(),
        file: d.getSourceFile(),
        length: d.getLength(),
        lineNumber: d.getLineNumber(),
        start: d.getStart(),
        startColumn:
          tsMorph.ts.getLineAndCharacterOfPosition(d.getSourceFile()!.compilerNode, d.getStart()!).character + 1,
        startLineNumber:
          tsMorph.ts.getLineAndCharacterOfPosition(d.getSourceFile()!.compilerNode, d.getStart()!).line + 1,
        endColumn:
          tsMorph.ts.getLineAndCharacterOfPosition(d.getSourceFile()!.compilerNode, d.getStart()! + d.getLength()!)
            .character + 1,
        endLineNumber:
          tsMorph.ts.getLineAndCharacterOfPosition(d.getSourceFile()!.compilerNode, d.getStart()! + d.getLength()!)
            .line + 1
      }))
  }

  filePath = '/examples/diagnostics.ts'
  name = 'Project Diagnostics'
  description = "Extract project's diagnostics information with positions compatible with monaco-editor"
  content = diagnostics_ts
  selected = false
}

import { PackedExample } from '../packedExamples'
import { diagnostics_ts } from '../packed/diagnostics_ts'

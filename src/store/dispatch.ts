import Project, { BinaryExpression, TypeGuards, ScriptTarget } from 'ts-morph'
import { dispatch } from '..'
import { packedExamples } from '../examples/packedExamples'
import { EXAMPLES_ACTIONS } from './examples'
import { OUTPUT_ACTIONS } from './output'
import { Output, State } from './types'
import { ModuleKind, JsxEmit } from 'typescript';

// TODO: move to saga
// TODO: before exec, if editor has a sample, then change it to selected example first and then exec
export function executeSelectedExample(state: State) {
  const stateExample = state.examples.find(e => !!e.selected)
  if (stateExample) {
    dispatch({ type: EXAMPLES_ACTIONS.SELECT, example: stateExample })
    const ex = packedExamples.find(e => e.filePath === stateExample.filePath)
    if (ex) {
      // HEADS UP : ugly hack : we emit the example content and then replace the execute method.
      // TODO: try to eval the whole emitted text, get the exported class,  instance it, and call execute on that
      const p = new Project({
        // HEADS UP : this should be the most similar to project tsconfig.json
        // compilerOptions: {
        // target: ScriptTarget.ES2018,
        // module: ModuleKind.CommonJS,
        // lib: ["lib.es2018", "lib.dom"],
        // jsx: JsxEmit.React,
        // esModuleInterop: true,
        // }
      })
      p.createSourceFile('test.ts', stateExample.content)
      let result: Output
      let toEval: string = ''
      try {
        const t = p.emitToMemory().getFiles()[0].text
        const fr = p.createSourceFile('test_emit.ts', t)
        const be = fr.getDescendants().find(
          d =>
            TypeGuards.isBinaryExpression(d) &&
            d
              .getLeft()
              .getText()
              .endsWith('prototype.execute')
        ) as BinaryExpression
        const executeMethodText = be.getRight().getText()
        toEval = `var tsMorph = ts_morph_1; (${executeMethodText})`
        const f = eval(toEval)
        ex.execute = f.bind(ex)
        result = ex.execute(state.files.find(f=>!!f.selected) ? [state.files.find(f=>!!f.selected)!] : state.files!)
      } catch (ex) {
        result = {
          text: `ERROR: ${ex} 
${(ex.stack || '').split('\n').join('\n')}
Evaluated code: 
${toEval}`
        }
      }
      dispatch({ type: OUTPUT_ACTIONS.SET, output: result })
    }
  }
}



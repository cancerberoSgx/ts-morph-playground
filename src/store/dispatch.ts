import { State } from './types'
import { packedExamples } from '../examples/packedExamples'
import { dispatch } from '..'
import { OUTPUT_ACTIONS } from './output'

export function executeSelectedExample(state: State) {
  const selected = state.examples.find(e => !!e.selected)
  if (selected) {
    const ex = packedExamples.find(e => e.filePath === selected.filePath)
    if (ex) {
      const result = ex.execute(state)
      dispatch({ type: OUTPUT_ACTIONS.SET, output: result })
    }
  }
}

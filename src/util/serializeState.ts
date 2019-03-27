import { State } from '../store/types'
import { RouterRootState } from 'connected-react-router'

export function stateToString(state: State) {
  const copy: State = {
    ...state,
    files: state.files,
    examples: [state.examples.find(e => !!e.selected) || state.examples[0]],
    selectedFile:
      state.files.find(f => f.filePath === state.selectedFile.filePath) ||
      state.examples.find(e => e.filePath === state.selectedFile.filePath) ||
      state.selectedFile,
    output: { text: '' }
  }
  return encodeURIComponent(JSON.stringify(copy))
}

export function stringToState(s: string) {
  const object = JSON.parse(decodeURIComponent(s))
  return object as State
}

type f = RouterRootState

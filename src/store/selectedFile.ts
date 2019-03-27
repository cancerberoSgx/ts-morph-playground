import { Action, Reducer } from 'redux'
import { File, Example } from './types'
import { packedExamples } from '../examples/packedExamples'
import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import { FILES_ACTIONS, SelectFileAction } from './files'
import { dispatch } from '..'
import { EXAMPLES_ACTIONS, SelectExampleAction } from './examples'
import { Editor, MonacoEditor } from '../components/editor'

export enum SELECTED_FILE_ACTIONS {
  SELECT = 'SELECTED_FILE_SELECT'
}

export const selectedFile: Reducer<File, SelectedFileActions> = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_FILE_ACTIONS.SELECT:
      return action.file
    // case SELECTED_FILE_ACTIONS.EDIT:
    //   return [...state.map(f => ({ ...f, content: f.selected ? action.content : f.content }))]
    default:
      return state
  }
}

interface SelectedFileSelectAction extends Action<SELECTED_FILE_ACTIONS.SELECT> {
  type: SELECTED_FILE_ACTIONS.SELECT
  file: File
}

export type SelectedFileActions = SelectedFileSelectAction

function* watchFileSelected() {
  yield takeEvery(FILES_ACTIONS.SELECT, function*(action: SelectFileAction) {
    yield dispatchSelectedFile(action.file)
  })
}
function* watchExampleSelected() {
  yield takeEvery(EXAMPLES_ACTIONS.SELECT, function*(action: SelectExampleAction) {
    yield dispatchSelectedFile(action.example)
  })
}

function dispatchSelectedFile(file: File) {
  dispatch({ type: SELECTED_FILE_ACTIONS.SELECT, file })
  MonacoEditor.setEditorFile(file)
}

export function* selectedFileSagas() {
  yield all([watchFileSelected(), watchExampleSelected()])
}

const initialState = packedExamples.find(e => (e.selected = true)) || packedExamples[0]

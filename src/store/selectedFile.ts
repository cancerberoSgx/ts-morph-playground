import { Action, Reducer } from 'redux'
import { File, Example, Selection, State } from './types'
import { packedExamples } from '../examples/packedExamples'
import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import { FILES_ACTIONS, SelectFileAction } from './files'
import { dispatch } from '..'
import { EXAMPLES_ACTIONS, SelectExampleAction } from './examples'
import { Editor, MonacoEditor } from '../components/editor'

export enum SELECTED_FILE_ACTIONS {
  SELECT = 'SELECTED_FILE_SELECT',
  CHANGE_CURSOR_SELECTION = 'SELECTED_FILE_CHANGE_CURSOR_SELECTION'
}

export const selectedFile: Reducer<File, SelectedFileActions> = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_FILE_ACTIONS.SELECT:
      return action.file
    case SELECTED_FILE_ACTIONS.CHANGE_CURSOR_SELECTION:
      return { ...state, selection: action.selection }
    default:
      return state
  }
}

interface SelectedFileSelectAction extends Action<SELECTED_FILE_ACTIONS.SELECT> {
  type: SELECTED_FILE_ACTIONS.SELECT
  file: File
}
interface ChangeCursorSelectionAction extends Action<SELECTED_FILE_ACTIONS.CHANGE_CURSOR_SELECTION> {
  type: SELECTED_FILE_ACTIONS.CHANGE_CURSOR_SELECTION
  selection: Selection
}

export type SelectedFileActions = SelectedFileSelectAction | ChangeCursorSelectionAction

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

function* watchChangeCursorSelection() {
  yield takeEvery(SELECTED_FILE_ACTIONS.CHANGE_CURSOR_SELECTION, function*(action: ChangeCursorSelectionAction) {
    const state: State = yield select()
    const selected = state.files.find(f => f.filePath === state.selectedFile.filePath)
    if (selected) {
      yield dispatch({ type: FILES_ACTIONS.EDIT, selection: action.selection })
    }
  })
}

function dispatchSelectedFile(file: File) {
  dispatch({ type: SELECTED_FILE_ACTIONS.SELECT, file })
  MonacoEditor.setEditorFile(file)
}

export function* selectedFileSagas() {
  yield all([watchFileSelected(), watchExampleSelected(), watchChangeCursorSelection()])
}

const initialState = packedExamples.find(e => (e.selected = true)) || packedExamples[0]

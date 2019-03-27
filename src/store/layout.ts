import { Action, Reducer } from 'redux'
import { File, Example, Layout } from './types'
import { packedExamples } from '../examples/packedExamples'
import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import { FILES_ACTIONS, SelectFileAction } from './files'
import { dispatch } from '..'
import { EXAMPLES_ACTIONS, SelectExampleAction } from './examples'
import { Editor } from '../components/Editor2'
import { Theme } from '../theme/theme'
import { lightTheme } from '../theme/lightTheme'
import { darkTheme } from '../theme/darkTheme'

export enum LAYOUT_ACTIONS {
  CHANGE_THEME = 'LAYOUT_CHANGE_THEME'
}

export const layout: Reducer<Layout, LayoutActions> = (state = initialState, action) => {
  switch (action.type) {
    case LAYOUT_ACTIONS.CHANGE_THEME:
      return { ...state, theme: action.theme }
    default:
      return state
  }
}

interface ChangeThemeAction extends Action<LAYOUT_ACTIONS.CHANGE_THEME> {
  type: LAYOUT_ACTIONS.CHANGE_THEME
  theme: Theme
}

export type LayoutActions = ChangeThemeAction

const initialState: Layout = {
  theme: lightTheme,
  themes: [lightTheme, darkTheme]
}

function* watchThemeChange() {
  yield takeEvery(LAYOUT_ACTIONS.CHANGE_THEME, function*(action: ChangeThemeAction) {
    yield monaco.editor.setTheme(action.theme.name === 'dark' ? 'vs-dark' : 'vs')
  })
}

export function* layoutSagas() {
  yield all([watchThemeChange()])
}

import * as monaco from 'monaco-editor'

import * as monaco from 'monaco-editor'
import { Action, Reducer } from 'redux'
import { all, takeEvery } from 'redux-saga/effects'
import { darkTheme } from '../theme/darkTheme'
import { lightTheme } from '../theme/lightTheme'
import { Theme } from '../theme/theme'
import { Layout } from './types'

export type LayoutActions = ChangeThemeAction

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

import { combineReducers } from 'redux'
import { State } from './types'

import { examples } from './examples'
import { files } from './files'
import { output } from './output'
import { layout } from './layout'
import { selectedFile } from './selectedFile'

export const reducers = combineReducers<State>({
  files,
  examples,
  output,
  selectedFile,
  layout
})

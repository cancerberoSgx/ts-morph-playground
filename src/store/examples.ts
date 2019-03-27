import { Action, Reducer } from 'redux'
import { File, Example } from './types'
import { packedExamples } from '../examples/packedExamples'

export enum EXAMPLES_ACTIONS {
  SELECT = 'EXAMPLES_SELECT',
  EDIT = 'EXAMPLES_EDIT'
}

export const examples: Reducer<Example[], ExamplesActions> = (state = initialState, action) => {
  switch (action.type) {
    case EXAMPLES_ACTIONS.SELECT:
      return [...state.map(e => ({ ...e, selected: e.filePath === action.example.filePath }))]
    case EXAMPLES_ACTIONS.EDIT:
      return [...state.map(f => ({ ...f, content: f.selected ? action.content : f.content }))]
    default:
      return state
  }
}

export interface SelectExampleAction extends Action<EXAMPLES_ACTIONS.SELECT> {
  type: EXAMPLES_ACTIONS.SELECT
  example: Example
}

interface EditExampleAction extends Action<EXAMPLES_ACTIONS.EDIT> {
  type: EXAMPLES_ACTIONS.EDIT
  content: string
}

export type ExamplesActions = SelectExampleAction | EditExampleAction

const initialState = packedExamples

import { Action, Reducer } from 'redux'
import { File, Example } from './types'
import { packedExamples } from '../examples/packedExamples'

export enum EXAMPLES_ACTIONS {
  SELECT = 'EXAMPLES_SELECT'
}

export const examples: Reducer<Example[], ExamplesActions> = (state = initialState, action) => {
  switch (action.type) {
    case EXAMPLES_ACTIONS.SELECT:
      return [...state.map(e => ({ ...e, selected: e.filePath === action.example.filePath }))]
    default:
      return state
  }
}

interface SelectExampleAction extends Action<EXAMPLES_ACTIONS.SELECT> {
  type: EXAMPLES_ACTIONS.SELECT
  example: Example
}

export type ExamplesActions = SelectExampleAction

const initialState = packedExamples

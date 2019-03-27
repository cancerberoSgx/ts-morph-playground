import { Action, Reducer } from 'redux'
import { File } from './types'

export enum FILES_ACTIONS {
  ADD = 'FILES_ADD',
  EDIT = 'FILES_EDIT',
  REMOVE = 'FILES_REMOVE',
  SELECT = 'FILES_SELECT'
}

export const files: Reducer<File[], filesActions> = (state = initialState, action) => {
  switch (action.type) {
    case FILES_ACTIONS.ADD:
      return [...state, action.file]
    case FILES_ACTIONS.SELECT:
      return [...state.map(f => ({ ...f, selected: f.filePath === action.file.filePath }))]
    case FILES_ACTIONS.EDIT:
      return [...state.map(f => ({ ...f, content: f.selected ? action.content : f.content }))]
    default:
      return state
  }
}

interface AddFileAction extends Action<FILES_ACTIONS.ADD> {
  type: FILES_ACTIONS.ADD
  file: File
}
export interface SelectFileAction extends Action<FILES_ACTIONS.SELECT> {
  type: FILES_ACTIONS.SELECT
  file: File
}
interface EditFileAction extends Action<FILES_ACTIONS.EDIT> {
  type: FILES_ACTIONS.EDIT
  content: string
}
export type filesActions = AddFileAction | SelectFileAction | EditFileAction

const initialState = [
  {
    filePath: 'src/tool.ts',
    content: `
interface Options {
  greeting: string
  who: string
}
export function tool(options: Options) {
  return options.greeting+ ' '+ options.who
}
`.trim()
  },
  {
    filePath: 'src/main.ts',
    content: `
import {tool} from './tool'
console.log(tool({
  greeting: 'Hello',
  who: 'World'
}))
  `.trim()
  }
]

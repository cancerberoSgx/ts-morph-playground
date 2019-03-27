import { Action, Reducer } from 'redux'
import { File, Selection } from './types'

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
      const selected = state.find(f => !!f.selected)!
      return [
        ...state.filter(f => f !== selected),
        {
          ...selected,
          content: typeof action.content === 'undefined' ? selected.content : action.content,
          selection: typeof action.selection === 'undefined' ? selected.selection : action.selection
        }
      ]
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
  content?: string
  selection?: Selection
}
export type filesActions = AddFileAction | SelectFileAction | EditFileAction

const initialState = [
  {
    filePath: '/src/tool.ts',
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
    filePath: '/src/main.ts',
    content: `
import {tool} from './tool'
console.log(tool({
  greeting: 'Hello',
  who: 'World'
}))
  `.trim()
  },
  {
    filePath: '/src/ui/app.tsx',
    content: `
import * as React from 'react'
export class App extends React.Component<{}, {}> {
  render(){
    return <div>Hello world</div>
  }
}
  `.trim()
  }
]

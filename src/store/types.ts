import { filesActions } from './files'
import { ExamplesActions } from './examples'
import { OutputActions } from './output'

export interface State {
  files: File[]
  examples: Example[]
  output?: Output
}

export interface File {
  filePath: string
  content: string
  selected?: boolean
}

export interface Output {
  text: string
}
export interface Example extends File {
  name: string
}

export type AllActions = filesActions | ExamplesActions | OutputActions

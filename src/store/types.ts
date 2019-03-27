import { filesActions } from './files';

export interface State {
  files: File[]
  examples: Example[]
}
export interface File {
  filePath: string
  content: string
  selected?: boolean
}
export interface Example extends File {
  name: string
}

export type AllActions = filesActions

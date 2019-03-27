import { filesActions } from './files'
import { ExamplesActions } from './examples'
import { OutputActions } from './output'
import { SelectedFileActions } from './selectedFile'
import { Theme } from '../theme/theme'
import { LayoutActions } from './layout'

export interface State {
  files: File[]
  examples: Example[]
  selectedFile: File
  output: Output
  layout: Layout
}

export interface Layout {
  theme: Theme
  themes: Theme[]
}

export interface File {
  filePath: string
  content: string
  selected?: boolean
  selection?: Selection
}
export interface Selection {
  endColumn: number
  endLineNumber: number
  // positionColumn: number
  // positionLineNumber: number
  // selectionStartColumn: number
  // selectionStartLineNumber: number
  startColumn: number
  startLineNumber: number
}

export interface Output {
  text?: string
}
export interface Example extends File {
  name: string
  description: string
}

export type AllActions = filesActions | ExamplesActions | OutputActions | SelectedFileActions | LayoutActions

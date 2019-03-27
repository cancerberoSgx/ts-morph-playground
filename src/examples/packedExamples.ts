import { Example, State, Output } from '../store/types'
import printAst from './toPack/printAst'
import diagnostics from './toPack/diagnostics'
import nodeContainingSelection from './toPack/nodeContainingSelection'

export interface PackedExample extends Example {
  execute<
    T extends {
      filePath: string
      content: string
      selected?: boolean
      selection?: {
        endColumn: number
        endLineNumber: number
        startColumn: number
        startLineNumber: number
      }
    }
  >(
    files: T[]
  ): Output
}

export const packedExamples: PackedExample[] = [new printAst(), new diagnostics(), new nodeContainingSelection()]

packedExamples[0].selected = true

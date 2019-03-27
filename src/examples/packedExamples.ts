import { Example, State, Output, Selection, File } from '../store/types'
import printAst from './toPack/printAst'
import diagnostics from './toPack/diagnostics'
import nodeContainingSelection from './toPack/nodeContainingSelection'

export interface PackedExample extends Example {
  execute(files?: File[]): Output
}

export const packedExamples: PackedExample[] = [new printAst(), new diagnostics(), new nodeContainingSelection()]

packedExamples[0].selected = true

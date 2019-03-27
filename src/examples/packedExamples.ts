import { Example, State, Output } from '../store/types'
import printAst from './toPack/printAst'
import diagnostics from './toPack/diagnostics';

export interface PackedExample extends Example {
  execute(input?: {files: { filePath: string; content: string }[], selection?: {pos: number, end: number, filePath: string}}): Output
}

export const packedExamples: PackedExample[] = [new printAst(), new diagnostics()]
packedExamples[0].selected = true

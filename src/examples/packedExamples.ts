import { Example, State, Output } from '../store/types'
import printAst from './toPack/printAst'

export interface PackedExample extends Example {
  execute(input?: {files: { filePath: string; content: string }[], selection: {pos: number, end: number, filePath: string}}): Output
}

export const packedExamples: PackedExample[] = [new printAst()]
packedExamples[0].selected = true

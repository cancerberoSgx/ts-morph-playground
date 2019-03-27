import { Example, State, Output } from '../store/types'
import printAst from './toPack/printAst'

export interface PackedExample extends Example {
  execute(state: State): Output
}

const first = new printAst()
first.selected = true
export const packedExamples: PackedExample[] = [first]

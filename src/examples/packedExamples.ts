import { Example, State, Output } from '../store/types'
import printAst from './toPack/printAst'

export interface PackedExample extends Example {
  name: string
  description: string
  execute(state: State): Output
}

export const packedExamples: PackedExample[] = [new printAst()]

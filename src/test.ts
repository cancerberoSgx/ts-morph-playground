import {Project} from 'ts-morph'

export function test() {
  const project = new Project()
  const file1 = project.createSourceFile('tool.ts', `
interface Options {
  greeting: string
  who: string
}
export function tool(options: Options) {
  return options.greeting+ ' '+ options.who
}
  `)
  const file2 = project.createSourceFile('main.ts', `
import {tool} from './tool'
console.log(tool({
  greeting: 'Hello',
  who: 'World'
}))
    `)
    const diagnostics = project.getPreEmitDiagnostics()
    console.log(diagnostics.map(d=>d.getMessageText()));
    
}

test()
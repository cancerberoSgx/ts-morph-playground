import { File } from '../store/types'
import './editor.css'
import * as React from 'react'

export interface P {
  file?: File
  onChange(v: string): void
}
export class Editor extends React.Component<P, {}> {
  render() {
    return this.props.file ? (
      <article className="editor">
        <textarea value={this.props.file.content} onChange={e => this.props.onChange(e.currentTarget.value)} />
      </article>
    ) : (
      <div />
    )
  }
}

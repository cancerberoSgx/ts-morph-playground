import * as React from 'react'
import { State } from '../store/types'
import './app.css'
import { Files } from './files'
import { connect } from 'react-redux'
import { Examples } from './examples'
import { FileEditor } from './fileEditor'
import { ExampleEditor } from './exampleEditor'
import { Output } from './output'
import { executeSelectedExample } from '../store/dispatch'

class App_ extends React.Component<{ state: State }, {}> {
  render() {
    return (
      <article>
        <h1>ts-morph examples in the browser</h1>
        <div className="wrapper">
          <div className="files">
            <Files />
          </div>
          <div className="files-editor">
            <FileEditor />
          </div>
          <div className="examples">
            <Examples />
          </div>
          {this.props.state.examples.find(e => !!e.selected) && (
            <div className="examples-editor">
              <ExampleEditor /> <button onClick={ev => executeSelectedExample(this.props.state)}>Execute</button>
            </div>
          )}
          {this.props.state.output && this.props.state.output.text && (
            <div className="output">
              <Output />
            </div>
          )}
        </div>
      </article>
    )
  }
}

const mapStateToProps = (state: State) => ({
  state: state
})

export const App = connect(mapStateToProps)(App_)

import * as React from 'react';
import { State } from '../store/types';
import './app.css'
import { Files } from './files';
import { connect } from 'react-redux';
import { Examples } from './examples';
import { FileEditor } from './fileEditor';
import { ExampleEditor } from './exampleEditor';
import printAstExample from '../examples/toPack/printAst';
import { Output } from './output';
import { dispatch } from '..';
import { OUTPUT_ACTIONS } from '../store/output';

class App_ extends React.Component<{ state: State }, {}> {
  render() {
    return <article>
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
        <div className="examples-editor">
          <ExampleEditor />
          <button onClick={e => dispatch({type: OUTPUT_ACTIONS.SET, output: {text: printAstExample(this.props.state)}})}>Execute</button>
        </div>
        <div className="output">
          <Output />
        </div>
      </div>
    </article>
  }
}

const mapStateToProps = (state: State) => ({
  state: state
})

export const App = connect(mapStateToProps)(App_)

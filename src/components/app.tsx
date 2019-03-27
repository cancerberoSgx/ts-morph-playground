import * as React from 'react';
import { State } from '../store/types';
import './app.css'
import { Editors } from './files';
import { connect } from 'react-redux';
import { Editor } from './editor';

class App_ extends React.Component<{}, {}> {
  render() {
    return <article>
      <h1>ts-morph example in the browser</h1>
      <div className="wrapper">
        <div className="files"><Editors /></div>
        <div className="editor"><Editor /></div>
      </div>
    </article>
  }
}

const mapStateToProps = (state: State) => ({
})

export const App = connect(mapStateToProps)(App_)

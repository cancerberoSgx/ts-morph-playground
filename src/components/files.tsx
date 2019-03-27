import * as React from 'react';
import './files.css'
import { File, State } from '../store/types';
import { connect } from 'react-redux';
import { dispatch } from '..';
import { FILES_ACTIONS } from '../store/files';

interface P { files: File[] }

class Editors_ extends React.Component<P, {}> {
  render() {
    return <article className="files">
     {/* <a onClick={e=>dispatch({type: FILES_ACTIONS.SELECT, file: f})}>{f.filePath}</a> */}
      <button onClick={e=>this.add()}>Add</button>
      <ul>
        {this.props.files.map(f=><li className="file" key={f.filePath}>
          <a onClick={e=>dispatch({type: FILES_ACTIONS.SELECT, file: f})}>{f.filePath}</a>
        </li>)}
      </ul>
    </article>
  }
  add(): void {
   dispatch({type: FILES_ACTIONS.ADD, file: {
    filePath: this.props.files.length+'_test.ts', 
    content: 'export const c = 1'
  }})
  }
}

const mapStateToProps = (state: State) => ({
  files: state.files
})

export const Editors = connect(mapStateToProps)(Editors_)
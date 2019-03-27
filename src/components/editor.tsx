import * as React from 'react';
import './editor.css'
import { File, State } from '../store/types';
import { connect } from 'react-redux';
import { FILES_ACTIONS } from '../store/files';
import { dispatch } from '..';
interface P {
  file?: File
}

class Editor_ extends React.Component<P, {}> {
  render() {
    return this.props.file ?  <article className="editor">
      <textarea value={this.props.file.content} onChange={e=>dispatch({type: FILES_ACTIONS.EDIT, content: e.currentTarget.value})}
      // file: {...this.props.file, content: e.currentTarget.value}})
    />
    </article> : <div>select a file</div>
  }
}

const mapStateToProps = (state: State) => ({
  file: state.files.find(f=>!!f.selected)
})

export const Editor = connect(mapStateToProps)(Editor_)
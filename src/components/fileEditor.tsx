import { State } from '../store/types';
import { connect } from 'react-redux';
import { Editor } from './editor';
import { FILES_ACTIONS } from '../store/files';
import { dispatch } from '..';

const mapStateToProps = (state: State) => ({
  file: state.files.find(f=>!!f.selected),
  onChange(content:string){
    dispatch({ type: FILES_ACTIONS.EDIT, content })
  }
})

export const FileEditor = connect(mapStateToProps)(Editor)

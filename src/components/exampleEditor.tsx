import { State } from '../store/types'
import { connect } from 'react-redux'
import { Editor } from './editor'
import { EXAMPLES_ACTIONS } from '../store/examples'
import { dispatch } from '..'

const mapStateToProps = (state: State) => ({
  file: state.examples.find(f => !!f.selected),

  onChange(content: string) {
    // dispatch({ type: EXAMPLES_ACTIONS.EDIT, content })
  }
})

export const ExampleEditor = connect(mapStateToProps)(Editor)

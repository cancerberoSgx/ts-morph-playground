import * as React from 'react'
import { connect } from 'react-redux'
import { Output as OutputState, State } from '../store/types'
import './app.css'

class Output_ extends React.Component<{ output?: OutputState }, {}> {
  render() {
    return (
      this.props.output && (
        <article className="output">
          <h1>Execution output</h1>
          <textarea value={this.props.output.text} />
        </article>
      )
    )
  }
}

const mapStateToProps = (state: State) => ({
  output: state.output
})

export const Output = connect(mapStateToProps)(Output_)

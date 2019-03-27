import * as React from 'react';
import './Examples.css'
import { File, State, Example } from '../store/types';
import { connect } from 'react-redux';
import { dispatch } from '..';

interface P {
  examples: Example[]
}

class Examples_ extends React.Component<P, {}> {
  render() {
    return <article className="examples">
      <ul>
        {this.props.examples.map(e=><li key={e.name}>
        <button onClick={e=>dispatch({})}>{e.name}</button>
        </li>)}
      </ul>
    />
    </article> : <div>select a file</div>
  }
}

const mapStateToProps = (state: State) => ({
  file: state.files.find(f=>!!f.selected)
})

export const Examples = connect(mapStateToProps)(Examples_)
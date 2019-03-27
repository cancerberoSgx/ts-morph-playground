import * as React from 'react'
import withStyles, { WithSheet } from 'react-jss'
import { connect } from 'react-redux'
import { dispatch } from '..'
import { executeSelectedExample } from '../util/executeSelectedExample'
import { LAYOUT_ACTIONS } from '../store/layout'
import { State } from '../store/types'
import { Theme } from '../theme/theme'
import { createStyles, commonStyles } from '../theme/style'
import { Editor } from './editor'
import { Examples } from './examples'
import { Files } from './files'
import { Output } from './output'
import { ForkRibbon } from './forkRibbon'
import { RouteComponentProps, Route } from 'react-router'
import { push } from 'connected-react-router'
import { stateToString } from '../util/serializeState'
import { Link } from 'react-router-dom'

interface P extends WithSheet<typeof styles, Theme>, RouteComponentProps<any> {
  state: State
}

export function randomIntBetween(a: number, b: number) {
  return Math.floor(Math.random() * b) + a
}
class App_ extends React.Component<P, {}> {
  render() {
    console.log('App', this.props.match)
    const { classes, state } = this.props
    return (
      <article className={classes.root}>
        <ForkRibbon />
        {/* <Route path={`${this.props.match.path}/:id`} component={(p:any)=><div>lskdjflskdjflskj dflksj dlkf j</div>} /> */}
        {/* <Topics match/> */}
        {/* <Route path="/topics" component={Topics} /> */}

        <h1>ts-morph examples in the browser</h1>
        <select
          className={classes.selectTheme}
          onChange={e =>
            dispatch({
              type: LAYOUT_ACTIONS.CHANGE_THEME,
              theme: state.layout.themes.find(t => t.name === e.currentTarget.value)!
            })
          }>
          {state.layout.themes.map(t => (
            <option key={t.name}>{t.name}</option>
          ))}
        </select>
        {/* <button className={classes.selectTheme}
          onClick={e =>{
            const hash = this.props.match.url+'&fo'+randomIntBetween(2,22)+'='+randomIntBetween(2,22)
            // dispatch(push({state:hash,  hash}))
            dispatch(push(hash))
          }
          }>generate url{JSON.stringify(this.props.match.params||{})}</button> */}
        {/* <Link to={'/state/'+stateToString(state)}>state url</Link><br/>
          <a href={this.props.match.path+'#/state/'+stateToString(state)}>state url</a> */}

        <div className={classes.wrapper}>
          <div className={classes.examples}>
            <Examples />
          </div>
          <div className={classes.files}>
            <Files />
          </div>
          <div className={classes.examplesEditor}>
            {state.selectedFile && (
              <button className={classes.button} onClick={ev => executeSelectedExample(state)}>
                Execute
              </button>
            )}
            <Editor />
          </div>
          {state.output && state.output.text && (
            <div className={classes.output}>
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

const styles = (theme: Theme) =>
  createStyles({
    ...commonStyles(theme),
    selectTheme: {
      float: 'right',
      marginTop: '-3em'
    },
    root: {
      backgroundColor: theme.backgroundColor,
      color: theme.foregroundColor,
      margin: 0,
      padding: '1em'
    },
    wrapper: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridGap: '10px',
      gridAutoRows: 'minmax(100px, auto)'
    },
    examples: {
      gridColumn: '1/3',
      gridRow: 1
    },
    files: {
      gridColumn: '3/4',
      gridRow: 1
    },
    examplesEditor: {
      gridColumn: '1/3',
      gridRow: 2
    },
    output: {
      gridColumn: '3/4',
      gridRow: 2
    }
  })

export const App = withStyles(styles)(connect(mapStateToProps)(App_))

// function Topics(props: {match: any}) {
//   // console.log('Topics', props.match);

//   return (
//     <div>
//       <h2>Topics</h2>

//       <ul>
//         <li>
//           <Link to={`${props.match.url}/components`}>Components</Link>
//         </li>
//         <li>
//           <Link to={`${props.match.url}/props-v-state`}>Props v. State</Link>
//         </li>
//       </ul>

//       <Route path={`${props.match.path}/:id`} component={(p:any)=>{console.log('interno', p.match);
//       return <div>123123123lskdjflskdjflskja dflksj dlkf j</div>}}/>
//       <Route
//         exact
//         path={props.match.path}
//         render={() => <h3>Please select a topic.</h3>}
//       />
//     </div>
//   );
// }

import * as React from 'react'
import withStyles, { WithSheet } from 'react-jss'
import { connect } from 'react-redux'
import { dispatch } from '..'
import { executeSelectedExample } from '../store/dispatch'
import { LAYOUT_ACTIONS } from '../store/layout'
import { State } from '../store/types'
import { Theme } from '../theme/theme'
import { createStyles, commonStyles } from '../theme/style'
import './app.css'
import { Editor } from './Editor2'
import { Examples } from './examples'
import { Files } from './files'
import { Output } from './output'

interface P extends WithSheet<typeof styles, Theme> {
  state: State
}

class App_ extends React.Component<P, {}> {
  render() {
    const { classes, state } = this.props
    return (
      <article className={classes.root}>
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
        </div>
        {state.output && state.output.text && (
          <div className={classes.output}>
            <Output />
          </div>
        )}
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
      gridColumn: '1/2',
      gridRow: 1
    },
    files: {
      gridColumn: '3/4',
      gridRow: 1
    },
    examplesEditor: {
      gridColumn: '1/4',
      gridRow: 2
    },
    output: {
      gridColumn: '1/4',
      gridRow: 3
    }
  })

export const App = withStyles(styles)(connect(mapStateToProps)(App_))

import * as React from 'react'
import withStyles, { WithSheet } from 'react-jss'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { dispatch } from '..'
import { stateToString } from '../store/dispatch/getStateFromLocation'
import { LAYOUT_ACTIONS } from '../store/layout'
import { State } from '../store/types'
import { Theme } from '../theme/theme'

interface P extends WithSheet<typeof styles, Theme>, RouteComponentProps<any> {
  state: State
}

class Header_ extends React.Component<P, {}> {
  render() {
    const { classes, state } = this.props
    return (
      <nav className={`${classes.nav}`}>
        <a href="#" className={`brand`}>
          <span aria-hidden="true" data-icon="&#x21dd;" />
          <span>ts-morph Playground</span>
        </a>
        <select
          className="button"
          onChange={e =>
            dispatch({
              type: LAYOUT_ACTIONS.CHANGE_THEME,
              theme: state.layout.themes.find(t => t.name === e.currentTarget.value)!
            })
          }>
          {state.layout.themes.map(t => (
            <option key={t.name} value={t.name}>
              {t.name} theme
            </option>
          ))}
        </select>
        <Link className="button" to={'/state/' + stateToString(state)}>
          Create Url
        </Link>
      </nav>
    )
  }
}

const mapStateToProps = (state: State) => ({
  state: state
})

const styles = (theme: Theme) => ({
  nav: {
    backgroundColor: theme.backgroundColor,
    color: theme.foregroundColor,
    '@global': {
      '.brand': {
        padding: '0 1em 0.9em 0'
      },
      '.brand *': {
        color: theme.colorPrimary
      }
    }
  }
})

export const Header = withStyles(styles)(connect(mapStateToProps)(Header_))

import * as React from 'react'
import { connect } from 'react-redux'
import { App } from './components/app'
import { State } from './store/types'
import withStyles, { ThemeProvider, WithSheet } from 'react-jss'
import { Theme } from './theme/theme'

const styles = {}
interface P extends WithSheet<typeof styles, Theme> {
  state: State
}
class ThemedApp_ extends React.Component<P> {
  render() {
    return (
      <ThemeProvider theme={this.props.state.layout.theme}>
        <App />
      </ThemeProvider>
    )
  }
}
const mapStateToProps = (state: State) => ({
  state: state
})
export const ThemedApp = withStyles(styles)(connect(mapStateToProps)(ThemedApp_))

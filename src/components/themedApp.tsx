import * as React from 'react'
import withStyles, { ThemeProvider, WithSheet } from 'react-jss'
import { connect } from 'react-redux'
import { HashRouter, Route, Switch, RouteComponentProps } from 'react-router-dom'
import { State } from '../store/types'
import { Theme } from '../theme/theme'
import { App } from './app'

const styles = {}
interface P extends WithSheet<typeof styles, Theme> {
  state: State
}
class ThemedApp_ extends React.Component<P> {
  render() {
    return (
      <ThemeProvider theme={this.props.state.layout.theme}>
        <HashRouter hashType={'slash'}>
          {/* <Link to="/about">About</Link> */}

          <Switch>
            <Route
              path="/state/"
              component={(props: RouteComponentProps<any>) => {
                //reset state by calling actions example.
                return <App {...this.props as any} />
              }}
            />

            <Route path="/:params" component={App} />
            <Route path="/" component={App} />

            <Route component={(props: any) => <div>404 not founddddd</div>} />
          </Switch>
        </HashRouter>
      </ThemeProvider>
    )
  }
}
const mapStateToProps = (state: State) => ({
  state: state
})
export const ThemedApp = withStyles(styles)(connect(mapStateToProps)(ThemedApp_))

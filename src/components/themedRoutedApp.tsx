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
class ThemedRoutedApp_ extends React.Component<P> {
  render() {
    return (
      <ThemeProvider theme={this.props.state.layout.theme}>
        <HashRouter hashType={'slash'}>
          <Switch>
            <Route
              path="/state/:state"
              component={App}
              // render={(props: RouteComponentProps<{state:string}>) => {
              //   //reset state by calling actions example.
              //   let state: State|undefined
              //   try {
              //     state = stringToState(props.match.params.state)
              //   } catch (error) {
              //     console.error('Error loading state from url ', error, error.stack);
              //     debugger
              //   }
              //   dispatch(push('/'))
              //   // if(state){
              //     // dispatch({type: EXAMPLES_ACTIONS.RESET, ...state})
              //     // dispatch({type: FILES_ACTIONS.RESET, ...state})
              //     // console.log('reset state by calling RESET actions done');
              //   // return <div>loading state from url param</div>

              //   // }
              //   return <div>cleaning state url param</div>
              //   // return <App {...this.props as any} />

              // }}
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
export const ThemedRoutedApp = withStyles(styles)(connect(mapStateToProps)(ThemedRoutedApp_))

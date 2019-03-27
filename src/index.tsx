import * as React from 'react'
import * as ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { ThemedApp } from './components/themedApp'
import { initMonacoWorkers } from './monaco/initMonacoWorkers'
import { reducers } from './store/reducers'
import { rootSaga } from './store/rootSaga'
import { AllActions } from './store/types'
import './theme/global.css'
import { createHashHistory } from 'history'
import { routerMiddleware, ConnectedRouter } from 'connected-react-router'

initMonacoWorkers()

const sagaMiddleware = createSagaMiddleware()
export const history = createHashHistory()

const store = createStore(reducers(history), compose(applyMiddleware(routerMiddleware(history), sagaMiddleware)))

const div = document.createElement('div')
document.body.appendChild(div)

ReactDom.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemedApp />
    </ConnectedRouter>
  </Provider>,
  div
)

sagaMiddleware.run(rootSaga)

export function dispatch(a: AllActions) {
  // console.log(a, store.getState())
  store.dispatch(a)
}

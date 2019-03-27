import * as React from 'react'
import * as ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { ThemedApp } from './components/themedApp'
import { initMonacoWorkers } from './monaco/initMonacoWorkers'
import { reducers } from './store/reducers'
import { rootSaga } from './store/rootSaga'
import { AllActions } from './store/types'
import './theme/global.css'

initMonacoWorkers()

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducers, applyMiddleware(sagaMiddleware))

const div = document.createElement('div')
document.body.appendChild(div)

ReactDom.render(
  <Provider store={store}>
    <ThemedApp />
  </Provider>,
  div
)

sagaMiddleware.run(rootSaga)

export function dispatch(a: AllActions) {
  // console.log(a, store.getState())
  store.dispatch(a)
}

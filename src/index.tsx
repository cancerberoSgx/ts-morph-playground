import * as React from 'react'
import * as ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import { AllActions } from './store/types'
import { selectedFileSagas } from './store/selectedFile'
import { initMonacoWorkers } from './monaco/initMonacoWorkers'
import { reducers } from './store/reducers'
import { ThemedApp } from './components/themedApp'
import { layoutSagas } from './store/layout'
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

function* rootSaga() {
  yield all([selectedFileSagas(), layoutSagas()])
}

sagaMiddleware.run(rootSaga)

export function dispatch(a: AllActions) {
  // console.log(a, store.getState())
  store.dispatch(a)
}

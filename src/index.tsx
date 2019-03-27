
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { App } from './components/app';
import { files } from './store/files';
import { State, AllActions } from './store/types';
import { ReducersMapObject, combineReducers, createStore, Action } from 'redux';
import { Provider } from 'react-redux';

const reducerStateMap: ReducersMapObject<State, AllActions> = {
  files: files
}

const reducers = combineReducers<State>(reducerStateMap)

const store = createStore(reducers)

const div = document.createElement('div')
document.body.appendChild(div)

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  div,
)

export function dispatch(a: AllActions) {
  store.dispatch(a)
}
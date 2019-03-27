
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { App } from './components/app';
import { examples } from './store/examples';
import { files } from './store/files';
import { AllActions, State } from './store/types';
import { output } from './store/output';

const reducers = combineReducers<State>({
  files: files,
  examples: examples,
  output: output
})

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
  console.log(a, store.getState());
  
  store.dispatch(a)
}
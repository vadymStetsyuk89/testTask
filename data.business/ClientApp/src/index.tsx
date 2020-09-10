import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import storeProvider from './helpers/store.provider';
import configure from './store/store';
import { Router } from 'react-router';
import { TestComponent } from './test';
import AppRouting from './components/AppRouting';

const history: any = createBrowserHistory();
const initialState = (window as any).initialReduxState;
const store = configure(history, initialState);

storeProvider.init(store);

export type AppDispatch = typeof store.dispatch;

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <AppRouting />
    </Router>
  </Provider>,
  document.getElementById('root')
);

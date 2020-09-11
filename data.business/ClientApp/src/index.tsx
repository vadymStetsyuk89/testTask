import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import configure from './store/store';
import { Router } from 'react-router';
import AppRouting from './components/AppRouting';

const history: any = createBrowserHistory();
const initialState = (window as any).initialReduxState;
const store = configure(history, initialState);

export type AppDispatch = typeof store.dispatch;

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <AppRouting />
    </Router>
  </Provider>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import * as reducers from './reducers';
import { App, Home, Foo, Bar, Auth } from './components';

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
});

const store = createStore(
  reducer
);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ history }>
      <Route path="/" component={ App }>
        <IndexRoute component={ Home } />
        <Route path="auth" component={ Auth } />
        <Route path="foo" component={ Foo } />
        <Route path="bar" component={ Bar } />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);

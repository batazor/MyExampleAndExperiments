import React from 'react';
import ReactDOM from 'react-dom';

// first we import some components
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';

import './components/Routing/main.css';

import App from './components/Routing/App';
import About from './components/Routing/About';
import Home from './components/Routing/Home';
import Repos from './components/Routing/Repos';

ReactDOM.render(
  <Router history={ hashHistory }>
    <Route path="/" component={ App }>
      <IndexRoute component={ Home } />
      <Route path="about" component={ About } />
      <Route path="repos" component={ Repos } />
    </Route>
  </Router>, document.getElementById('root')
);

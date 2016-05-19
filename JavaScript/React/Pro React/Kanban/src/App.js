import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import './css/main.css';

import cardsList from './data.json';

import KanbanBoardContainer from './components/KanbanBoard';
import KanbanBoard from './components/KanbanBoard/KanbanBoard';
import EditCard from './components/KanbanBoard/EditCard';
import NewCard from './components/KanbanBoard/NewCard';

ReactDOM.render((
  <Router history={ browserHistory }>
    <Route component={ KanbanBoardContainer }>
      <Route path="/" component={ KanbanBoard }>
        <Route path="new" component={ NewCard } />
        <Route path="edit/:card_id" component={ EditCard } />
      </Route>
    </Route>
  </Router>
), document.getElementById('root'));

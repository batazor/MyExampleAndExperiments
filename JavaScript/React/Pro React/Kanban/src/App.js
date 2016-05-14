import React from 'react';
import ReactDOM from 'react-dom';

import KanbanBoard from './components/KanbanBoard';
import cardsList from './data.json';
import './css/main.css';

ReactDOM.render(<KanbanBoard cards={ cardsList } />, document.getElementById('root'));

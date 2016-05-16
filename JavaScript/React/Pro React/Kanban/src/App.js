import React from 'react';
import ReactDOM from 'react-dom';

import KanbanBoardContainer from './components/KanbanBoard';
import cardsList from './data.json';
import './css/main.css';

ReactDOM.render(<KanbanBoardContainer cards={ cardsList } />, document.getElementById('root'));

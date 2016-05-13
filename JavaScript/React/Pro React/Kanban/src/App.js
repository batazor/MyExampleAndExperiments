import React from 'react';
import ReactDOM from 'react-dom';

import KanbanBoard from './components/KanbanBoard';
import cardList from './data.json';

ReactDOM.render(<KanbanBoard cards={ cardList } />, document.getElementById('root'));

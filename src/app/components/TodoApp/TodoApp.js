import React from 'react' // eslint-disable-line no-unused-vars
import Footer from './Footer'
import AddTodo from '../../containers/AddTodo'
import VisibleTodoList from '../../containers/VisibleTodoList'

import Header from '../Header'
import Menu from '../Menu'
import Chat from '../Chat'
import menuItem from '../../data/menu.json'

const Todo = () => (
  <div className='row'>
    <div className='col-xs'>
      <Header />
      <div className='row'>
        <div className='col-xs-3'>
          <Menu items={menuItem} />
        </div>
        <div className='col-xs-8'>
          <AddTodo />
          <VisibleTodoList />
          <Footer />
        </div>
        <div className='col-xs-1'>
          <Chat />
        </div>
      </div>
    </div>
  </div>
)

export default Todo

import React, { Component } from 'react';

class CheckList extends Component {
  render() {
    let tasks = this.props.tasks.map((task) => (
      <li key={ task.id } className="checlist__task">
        <input type="checkbox" defaultChecked={ task.done } />
        { task.name }
        <a href="#" className="checklist__task--remove" />
      </li>
    ));

    return (
      <div className="checlist">
        <div className="checlist">
          <ul>{ tasks }</ul>
          <input type="text"
                  className="checklist--add-task"
                  placeholder="Typethen hit Enter to add a task"/>
        </div>
      </div>
    );
  }
}

export default CheckList;

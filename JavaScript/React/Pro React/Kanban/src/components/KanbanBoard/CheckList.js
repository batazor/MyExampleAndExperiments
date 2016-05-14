import React, { Component } from 'react';

class CheckList extends Component {
  render() {
    let tasks = this.props.tasks.map((tasks) => (
      <li className="checlist__task">
        <input type="checkbox" defaultChecked={ task.done } />
        { task.name }
        <a href="#" className="checklist__task--remove" />
      </li>
    ));

    return (
      <div className="checlist">
        <ul>{ tasks }</ul>
      </div>
    );
  }
}

export default CheckList;

import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        <header>App</header>
        <menu>
          <ul>
            <li><a href="about">About</a></li>
            <li><a href="repos">Repos</a></li>
          </ul>
        </menu>
        { this.props.children }
      </div>
    )
  }
}

export default App;

import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

// Pure component that receives 2 props from the parent
// filterText (string) and onUserInput (callback function)
class SearchBar extends Component {
  handleChange(event) {
    this.props.onUserInput(event.target.value)
  }

  render() {
    return <input type="search"
                  placeholder="search"
                  value={ this.props.filterText }
                  onChange={ this.handleChange.bind(this) } />
  }
}

SearchBar.propTypes = {
  onUserInput: PropTypes.func.isRequired,
  filterText: PropTypes.string.isRequired
}

export default SearchBar;

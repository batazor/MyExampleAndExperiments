import React, { Component } from 'react';
import CheckList from './CheckList';

class Card extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      showDetails: false
    }
  }

  toggleDetails() {
    this.setState({ showDetails: !this.state.showDetails });
  }

  render() {
    let cardDetails;

    if (this.state.chowDetails) {
      cardDetails = (
        <div className="card__details">
          { this.props.description }
          <CheckList cardId={ this.props.id } tasks={ this.props.tasks } />
        </div>
      );
    };

    return (
      <div className="card">
        <div className="card__title" onClick={ this.toggleDetails.bind(this) }>
          { this.props.title }
        </div>
        { cardDetails }
      </div>
    );
  }
}

export default Card;

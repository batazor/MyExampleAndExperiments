import React, { Component } from 'react';
import Card from './Card';

class List extends Component {
  render() {
    let cards = this.props.cards.map((card) => {
      return <Card id={card.id}
                    title={card.title}
    });
  }
}

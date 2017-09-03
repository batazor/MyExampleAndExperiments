/**
 * Sample React Native App
 * @flow
 */

import React, { Component } from 'react';
import { Container } from 'native-base';

import Header from './containers/Header';
import Content from './containers/Content';
import Footer from './containers/Footer';

export default class mobileEmulator extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content />
        <Footer />
      </Container>
    );
  }
}

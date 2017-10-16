/**
 * Sample React Native App
 * @flow
 */

import React, { Component } from 'react'
import { Container } from 'native-base'
import { StackNavigator } from 'react-navigation'
import {
  Button,
} from 'react-native';

import Header from './containers/Header'
import Content from './containers/Content'
import Footer from './containers/Footer'

// Page
import ChatScreen from './page/About'

class mobileEmulator extends Component {

  static navigationOptions = {
    title: 'Welcome',
  };

  render() {

    const { navigate } = this.props.navigation;

    return (
      <Container>
        <Header />

        <Button
          onPress={() => navigate('Chat', { user: 'Lucy' })}
          title="Chat with Lucy"
        />

        <Content />
        <Footer />
      </Container>
    );
  }
}

const SimpleApp = StackNavigator({
  Home: { screen: mobileEmulator },
  Chat: { screen: ChatScreen },
});

export default SimpleApp;

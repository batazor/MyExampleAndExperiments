/**
 * Sample React Native App
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

class ChatScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: `Chat with ${navigation.state.params.user}`,
  });

  render() {

    // The screen's current route is passed in to `props.navigation.state`:
    const { params } = this.props.navigation.state;

    return (
      <View>
        <Text>Chat with {params.user}</Text>
      </View>
    );
  }
}

export default ChatScreen;

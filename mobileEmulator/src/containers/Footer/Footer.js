import React, { Component } from 'react';
import { Footer, FooterTab, Button, Text } from 'native-base';

export default class AnatomyExample extends Component {
  render() {
    return (
      <Footer>
        <FooterTab>
          <Button full>
            <Text>Footer</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

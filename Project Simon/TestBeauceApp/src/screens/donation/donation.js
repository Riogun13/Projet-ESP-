import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class Donation extends Component {
    static navigationOptions = {
      title: 'Dons',
    };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hello, world Donation!</Text>
      </View>
    );
  }
}
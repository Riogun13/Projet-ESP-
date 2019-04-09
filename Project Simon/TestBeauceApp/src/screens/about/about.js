import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class About extends Component {
    
  static navigationOptions = {
    title: 'À Propos',
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hello, world About!</Text>
      </View>
    );
  }
}
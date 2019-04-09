import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class News extends Component {
    static navigationOptions = {
      title: 'Nouvelles',
    };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hello, world News!</Text>
      </View>
    );
  }
}
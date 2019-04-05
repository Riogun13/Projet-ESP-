import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class SculptureList extends Component {
    static navigationOptions = {
      title: 'Liste des Sculptures',
    };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hello, world SculptureList!</Text>
      </View>
    );
  }
}
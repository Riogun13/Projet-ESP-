import React, { Component } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import Email from '../../library/email/email';

export default class DonationForm extends Component {
  constructor(props){
    super(props);

    this.state={ }
  }

  static navigationOptions = {
    title: 'Formulaire de don',
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button
          onPress={() => Email.generateEmail("touriste.ecole@gmail.com", "Winged reptile are way better than normal reptile", "Dragon > Sliver") }
          title="Envoyer"
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 18,
    color: '#444',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
  },
});
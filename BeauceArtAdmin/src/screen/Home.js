import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class Home extends Component {
    static navigationOptions = {
      title: 'Accueil',
    };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Bienvenu dans l'application de Beauce Art</Text>
        <Text>Vous êtes présentement un administrateur</Text>
        <Text>Pour ajouter une sculpture, allez dans l'onglet Sculptures</Text>
        <Text>Pour ajouter une nouvelle, allez dans l'onglet Nouvelles</Text>
      </View>
    );
  }
}
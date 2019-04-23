import React, { Component } from 'react';
import { Text, ScrollView, Button, StyleSheet } from 'react-native';
import Email from '../../library/email/email';

export default class Donation extends Component {
  constructor(props){
    super(props);

    this.state={ }
  }

  static navigationOptions = {
    title: 'Dons',
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 10 }}>
        <ScrollView>
          <Text style={styles.title}>Faites un don{"\n"}</Text>
          <Text style={styles.text}>
            Beauce Art prépare déjà la prochaine édition du Symposium international de la sculpture de Saint-Georges.
            Vous aimeriez contribuer à la réalisation de ce projet unique au monde?
            Remplissez le formulaire et devenez l’un de nos partenaires.
            {"\n"}
          </Text>
          <Text style={styles.text}>Donnez!{"\n"}</Text>
          <Text style={styles.text}>Merci et bonne journée!!!{"\n"}</Text>
          <Button
            onPress={() => this.props.navigation.push('DonationForm') }
            title="Remplir le formulaire"
          />
        </ScrollView>
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
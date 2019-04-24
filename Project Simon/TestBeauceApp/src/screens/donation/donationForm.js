import React, { Component } from 'react';
import { Text, View, ScrollView, Button, StyleSheet } from 'react-native';
import t from 'tcomb-form-native';
const Form = t.form.Form;
import Email from '../../library/email/email';
import Colors from '../../res/colors';

export default class DonationForm extends Component {
  constructor(props){
    super(props);

    var Positive = t.refinement(t.Number, function (n) {
      return n >= 0;
    });

    var Email = t.refinement(t.String, function (n) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(n);
    });

    this.state={
      donationForm: t.struct({
        name: t.String,
        lastname: t.String,
        email: Email,
        amount: Positive,
        terms: t.Boolean
      }),
      options : {
        fields: {
          name: {
            label: "Prénom",
            error: "Prénom obligatoire",
          },
          lastname: {
            label: "Nom",
            error: "Nom obligatoire",
          },
          email: {
            label: "Courriel",
            error: "Veuillez entrer un couriel valide",
          },
          amount: {
            label: "Je désire faire un don de $",
            error: "Montant du don obligatoire et doit être positif",
          },
          terms: {
            label: "Je vous ferai parvenir un chèque par la poste à l'adresse suivante: Beauce Art: L'International de la sculpture, 11505, 1ère Avenue, bureau 440, Saint-Georges (Québec) G5Y 7X3 CANADA",
          },
        },
      }
    };
  }

  static navigationOptions = {
    title: 'Formulaire de don',
  };

  handleSubmit = () => {
    const value = this._form.getValue(); // use that ref to get the form value
    console.log('value: ', value);
    if(value != null){
      Email.generateEmail(value.email, "Don", this.createEmailBody(value.name, value.lastname, value.email, value.amount, value.terms));
    }
  }

  createEmailBody(name, lastname, email, amount, terms){
    var myString = "Nom: "+ name + " " + lastname + "\n\n";
    myString += "Couriel: " + email + "\n\n";
    myString += "Don: " + amount + "\n\n";
    if (terms) {
      myString += "Je vous ferai parvenir un chèque par la poste à l'adresse suivante: Beauce Art: L'International de la sculpture, 11505, 1ère Avenue, bureau 440, Saint-Georges (Québec) G5Y 7X3 CANADA";
    }
    return myString;
  }

  render() {
    return (
      <View style={{ flex: 1, padding: 10 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", }}>
          <Form
            ref={ref => this._form = ref}
            type={this.state.donationForm}
            options={this.state.options}
          />
          <Button
            color={Colors.accentOrange}
            onPress={this.handleSubmit}
            title="Envoyer"
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
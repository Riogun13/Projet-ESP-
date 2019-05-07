import React, { Component } from 'react';
import { View, StyleSheet, Button, ScrollView, ToastAndroid } from 'react-native';
import firebase from 'react-native-firebase';
import t from 'tcomb-form-native';
import LoadingScreen from '../LoadingScreen';
import Colors from '../../res/colors';

const Form = t.form.Form;

var Collaborater = t.struct({
    Role: t.String,
    Name: t.String,
  });
  const options = {
    fields: {
        Role: {
        label: 'Rôle du collaborateur',
        error:
          'Rôle du collaborateur obligatoire',
      },
      Name: {
        label: 'Nom du collaborateur',
        error:
          "Nom du collaborateur obligatoire",
      },
    },
  };

export default class App extends Component {
      
  static navigationOptions = {
    title: 'Formulaire Collaborateur',
  };
  imageUri = null;
  state = {
      collaborater: null
  };

  async addDocument(doc){

    if(this.state.collaboraterId){
      let collectionCollaborater = firebase.firestore().collection('Collaborateur').doc(this.state.collaboraterId);

      await collectionCollaborater.set(doc).then(() => {
        this._LoadingScreen.updateUI(false);
        ToastAndroid.show('Modification Effectuée avec succès',ToastAndroid.LONG);
        this.props.navigation.goBack();
      })
      .catch((error) => {
        ToastAndroid.show('Erreur lors de la modification, veuillez réessayer',ToastAndroid.LONG);
        this._LoadingScreen.updateUI(false);
      })
    } else {
      let collectionCollaborater = firebase.firestore().collection('Collaborater');

      await collectionCollaborater.add(doc).then(() => {
        this._LoadingScreen.updateUI(false);
        ToastAndroid.show('Ajout Effectuée avec succès',ToastAndroid.LONG);
        this.props.navigation.goBack();
      })
      .catch((error) => {
        this._LoadingScreen.updateUI(false);
        ToastAndroid.show('Erreur lors de l\'ajout, veuillez réessayer',ToastAndroid.LONG);
      })
    }
  }

  async saveModificationOfCollaborater(value){
    let doc = {
      Role: value.Role,
      Name: value.Name,
    };

    this._LoadingScreen.updateUI(true);
    await this.addDocument(doc);
  }

  async addNewCollaborater(value){
    let doc = {
      Name: value.Name,
      ExternalUrl: value.ExternalUrl,
      Date: value.Date,
      Image: ""
    };
      await this.addDocument(doc);
  }

  componentDidMount(){
    const collaborater = this.props.navigation.getParam('collaborater');
    const collaboraterId = this.props.navigation.getParam('collaboraterId');
    this.setState({collaborater: collaborater, collaboraterId: collaboraterId});
  }
  handleSubmit = () => {
    const value = this.refs.form.getValue();
    if(value != null){
      if(this.state.collaborater){
        this.saveModificationOfCollaborater(value);
      } else {
        this.addNewCollaborater(value);
      }
    }
  };

  render() {
    if(this.state.collaborater != null){
      const value = {
        Role: this.state.collaborater.Role,
        Name: this.state.collaborater.Name,
      }
      return (
        <View style={styles.container}>
          <LoadingScreen ref={ref =>(this._LoadingScreen = ref)}></LoadingScreen>
            <ScrollView>
                <Form ref="form" type={Collaborater} options={options} value={value} />
                <Button title="Enregistrer" onPress={this.handleSubmit} color={Colors.accentOrange} />
            </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <LoadingScreen ref={ref =>(this._LoadingScreen = ref)}></LoadingScreen>
            <ScrollView>
                <Form ref="form" type={Collaborater} options={options} />
                <Button title="Enregistrer" onPress={this.handleSubmit} color={Colors.accentOrange}/>
            </ScrollView>
        </View>
      );
    }
  }
}

var styles = StyleSheet.create({
  container: {
      flex : 1,
      padding: 10,
      width: '100%',
  }
});
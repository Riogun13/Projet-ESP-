import React, { Component } from 'react';
import { View, StyleSheet, Button, ScrollView, ToastAndroid } from 'react-native';
import firebase from 'react-native-firebase';
import Image from './Image';
import t from 'tcomb-form-native';
import LoadingScreen from '../LoadingScreen';

const collectionSculpture = firebase.firestore().collection('Sculpture');
const Form = t.form.Form;

var Positive = t.refinement(t.Number, function (n) {
    return n >= 0;
  });
var Sculpture = t.struct({
    Name: t.String,
    ArtistName: t.String,
    ArtisticApproach: t.String,
    Latitude: t.Number,
    Longitude: t.Number,
    Material: t.maybe(t.String),
    ThematicName: t.String,
    ThematicYear: Positive,
  });
  const options = {
    fields: {
      Name: {
        label: 'Nom de la sculpture',
        error:
          'Nom de sculpture obligatoire',
      },
      ArtistName: {
        label: 'Nom de l\'artiste',
        error:
          "Nom de l\'artiste obligatoire",
      },
      ArtisticApproach: {
        label: 'Démarche artistique',
        error:
          'Démarche artistique obligatoire',
      },
      Latitude: {
        error: 'Latitude obligatoire',
      },
      Longitude: {
        error: 'Longitude obligatoire',
      },
      Material: {
        label: 'Matériaux utilisés',
      },
      ThematicName: {
        label: 'Nom de la thématique',
        error:
          'Nom de la thématique obligatoire',
      },
      ThematicYear: {
        label: 'Année de la thématique',
        error:
          'Année de la thématique obligatoire (chiffre positif seulement)',
      },
    },
  };

  export default class App extends Component {
        
    static navigationOptions = {
      title: 'Formulaire',
    };
    imageUri = null;
    thumbnailUri = "";
    state = {
        image: null,
    };
    handleChooseImage= () => {
        const options = {
            noData: true
        };
        ImagePicker.launchImageLibrary(options, response => {
            console.log("response", response);
            if(response.uri){
                this.setState({ image: response});
                this.imageUri = response.uri;
            }
        });
    };

    handleSubmit = () => {
      const value = this.refs.form.getValue();
      if(value != null){
        this._LoadingScreen.updateUI(true);
        let doc = {
            Name: value.Name,
            ArtistName: value.ArtistName,
            Material: (value.Material == null) ? "" : value.Material,
            Thematic: {
                Name: value.ThematicName,
                Year: value.ThematicYear
            },
            ArtisticApproach: value.ArtisticApproach,
            Coordinate: new firebase.firestore.GeoPoint(value.Latitude, value.Longitude),
            Image: ""
          };
          console.log(doc);
          let image = this._ImageInfo.getImage();
          console.log('image',image);
          if(image){
            let storage = firebase.storage();
            let mref = storage.ref(doc.Thematic.Year+'/sculpture/').child(image.fileName);

            mref.putFile(image.path, { contentType: image.type })
                .then((success) =>{
                  console.log('success',success);
                  doc.Image = success.downloadURL;
                  collectionSculpture.add(doc).then((success) => {
                    this._LoadingScreen.updateUI(false);
                  })
                });
          } else {
              ToastAndroid.show('Veuillez ajouter une image', ToastAndroid.LONG);
          }
      }
      console.log('value: ', value);
    };
  
    render() {
        console.log(this.imageUri, this.state);
      return (
        <View style={styles.container}>
          <LoadingScreen ref={ref =>(this._LoadingScreen = ref)}></LoadingScreen>
            <ScrollView>
                <Form ref="form" type={Sculpture} options={options} />
                <Image ref={ref => (this._ImageInfo = ref)} buttonText="Ajouter Image"></Image>
                <Button title="Enregistrer" onPress={this.handleSubmit} />
            </ScrollView>
        </View>
      );
    }
  }

  var styles = StyleSheet.create({
    container: {
        flex : 1,
        padding: 10,
        width: '100%',
    }
  });
  
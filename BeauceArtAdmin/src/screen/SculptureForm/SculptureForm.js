import React, { Component } from 'react';
import { View, StyleSheet, Button, ScrollView, ToastAndroid } from 'react-native';
import firebase from 'react-native-firebase';
import Image from './Image';
import t from 'tcomb-form-native';
import LoadingScreen from '../LoadingScreen';
import Colors from '../../res/colors';

const Form = t.form.Form;

var Positive = t.refinement(t.Number, function (n) {
    return n >= 0;
  });

var Latitude = t.refinement(t.Number, function (n) {
  return n <= 90 && n >= -90;
});
var Longitude = t.refinement(t.Number, function (n) {
  return n <= 180 && n >= -180;
});
var Sculpture = t.struct({
    Name: t.String,
    ArtistName: t.String,
    ArtisticApproach: t.String,
    Latitude: Latitude,
    Longitude: Longitude,
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
        error: 'Latitude obligatoire entre -90 et 90',
      },
      Longitude: {
        error: 'Longitude obligatoire entre -90 et 90',
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
      sculpture: null
  };

  async addDocument(doc){

    if(this.state.sculptureId){
      let collectionSculpture = firebase.firestore().collection('Sculpture').doc(this.state.sculptureId);

      await collectionSculpture.set(doc).then(() => {
        this._LoadingScreen.updateUI(false);
        ToastAndroid.show('Modification Effectuée avec succès',ToastAndroid.LONG);
        this.props.navigation.goBack();
      })
      .catch((error) => {
        ToastAndroid.show('Erreur lors de la modification, veuillez réessayer',ToastAndroid.LONG);
        this._LoadingScreen.updateUI(false);
      })
    } else {
      let collectionSculpture = firebase.firestore().collection('Sculpture');

      await collectionSculpture.add(doc).then(() => {
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

  async addNewImage(doc){
    let imageUrl = "";
    if(this._ImageInfo.getIfImageHasBeenModified()){
      let image = this._ImageInfo.getImage();
      if(image){
        let storage = firebase.storage();
        let mref = storage.ref(doc.Thematic.Year+'/sculpture/').child(image.fileName);
    
        await mref.putFile(image.path, { contentType: image.type })
            .then((success) => {
              imageUrl = success.downloadURL;
            })
            .catch((error) => {
              ToastAndroid.show("Erreur lors de l'upload de l'image", ToastAndroid.LONG);
            })
      }
    }
    
    return imageUrl;
  }

  async addNewThumbnail(doc){
    let thumbnailUrl = "";
    if(this._ImageThumbnail.getIfImageHasBeenModified()){
      let thumbnail = this._ImageThumbnail.getImage();
      if(thumbnail){
        let storage = firebase.storage();
        let thumbnailRef = storage.ref(doc.Thematic.Year+'/sculpture/thumbnail').child(thumbnail.fileName);
    
        await thumbnailRef.putFile(thumbnail.path, { contentType: thumbnail.type })
            .then((success) => {
              thumbnailUrl = success.downloadURL;
            })
            .catch((error) => {
              ToastAndroid.show("Erreur lors de l'upload du thumbnail", ToastAndroid.LONG);
            })
      }
    }
    return thumbnailUrl;
  }

  async saveModificationOfSculpture(value){
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
      Image: this.state.sculpture.Image,
      Thumbnail: this.state.sculpture.Thumbnail
    };

    this._LoadingScreen.updateUI(true);
    await this.addNewImage(doc).then((imageUrl) => {
      if(imageUrl != ""){
        doc.Image = imageUrl;
      }
    });
    await this.addNewThumbnail(doc).then((thumbnailUrl) => {
      if(thumbnailUrl != ""){
        doc.Thumbnail = thumbnailUrl;
      }
    })
    await this.addDocument(doc);
  }

  async addNewSculpture(value){
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
      Image: "",
      Thumbnail: ""
    };
    let image = this._ImageInfo.getImage();
    let thumbnail = this._ImageThumbnail.getImage();
    if(image && thumbnail){

      this._LoadingScreen.updateUI(true);
      await this.addNewImage(doc).then((imageUrl) => {
        if(imageUrl != ""){
          doc.Image = imageUrl;
        }
      });
      await this.addNewThumbnail(doc).then((thumbnailUrl) => {
        if(thumbnailUrl != ""){
          doc.Thumbnail = thumbnailUrl;
        }
      })
      await this.addDocument(doc);
    } else {
      ToastAndroid.show('Veuillez ajouter une image et un thumbnail', ToastAndroid.LONG);
    }
  }

  componentDidMount(){
    const sculpture = this.props.navigation.getParam('sculpture');
    const sculptureId = this.props.navigation.getParam('sculptureId');
    this.setState({sculpture: sculpture, sculptureId: sculptureId});
  }
  handleSubmit = () => {
    const value = this.refs.form.getValue();
    if(value != null){
      if(this.state.sculpture){
        this.saveModificationOfSculpture(value);
      } else {
        this.addNewSculpture(value);
      }
    }
    else {
      ToastAndroid.show('Erreur dans le formulaire, veuillez corriger les erreurs', ToastAndroid.LONG);
    }
  };

  render() {
    if(this.state.sculpture != null){
      const value = {
        Name: this.state.sculpture.Name,
        ArtistName: this.state.sculpture.ArtistName,
        ArtisticApproach: this.state.sculpture.ArtisticApproach,
        Latitude: this.state.sculpture.Coordinate.latitude,
        Longitude: this.state.sculpture.Coordinate.longitude,
        Material: this.state.sculpture.Material,
        ThematicName: this.state.sculpture.Thematic.Name,
        ThematicYear: this.state.sculpture.Thematic.Year,
      }
      return (
        <View style={styles.container}>
          <LoadingScreen ref={ref =>(this._LoadingScreen = ref)}></LoadingScreen>
            <ScrollView>
                <Form ref="form" type={Sculpture} options={options} value={value} />
                <Image ref={ref => (this._ImageInfo = ref)} buttonText="Ajouter Image" url={this.state.sculpture.Image}></Image>
                <Image ref={ref => (this._ImageThumbnail = ref)} buttonText="Ajouter Thumbnail" url={this.state.sculpture.Thumbnail}></Image>
                <Button title="Enregistrer" onPress={this.handleSubmit} color={Colors.accentOrange} />
            </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <LoadingScreen ref={ref =>(this._LoadingScreen = ref)}></LoadingScreen>
            <ScrollView>
                <Form ref="form" type={Sculpture} options={options} />
                <Image ref={ref => (this._ImageInfo = ref)} buttonText="Ajouter Image"></Image>
                <Image ref={ref => (this._ImageThumbnail = ref)} buttonText="Ajouter Thumbnail"></Image>
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
  



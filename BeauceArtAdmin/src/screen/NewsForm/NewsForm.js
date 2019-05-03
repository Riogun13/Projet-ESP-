import React, { Component } from 'react';
import { View, StyleSheet, Button, ScrollView, ToastAndroid } from 'react-native';
import firebase from 'react-native-firebase';
import Image from './ImageN';
import t from 'tcomb-form-native';
import LoadingScreen from '../LoadingScreen';
import Colors from '../../res/colors';

const Form = t.form.Form;

var News = t.struct({
    Name: t.String,
    ExternalUrl: t.String,
    Date: t.String,
  });
  const options = {
    fields: {
      Name: {
        label: 'Nom de la nouvelle',
        error:
          'Nom de la nouvelle obligatoire',
      },
      ExternalUrl: {
        label: 'Lien de l\'événement',
        error:
          "Lien de l\'événement obligatoire",
      },
      Date: {
        label: 'Date de la nouvelle',
        error:
          'Date obligatoire',
      },
    },
  };

export default class App extends Component {
      
  static navigationOptions = {
    title: 'Formulaire Nouvelle',
  };
  imageUri = null;
  state = {
      image: null,
      news: null
  };

  async addDocument(doc){

    if(this.state.newsId){
      let collectionNews = firebase.firestore().collection('Nouvelles').doc(this.state.newsId);

      await collectionNews.set(doc).then(() => {
        this._LoadingScreen.updateUI(false);
        ToastAndroid.show('Modification Effectuée avec succès',ToastAndroid.LONG);
        this.props.navigation.goBack();
      })
      .catch((error) => {
        ToastAndroid.show('Erreur lors de la modification, veuillez réessayer',ToastAndroid.LONG);
        this._LoadingScreen.updateUI(false);
      })
    } else {
      let collectionNews = firebase.firestore().collection('Nouvelles');

      await collectionNews.add(doc).then(() => {
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
        let mref = storage.ref('nouvelle/').child(image.fileName);
    
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

  async saveModificationOfNews(value){
    let doc = {
      Name: value.Name,
      Date: value.Date,
      ExternalUrl: value.ExternalUrl,
      Image: this.state.news.Image
    };

    this._LoadingScreen.updateUI(true);
    await this.addNewImage(doc).then((imageUrl) => {
      if(imageUrl != ""){
        doc.Image = imageUrl;
      }
    });
    await this.addDocument(doc);
  }

  async addNewNews(value){
    let doc = {
      Name: value.Name,
      ExternalUrl: value.ExternalUrl,
      Date: value.Date,
      Image: ""
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
    const news = this.props.navigation.getParam('news');
    const newsId = this.props.navigation.getParam('newsId');
    this.setState({news: news, newsId: newsId});
  }
  handleSubmit = () => {
    const value = this.refs.form.getValue();
    if(value != null){
      if(this.state.news){
        this.saveModificationOfNews(value);
      } else {
        this.addNewNews(value);
      }
    }
  };

  render() {
    if(this.state.news != null){
      const value = {
        Name: this.state.news.Name,
        ExternalUrl: this.state.news.ExternalUrl,
        Date: this.state.news.Date,
      }
      return (
        <View style={styles.container}>
          <LoadingScreen ref={ref =>(this._LoadingScreen = ref)}></LoadingScreen>
            <ScrollView>
                <Form ref="form" type={News} options={options} value={value} />
                <Image ref={ref => (this._ImageInfo = ref)} buttonText="Ajouter Image" url={this.state.news.Image}></Image>
                <Button title="Enregistrer" onPress={this.handleSubmit} color={Colors.accentOrange} />
            </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <LoadingScreen ref={ref =>(this._LoadingScreen = ref)}></LoadingScreen>
            <ScrollView>
                <Form ref="form" type={News} options={options} />
                <Image ref={ref => (this._ImageInfo = ref)} buttonText="Ajouter Image"></Image>
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
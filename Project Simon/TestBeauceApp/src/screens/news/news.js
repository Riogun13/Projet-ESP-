import React, { Component } from 'react';
import { Text, View, Dimensions, Button, FlatList, TouchableHighlight, Linking } from 'react-native';

import firebase from 'react-native-firebase';

export default class News extends Component {
    static navigationOptions = {
      title: 'Nouvelles',
    };

    constructor(props){
      super(props);
      this.ref = firebase.firestore().collection('Nouvelles');
      this.unsubscribe = null;
      this.state = {
        pageHeight: Dimensions.get('screen').height,
        pageWidth: Dimensions.get('screen').width,
        news: [],
        loading: true
      };
    }

    onCollectionUpdate = (querySnapshot) => {

      const news = [];
      querySnapshot.forEach((doc) => {
          const {name} = doc._data;
          const {externalUrl} = doc._data.ExternalUrl;
          const {date} = doc._data.Date;
          news.push(doc.data());
        });
      this.setState({
        news: news,
        loading: false,
      });
      console.log(this.state);
    }

    componentDidMount(){
      this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }


  render() {
    if(this.state.loading){
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>loadgin false</Text>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <FlatList 
            data={this.state.news} 
            renderItem={({item}) => <TouchableHighlight onPress={() => Linking.openURL(item.ExternalUrl)}><Text>{item.Name}</Text></TouchableHighlight>
            }></FlatList>
          <Text>loaded</Text>
          <Button title="See State" onPress={()=> console.log(this.state)}></Button>
        </View>
      );
    }
  }
}
import React, { Component } from 'react';
import { Text, View, Dimensions, Button, FlatList, TouchableHighlight, Linking } from 'react-native';
import NewsFormat from './newsFormat'
import firebase from 'react-native-firebase';

import Moment from 'moment/min/moment-with-locales';

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
    }

    componentDidMount(){
      this.unsubscribe = this.ref.orderBy('Date',"ASC").onSnapshot(this.onCollectionUpdate);
    }


  render() {
    
    Moment.locale('fr-ca');
    if(this.state.loading){
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>loadgin false</Text>
        </View>
      );
    } else {
      return (
        <View>
          <FlatList 
            data={this.state.news} 
            renderItem={({item}) => 
              <NewsFormat
                title={item.Name}
                description={Moment(item.Date).format('LLL')}
                image_url={item.Image}
                externalLink={item.ExternalUrl}
                />
            }
            keyExtractor={item => item.Name}></FlatList>
        </View>
      );
    }
  }
}
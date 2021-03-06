import React, { Component } from 'react';
import { Text,
  View, 
  Dimensions, 
  FlatList,
  Platform } from 'react-native';
import NewsFormat from './newsFormat'
import firebase from 'react-native-firebase';
import Colors from '../../res/colors';
import OfflineNotice from '../../library/noConnectionSign/offlineNotice/'

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
    if(!this.state.loading){
      console.log(this.state.news[0].Date, Moment(this.state.news[0].Date.seconds * 1000).format('LLL'));
    }
    if(this.state.loading){
      return null;
    } else if( Platform.OS == 'ios') {
      return (
        <View>
          <FlatList 
            data={this.state.news} 
            renderItem={({item}) => 
              <NewsFormat
                title={item.Name}
                description={Moment(item.Date.seconds * 1000).format('LLL')}
                image_url={item.Image}
                externalLink={item.ExternalUrl}
                />
            }
            keyExtractor={item => item.Name}></FlatList>
            <OfflineNotice />
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
            <OfflineNotice />
        </View>
      );
    }
  }
}
import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';
import Colors from '../res/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class NewsList extends Component {
  constructor(props){
    super(props);

    this.ref = firebase.firestore().collection('Nouvelles');
    this.unsubscribe = null;
    this.state={
      loading: true
    }
  }
    static navigationOptions = {
      title: 'Nouvelles',
    };

    onCollectionUpdate = (querySnapshot) => {
      const news = {};
      querySnapshot.docs.forEach(doc => {
        news[doc._ref._documentPath._parts[1]] = doc.data();
      });
      this.setState({
        news: news,
        loading: false,
      });
    }

    newsClicked(newsId){
      this.props.navigation.push(
        'NewsForm', 
        {
          news: this.state.news[newsId],
          newsId: newsId
        });
    }
    componentDidMount(){
      this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    render() {
      if (typeof this.state.news == "undefined") {
        return(
          <View style={{flex: 1 , justifyContent: "center", alignItems: "center"}}>
            <ActivityIndicator size="large" color={Colors.accentOrange}></ActivityIndicator>
          </View>
        );
      }else{
        return (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ScrollView style={styles.container}>
              {
                  Object.keys(this.state.news).map((newsId, index) =>(
                    <TouchableOpacity
                      style={styles.button}
                      key={newsId}
                      onPress={() => this.newsClicked(newsId)}
                    >
                      <Text style={styles.buttonText}>{this.state.news[newsId].Name}</Text>
                    </TouchableOpacity>
                  ))
              }
            </ScrollView>
            <TouchableOpacity
                    style={styles.mapButton}
                      onPress={()=> this.props.navigation.push('NewsForm')}
                  >
                    <Ionicons name={"ios-add"}  size={40} color={Colors.text} />
                  </TouchableOpacity>
          </View>
        );
      }
    }
}

var styles = StyleSheet.create({
  container: {
    flex : 1,
    paddingTop : 10,
    width: '98%',
  },
  button: {
    paddingTop : 10,
    paddingLeft : 10
  },
  buttonText: {
    paddingLeft : 10,
    fontSize: 16,
    color: Colors.black,
  },
  collapsiblePanel: {
  },
  mapButton: {
    position: 'absolute',
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width: 50,
    height: 50,
    backgroundColor:Colors.accentOrange,
    borderRadius: 25,
    bottom: 10,
    right: 10,
  }
});
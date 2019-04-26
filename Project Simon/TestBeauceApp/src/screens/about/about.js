import React, { Component } from 'react';
import { View, ScrollView, SectionList, Text, StyleSheet } from 'react-native';
import Colors from '../../res/colors';
import Fonts from '../../res/fonts';
import firebase from 'react-native-firebase';
import { Text, View } from 'react-native';
import OfflineNotice from '../../library/noConnectionSign/offlineNotice/'

export default class About extends Component {
    
  static navigationOptions = {
    title: 'À Propos',
  };

  constructor(props){
    super(props);
    this.ref = firebase.firestore().collection('Collaborateur');
    this.unsubscribe = null;
    this.state = {
      collaborators: [],
      loading: true
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const collaborators = {};
    querySnapshot.forEach((doc) => {
      if(typeof collaborators[doc.data().Title] === "undefined"){
        collaborators[doc.data().Title] = [];
      }
      collaborators[doc.data().Title].push(doc.data().Name);
    });
    const sectionListCollaborators = [];
    Object.keys(collaborators).map((title, index) =>{
      sectionListCollaborators.push({title: title, data: collaborators[title]});
    });
    this.setState({
      collaborator: sectionListCollaborators,
      loading: false,
    });
  }

  componentDidMount(){
    console.log(this.props.navigation.state);
    this.unsubscribe = this.ref.orderBy('Name', "ASC").onSnapshot(this.onCollectionUpdate);
  }

  render() {
    if(this.state.loading){
      return null;
    } else {
      return (
        <View style={styles.container}>
          <SectionList
            sections={this.state.collaborator}
            renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
            renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
            keyExtractor={(item, index) => index}
          />
        <OfflineNotice />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center"
  },
  item: {
    padding: 10,
    fontSize: 16,
    height: 44,
  },
})
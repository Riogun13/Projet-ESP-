import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import CollapsiblePanel from '../library/collapsible/collapsible';
import firebase from 'react-native-firebase';
import Colors from '../res/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class CollaboraterList extends Component {
  constructor(props){
    super(props);

    this.ref = firebase.firestore().collection('Collaborater');
    this.unsubscribe = null;
    this.state={
      loading: true
    }
  }

  static navigationOptions = {
    title: 'Liste des Collaborateurs',
  };

  
  onCollectionUpdate = (querySnapshot) => {

    const collaboraters = {};
    querySnapshot.docs.forEach(doc => {
      if(typeof collaboraters[doc.data().Title] === "undefined"){ //lookup if there is already a year
        collaboraters[doc.data().Title] = {};
      }
      collaboraters[doc.data().Title][doc._ref._documentPath._parts[1]] = doc.data();
    });
    this.setState({
        collaboraters: collaboraters,
      loading: false,
    });
  }

  componentDidMount(){
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    if (typeof this.state.collaboraters == "undefined") {
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
              Object.keys(this.state.collaboraters).map((title, index) =>(
                  <CollapsiblePanel
                    title={title}
                    key={title}
                    style={styles.collapsiblePanel}
                  >
                    {
                      Object.keys(this.state.collaboraters[title]).map((collaboraterId, index) =>(
                        <TouchableOpacity
                          style={styles.button}
                          key={collaboraterId}
                          onPress={() => this.props.navigation.push(
                            'CollaboraterForm', 
                            {
                              collaborater: this.state.collaboraters[title][collaboraterId],
                              collaboraterId: collaboraterId
                            })}
                        >
                          <Text style={styles.buttonText}>{this.state.collaboraters[title][collaboraterId].Name}</Text>
                        </TouchableOpacity>
                      ))
                    }
                  </CollapsiblePanel>
              ))
            }
          </ScrollView>
          <TouchableOpacity
                  style={styles.mapButton}
                    onPress={()=> this.props.navigation.push('CollaboraterForm')}
                >
                  <Ionicons name={"ios-add"}  size={40} color={Colors.text} />
                </TouchableOpacity>
        </View>
      );
    }
  }
};

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
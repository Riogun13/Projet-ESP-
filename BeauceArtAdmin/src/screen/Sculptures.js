import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, } from 'react-native';
import CollapsiblePanel from '../library/collapsible/collapsible';
import firebase from 'react-native-firebase';
import Colors from '../res/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class SculptureList extends Component {
  constructor(props){
    super(props);

    this.state={
    }
    this.getSculpture();
  }

  static navigationOptions = {
    title: 'Liste des Sculptures',
  };

  async getSculpture() {
    const sculptures = {};
    await firebase.firestore().collection('Sculpture').get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          if(typeof sculptures[doc.data().Thematic.Year] === "undefined"){ //lookup if there is already a year
            sculptures[doc.data().Thematic.Year] = {};
          }
          sculptures[doc.data().Thematic.Year][doc._ref._documentPath._parts[1]] = doc.data();
        });
      });
      this.setState({sculptures: sculptures});
  }

  render() {
    if (typeof this.state.sculptures == "undefined") {
      return(
        <View style={{flex: 1 , justifyContent: "center", alignItems: "center"}}>
          {/* <ActivityIndicator size="large" color={Colors.accentOrange}></ActivityIndicator> */}
        </View>
      );
    }else{
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ScrollView style={styles.container}>
            {
              Object.keys(this.state.sculptures).map((year, index) =>(
                  <CollapsiblePanel
                    title={"Édition "+ year}
                    key={index}
                    style={styles.collapsiblePanel}
                  >
                    {
                      Object.keys(this.state.sculptures[year]).map((sculptueId, index) =>(
                        <TouchableOpacity
                          style={styles.button}
                          key={sculptueId}
                          onPress={() => console.log(this.state.sculptures[year][sculptueId].Name)}
                        >
                          <Text style={styles.buttonText}>{this.state.sculptures[year][sculptueId].Name}</Text>
                        </TouchableOpacity>
                      ))
                    }
                  </CollapsiblePanel>
              ))
            }
          </ScrollView>
          <TouchableOpacity
                  style={styles.mapButton}
                    onPress={()=> console.log("plus")}
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
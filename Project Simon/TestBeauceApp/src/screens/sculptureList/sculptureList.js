import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import CollapsiblePanel from '../../library/collapsible/collapsible';
import firebase from 'react-native-firebase';
import Colors from '../../res/colors';
import OfflineNotice from '../../library/noConnectionSign/offlineNotice/'

export default class SculptureList extends Component {
  constructor(props){
    super(props);

    this.state={ }
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
                    title={"Édition "+year}
                    key={index}
                    style={styles.collapsiblePanel}
                  >
                    {
                      Object.keys(this.state.sculptures[year]).map((sculptueId, index) =>(
                        <TouchableOpacity
                          style={styles.button}
                          key={sculptueId}
                          onPress={() => this.props.navigation.push('SculptureDetail', {sculpture: this.state.sculptures[year][sculptueId]})}
                        >
                          <Text style={styles.buttonText}>{this.state.sculptures[year][sculptueId].Name}</Text>
                        </TouchableOpacity>
                      ))
                    }
                  </CollapsiblePanel>
              ))
            }
          </ScrollView>
          <OfflineNotice />
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
  }
});
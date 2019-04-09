import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import CollapsiblePanel from '../../library/collapsible/collapsible';
import MapInformation from '../map/mapInformation';

export default class SculptureList extends Component {
  constructor(props){
    super(props);
  }

  static navigationOptions = {
    title: 'Liste des Sculptures',
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ScrollView style={styles1.container}>
          <CollapsiblePanel title="A Panel with long content text">
            <Text>Lorem ipsum...Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..Lorem ipsum..</Text>
          </CollapsiblePanel>
        </ScrollView>
      </View>
    );
  }
};

var styles1 = StyleSheet.create({
  container: {
    flex            : 1,
    backgroundColor : '#f4f7f9',
    paddingTop      : 30
  },
  
});
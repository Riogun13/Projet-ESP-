import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import CollapsiblePanel from '../../library/collapsible/collapsible';
import Colors from '../../res/colors';
import OfflineNotice from '../../library/noConnectionSign/offlineNotice/'
import sculpturesEmitter from '../../res/sculptures';

let sculptureList = null;

sculpturesEmitter.on('onSculptureCollectionUpdate', function (sculptures) {
  sculptureList = sculptures;
  updateStateSculpture();
});

function updateStateSculpture(){
  try {
    this.setState({sculptures: sculptureList});
  } catch (error) {
    //Sword to plowshare
  }
}

export default class SculptureList extends Component {
  constructor(props){
    super(props);

    this.state={
      sculptures: sculptureList
    }
    updateStateSculpture = updateStateSculpture.bind(this);
  }

  static navigationOptions = {
    title: 'Liste des Sculptures',
  };

  render() {
    if (typeof this.state.sculptures == "undefined" || this.state.sculptures == null) {
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
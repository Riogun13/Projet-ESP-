import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Colors from '../res/colors';

export default class News extends Component {
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

      const nouvelles = {};
      querySnapshot.docs.forEach(doc => {
        nouvelles[doc._ref._documentPath._parts[1]] = doc.data();
      });
      this.setState({
        nouvelles: nouvelles,
        loading: false,
      });
    }

    render() {
      if (typeof this.state.nouvelles == "undefined") {
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
                Object.keys(this.state.nouvelles).map((year, index) =>(
                      {
                        Object.keys(this.state.sculptures[year]).map((sculptueId, index) =>(
                          <TouchableOpacity
                            style={styles.button}
                            key={nouvelleId}
                            onPress={() => this.props.navigation.push(
                              'NewsForm', 
                              {
                                nouvelle: this.state.nouvelles[sculptueId],
                                nouvelleId: nouvelleId
                              })}
                          >
                            <Text style={styles.buttonText}>{this.state.nouvelles[sculptueId].Name}</Text>
                          </TouchableOpacity>
                        ))
                      }
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
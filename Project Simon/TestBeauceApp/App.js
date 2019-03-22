/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,ScrollView, StyleSheet, Text, View, Dimensions, StatusBar} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import firebase from 'react-native-firebase';

const { width, height } = Dimensions.get('window');


type Props = {};
class App extends Component<Props> {

  constructor(props){
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null,
      statusBarHeight: 0
    };
  }

  async getArtist() {
    const artists = [];
    await firebase.firestore().collection('Artiste').get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          artists.push(doc.data());
        });
      });
      console.log(artists);
    return artists;
  }
  componentWillMount() {
    setTimeout(()=>this.setState({statusBarHeight: 5}),500);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
      }, 
      error => this.setState({error : error.message}),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 2000 }
    );
    const test = this.getArtist();

  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor="#c87604" barStyle="light-content" />
        <ScrollView contentContainerStyle={StyleSheet.absoluteFillObject}>
          <View style={styles.header}>
            <Text style={styles.title} allowFontScaling={false}>
              Beauce Art App 
            </Text>
          </View>
          <View style={{flex:6, paddingTop: this.state.statusBarHeight}}>  
            <MapView
              style={{flex: 1, height:(height * 0.5), width: width}}
              region={{
                latitude: 46.123532,
                longitude: -70.681716,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              showsUserLocation={true}
              followsUserLocation={true}
              scrollEnabled={false}
            >
            {/* <Marker coordinate={this.state} /> */}
            </MapView>
          </View>
          <MapInformation></MapInformation>
        </ScrollView>
      </View>
    );
  }
}


//slide animation https://stackoverflow.com/questions/39117599/how-to-slide-view-in-and-out-from-the-bottom-in-react-native
class MapInformation extends Component<Props> {

  render() {
    let rndArray = ["Saab", "Volvo", "BMW"];
    return (
      <View style={styles.mapInformation}>
        {rndArray.map(r => <Text>{r}</Text>)}
      </View>
    );
  }

}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FB9D1D',
    elevation: 5
  },
  title: {
    fontSize: 24,
    fontFamily: 'OpenSans',
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(200, 117, 4, 0.75)',
    textShadowOffset: {width: 1, height: 4},
    textShadowRadius: 5
  },
  map: {
    flex: 6,
  },
  mapStyle: {
    flex: 1,
    ...StyleSheet.absoluteFillObject
  },
  mapInformation: {
    top: height - StatusBar.currentHeight - 100 ,
    left: 0,
    height: 100,
    width: width,
    position: 'absolute',
    elevation: 5,
    backgroundColor: '#118800'
  }
 });

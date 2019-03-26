/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  NativeModules,
  LayoutAnimation,
  TouchableOpacity,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  Button,
  Image,
  Alert
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import firebase from 'react-native-firebase';

const { width, height } = Dimensions.get('window');
const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

type Props = {};
class App extends Component<Props> {

  constructor(props){
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null,
      statusBarHeight: 0,
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

  onLayout(e){
    const {newWidth, newHeight} = Dimensions.get('window')
    console.log(newWidth, newHeight)
  }

  render() {
    return (
      <View style={{flex: 1}} onLayout={this.onLayout.bind(this)}>
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
              onPress={() => {
                updateMapInformationState(false, null);
              }}
            >
            <Marker coordinate={this.state}
              onPress={() => {
                updateMapInformationState(true, null);
              }}
            />
            
            </MapView>
          </View>
          <MapInformation sculpture={this.state.selectedSculpture}></MapInformation>
        </ScrollView>
      </View>
    );
  }
}


//slide animation https://stackoverflow.com/questions/39117599/how-to-slide-view-in-and-out-from-the-bottom-in-react-native

function updateMapInformationState(display, sculpture){
  LayoutAnimation.easeInEaseOut();
  this.setState({
    display: display,
    sculpture: sculpture
  });
}

class MapInformation extends Component<Props> {
  constructor(props){
    super(props)
    this.state = {
      display: false,
      top: 0,
      sculpture: null,
      picture: "https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg",
      artworkTitle: "Artwork",
      artistFullName: "Jean-Paul Something"
    }
    updateMapInformationState = updateMapInformationState.bind(this)
  }

  render() {
    if(!this.state.display)
      return null;

    return (
      <View style={styles.mapInformationMainView}>
        <Image source={{uri:this.state.picture}} style={{width: 193, height: 110}}/>
        <Text>{this.state.artworkTitle}</Text>
        <Text>{this.state.artistFullName}</Text>
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
  mapInformationMainView: {
    top: '79%' ,
    left: '1%',
    height: '20%',
    //minHeight: 200,
    width: '98%',
    position: 'absolute',
    elevation: 5,
    backgroundColor: '#118800',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  }
 });

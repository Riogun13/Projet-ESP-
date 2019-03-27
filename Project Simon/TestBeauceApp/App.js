/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,ScrollView, StyleSheet, Text, View, Dimensions, StatusBar, Button} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import firebase from 'react-native-firebase';


type Props = {};
export default class App extends Component<Props> {

  constructor(props){
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null,
      statusBarHeight: 0,
      isLoading: true,
      pageHeight: Dimensions.get('screen').height,
      pageWidth: Dimensions.get('screen').width
    };
    this.mapRef = null;
  }

  getNewDimensions(event){
    this.setState({
      pageHeight: event.nativeEvent.layout.height,
      pageWidth: event.nativeEvent.layout.width
    });
  }
  async getSculpture() {
    const sculptures = [];
    await firebase.firestore().collection('Sculpture').get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          sculptures.push(doc.data());
        });
      });
      this.setState({sculptures: sculptures});
    return sculptures;
  }

  getMarkerColor(year){
    switch (year){
      case 2014:
        return 'green';
      case 2015:
        return 'aqua';
      default:
        return 'red';
    }
  }

  fitMapToMarkers(){
    console.log(this.mapRef, this.state);
    if(this.mapRef){
      this.mapRef.fitToCoordinates(this.state.markers,
        { animated: true });
    }
  }
  setMarkers(sculptures) {
    const markers = [];
    sculptures.map((sculpture, index) => {
      markers.push({latitude: sculpture.Coordinate.latitude, longitude: sculpture.Coordinate.longitude});
    });
    this.setState({markers: markers});
    return markers;

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

    this.getSculpture().then(()=>{
      this.setState({isLoading: false});
      this.setMarkers(this.state.sculptures)
    });

    

  }

  render() {
    if(this.state.isLoading){
      return (
        <View style={{flex: 1}} onLayout={(e)=>this.getNewDimensions(e)}>
          <StatusBar backgroundColor="#c87604" barStyle="light-content" />
          <ScrollView contentContainerStyle={StyleSheet.absoluteFillObject}>
            <View style={styles.header}>
              <Text style={styles.title} allowFontScaling={false}>
                Beauce Art App 
              </Text>
            </View>
            <View style={{flex:6, paddingTop: this.state.statusBarHeight}}>  
              <MapView
                style={{flex: 1, height:(this.state.pageHeight * 0.5), width: this.state.pageWidth}}
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
              </MapView>
            </View>
          </ScrollView>
        </View>
      );
    }else{
      return (
        <View style={{flex: 1}} onLayout={(e)=>this.getNewDimensions(e)}>
          <StatusBar backgroundColor="#c87604" barStyle="light-content" />
          <ScrollView contentContainerStyle={StyleSheet.absoluteFillObject}>
            <View style={styles.header}>
              <Text style={styles.title} allowFontScaling={false}>
                Beauce Art App 
              </Text>
            </View>
            <View style={{flex:6, paddingTop: this.state.statusBarHeight}}>  
              <MapView
                ref={ref => { this.mapRef = ref}}
                onLayout = {() => {
                  this.mapRef.fitToCoordinates(this.state.markers,
                    { animated: true });
                    }}
                style={{flex: 1, height:(this.state.pageHeight * 0.5), width: this.state.pageWidth}}
                region={{
                  latitude: 46.123532,
                  longitude: -70.681716,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                showsUserLocation={true}
                followsUserLocation={true}
                scrollEnabled={true}
              >
                {this.state.sculptures.map((sculpture,index) => (
                  <MapView.Marker 
                    key={index}
                    coordinate={{latitude: sculpture.Coordinate.latitude, longitude: sculpture.Coordinate.longitude}}
                    title={sculpture.Name}
                    pinColor={this.getMarkerColor(sculpture.Thematic.Year)}
                  >
                  </MapView.Marker>
                ))}
              </MapView>
              <View
                  style={{
                      position: 'absolute',//use absolute position to show button on top of the map
                      top: 60,
                      right: 10,
                      alignSelf: 'flex-end' //for align to right
                  }}
              >
                  <Button 
                    onPress={()=> this.fitMapToMarkers()} 
                    title="Markers"
                  >
                  </Button>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

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
 });

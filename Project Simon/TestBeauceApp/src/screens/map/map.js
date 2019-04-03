import React, {Component} from 'react';

import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  Alert,
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';

import firebase from 'react-native-firebase';

import MapStyle from '../../res/styles/map';

import MapInformation from './mapInformation'

class Map extends Component {

  constructor(props){
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null,
      statusBarHeight: 0,
      pageHeight: Dimensions.get('screen').height,
      pageWidth: Dimensions.get('screen').width,
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
      case 2016:
        return 'purple';
      case 2017:
        return 'orange';
      case 2018:
        return 'indigo';
      default:
        return 'red';
    }
  }

  fitMapToMarkers(){
    setTimeout( ()=> {
      if(this.mapRef){
        this.mapRef.fitToCoordinates(this.state.markers,
          { animated: true });
      }
    },1000);
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
      this.setMarkers(this.state.sculptures);
    });
  }

  onLayout(e){
    const {newWidth, newHeight} = Dimensions.get('screen')
  }

  render() {
    if(typeof this.state.markers === "undefined"){
      return (
        <View style={{flex: this.props.flex}} onLayout={(e)=>this.getNewDimensions(e)}>
          <ScrollView contentContainerStyle={StyleSheet.absoluteFillObject}>
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
          </ScrollView>
        </View>
      );
    }else{
      return (
        <View
          style={{flex: this.props.flex}}
          onLayout={(e)=>{
            this.getNewDimensions(e);
            //on change of orientation make the popup
            this._MapInformation.updateMapInformationState(false, null);
          }}
        >
          <ScrollView contentContainerStyle={StyleSheet.absoluteFillObject} style={{paddingTop: this.state.statusBarHeight}}>
            <MapView
              ref={ref => { this.mapRef = ref}}
              onLayout = {this.fitMapToMarkers()}
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
              onPress={() =>{
                this._MapInformation.updateMapInformationState(false, null);
              }}
            >
              {this.state.sculptures.map((sculpture,index) => (
                <MapView.Marker 
                  key={index}
                  coordinate={{latitude: sculpture.Coordinate.latitude, longitude: sculpture.Coordinate.longitude}}
                  onPress={(event) =>{
                    this._MapInformation.updateMapInformationState(true, sculpture);
                    // this.setState(selectedArtwork:index);
                  }}
                  pinColor={
                    // if (this.state.selectedArtwork == index) {
                    //   Other color
                    // }
                    this.getMarkerColor(sculpture.Thematic.Year)
                  }
                >
                </MapView.Marker>
              ))}
            </MapView>
            <MapInformation ref={ref => (this._MapInformation = ref)}></MapInformation>
          </ScrollView>
        </View>
      );
    }
  }
}

export default Map;
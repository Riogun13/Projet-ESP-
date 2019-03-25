/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

type Props = {};
export default class App extends Component<Props> {

  constructor(props){
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null,
      markers: [
        {
          coordinates:{
            latitude: 46.123461666667,
            longitude: -70.684985
          },
            title: "Sublime machine",
            description: "Yann Farley"
        },
        {
          coordinates:{
            latitude: 46.123581666667,
            longitude: -70.685
          },
          title: "Piste",
          description: "Pascale Archambault"
        },
        {
          coordinates:{
            latitude: 46.123461666667,
            longitude: -70.685266666667
          },
          title: "Quadrature du cercle",
          description: "Karl Dufour"
        },
        {
          coordinates:{
            latitude: 46.12379,
            longitude: -70.685373333333
          },
          title: "L'Intrigante Assemblée",
          description: "Paul Duval"
        }],
    }

  }

  componentDidMount() {/*fetch les données ici bas*/
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
}

  render() {
    return (
        <MapView
          style={styles.mapStyle}
          region={{
            latitude: 46.1213889,
            longitude: -70.6661111,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
        >

        {/* this.markers.array.forEach(element => {
        });((sculptureData) => (
          <MapView.Marker coordinate={{test.latitude, test.longitude}}title={title}description={description}/>
        ); */}

       { this.state.markers.map((marker, index) => (
          <MapView.Marker 
            key={index}
            coordinate={marker.coordinates}
            title={marker.title}
            description={marker.description}
            onCalloutPress={() => console.log('test')}
          />
        ))}

        {/* <MapView.Marker

            coordinate={{latitude: 46.123461666667, longitude: -70.684985}}
            title={"Sublime machine"}
            description={"Yann Farley"}
         /> */}
        {/* <Marker coordinate={this.state} /> */}
        </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapStyle: {
    flex: 1,
    ...StyleSheet.absoluteFillObject
  },
 });

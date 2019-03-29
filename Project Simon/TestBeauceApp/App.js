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
import Icon from 'react-native-vector-icons/FontAwesome5'


function getScreenMinSize(){
  if(Dimensions.get('screen').width < Dimensions.get('screen').height){
    return Dimensions.get('screen').width
  }else{
    return Dimensions.get('screen').height
  }
}

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
      isLoading: true,
      pageHeight: Dimensions.get('screen').height,
      pageWidth: Dimensions.get('screen').width,
      // selectedArtwork: null,
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
        console.log('get sculpture');
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
    console.log(markers);
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
    console.log("mount");
  }

  onLayout(e){
    const {newWidth, newHeight} = Dimensions.get('screen')
    console.log(newWidth, newHeight)
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
        <View style={{flex: 1}} onLayout={(e)=>{
          this.getNewDimensions(e);
          //on change of orientation make the popup
          hideMapInformationPopUp();
          }}>
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
                onPress={() =>{
                  hideMapInformationPopUp();
                }}
              >
                {this.state.sculptures.map((sculpture,index) => (
                  <MapView.Marker 
                    key={index}
                    coordinate={{latitude: sculpture.Coordinate.latitude, longitude: sculpture.Coordinate.longitude}}
                    onPress={(event) =>{
                      changeMapInformationPopUpSculpture(sculpture);
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
              <View
                  style={{
                      position: 'absolute',//use absolute position to show button on top of the map
                      top: 60,
                      right: 12,
                      alignSelf: 'flex-end', //for align to right
                      width: 37,
                      height: 37,
                      backgroundColor: '#fff',
                      opacity: 0.9,
                      justifyContent: 'center',
                      alignItems: 'center'
                  }}
              >
                <Icon
                  name="map-marked-alt"
                  backgroundColor="#FB9D1D"
                  color="#FB9D1D"
                  size={25}
                  onPress={()=> this.fitMapToMarkers()} 
                >
                </Icon>
              </View>
            </View>
            <MapInformationPopUp></MapInformationPopUp>
          </ScrollView>
        </View>
      );
    }
  }
}

function hideMapInformationPopUp(){
  LayoutAnimation.easeInEaseOut();
  this.setState({
    display: false
  });
}

function changeMapInformationPopUpSculpture(sculpture){
  var obj = this
  this.setState({
    display: false
  });
  
  setTimeout(function(){
    obj.refs.scrollView.scrollTo({x:0});
  }, 0)
  
  LayoutAnimation.easeInEaseOut();
  this.setState({
    display: true,
    sculpture: sculpture
  });
}


class MapInformationPopUp extends Component<Props> {
  constructor(props){
    super(props)
    this.state = {
      display: false,
      top: 0,
      sculpture: null,
    }
    this.scrollViewRef = React.createRef();
    hideMapInformationPopUp = hideMapInformationPopUp.bind(this)
    changeMapInformationPopUpSculpture = changeMapInformationPopUpSculpture.bind(this)
  }

  showImage(){
    if(this.state.sculpture.Image != ''){
      return  <Image
                source={{uri:this.state.sculpture.Image}}
                style={mapInformationStyles.image}
                resizeMode="cover"
              />;
    }else{
      return;
    }
  }

  render() {
    if(!this.state.display)
      return null;

    return (
      <View style={mapInformationStyles.mainView}>
        <View style={mapInformationStyles.visibleView}>
          <View style={{flex:1,}}>
            {this.showImage()}
          </View>
          <ScrollView
            style={{flex:1}}
            ref="scrollView"
          >
            <Text style={[mapInformationStyles.text, mapInformationStyles.title]}>Titre:</Text>
            <Text style={mapInformationStyles.text}>{this.state.sculpture.Name}</Text>
            <Text style={[mapInformationStyles.text, mapInformationStyles.title]}>Artiste:</Text>
            <Text style={mapInformationStyles.text}>{this.state.sculpture.Artist.Name}</Text>
            <Text style={[mapInformationStyles.text, mapInformationStyles.title]}>Édition:</Text>
            <Text style={mapInformationStyles.text}>{this.state.sculpture.Thematic.Year}</Text>

            <TouchableOpacity
              onPress={() => {
                Alert.alert("Plus d'informations",this.state.sculpture.Name);
              }}
              style={{marginTop:10}}
            >
              <Text style={[mapInformationStyles.text, mapInformationStyles.title, mapInformationStyles.buttonText]}>Plus d'informations</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }

}

//onpress on marker slideup info view
export default App;

const primaryColor = {
  orange: '#FB9D1D',
  darkOrange: 'rgba(200, 117, 4, 0.75)',
  blue: 'rgba(0, 122, 255, 1)',
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
    backgroundColor: primaryColor.orange,
    elevation: 5
  },
  title: {
    fontSize: 24,
    fontFamily: 'OpenSans',
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: primaryColor.darkOrange,
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


 const mapInformationStyles = StyleSheet.create({
  mainView:{
    bottom: '1%',
    left: '1%',
    height: '20%',
    minHeight: 150,
    width: '98%',
    position: 'absolute',
    alignItems: 'center',
    elevation: 5,
  },
  visibleView:{
    height: '100%',
    width: '100%',
    maxWidth: getScreenMinSize(),
    flexDirection: 'row',
    backgroundColor: primaryColor.orange,
    borderRadius:10,
    borderWidth: 1,
    borderColor: primaryColor.darkOrange,
  },
  image:{
    flex:1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  text:{
    fontSize: 16,
    fontFamily: 'OpenSans',
    marginLeft: 20,
    marginRight: 5,
  },
  buttonText:{
    color: primaryColor.blue,
    textDecorationLine: 'underline'
  }
 });
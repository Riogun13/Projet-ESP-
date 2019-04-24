
import React, {Component} from 'react';
import {
  NativeModules,
  LayoutAnimation,
  TouchableOpacity,
  ScrollView,
  Text,
  View,
  Image,
  Alert,
  Dimensions,
} from 'react-native';

import MapInformationStyle from '../../res/styles/mapInformation';
import NotifService from '../../library/notification/notifService';

const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
  
export default class MapInformation extends Component {
  constructor(props){
    super(props)
    this.state = {
      display: false,
      top: 0,
      sculpture: null,
    }
    this.updateMapInformationState = this.updateMapInformationState.bind(this);
    this.notifService = new NotifService();
  }

  updateMapInformationState(display, sculpture){
    LayoutAnimation.easeInEaseOut();
    this.setState({
      display: display,
      sculpture: sculpture
    });
  }

  getViewLeft(){
    var width = Dimensions.get('window').width;
    var height = Dimensions.get('window').height;
    if(width > height){
      return ((width - height) / 2);
    }else{
      return "1%";
    }
  }

  showImage(){
    if(this.state.sculpture.Image != ''){
      return  <Image
                source={{uri:this.state.sculpture.Image}}
                style={MapInformationStyle.image}
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
      <View style={[MapInformationStyle.visibleView, {left:this.getViewLeft()}]}>
        <View style={{flex:1,}}>
          {this.showImage()}
        </View>
        <ScrollView
          style={{flex:1}}
        >
          <Text style={[MapInformationStyle.text, MapInformationStyle.title]}>Titre:</Text>
          <Text style={MapInformationStyle.text}>{this.state.sculpture.Name}</Text>
          <Text style={[MapInformationStyle.text, MapInformationStyle.title]}>Artiste:</Text>
          <Text style={MapInformationStyle.text}>{this.state.sculpture.ArtistName}</Text>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.push('Details', {sculpture: this.state.sculpture});
              this.notifService.localNotif("MapInformationNotif", "Beauce Art", this.state.sculpture.Name, {tabToOpen:"Carte", stackToOpen:"Map"});
            }}
            style={{marginTop:10}}
          >
            <Text style={[MapInformationStyle.text, MapInformationStyle.title, MapInformationStyle.buttonText]}>Plus d'informations</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
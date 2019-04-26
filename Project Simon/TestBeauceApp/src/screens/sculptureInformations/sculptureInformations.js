import React, {Component} from 'react';

import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';

import Colors from '../../res/colors'
import Style from '../../res/styles/sculptureDetail'
import Ionicons from 'react-native-vector-icons/Ionicons';
import OfflineNotice from '../../library/noConnectionSign/offlineNotice/'

class DetailsScreen extends Component {
  
  static navigationOptions = {
    title: 'Detail',
  };
    render() {
      const sculpture = this.props.navigation.getParam('sculpture', {
        Name: 'No Sculpture Found',
        ArtistName: 'No Sculpture Found',
        Coordinate: {
          latitude: 46.123532,
          longitude: -70.681716
        },
        Material: 'No Sculpture Found',
        Image: 'No Sculpture Found',
        Thematic: {
          Year: 0,
          Name: 'No Sculpture Found',
        },
        ArtisticApproach: 'No Sculpture Found',
      });

      sculpture.ArtisticApproach.replace("\n", "\n");
      return (
        <View>
          <ScrollView>
            <View>
              <View style={Style.titleContainer}>
                <Text style={Style.titleName}>{sculpture.Name}</Text>
                <Text style={Style.label}>{sculpture.ArtistName}</Text>
              </View>
              <TouchableOpacity
                  style={Style.mapButton}
                    onPress={()=> this.props.navigation.navigate('Map', {
                      selectedSculpture: sculpture,
                      focusUser: false
                    })}
                >
                  <Ionicons name={"ios-pin"}  size={40} color={Colors.text} />
                </TouchableOpacity>
            </View>
            <View style={Style.imageContainer}>
              <Image
                  source={{uri:sculpture.Image}}
                  style={Style.image}
                />
            </View>
            <View>
              <Text style={Style.label}>Matériaux :</Text>
              <Text style={Style.text}>{sculpture.Material ? sculpture.Material : 'Non définie'}</Text>
              <Text style={Style.label}>Démarche Artistique :</Text>
              {sculpture.ArtisticApproach.split('\\n').map((item,i)=>{
                return <Text style={Style.paragraph} key={i}>{item}</Text>
              })}
            </View>
          </ScrollView>
          <OfflineNotice />
        </View>
      );
    }
  }
 
  export default DetailsScreen;
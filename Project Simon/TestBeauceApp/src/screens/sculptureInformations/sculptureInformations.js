import React, {Component} from 'react';

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Alert
} from 'react-native';

class DetailsScreen extends Component {
  
  static navigationOptions = {
    title: 'Detail',
  };
    render() {
      const sculpture = this.props.navigation.getParam('sculpture', {
        Name: 'No Sculpture Found',
        Artist: {
          Name: 'No Sculpture Found',
          ArtistDocumentId: 'No Sculpture Found',
        },
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

      return (
        <View>
          <ScrollView>
            <View style={styles.titleContainer}>
              <Text style={styles.titleName}>{sculpture.Name}</Text>
              <Text style={styles.label}>{sculpture.Artist.Name}</Text>
            </View>
            <View style={styles.imageContainer}>
              <Image
                  source={{uri:sculpture.Image}}
                  style={styles.image}
                />
            </View>
          </ScrollView>
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    titleName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#4a4a4a',
      margin: 8
    },
    titleContainer: {
      width: '80%'
    },
    label: {
      color: '#4a4a4a',
      fontSize: 24,
      marginLeft: 8
    },
    imageContainer: {
      height: 250
    },
    image:{
      flex:1,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      resizeMode: 'contain',
    },
  });
  export default DetailsScreen;
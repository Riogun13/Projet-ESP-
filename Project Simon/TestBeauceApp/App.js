/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { View, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Map from './src/screens/map/map';
import Header from './src/screens/header';
import NotifService from './src/library/notification/notifService';

type Props = {};

class App extends Component<Props> {
  constructor(props){
    super(props);
    this.notifService = new NotifService();
    //this.notifService.removeAllDeliveredNotifications();
  }

  render() {
    return(
      <View style={{flex:1}}>
        <Header></Header>
        <Map flex={10}></Map>
      </View>
    );
  }
}

//onpress on marker slideup info view
export default App;

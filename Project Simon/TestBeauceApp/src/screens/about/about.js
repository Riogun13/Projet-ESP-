import React, { Component } from 'react';
import { Text, View } from 'react-native';
import OfflineNotice from '../../library/noConnectionSign/offlineNotice/'

export default class About extends Component {
    
  static navigationOptions = {
    title: 'À Propos',
  };

  constructor(props){
    super(props);
  }

  componentDidMount(){
    console.log(this.props.navigation.state);
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hello, world About!</Text>
        <OfflineNotice />
      </View>
    );
  }
}
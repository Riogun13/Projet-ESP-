import React, {Component} from 'react';

import {
  Text,
  View,
  StatusBar,
} from 'react-native';

import HeaderStyle from '../res/styles/header'

class Header extends Component {

  render() {
    console.log(HeaderStyle);
    return(
      <View style={HeaderStyle.view}>
        <StatusBar backgroundColor="#c87604" barStyle="light-content" />
        <Text style={HeaderStyle.title} allowFontScaling={false}>
          Beauce Art App
        </Text>
      </View>
    );
  }

}

export default Header;
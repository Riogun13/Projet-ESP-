import {
  StyleSheet,
} from 'react-native';

import Colors from '../colors';

module.exports = StyleSheet.create({

  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontFamily: 'OpenSans',
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: Colors.primaryDark,
    textShadowOffset: {width: 1, height: 4},
    textShadowRadius: 5
  },

});
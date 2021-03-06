import {
  StyleSheet,
} from 'react-native';

import Colors from '../colors';

module.exports = StyleSheet.create({

  view: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgba(68, 68, 68, 1)',
    textShadowColor: Colors.primaryDark,
    textShadowOffset: {width: 1, height: 4},
    textShadowRadius: 5
  },

});
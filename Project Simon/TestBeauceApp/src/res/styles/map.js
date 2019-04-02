import {
  StyleSheet,
} from 'react-native';

import Colors from '../colors';

module.exports = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 6,
  },
  mapStyle: {
    flex: 1,
    ...StyleSheet.absoluteFillObject
  },

});
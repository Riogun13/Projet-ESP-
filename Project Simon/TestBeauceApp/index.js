/**
 * @format
 */

import {AppRegistry, Text} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
//import MapService from './src/screens/map/mapService';
AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask('mapService', () => MapService);

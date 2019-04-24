import {
    StyleSheet,
  } from 'react-native';
  
  import Colors from '../colors';

module.exports = StyleSheet.create({
    titleName: {
      fontSize: 28,
      fontWeight: 'bold',
      color: Colors.text,
      margin: 8
    },
    titleContainer: {
      width: '80%'
    },
    label: {
      color: Colors.text,
      fontSize: 24,
      marginLeft: 8
    },
    text: {
      color: Colors.text,
      fontSize: 18,
      marginLeft: 15,
      marginRight: 15
    },
    paragraph: {
      color: Colors.text,
      fontSize: 18,
      margin: 10
    },
    imageContainer: {
      margin: 4,
      height: 250
    },
    image:{
      flex:1,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      resizeMode: 'contain',
    },
    mapButton: {
      position: 'absolute',
      borderWidth:1,
      borderColor:'rgba(0,0,0,0.2)',
      alignItems:'center',
      justifyContent:'center',
      width: 50,
      height: 50,
      backgroundColor:Colors.accentOrange,
      borderRadius: 25,
      top: 10,
      right: 10,
    },
    appButton: {
      position: 'absolute',
      borderWidth:1,
      borderColor:'rgba(0,0,0,0.2)',
      alignItems:'center',
      justifyContent:'center',
      width: 50,
      height: 50,
      backgroundColor:Colors.accentOrange,
      borderRadius: 25,
      top: 60,
      right: 60,
    }
  });
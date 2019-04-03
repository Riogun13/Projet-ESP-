import {
  StyleSheet,
  Dimensions,
} from 'react-native';

import Colors from '../colors';

function getScreenMinSize(){
  if(Dimensions.get('window').width < Dimensions.get('window').height){
    return Dimensions.get('window').width
  }else{
    return Dimensions.get('window').height
  }
}

module.exports = StyleSheet.create({

  visibleView:{
    bottom: '1%',
    left: '1%',
    height: '20%',
    minHeight: 150,
    width: '98%',
    maxWidth: getScreenMinSize(),
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: Colors.primary,
    borderRadius:10,
    borderWidth: 1,
    borderColor: Colors.primaryDark,
    elevation: 5,
  },
  image:{
    flex:1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  text:{
    fontSize: 16,
    fontFamily: 'OpenSans',
    marginLeft: 20,
    marginRight: 5,
  },
  buttonText:{
    color: Colors.accentColor,
    textDecorationLine: 'underline'
  }
  
});
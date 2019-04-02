import {
  StyleSheet,
  Dimensions,
} from 'react-native';

class Styles {
  // getScreenMinSize(){
  //   if(Dimensions.get('screen').width < Dimensions.get('screen').height){
  //     return Dimensions.get('screen').width
  //   }else{
  //     return Dimensions.get('screen').height
  //   }
  // }
  
  // static general = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     backgroundColor: '#ff0'
  //   },
  //   header: {
  //     flex: 1,
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     backgroundColor: primaryColor.orange,
  //     elevation: 5
  //   },
  //   title: {
  //     fontSize: 24,
  //     fontFamily: 'OpenSans',
  //     fontWeight: 'bold',
  //     color: 'white',
  //     textShadowColor: primaryColor.darkOrange,
  //     textShadowOffset: {width: 1, height: 4},
  //     textShadowRadius: 5
  //   },
  //   map: {
  //     flex: 6,
  //   },
  //   mapStyle: {
  //     flex: 1,
  //     ...StyleSheet.absoluteFillObject
  //   },
  // });
    
    
  // mapInformationStyles = StyleSheet.create({
  //   mainView:{
  //     bottom: '1%',
  //     left: '1%',
  //     height: '20%',
  //     minHeight: 150,
  //     width: '98%',
  //     position: 'absolute',
  //     alignItems: 'center',
  //     elevation: 5,
  //   },
  //   visibleView:{
  //     height: '100%',
  //     width: '100%',
  //     maxWidth: getScreenMinSize(),
  //     flexDirection: 'row',
  //     backgroundColor: primaryColor.orange,
  //     borderRadius:10,
  //     borderWidth: 1,
  //     borderColor: primaryColor.darkOrange,
  //   },
  //   image:{
  //     flex:1,
  //     borderTopLeftRadius: 10,
  //     borderBottomLeftRadius: 10,
  //   },
  //   title: {
  //     fontSize: 17,
  //     fontWeight: 'bold',
  //     marginLeft: 10,
  //   },
  //   text:{
  //     fontSize: 16,
  //     fontFamily: 'OpenSans',
  //     marginLeft: 20,
  //     marginRight: 5,
  //   },
  //   buttonText:{
  //     color: primaryColor.blue,
  //     textDecorationLine: 'underline'
  //   }
  // });
  
}
module.exports = StyleSheet.create({

  alwaysred: {
      backgroundColor: 'red',
      height: 100,
      width: 100,
  },
  
  });
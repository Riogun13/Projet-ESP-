
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../res/colors';
  
export default class CollapsiblePanel extends Component {
  constructor(props){
    super(props)
    let IconComponent = Ionicons;
    this.icons = {
      'down' : <IconComponent name={'ios-arrow-dropdown'} size={25} color={Colors.accentOrange} style={styles.buttonImage}/>,
      'up' : <IconComponent name={'ios-arrow-dropup'} size={25} color={Colors.black} style={styles.buttonImage}/>
    };

    this.state = {
      title : props.title,
      expanded : false,
      animation : new Animated.Value(1),
    };
  }

  _setMaxHeight(event){
    this.setState({
      maxHeight   : event.nativeEvent.layout.height
    });
  }

  _setMinHeight(event){
    this.setState({
      minHeight   : event.nativeEvent.layout.height,
      animation : new Animated.Value(event.nativeEvent.layout.height),
    });
  }

  toggle(){
    let initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight;
    let finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

    this.setState({
      expanded : !this.state.expanded
    });

    this.state.animation.setValue(initialValue);
    Animated.spring(
      this.state.animation,
      {
        toValue: finalValue,
        duration: 100,
      }
    ).start();
  }

  render() {
    let icon = this.icons['up'];
    let titleStyle = styles.title;

    if(this.state.expanded){
      icon = this.icons['down'];
      titleStyle = [styles.title, {color: Colors.accentOrange}];
    }

    return (
      <Animated.View style={[styles.container,{height: this.state.animation}]}>

        <TouchableOpacity
          style={styles.titleContainer}
          onLayout={this._setMinHeight.bind(this)}
          onPress={this.toggle.bind(this)}>
          <Text style={titleStyle}>{this.state.title}</Text>
          {icon}
        </TouchableOpacity>
          
        <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
          {this.props.children}
        </View>

      </Animated.View>
    );
  }
}

var styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor : Colors.primary,
    margin : 3,
    overflow :'hidden'
  },
  titleContainer : {
    flexDirection : 'row',
    alignItems: 'center',
  },
  title : {
    fontSize: 18,
    flex : 1,
    padding : 10,
    color : Colors.text,
    fontWeight:'bold'
  },
  buttonImage : {
  },
  body : {
    padding : 10,
    paddingTop : 0
  }
});














// import React,{Component,StyleSheet,Text,View,Image,TouchableHighlight,Animated} from 'react-native';

// export default class CollapsiblePanel extends Component {
//   constructor(props){
//     //super(props);

//     this.icons = {
//       'up' : <IconComponent name={'ios-arrow-dropdown'} size={25} color={'#444'} />,
//       'down' : <IconComponent name={'ios-arrow-dropup'} size={25} color={'#444'} />
//     };

//     this.state = {
//       title : props.title,
//       expanded : true
//     };
//   }

//   toggle(){
      
//   }

//   render(){
//     let icon = this.icons['down'];

//     if(this.state.expanded){
//       icon = this.icons['up'];
//     }

//     return ( 
//       <View style={styles.container}>
//         <View style={styles.titleContainer}>
//           <Text style={styles.title}>{this.state.title}</Text>
//           <TouchableHighlight 
//             style={styles.button} 
//             onPress={this.toggle.bind(this)}
//             underlayColor="#f1f1f1">
//             <Image
//               style={styles.buttonImage}
//               source={icon}
//             ></Image>
//           </TouchableHighlight>
//         </View>
          
//         <View style={styles.body}>
//           {this.props.children}
//         </View>

//       </View>
//     );
//   }
// };

// var styles = StyleSheet.create({
//   container : {
//     backgroundColor : '#fff',
//     margin :10,
//     overflow :'hidden'
//   },
//   titleContainer : {
//     flexDirection : 'row'
//   },
//   title : {
//     flex : 1,
//     padding : 10,
//     color :'#2a2f43',
//     fontWeight:'bold'
//   },
//   button : {

//   },
//   buttonImage : {
//     width : 30,
//     height : 25
//   },
//   body : {
//     padding : 10,
//     paddingTop : 0
//   }
// });

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
      initialHeightApplied : false,
      animation : new Animated.Value(1),
    };
  }

  _setMaxHeight(event){
      let maxHeight = event.nativeEvent.layout.height;
      this.setState({
        maxHeight : maxHeight,
      });
  }

  _setMinHeight(event){
      let minHeight = event.nativeEvent.layout.height;
      this.setState({
        minHeight : minHeight,
      });
      if(!this.state.initialHeightApplied){
        this.setState({
          initialHeightApplied : true,
          animation : new Animated.Value(minHeight),
        });
      }
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
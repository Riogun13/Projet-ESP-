import React, {Component} from 'react';
import {
  View,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import Colors from '../res/colors';


export default class ImageHandler extends Component {
    constructor(props){
      super(props)
      this.state = {
          display: false,
      };
      this.updateUI = this.updateUI.bind(this);
    }

    updateUI(display){
        this.setState({
            display: display
        })
    }

    getWidth(){
        return 100% -20;
    }

    getHeight(){
        return 100% - 20;
    }

    render(){
        if(!this.state.display){
            return null;
        } else {
            return (
            <View style={[
                {
                    position: "absolute", 
                    backgroundColor: "#FFF",
                    top: "-25%", 
                    left: "-23%",
                    alignItems: "center", 
                    justifyContent: "center",
                    elevation: 1
                },
                {width: "150%"}, 
                {height: "150%"}]}>
                <ActivityIndicator size="large" color={Colors.accentOrange}></ActivityIndicator>
            </View>
            );
        }
    }
}
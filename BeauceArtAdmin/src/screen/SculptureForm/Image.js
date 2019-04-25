
import React, {Component} from 'react';
import {
  View,
  Image,
  Button
} from 'react-native';
import ImagePicker from "react-native-image-picker";
import Colors from '../../res/colors';

  
export default class ImageHandler extends Component {
  constructor(props){
    super(props)
    this.state = {
        image: null,
    };
    this.getImage = this.getImage.bind(this);
    this.getIfImageHasBeenModified = this.getIfImageHasBeenModified.bind(this);
  }

  handleChooseImage= () => {
    const options = {
        noData: true,
        mediaType: 'photo'
    };
    ImagePicker.launchImageLibrary(options, response => {
        console.log("response", response);
        if(response.uri){
            this.setState({ image: response});
            this.imageUri = response.uri;
        }
    });
  };

  getImage(){
    return this.state.image;
  }

  getIfImageHasBeenModified(){
    if(this.state.image){
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { image } = this.state;
    if(this.props.url && this.state.image == null){
      return (
        <View style={{justifyContent: "center", alignItems: "center", padding: 20}}>
          <Button title={this.props.buttonText} onPress={this.handleChooseImage} color={Colors.accentOrange}></Button>
            <Image
                source={{ uri: this.props.url }}
                style={{ width: 200, height: 200 , resizeMode: 'contain', borderRadius: 10, margin: 10}}
            />
        </View>
      )
    } else {
      return (
        <View style={{justifyContent: "center", alignItems: "center", padding: 20}}>
          <Button title={this.props.buttonText} onPress={this.handleChooseImage} color={Colors.accentOrange}></Button>
          {image && (
              <Image
                  source={{ uri: image.uri }}
                  style={{ width: 200, height: 200 , resizeMode: 'contain', borderRadius: 10, margin: 10}}
              />
          )}
        </View>
      );
    }
  }
}
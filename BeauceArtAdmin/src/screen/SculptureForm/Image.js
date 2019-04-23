
import React, {Component} from 'react';
import {
  View,
  Image,
  Button
} from 'react-native';
import ImagePicker from "react-native-image-picker";

  
export default class ImageHandler extends Component {
  constructor(props){
    super(props)
    this.state = {
        image: null,
    };
    this.getImage = this.getImage.bind(this);
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

  render() {
    const { image } = this.state;
    return (
        <View style={{justifyContent: "center", alignItems: "center", padding: 20}}>
            <Button title={this.props.buttonText} onPress={this.handleChooseImage} ></Button>
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
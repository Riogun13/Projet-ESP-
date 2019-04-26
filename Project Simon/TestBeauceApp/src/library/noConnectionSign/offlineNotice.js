
import React, { PureComponent } from 'react';
import { View, Text, NetInfo, Dimensions, StyleSheet, Alert } from 'react-native';


const { width } = Dimensions.get('window');

function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>Pas de connexion internet</Text>
    </View>
  );
}

class OfflineNotice extends PureComponent {

  constructor(){
    super();
    this.state = {
      isConnected: true
    };
    NetInfo.isConnected.fetch().then(isConnected => {
      if(!isConnected)
        this.setState({isConnected:false});
    });

  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = isConnected => {
      this.setState({ isConnected });
  };

  render() {
    if (!this.state.isConnected) {
      return <MiniOfflineSign />;
    }
    return null;
  }
}

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: 0
  },
  offlineText: { color: '#fff' }
});

export default OfflineNotice;
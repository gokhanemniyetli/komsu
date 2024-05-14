import React, {  Component } from 'react';
import { View, Text,  Dimensions, StyleSheet } from 'react-native';
import NetInfo from "@react-native-community/netinfo";

const { width } = Dimensions.get('window');

function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  );
}

class OfflineNotice extends Component {
  constructor() {
    super();
    this.state = {
      isConnected: false
    }
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);

    NetInfo.isConnected.fetch().done((isConnected) => {
      if (isConnected == true) {
        this.setState({ isConnected: true })
      }
      else {
        this.setState({ isConnected: false })
      }
    });
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = (isConnected) => {
    if (isConnected == true) {
      this.setState({ isConnected: true  })
    }
    else {
      this.setState({ isConnected: false  })
    }

  };

  render() {
    
    if (!this.state.isConnected) {
      return (<View style={styles.offlineContainer}>
        <Text style={styles.offlineText}>No Internet Connection</Text>
      </View>);
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
    marginTop: 30
  },
  offlineText: { color: '#fff' }
});

export default OfflineNotice;
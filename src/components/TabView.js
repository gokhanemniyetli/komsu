import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, ViewPropTypes} from 'react-native';

import {Actions} from 'react-native-router-flux';


class TabView extends React.Component {
 
  render() {
    return (
      <View  >
        <Text>
          Tab title:
          {this.props.title} name:
          {this.props.name}
        </Text>
        
      </View>
    );
  }
}


export default TabView;

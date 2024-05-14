import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, Image} from 'react-native';

const propTypes = {
  focused: PropTypes.bool,
  title: PropTypes.string,
};

const defaultProps = {
  focused: false,
  title: '',
};




const TabIcon = props => (
  // <Text style={{color: props.focused ? 'red' : 'black'}}>{props.title}</Text>
  <View>
    <Image source={require('../images/icons/hesabim.png')} style={{width:24, height:24}}/>
    <Text >{props.title}</Text>
  </View>
);

TabIcon.propTypes = propTypes;
TabIcon.defaultProps = defaultProps;

export default TabIcon;

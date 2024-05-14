import React from 'react';
import { View } from 'react-native';


const Card = (props) => {
  return (
    <View style={props.transparent ? styles.transparentContainer : styles.container} >
      {props.children}
    </View>
  );
};

const styles = {
  container: {
    //borderBottomWidth: 1,
    padding: 20,
    // paddingTop: 10,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  transparentContainer: {
    //borderBottomWidth: 1,
    padding: 20,
    paddingTop: 10,
    borderColor: '#ddd',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 3,
  }
};

export { Card };

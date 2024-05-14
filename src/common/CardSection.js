import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
  return (
    <View style={styles.container}>
      {props.children}
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    margin: 10,
    marginBottom: 10,
    padding: 5,
    paddingLeft: 10,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
};

export { CardSection };

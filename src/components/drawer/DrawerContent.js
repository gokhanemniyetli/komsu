import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, ViewPropTypes, TouchableOpacity} from 'react-native';
// import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'red',
  },
});

class DrawerContent extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    sceneStyle: ViewPropTypes.style,
    title: PropTypes.string,
  };

  // static contextTypes = {
  //   drawer: PropTypes.object,
  // };

  render() {
    return (
      
      <View style={{backgroundColor:'yellow', height:200}}>
        {/* <Text>Drawer Content</Text>
        <Button onPress={Actions.closeDrawer}>Back</Button> */}
        {/* <Text>Title: {this.props.title}</Text>
        {this.props.name === 'tab_1_1' && (
          <TouchableOpacity onPress={Actions.tab_1_2}><Text>next screen for tab1_1</Text></TouchableOpacity>
        )}
        {this.props.name === 'tab_2_1' && (
          <TouchableOpacity onPress={Actions.tab_2_2}>n<Text>ext screen for tab2_1</Text></TouchableOpacity>
        )}

        <TouchableOpacity onPress={Actions.pop}><Text>Back</Text></TouchableOpacity>
        <TouchableOpacity onPress={Actions.tab_1}><Text>Switch to tab1</Text></TouchableOpacity>
        <TouchableOpacity onPress={Actions.tab_2}><Text>Switch to tab2</Text></TouchableOpacity>
        <TouchableOpacity onPress={Actions.tab_3}><Text>Switch to tab3</Text></TouchableOpacity>
        <TouchableOpacity onPress={Actions.tab_4_1}><Text>Switch to tab4</Text></TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Actions.___tab_5({data: 'test!'});
          }}>
          <Text>Switch to tab5 with data</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={Actions.echo}><Text>Push Clone Scene (EchoView)</Text></TouchableOpacity>
        <TouchableOpacity onPress={Actions.launch}><Text>Reset back to launch</Text></TouchableOpacity> */}
      </View>
    );
  }
}

export default DrawerContent;

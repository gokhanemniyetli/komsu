import React, { Component } from 'react';
import { View } from 'react-native';

import Head from './Header';
import Nav from './Navigation';
import { throwStatement } from '@babel/types';

export const HF_11 = (props) => {
  // Save = () => {
  //   props.parentMethod();
  // }
  // console.log(props)

  return (
    props.contentScreen != true ?
      <View style={[{}]}>
        <Head headerType={true} hideBackImage={props.hideBackImage} />
        {/* <View style={{ flex: 1 }}></View> 
       <Nav navigationType={"d"} /> */}
      </View>
      :
      props.title != undefined &&
      <HF_01 title={props.title} rightButtonJumpPage={props.rightButtonJumpPage} parentMethod={this.Save} />
  );
};

export const HF_01 = props => {
  Save = () => {
    // console.log(props)
    //debugger
    
      props.parentMethod();
    
  }
  // console.log(props)
  
  return (
    <View style={styles.container}>
      <Head headerType={false} title={props.title} user={props.user} rightButtonJumpPage={props.rightButtonJumpPage} parentMethod={this.Save} from={props.from} />
      <View style={{ flex: 1 }}>{props.children}</View>
      <Nav navigationType={"s"} menuItem={props.menuItem}
      />
    </View>

  );
};




export const HF_10 = props => {
  return (
    <View style={styles.container}>
      <Head headerType={true} />
      <View style={{ flex: 1 }}>{props.children}</View>
      <Nav navigationType={"s"} />
    </View>
  );
};

export const HF_00 = props => {
  return (
    <View style={styles.container}>
      <Head headerType={false} />
      <View style={{ flex: 1 }}>{props.children}</View>
      <Nav navigationType={"s"} />
    </View>
  );
};



export const HF_011 = props => {

  return (
    <View style={styles.container}>
      <Head headerType={false} title={props.title} user={props.user} />
      <View style={{ flex: 1 }}>{props.children}</View>
      <Nav navigationType={"s"} />
    </View>
  );
};

const styles = {
  container: {
    //flex: 1,
    flexDireciton: 'column',
    backgroundColor: '#F8F8F8',
  },
};

import React ,  { Component } from 'react';
import {Text, View, Image, ScrollView} from 'react-native';
//import {GetSessionTicket} from '../common';
import {Button, Link, Card, CardSection, Spinner } from '../common';

import Nav from '../common/Navigation';
import { Actions } from 'react-native-router-flux';
 import { connect } from 'react-redux';
 import { SignInControl, SignOut } from '../actions';

// import React, { Component } from 'react';
// import { Text, Button, View, Image, Dimensions, ImageBackground } from 'react-native';
// import { Actions } from 'react-native-router-flux';
// import { connect } from 'react-redux';
// import { SignInControl, SignOut } from '../actions';


// import { IsSignIn, SetSessionTicket, ClearSessionTicket } from '../common';

// import { LoginManager } from 'react-native-fbsdk';

// import { Spinner } from '../common';




class HomeScreen extends Component {
    constructor(props) {
        super(props);
    }


    UNSAFE_componentWillMount()  {
        this.setState
        // console.log("Start WillMount")
        // this.props.SignInControl();
    }

  render() {
    const { navigation } = this.props;
    const otherParam = navigation.getParam('otherParam', 'some default value');
  

    return (
    <View style={{flex:1}}>
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
            <Card>
                <CardSection>
                    {/* <Image source={require('../images/swoqy_pembe_logo_kucuk.png')} resizeMode={'contain'} style={{width: '80%'}} ></Image> */}
                </CardSection>
            </Card>

            <Card>
                <CardSection>
                <Link onPress={() => Actions.cameraScreen()} > Camera</Link>
                <Link onPress={() => Actions.post()} > Post</Link>
                <Link onPress={() => Actions.userProfileScreen({ID : 1})} > User Profile</Link>
                {/*                 
                <Link onPress={Actions.favoritesScreen} > FAVORİLER</Link>
                */}
                <Link onPress={Actions.accountScreen} > Account ekranı</Link>  
                
               
                    <Text>arama çubuğu </Text>
                </CardSection>
            </Card>
            
            <Card>
                <CardSection>
                    <Text>Link kutucukları</Text>
                </CardSection>
            </Card>
            
            <Card>
                <CardSection>
                    <Text>Akış</Text>
                </CardSection>
            </Card>
            
            <Card>
                <CardSection>
                    <Text>FOOTER</Text>
                </CardSection>
            </Card>
            
            
        </ScrollView>

        {/* <Nav navigationType={true} currently="storeScreen"/> */}

</View>
    );
  }
}




const mapStateToProps = ({ startScreenResponse }) => {
    const { loading, SwoqyUserToken } = startScreenResponse;
    return { loading, SwoqyUserToken };
};

export default connect(mapStateToProps, { SignInControl })(HomeScreen)
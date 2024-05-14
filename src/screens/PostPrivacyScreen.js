import _ from 'lodash'
import React, { Component } from 'react';
import { Text, TextInput, View, ScrollView, Image, TouchableOpacity, FlatList, Linking,  Alert, Dimensions } from 'react-native';
import { Card, CardSection, Spinner, Star, Link, GetSessionTicket, ShowMessage, PrivacyText } from '../common';



import { Localizations, FormatDate } from '../../locales/i18n';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {  } from '../actions';

const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');
import { HF_11, HF_10, HF_01, HF_00 } from '../common/HF';
import RadioButtonScreen from './RadioButtonScreen';

class PostPrivacyScreen extends Component {
    state = {
        AccessTypeID : 1
    };

    //#region Component operations
    UNSAFE_componentWillMount()  {
        // debugger
        this.setState
        // this.props.StoreScreenData({ storeID: this.props.storeID, userToken: this.props.SwoqyUserToken});
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        res = nextProps.res;
    }
    //#endregion

    //#region click functions
    _clickSetPrivacy = (set) => {
        this.setState({
            statePrivacy: set,
        })

        if (set != 3) {
            Actions.pop();
        }
    }

    _clickSetSpecificFriends = () => {
        Actions.postPrivacySpecificFriendsScreen()
    }
    //#endregion

    //#region render operations
    renderSetPrivacyArea = () => {
        //  console.log("newReview")
        const options = [
            { key: '1', text: PrivacyText(1) },
            { key: '2', text: PrivacyText(2) },
            { key: '3', text: PrivacyText(3) }
        ];

        if (!this.state.loadingPostPrivacy) {
            return (
                <View style={{ height: Dimensions.get('window').height }}>
                    <View style={{ justifyContent: 'flex-end' }}>
                        <View>
                            <Text style={{ fontSize: 20, color: '#9b9b9b', margin: 5, marginVertical: 15, }}>{Localizations('NewPost.PrivacyInfo')}</Text>
                        </View>

                        <View style={{ margin: 10, }}>
                            <RadioButtonScreen options={options} />
                        </View>
                    </View>
                </View >
            )
        }
        return <Spinner size="large" />;
    }

    render() {
        //  console.log(this.props);

        /// Server kaynaklı sorun olduğunda görüntülenecek.
        if (!this.props.connectionError) {
            return (
                <View style={{ flex: 1 }}>
                    {/* <View style={{ height: 40 }}>
                        <HF_01 title={Localizations('Global.PostPrivacyScreen')} />
                    </View> */}
                    <View>
                        <Card>
                            {this.renderSetPrivacyArea()}
                        </Card>
                    </View>
                </View>
            )
        }
        return (
            <ShowMessage backgroundStyle="bgStyle"
                textStyle="txtStyle"
                text={Localizations('Global.ConnectionError')}
            />
        );

    }
    //#endregion
}


const mapStateToProps = ({ postResponse, startScreenResponse }) => {
    const { accessTypeID, connectionError } = postResponse;
    const { SwoqyUserToken } = startScreenResponse;
    return {
        accessTypeID, connectionError, SwoqyUserToken
    };
}

export default connect(mapStateToProps, {  })(PostPrivacyScreen);

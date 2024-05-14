import _ from 'lodash'
import React, { Component } from 'react';
import { Text, TextInput, View, ScrollView, Image, TouchableOpacity, FlatList, Linking,  Alert, Dimensions } from 'react-native';
import { Card, CardSection, Spinner, Star, Link, GetSessionTicket, ShowMessage, Favourite } from '../common';
import { Localizations, FormatDate } from '../../locales/i18n';
import { connect } from 'react-redux';
import { GetNearPlaces } from '../actions';
import { Actions } from 'react-native-router-flux';
import ListItemNearPlaces from '../components/ListItemNearPlaces';
import { HF_11, HF_10, HF_01, HF_00 } from '../common/HF';

var sortJsonArray = require('sort-json-array');
const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

class PostLocationScreen extends Component {
    state = {

    };

    //#region Component operations
    UNSAFE_componentWillMount()  {
        this.setState
        this.props.GetNearPlaces({ userToken: this.props.SwoqyUserToken,
            latitude: this.props.SwoqyUserData.Latitude,
            longitude: this.props.SwoqyUserData.Longitude });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        //debugger;
        // res = nextProps.res;
        //  console.log(nextProps);

        if (nextProps.type == 'get_near_places_success') {
            // console.log(nextProps);

            this.setState({
                nearPlaceList: nextProps.nearPlaceList
            });
        }
    }
    //#endregion

    //#region render operations
    renderNearPlacesArea = () => {
        if (!this.props.loadingNearPlaceList) {
            return (
                <View style={{ height: Dimensions.get('window').height }}>
                    <ScrollView>

                        {this.state.nearPlaceList != undefined &&
                            this.state.nearPlaceList.length > 0 ?
                            <FlatList
                                data={this.state.nearPlaceList}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal={false}
                                renderItem={info => (
                                    <ListItemNearPlaces
                                        nearPlace={info.item}
                                    />
                                )}
                            />
                            :
                            <View>
                                <Text>{Localizations('NewPost.YouAreAway')}</Text>
                            </View>
                        }
                    </ScrollView>
                </View >
            )
        }
        return <Spinner size="large" />;
    }

    render() {
        // console.log(this.state.friendList)
        /// Server kaynaklı sorun olduğunda görüntülenecek.
        if (!this.props.connectionError) {
            return (
                <View style={{ flex: 1 }}>
                    {/* <View style={{ height: 40 }}>
                        <HF_01 title={Localizations('Global.PostLocationScreen')} />
                    </View> */}
                    <Card>
                        {this.renderNearPlacesArea()}
                    </Card>
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
    const { accessTypeID, selectedPlace, nearPlaceList, loadingNearPlaceList, type, connectionError } = postResponse;
    const { SwoqyUserToken, SwoqyUserData } = startScreenResponse;
    return {
        accessTypeID, selectedPlace, nearPlaceList, loadingNearPlaceList, type, connectionError, SwoqyUserToken, SwoqyUserData
    };
}

export default connect(mapStateToProps, { GetNearPlaces })(PostLocationScreen);

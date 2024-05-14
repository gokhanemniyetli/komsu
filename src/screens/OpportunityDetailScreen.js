import _ from 'lodash'
import React, { Component } from 'react';
import { Text, View, ScrollView, Image, ListView, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { OpportunityDetailScreenData, SetOpportunityFavoriteData } from '../actions';
import { Card, CardSection, Spinner } from '../common';
import { Localizations, FormatDate } from '../../locales/i18n';
import { Actions } from 'react-native-router-flux';

var dateFormat = require('dateformat');
const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

class OpportunityDetailScreen extends Component {
    state = { res: '', loadingOpportunity: false, loadingSetOpportunityFavorite: false };

    UNSAFE_componentWillMount() {
        this.setState
        this.props.OpportunityDetailScreenData({ brandOpportunityID: this.props.BrandOpportunityID, userToken: this.props.SwoqyUserToken });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        res = nextProps.res;

        if (nextProps.type == 'api_data_success') {
            this.setState({
                opportunityID: res.OpportunityID,
                opportunityName: res.OpportunityName,
                opportuntyLargeImage: GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.OPPORTUNITY + '/' + res.OpportuntyLargeImage,
                startDate: res.StartDate,
                endDate: res.EndDate,
                favorite: res.Favorite,
                opportunityDetail: res.OpportunityDetail
            });
        } else if (nextProps.type == 'set_opportunity_favorite_data_success') {
            this.setState({
                favorite: res
            });
        }
    }

    _clickFavorite = (opportunityID) => {

        if (this.props.SwoqyUserToken === '' || this.props.SwoqyUserToken === null || this.props.SwoqyUserToken === undefined) {
            Alert.alert(
                Localizations('ShoppingMall.UserLogin'),
                Localizations('ShoppingMall.FavoriteAlertMessage'),
                [
                    {
                        text: Localizations('ShoppingMall.Cancel'),
                        onPress: () => console.log(' Pressed'),
                        style: 'cancel',
                    },
                    { text: Localizations('ShoppingMall.Ok'), onPress: () => Actions.signInScreen() },
                ],
                { cancelable: false },
            );
        } else {
            this.props.SetOpportunityFavoriteData({ opportunityID: opportunityID, userToken: this.props.SwoqyUserToken });
        }
    }


    renderOpportunityArea = () => {
        if (this.props.loadingOpportunity) {
            return (
                <View style={{ flex: 1, }}>
                    <View style={{ flexDirection: 'column'}}>
                        <View >
                            <Image
                                style={{
                                    height: 200,
                                    flex: 1,
                                }}
                                source={{
                                    uri:
                                        this.state.opportuntyLargeImage
                                }}
                            />
                        </View>
                        <View style={{ flex:1,  marginTop: 30, flexDirection: 'row' }}>
                            <View style={{flex:4,  }}>
                                <View style={{  marginLeft: 10 }}>
                                    <Text>{this.state.opportunityName}</Text>
                                </View>
                                <View style={{ marginTop: 10, marginLeft: 10 }}>
                                    <Text>{this.state.opportunityDetail}</Text>
                                </View>
                                <View style={{ marginTop: 20, marginLeft: 10 }}>
                                    <Text>{Localizations('Global.StartDate')}: {FormatDate(this.state.startDate, "dd.MM.yyyy")}</Text>
                                    <Text>{Localizations('Global.EndDate')}: {FormatDate(this.state.endDate, "dd.MM.yyyy")}</Text>
                                </View>
                            </View>
                            <View style={{flex:1, }}>
                                <View >
                                    {this.renderFavoriteArea()}
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }
        return <Spinner size="large" />;
    }

    // Favorilere ekle
    renderFavoriteArea = () => {
        if (!this.props.loadingSetOpportunityFavorite) {
            return (
                <TouchableOpacity style={container.center} onPress={() => this._clickFavorite(this.state.opportunityID)}>
                    {(!this.state.favorite) ?
                        <View style={{ flex: 1 }}>
                            <View style={container.center} >
                                <Image
                                    style={imageStyle.favouriteStyle}
                                    source={require('../images/icons/heartPassive.png')}
                                />
                            </View>
                        </View>
                        :
                        <View style={{ flex: 1 }}>
                            <View style={container.center} >
                                <Image
                                    style={[imageStyle.favouriteStyle, { tintColor: 'red' }]}
                                    source={require('../images/icons/heartAktif.png')}
                                />
                            </View>
                        </View>
                    }
                </TouchableOpacity >
            )
        }
        return <Spinner size="small" />;
    }

    render() {
        return (

            <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>

                {this.renderOpportunityArea()}

            </ScrollView>

        );

    }
}

const mapStateToProps = ({ opportunityDetailScreenResponse, startScreenResponse }) => {
    const { res, type, loadingOpportunity, loadingSetOpportunityFavorite } = opportunityDetailScreenResponse;
    const { SwoqyUserToken } = startScreenResponse;
    return {
        res, type, loadingOpportunity, SwoqyUserToken, loadingSetOpportunityFavorite
    };
}

export default connect(mapStateToProps, { OpportunityDetailScreenData, SetOpportunityFavoriteData })(OpportunityDetailScreen);

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

class ActivityDetailScreen extends Component {
    state = { res: '', loadingActivity: true };

    UNSAFE_componentWillMount() {
        // this.props.OpportunityDetailScreenData({ brandOpportunityID: this.props.BrandOpportunityID, userToken: this.props.SwoqyUserToken });
        //this.props.ActivityDetailScreenData({ activityID: this.props.ActivityID, userToken: this.props.SwoqyUserToken });


        // console.log(this.props);
        this.setState({
            activity: this.props.activity,
            loadingActivity: false
        })
        // debugger
    }

    renderActivityArea = () => {
        if (!this.state.loadingActivity) {
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
                                        GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.ACTIVITY + '/' + this.state.activity.ImageName
                                }}
                            />
                        </View>
                        <View style={{ flex:1,  marginTop: 30, flexDirection: 'row' }}>
                            <View style={{flex:4,  }}>
                                <View style={{  marginLeft: 10, }}>
                                    <Text style={{fontWeight: 'bold' }}>{this.state.activity.ActivityName}</Text>
                                </View>
                                <View style={{ marginTop: 10, marginLeft: 10 }}>
                                    <Text>{this.state.activity.ActivityDetail}</Text>
                                </View>
                                <View style={{ marginTop: 20, marginLeft: 10 }}>
                                    <Text>{Localizations('Global.StartDate')}: {FormatDate(this.state.activity.StartDate, "dd.MM.yyyy")}</Text>
                                    <Text>{Localizations('Global.EndDate')}: {FormatDate(this.state.activity.EndDate, "dd.MM.yyyy")}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }
        return <Spinner size="large" />;
    }

    render() {
        return (

            <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>

                {this.renderActivityArea()}

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

export default connect(mapStateToProps, { OpportunityDetailScreenData, SetOpportunityFavoriteData })(ActivityDetailScreen);

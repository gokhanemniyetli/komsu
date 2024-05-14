import _ from 'lodash'
import React, { Component } from 'react';
import { Text, View, ScrollView, Image, ListView, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { ShoppingMallOpportunityListData } from '../actions';
import { Localizations, FormatDate } from '../../locales/i18n';
import ListItemShoppingMallStore from './ListItemShoppingMallStore';
import ListItemOpportunity from './ListItemOpportunity';

import SwitchSelector from "react-native-switch-selector";
import { Card, CardSection, Spinner } from '../common';

// import { Localizations, FormatDate } from '../../locales/i18n';
// import { Actions } from 'react-native-router-flux';

var sortJsonArray = require('sort-json-array');
var groupBy = require('json-groupby')

const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

class BrandOpportunityList extends Component {
    state = { res: '', opportunityList: '', selectedListItem: 0 };

    UNSAFE_componentWillMount()  {
        this.setState({
            opportunities: this.props.opportunities,
            from: this.props.from
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        res = nextProps.res;

        // console.log("props");
        // console.log(nextProps);

        this.setState({
            opportunityList: nextProps.opportunityList
        });
    }

    _changeListType = (item) => {
        this.setState({
            selectedListItem: item
        })
    }

    renderContentArea = () => {
        if (this.state.opportunities != null) {
            var oObject = this.state.opportunities;
            // console.log(this.state.selectedListItem)
            switch (this.state.selectedListItem) {
                case '0':
                    oObject = sortJsonArray(oObject, 'StartTime', 'des')

                    break;
                case '1':
                    oObject = oObject.filter(x => x.Favorite == true)
                    break;
                case '2':
                    oObject = sortJsonArray(oObject, 'BrandName', 'asc')
                    break;
            }

            const options = [];
            options.push({ label: Localizations('ListItem.Newest'), value: '0' })
            if (this.state.from != 'favorites') {
                options.push({ label: Localizations('ListItem.Favourites'), value: '1' })
            }
            options.push({ label: Localizations('ListItem.A-Z'), value: '2' })

            // console.log("opportunity içinde")
            //         console.log(oObject);

            return (
                <View style={{ flex: 1, }}>
                    <View style={{ alignItems: 'center' }}>
                        <SwitchSelector
                            style={{ width: '80%', margin: 5, marginTop: 13 }}
                            initial={0}
                            onPress={value => this._changeListType(value)}
                            textColor='#ff5a5c'
                            selectedColor='#ffffff'
                            buttonColor='#ff5a5c'
                            borderColor='#e9ebed'
                            hasPadding
                            options={options}
                        />
                    </View>
                    <View style={{ paddingBottom: 100, }}>
                        <FlatList
                            data={oObject.filter(x => x.BrandOpportunityID > 0)}
                            keyExtractor={(item, index) => index.toString()}
                            //scrollEnabled={false}
                            renderItem={info => (
                                <ListItemOpportunity
                                    opportunity={info.item}
                                />
                            )}
                        />
                    </View>
                </View>
            )
        }
        return <Spinner size="large" />;
    }

    render() {
        return (this.renderContentArea());
    }
}

const mapStateToProps = ({ startScreenResponse }) => {
    const { SwoqyUserToken } = startScreenResponse;
    return {
        SwoqyUserToken
    };
}

export default connect(mapStateToProps, {})(BrandOpportunityList);

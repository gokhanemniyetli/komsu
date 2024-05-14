import _ from 'lodash'
import React, { Component } from 'react';
import { Text, View, ScrollView, Image, ListView, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Actions, Reducer } from 'react-native-router-flux';
import { SetSelectedKeyword, SearchResultsShoppingMallListData } from '../actions';
import { Card, CardSection, Spinner, Star } from '../common';
import Favorite from '../common/Favorite';
import { Localizations, FormatDate } from '../../locales/i18n';

// import { Localizations, FormatDate } from '../../locales/i18n';
// import { Actions } from 'react-native-router-flux';

var sortJsonArray = require('sort-json-array');

var dateFormat = require('dateformat');
const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

const ListItemSearchResult = (props) => {

    _clickShoppingMall = (shoppingMallID) => {
        Actions.shoppingMallScreen({ shoppingMallID: shoppingMallID });
    }

    return (
        <CardSection>
            <TouchableOpacity style={container.center} onPress={() => this._clickShoppingMall(props.shoppingMalls.ShoppingMallID)}>
                <View style={container.row}>
                    <View>
                        {props.shoppingMalls.ShoppingMallLogo != null ?
                            <Image style={imageStyle.logoStyle.lg}
                                source={{ uri: GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.SHOPPING_MALL_LOGO + '/' + props.shoppingMalls.ShoppingMallLogo }}
                            />
                            : <Text style={{ width: 60, height: 60 }}></Text>
                        }
                    </View>

                    <View style={{ flex: 1, marginLeft: 20 }}>
                        <View >

                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <Text style={textStyle.logoStyle.sm}>{props.shoppingMalls.ShoppingMallName}</Text>
                                {
                                    props.shoppingMalls.Registered &&
                                    <Image
                                        style={imageStyle.registeredTinyStyle}
                                        source={require('../images/icons/registered.png')}
                                    />
                                }
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', }}>
                            <Star size='sm' score={props.shoppingMalls.ShoppingMallReviewScore} />

                            <Text style={[textStyle.logoStyle.sm, { padding: 3, color: 'gray' }]}>({props.shoppingMalls.ShoppingMallReviewCount})</Text>

                            {
                                props.shoppingMalls.GoogleDistance &&
                                <Text style={[textStyle.logoStyle.sm, { padding: 3, color: 'gray' }]}>
                                    {
                                        props.shoppingMalls.GoogleDistance.Distance < 1000 ?
                                            " - " + props.shoppingMalls.GoogleDistance.Distance.toFixed(0) + " m"
                                            :
                                            " - " + (props.shoppingMalls.GoogleDistance.Distance / 1000).toFixed(1) + " km"
                                    }
                                </Text>
                            }
                        </View>
                    </View>

                    <View style={{ marginRight: 20 }}>
                        <Favorite
                            favoriteType={3}
                            ID={props.shoppingMalls.ShoppingMallID}
                            isFavorite={props.shoppingMalls.Favorite}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </CardSection>
    )
}


class SearchResultsShoppingMallList extends Component {
    state = { res: '', loadingKeywordList: false, searchResults: '' };

    _clickItem = (keyword) => {
        this.props.SetSelectedKeyword({ selectedKeyword: keyword });
    }

    UNSAFE_componentWillMount()  {
        this.setState({
            shoppingMallList: null
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {


        if (nextProps.type == 'search_results_shoppingmalls_data_success') {
            this.setState({
                shoppingMallList: nextProps.res.ShoppingMalls
            });
        } else if (nextProps.type == 'clear_search_data') {
            this.setState({
                shoppingMallList: nextProps.res,
            });
        } else {

            if (nextProps.keyword != '' &&
                nextProps.searchType == 2 &&
                nextProps.search &&
                !nextProps.showKeywordList &&
                (nextProps.type == 'set_selected_keyword' || nextProps.type == 'search_submit')
            ) {
                this.props.SearchResultsShoppingMallListData({ keyword: nextProps.keyword, search: true, searchType: nextProps.searchType, userToken: nextProps.SwoqyUserToken,
                    latitude: this.props.SwoqyUserData.Latitude,
                    longitude: this.props.SwoqyUserData.Longitude })
            }

            res = nextProps.res;
            this.setState({
                searchResults: nextProps.searchResults
            });
        }
    }

    renderContentArea = () => {
        //console.log(this.props);
        //debugger
        if (!this.props.loadingShoppingMallList) {
            if (this.state.shoppingMallList != null) {
                if (this.state.shoppingMallList.length > 0) {
                    return (
                        <View style={{ flex: 1, backgroundColor: 'white' }}>
                            <FlatList
                                data={this.state.shoppingMallList}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={info => (
                                    <TouchableOpacity onPress={() => this._clickItem(info.item)} >
                                        <ListItemSearchResult
                                            shoppingMalls={info.item}
                                        />
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    )
                } else {
                    return <View style={[container.topCenter, { backgroundColor: 'white' }]}>
                        <Text>{Localizations('Global.NotFound')}</Text>
                    </View>;
                }
            } else {
                return <View style={[container.topCenter, { backgroundColor: 'white' }]}>
                    <Text >{Localizations('Global.NotFound')}</Text>
                </View>;
            }
        }
        else {
            return <Spinner style={{ backgroundColor: 'white' }} size="large" />;
        }
    }

    render() {
        return (this.renderContentArea());
    }
}

const mapStateToProps = ({ searchResultsScreenResponse, startScreenResponse }) => {
    const { res, keyword, search, selectedKeyword, showKeywordList, searchType, loadingShoppingMallList, type, userToken } = searchResultsScreenResponse;
    const { SwoqyUserToken, SwoqyUserData } = startScreenResponse;
    return {
        res, keyword, search, selectedKeyword, showKeywordList, searchType, loadingShoppingMallList, type, userToken, SwoqyUserToken, SwoqyUserData
    };
}


export default connect(mapStateToProps, { SearchResultsShoppingMallListData, SetSelectedKeyword })(SearchResultsShoppingMallList);

import _ from 'lodash'
import React, { Component } from 'react';
import { Text, View, ScrollView, Image, ListView, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Actions, Reducer } from 'react-native-router-flux';
import { SetSelectedKeyword, SearchResultsBrandListData } from '../actions';
import { Card, CardSection, Spinner, Star } from '../common';
import Favorite from '../common/Favorite';
import { Localizations, FormatDate } from '../../locales/i18n';
import ListItemBrandStore from './ListItemBrandStore';

// import { Localizations, FormatDate } from '../../locales/i18n';
// import { Actions } from 'react-native-router-flux';

var sortJsonArray = require('sort-json-array');

var dateFormat = require('dateformat');
const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

const ListItemSearchResult = (props) => {

    _clickBrand = (brandID) => {
        Actions.brandDetailScreen({ brandID: brandID });
    }
    // console.log(props.brands)
    return (
        <CardSection>
            <TouchableOpacity style={container.center} onPress={this._clickBrand.bind(this, props.brands.BrandID)} >
                <View style={container.row}>
                    <View>
                        {props.brands.BrandLogo != null ?
                            <Image style={imageStyle.logoStyle.lg}
                                source={{ uri: GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.BRAND_LOGO + '/' + props.brands.BrandLogo }}
                            />
                            : <Text style={{ width: 60, height: 60 }}></Text>
                        }
                    </View>

                    <View style={{ flex: 1, marginLeft: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Text style={textStyle.logoStyle.sm}>{props.brands.BrandName}</Text>
                            {
                                props.brands.Registered &&
                                <Image
                                    style={imageStyle.registeredTinyStyle}
                                    source={require('../images/icons/registered.png')}
                                />
                            }
                        </View>
                        <Star size='sm' score={props.brands.BrandReviewScore} />
                    </View>

                    <View style={{ marginRight: 20 }}>
                        <Favorite
                            favoriteType={2}
                            ID={props.brands.BrandID}
                            isFavorite={props.brands.Favorite}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </CardSection>
    )
}

class SearchResultsBrandList extends Component {

    state = { res: '', loadingKeywordList: false, searchResults: '' };

    _clickItem = (keyword) => {
        this.props.SetSelectedKeyword({ selectedKeyword: keyword });
    }

    UNSAFE_componentWillMount()  {
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps.type == 'search_results_brands_data_success') {
            //debugger
            this.setState({
                brandList: nextProps.res.Stores
            });
        } else if (nextProps.type == 'clear_search_data') {
            this.setState({
                brandList: nextProps.res,
            });
        } else {
            if (nextProps.keyword != '' &&
                nextProps.searchType == 1 &&
                nextProps.search &&
                !nextProps.showKeywordList &&
                (nextProps.type == 'set_selected_keyword' || nextProps.type == 'search_submit')
            ) {
                //console.log(nextProps)
                this.props.SearchResultsBrandListData({ keyword: nextProps.keyword, search: true, searchType: nextProps.searchType, userToken: nextProps.SwoqyUserToken,
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
        if (!this.props.loadingBrandList) {
            if (this.state.brandList != null) {
                if (this.state.brandList.length > 0) {
                    return (
                        <View style={{ flex: 1, backgroundColor: 'white' }}>
                            <FlatList
                                data={this.state.brandList}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={info => (
                                    <TouchableOpacity style={{ flex: 1 }} onPress={() => this._clickItem(info.item)} >
                                        {/* <ListItemSearchResult  brands={info.item} /> */}
                                        <ListItemBrandStore from="search"  stores={info.item} />

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
            return <Spinner size="large" />;
        }
    }

    render() {
        return (this.renderContentArea());
    }
}

const mapStateToProps = ({ searchResultsScreenResponse, startScreenResponse }) => {
    const { res, keyword, search, selectedKeyword, showKeywordList, searchType, loadingBrandList, loadingKeywordList, type, userToken } = searchResultsScreenResponse;
    const { SwoqyUserToken, SwoqyUserData } = startScreenResponse;
    return {
        res, keyword, search, selectedKeyword, showKeywordList, searchType, loadingBrandList, loadingKeywordList, type, userToken, SwoqyUserToken,SwoqyUserData
    };
}

export default connect(mapStateToProps, { SearchResultsBrandListData, SetSelectedKeyword })(SearchResultsBrandList);

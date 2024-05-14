import _ from 'lodash'
import React, { Component } from 'react';
import { Text, View, ScrollView, Image, ListView, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Actions, Reducer } from 'react-native-router-flux';
import { SetSelectedKeyword, SearchResultsProductListData } from '../actions';
import { Card, CardSection, Spinner, Star } from '../common';

// import { Localizations, FormatDate } from '../../locales/i18n';
// import { Actions } from 'react-native-router-flux';

var sortJsonArray = require('sort-json-array');

var dateFormat = require('dateformat');
const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

const ListItemSearchResult = (props) => {

    _clickProduct = (ProductID) => {
        Actions.productScreen({ ProductID: ProductID });
    }

    FavoriteArea = () => {
        return (
            <TouchableOpacity style={container.center}>
                {(!props.Products.Favorite) ?
                    <View style={container.center} >
                        <Image
                            style={imageStyle.favouriteStyle}
                            source={require('../images/icons/heartPassive.png')}
                        />
                    </View>
                    :
                    <View style={container.center} >
                        <Image
                            style={imageStyle.favouriteStyle}
                            source={require('../images/icons/heartAktif.png')}
                        />
                    </View>
                }
            </TouchableOpacity >
        )
    }

    return (
        <CardSection>
            <TouchableOpacity style={container.center} onPress={this._clickProduct.bind(this, props.Products.ProductID)} >
                <View style={container.row}>
                    <View>
                        {props.Products.ProductLogo != null ?
                            <Image style={imageStyle.logoStyle.lg}
                                source={{ uri: props.Products.ProductLogo }}
                            />
                            : <Text style={{ width: 60, height: 60 }}></Text>
                        }
                    </View>

                    <View style={{ flex: 1, marginLeft: 20 }}>
                        <View >
                            <Text style={textStyle.logoStyle.sm}>{props.Products.ProductName}</Text>
                        </View>
                        <Star size='sm' score={props.Products.ProductReviewScore} />
                    </View>

                    <View style={{ marginRight: 20 }}>
                        {this.FavoriteArea()}
                    </View>
                </View>
            </TouchableOpacity>
        </CardSection>
    )
}

class SearchResultsProductList extends Component {

    state = { res: '', loadingKeywordList: false, searchResults: '' };

    _clickItem = (keyword) => {
        this.props.SetSelectedKeyword({ selectedKeyword: keyword });
    }

    UNSAFE_componentWillMount() {
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.type == 'search_results_products_data_success') {
            this.setState({
                productList: nextProps.res.Products
            });
        }
        else {
            if (nextProps.keyword != '' &&
                nextProps.searchType == 0 &&
                nextProps.search &&
                !nextProps.showKeywordList &&
                (nextProps.type == 'set_selected_keyword' || nextProps.type == 'search_submit')
            ) {
                this.props.SearchResultsProductListData({ keyword: nextProps.keyword, search: true, searchType: nextProps.searchType, latitude: '', longitude: '', userToken: nextProps.SwoqyUserToken,
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
        // if (this.state.productList != null) {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <FlatList
                    data={this.state.brandList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={info => (
                        <TouchableOpacity onPress={() => this._clickItem(info.item)} >
                            <ListItemSearchResult
                                brands={info.item}
                            />
                        </TouchableOpacity>
                    )}
                />
            </View>
        )
        // }
        // return <Spinner size="large" />;
    }

    render() {
        return (this.renderContentArea());
    }
}

const mapStateToProps = ({ searchResultsScreenResponse, startScreenResponse }) => {
    const { res, keyword, search, selectedKeyword, showKeywordList, searchType, loadingProductList, type, userToken } = searchResultsScreenResponse;
    const { SwoqyUserToken, SwoqyUserData } = startScreenResponse;
    return {
        res, keyword, search, selectedKeyword, showKeywordList, searchType, loadingProductList, type, userToken, SwoqyUserToken,SwoqyUserData 
    };
}

export default connect(mapStateToProps, { SearchResultsProductListData, SetSelectedKeyword })(SearchResultsProductList);
import _ from 'lodash'
import React, { Component } from 'react';
import { Text, View, ImageBackground, ScrollView, Image, ListView, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { SetSelectedKeyword } from '../actions';
import { Card, CardSection, Spinner } from '../common';

// import { Localizations, FormatDate } from '../../locales/i18n';
// import { Actions } from 'react-native-router-flux';

var sortJsonArray = require('sort-json-array');
var groupBy = require('json-groupby')
var dateFormat = require('dateformat');

const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

var i = 0;

const ListItemSearchResult = (props) => {
    return (
        <View style={{ flex: 1, marginVertical: 10, marginHorizontal: 20, }}>
            <View >
                <Text style={textStyle.settingStyle.security}>{props.searchResult}</Text>
            </View>
        </View>
    )
}

class SearchResultsList extends Component {
    state = { res: '', loadingKeywordList: false, searchResults: '' };

    _clickItem = (keyword) => {
        this.props.SetSelectedKeyword({ selectedKeyword: keyword });
    }

    UNSAFE_componentWillMount()  {
        this.setState({
            lstKeywords: this.props.keywordList
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        res = nextProps.res;
        this.setState({
            searchResults: nextProps.searchResults
        });

        if (nextProps.type == 'clear_search_data') {
            this.setState({
                searchResults: nextProps.res,
                lstKeywords: nextProps.res,
            });
        }
    }


    renderContentArea = () => {

        // if (this.state.brandStores != null) {
        return (
            // <ImageBackground 
            // keyboardShouldPersistTaps='never' 
            // // keyboardDismissMode='on-drag' 
            // source={require('../images/signInBackground.png')} style={{ flex: 1, }}
            // // imageStyle={{opacity:0.8}}
            // >

          <View style={{ backgroundColor:'#ff585c', flex:1}}
        keyboardShouldPersistTaps='never'
        >


                <View 
                keyboardShouldPersistTaps='never' 
                // keyboardDismissMode='on-drag' 
                style={{ flex: 1, backgroundColor: 'lightgrey' }}>
                    <FlatList
                        keyboardShouldPersistTaps='never' 
                        //keyboardDismissMode='on-drag'
                        data={this.state.lstKeywords}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={() => (
                            <View style={{ borderBottomColor: '#eaeaea', borderBottomWidth: 1, marginHorizontal: 10, }} />
                        )}
                        renderItem={info => (
                            <TouchableOpacity onPress={() => this._clickItem(info.item)}
                            keyboardShouldPersistTaps='never' 
                            >
                                <ListItemSearchResult
                                    keyboardShouldPersistTaps="never" 
                                    //keyboardDismissMode='on-drag'
                                    searchResult={info.item}
                                />
                            </TouchableOpacity>
                        )}
                    />
                </View>
            {/* </ImageBackground> */}
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
    // const { res, keyword, searchType, loadingKeywordList, type, userToken } = searchResultsScreenResponse;
    const { SwoqyUserToken } = startScreenResponse;
    return {
        // res, keyword, searchType, loadingKeywordList, type, userToken, SwoqyUserToken
        SwoqyUserToken
    };
}


export default connect(mapStateToProps, { SetSelectedKeyword })(SearchResultsList);

import _ from 'lodash'
import React, { Component } from 'react';
import { Text, TextInput, View, ScrollView, Image, TouchableOpacity, FlatList, Linking,  Alert, Dimensions } from 'react-native';
import { Card, CardSection, Spinner, Star, Link, GetSessionTicket, ShowMessage, Favourite } from '../common';
import { Localizations, FormatDate } from '../../locales/i18n';
import { connect } from 'react-redux';
import { BrandSearch } from '../actions';
import { Actions } from 'react-native-router-flux';
import ListItemFriends from '../components/ListItemFriends';
import ListItemBrandName from '../components/ListItemBrandName';
import { HF_11, HF_10, HF_01,HF_011, HF_00 } from '../common/HF';

var sortJsonArray = require('sort-json-array');
const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

class BrandSearchScreen extends Component {
    state = {
        brandList: ''
    };

    //#region Component operations
    UNSAFE_componentWillMount() {
        this.setState
        this.props.BrandSearch({ keyword: null, userToken: this.props.SwoqyUserToken, latitude: '', longtitude: '' });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        // res = nextProps.res;
         //console.log(nextProps);

        if (nextProps.type == 'brand_search_success') {
            this.setState({
                brandList: nextProps.brandList
            });
        }
    }
    //#endregion

    //#region click functions
    brandSearch = (brandSrc) => {
        this.setState({
            txtBrandSearch: brandSrc
        })

        if (this.props.brandList != undefined) {
            this.setState({
                brandList: sortJsonArray(this.props.brandList.filter(x => String(x.BrandName.toLowerCase()).includes(brandSrc.toLowerCase())) , 'BrandName', 'des')
            })

        }
    }
    //#endregion

    //#region render operations
    renderChooseBrandArea = () => {
        // debugger
        if (!this.props.loadingBrandSearch) {
            return (
                <View style={{ height: Dimensions.get('window').height }}>
                    <View>
                        <TextInput
                            value={this.state.txtBrandSearch}
                            onChangeText={search => this.brandSearch(search)}
                            style={[textInputStyle, { fontSize: 16, justifyContent: 'center' }]}
                            placeholder={Localizations('NewPost.LokingBrand')}
                        />
                    </View>

                    <ScrollView>

                        {this.state.brandList != undefined ?
                            <FlatList
                                data={this.state.brandList}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal={false}
                                renderItem={info => (
                                    <ListItemBrandName
                                        brands={info.item}
                                    />
                                )}
                            />
                            :
                            <View></View>
                        }
                    </ScrollView>
                </View >
            )
        }
        return <Spinner size="large" />;
    }

    render() {
        
        /// Server kaynaklı sorun olduğunda görüntülenecek.
        if (!this.props.connectionError) {
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ height: 40 }}>
                        
                        <HF_011 title={Localizations('Global.BrandSearchScreen')}  />

                    </View>
                    <Card>
                        {this.renderChooseBrandArea()}
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
    const { brandList, loadingBrandSearch, type, connectionError } = postResponse;
    const { SwoqyUserToken } = startScreenResponse;
    return {
        brandList, loadingBrandSearch, type, connectionError, SwoqyUserToken
    };
}

export default connect(mapStateToProps, { BrandSearch })(BrandSearchScreen);

import _ from 'lodash'
import React, { Component } from 'react';
import { Text, TextInput, View, ScrollView, Image, TouchableOpacity, FlatList, Linking,  Alert, Dimensions, NativeModules } from 'react-native';
import { Card, CardSection, Spinner, Star, Link, GetSessionTicket, ShowMessage, Favourite } from '../common';
import { Localizations, FormatDate } from '../../locales/i18n';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-crop-picker'

const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

class PostPurchasedScreen extends Component {
    state = {
        res: '',
        loadingPurchase: false,
        productImage: '', productPrice: '', productBrand: '', productStore: '',
        txtsearchProduct: '',
        type: '', userToken: '', connectionError: false
    };

    //#region Component operations
    UNSAFE_componentWillMount() {
        this.setState
        // this.props.StoreScreenData({ storeID: this.props.storeID, userToken: this.props.SwoqyUserToken});
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        res = nextProps.res;
    }
    //#endregion

    //#region click functions
    searchProduct = (srcProduct) => {
        this.setState({
            txtsearchProduct: srcProduct,
        })
    }
    //#endregion

    //#region render operations
    _clickAddPhoto = () => {
        //  console.log("newReview")
        return (
            ImagePicker.openPicker({
                width: 300,
                height: 300,
                cropping: true,
                mediaType: 'photo'
            }).then(image => {
                this.setState({ productImage: image })
            })
        )
    }

    renderPurchaseArea = () => {
        //  console.log("newReview")
        if (!this.state.loadingPurchase) {
            return (
                <View style={{ height: Dimensions.get('window').height }}>
                    <View>
                        <TextInput
                            value={this.state.txtsearchProduct}
                            onChangeText={product => this.searchProduct(product)}
                            style={[textInputStyle, { fontSize: 16, justifyContent: 'center' }]}
                            placeholder={Localizations('NewPost.SearchProduct')}
                        />
                    </View>

                    <View style={{ height: 500, width: 300 }}>
                        <View>
                            {this.state.productImage == '' ?
                                <TouchableOpacity style={{ height: 500, width: 300 }} onPress={() => this._clickAddPhoto()}>
                                    <Text style={{}}>{Localizations('NewPost.AddPhoto')}</Text>
                                </TouchableOpacity>
                                :
                                <Image
                                    style={{ height: 200, width: 200, margin: 10, resizeMode: 'stretch', }}
                                    source={this.state.productImage}
                                />
                            }
                        </View>
                    </View>
                </View>
            )
        }
        return <Spinner size="large" />;
    }

    render() {
        /// Server kaynaklı sorun olduğunda görüntülenecek.
        if (!this.props.connectionError) {
            return (
                <Card>
                    {this.renderPurchaseArea()}
                </Card>
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

export default PostPurchasedScreen;
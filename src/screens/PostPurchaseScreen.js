import _ from 'lodash'
import React, { Component } from 'react';
import {
    Text, TextInput, View, ScrollView, Image, TouchableOpacity, FlatList, Linking,  Alert,
    Dimensions, Button, Modal, Picker, TouchableHighlight
} from 'react-native';
import { Card, CardCircle, CardSection, Spinner, Star, Link, GetSessionTicket, ShowMessage } from '../common';
import { Localizations, FormatDate } from '../../locales/i18n';
import { connect } from 'react-redux';

import { Actions } from 'react-native-router-flux';
import { HF_11, HF_10, HF_01, HF_00 } from '../common/HF';
import DateTimePicker from "react-native-modal-datetime-picker"
import { getData, SelectedBrand, SetPurchase } from '../actions';

import ImagePicker from 'react-native-image-crop-picker'
// Modal
import ImageViewer from 'react-native-image-zoom-viewer';
// import ModalDropdown from 'react-native-modal-dropdown';

var dateFormat = require('dateformat');
var photos = [];

const GLOBAL = require('../common/Globals');
var styles = require('../styles/SwoqyStyles');


class postPurchaseScreen extends Component {
    constructor() {
        super();
        this.state = {
            image: null,
            images: null,
            //Modal 
            imageModalVisible: false,

        };
    }


    state = {
        res: '',
        loadingPostPurchase: false,
        txtProduct: '', txtPrice: '',
        type: '', userToken: '', connectionError: false,

        isDateTimePickerVisible: false,
        selectedBrand: '',
        selectedImage: '',
        selectedCurrency: '',
        Purchase: '',
        selectedImages: ''
    };



    //#region Component operations
    UNSAFE_componentWillMount() {
        this.setState
        this._clickClearBrand();

        // this.props.StoreScreenData({ storeID: this.props.storeID, userToken: this.props.SwoqyUserToken });
    }

    componentDidMount() {
        if (this.props.Purchase !== "" && this.props.Purchase !== undefined && this.props.Purchase !== null) {

            // var currency = JSON.parse(JSON.stringify({
            //     CurrencyID: this.props.Purchase.Currency,
            //     CurrencyName: this.props.Purchase.CurrencyName
            // }));
            currency = this.props.Purchase.Currency;

            var postPurchaseImageList = [];
            if (this.props.Purchase.ProductImages) {
                postPurchaseImageList = this.props.Purchase.ProductImages.map(item => {
                    return { uri: item.Uri, mime: item.Type, name: item.Name, data: item.ImageFile };
                })

                this.setState({
                    txtProduct: this.props.Purchase.PurchaseText,
                    txtPrice: this.props.Purchase.Price,
                    selectedImages: postPurchaseImageList,
                    selectedCurrency: currency,
                })

            }



            // set Currency
            this.setCurrency(this.props.Purchase.Currency);

            // set Brand
            var brand = JSON.parse(JSON.stringify({
                BrandID: this.props.Purchase.BrandID,
                BrandName: this.props.Purchase.BrandText,
                BrandLogo: this.props.Purchase.BrandLogo,
                BrandReviewScore: 0,
                BrandReviewCount: 0
            }))
            this.props.SelectedBrand({ brand: brand, userToken: this.props.SwoqyUserToken });
        }
        else {
            this.setCurrency(this.props.SwoqyUserData.DefaultCurrency);
        }
    }


    setCurrency = (currencyID) => {
        var _index = this._getIndex(currencyID, this.refs.dropdown_2.props.options, 'CurrencyID');
        this.refs.dropdown_2.select(_index);

        this.setState({
            selectedCurrency: currencyID
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        res = nextProps.res;
        // debugger;
        if (nextProps.type == 'set_purchase') {
            //Actions.post();
        }

    }
    //#endregion

    //#region State functions
    // Modal
    setImageModalVisible(visible, imageUrl) {
        this.setState({ imageModalVisible: visible });

        photos = [{ url: imageUrl }];
    }

    ProductName = (txt) => {
        this.setState({
            txtProduct: txt
        })
    }

    Price = (txt) => {
        this.setState({
            txtPrice: txt
        })
    }
    //#endregion

    formItemControl = (item, message) => {
        if (item == undefined || item.length == 0) {
            alert(message)
            return true;
        }
    }

    _clickSave = () => {

        // debugger;
        if (
            this.formItemControl(this.state.txtProduct, Localizations('NewPost.NoProductName')) ||
            // this.formItemControl(this.state.txtPrice, Localizations('NewPost.NoProductPrice')) ||
            this.formItemControl(this.state.selectedCurrency, Localizations('NewPost.NoCurrency')) ||
            this.formItemControl(this.state.selectedImages, Localizations('NewPost.NoPicture'))) {
            return;
        }

        var brandID = 0;
        var brandName = '';
        var brandLogo = '';
        if (this.props.selectedBrand != undefined) {
            brandID = this.props.selectedBrand.BrandID;
            brandName = this.props.selectedBrand.BrandName;
            brandLogo = this.props.selectedBrand.BrandLogo;
        }

        var currencyID = 0;
        // var currencyName = '';
        //debugger;
        // if (this.state.selectedCurrency != undefined) {
        //     currencyID = this.state.selectedCurrency.CurrencyID;
        //     currencyName = this.state.selectedCurrency.CurrencyName;
        // }
        currencyID = this.state.selectedCurrency;







        var postPurchaseImageList = [];
        if (this.state.selectedImages) {
            postPurchaseImageList = this.state.selectedImages.map(item => {
                //console.log(item);
                return { Uri: item.uri, Type: item.mime, Name: item.name, ImageFile: item.data };
            })
        }


        var Purchase = JSON.parse(JSON.stringify({
            "PurchaseID": 0,
            "PurchaseText": this.state.txtProduct,
            "BrandID": brandID,
            "BrandText": brandName,
            "BrandLogo": brandLogo,
            "Price": (this.state.txtPrice != undefined && this.state.txtPrice != "" && this.state.txtPrice != null) ? this.state.txtPrice.replace(",",".") : null,
            "Currency": currencyID,
            // "CurrencyName": currencyName,
            "ProductID": 0,
            "ProductImages": postPurchaseImageList
        }));


        this._clearForm();


        this.props.SetPurchase({ Purchase: Purchase, userToken: this.props.SwoqyUserToken });

    }

    _getIndex(value, arr, prop) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][prop] === value) {
                return i;
            }
        }
        return -1; //to handle the case where the value doesn't exist
    }

    _clearForm() {
        this.setState({
            txtProduct: '',
            txtPrice: '',
            // selectedCurrency: '',
            selectedImage: '',
            editedPurchaseIndex: ''
        })
    }

    _clickChooseBrand = () => {
        Actions.brandSearchScreen();
    }

    _clickClearBrand = () => {
        this.props.SelectedBrand({ brand: '', userToken: this.props.SwoqyUserToken });
    }

    _clickAddPhoto = () => {
        imageCount = 0;
        if (this.state.selectedImages) {
            imageCount = this.state.selectedImages.length;
        }

        if (imageCount >= GLOBAL.IMAGE_COUNT) {
            alert(Localizations('NewPost.MaxImageCount') + ": " + GLOBAL.IMAGE_COUNT);
        } else {
            ImagePicker.openPicker({
                mediaType:'photo',
                multiple: true,
                waitAnimationEnd: false,
                includeExif: true,
                forceJpg: true,
                includeBase64: true,
                cropping: true,
                freeStyleCropEnabled: true,
                compressImageMaxWidth: 600,
                compressImageMaxHeight: 600,
                compressImageQuality: 0.6
            }).then(images => {

                imgs = [];
                if (this.state.selectedImages) {
                    this.state.selectedImages.map(i =>
                        imgs.push({ uri: i.uri, mime: i.mime, name: i.name, data: i.data })
                    );
                }

                images.map(i => {
                    imageCount++;
                    if (imageCount <= GLOBAL.IMAGE_COUNT) {
                        imgs.push({ uri: i.path, mime: i.mime, name: i.filename, data: i.data });
                    } else {
                        alert(Localizations('NewPost.MaxImageCount') + ": " + GLOBAL.IMAGE_COUNT);
                    }
                });

                this.setState({
                    selectedImages: imgs
                })

            });
            // .catch(e => alert(e));
        }

    }

    _clickAddPhotoFromCamera = () => {
        imageCount = 0;
        if (this.state.selectedImages) {
            imageCount = this.state.selectedImages.length;
        }

        if (imageCount >= GLOBAL.IMAGE_COUNT) {
            alert(Localizations('NewPost.MaxImageCount') + ": " + GLOBAL.IMAGE_COUNT);
        } else {
            ImagePicker.openCamera({
                width: 600,
                height: 600,
                compressImageQuality: 0.6,
                includeBase64: true,
                cropping: true,
            }).then(image => {

                imgs = [];
                if (this.state.selectedImages) {
                    this.state.selectedImages.map(i =>
                        imgs.push({ uri: i.uri, mime: i.mime, name: i.name, data: i.data })
                    );
                }

                if (image != undefined) {
                    imgs.push({ uri: image.path, mime: image.mime, name: "photoFromCamera.JPG", data: image.data });
                }

                this.setState({
                    selectedImages: imgs
                })

            }).catch(e => console.log(e));
        }
    }

    _removeSelectedImages(index) {
        this.state.selectedImages.splice(index, 1);

        imgs = [];
        if (this.state.selectedImages) {
            this.state.selectedImages.map(i =>
                imgs.push({ uri: i.uri, mime: i.mime, name: i.name, data: i.data })
            );
        }

        this.setState({
            selectedImages: imgs
        })
    }

    //#endregion



    //#region dropdown 
    _dropdown_2_renderButtonText(rowData) {
        const { CurrencyID, CurrencyName } = rowData;
        //return `${CurrencyID} - ${CurrencyName}`;
        return `${CurrencyName}`;
    }
    _dropdown_2_onSelect(currency) {
        this.setState({
            selectedCurrency: currency.CurrencyID
        })
    }

    _dropdown_2_renderRow(rowData, rowID, highlighted) {
        let evenRow = rowID % 2;
        return (
            <TouchableHighlight underlayColor='cornflowerblue'>
                <View >

                    <Text >
                        {/* {`${rowData.CurrencyID} (${rowData.CurrencyName})`} */}
                        {rowData.CurrencyName}

                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

    _dropdown_2_renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        let key = `spr_${rowID}`;
        return (<View style={{ backgroundColor: 'gray', margin: 3, height: 1 }}
            key={key}
        />);
    }
    //#endregion


    //#region render operations

    renderImage(image, index) {
        return <View style={{ flex: 1, flexDirection: 'column', alignSelf: 'flex-end', margin: 5, }}>
            <View style={{ backgroundColor: '#ff585c' }}>
                <TouchableOpacity style={{ margin: 1 }}
                    onPress={() => {
                        this.setImageModalVisible(
                            true,
                            image.uri
                        );
                    }}><Image style={{ width: 120, height: 120, resizeMode: 'cover' }} source={image} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => this._removeSelectedImages(index)} style={{ backgroundColor: '#ff585c' }}>
                <View style={{ flex: 1, margin: 2, alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                    <Text style={{ fontSize: 30, color: 'white' }}>X</Text>
                </View>
            </TouchableOpacity>
        </View >
    }



    renderAsset(image, index) {
        if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
            return this.renderVideo(image, index);
        }

        return this.renderImage(image, index);
    }

    renderPurchaseArea = () => {
        const { container, imageStyle, textStyle, textInputStyle } = styles;

        if (!this.state.loadingPostPurchase) {
            return (
                <ScrollView style={{ height: Dimensions.get('window').height }}>

                    <CardCircle>
                        <View style={{ flexDirection: 'row', }}>
                            <View style={{ flex: 1, }}>
                                <View style={container.row}>
                                    <TextInput
                                        value={this.state.txtProduct}
                                        onChangeText={txt => this.ProductName(txt)}
                                        style={{ flex: 1, borderWidth: 1, borderRadius: 5, margin: 10, padding: 10, fontSize: 16, justifyContent: 'center' }}
                                        placeholder={Localizations('NewPost.ProductName')} />
                                </View>

                                <View style={container.row}>
                                    <TextInput
                                        value={this.state.txtPrice}
                                        onChangeText={txt => this.Price(txt)}
                                        style={{ flex: 1, borderWidth: 1, borderRadius: 5, margin: 10, padding: 10, fontSize: 16, justifyContent: 'center' }}
                                        keyboardType={'numeric'}
                                        placeholder={Localizations('NewPost.Price')}
                                    />
                                    {/* <ModalDropdown
                                        style={{ flex: 1, borderWidth: 1, borderRadius: 5, margin: 10, padding: 10, fontSize: 16, justifyContent: 'center' }}
                                        ref="dropdown_2"
                                        dropdownStyle={{ height: 80, width: 80, margin: 10, backgroundColor: 'white' }}
                                        options={[
                                            { 'CurrencyID': 1, 'CurrencyName': 'TL' },
                                            { 'CurrencyID': 2, 'CurrencyName': 'USD' },
                                            { 'CurrencyID': 3, 'CurrencyName': 'EURO' }
                                        ]}
                                        renderButtonText={(rowData) => this._dropdown_2_renderButtonText(rowData)}
                                        renderRow={this._dropdown_2_renderRow.bind(this)}
                                        renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this._dropdown_2_renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
                                        onSelect={(indx, rowData) => this._dropdown_2_onSelect(rowData, indx)}
                                    // onSelect={rowData => this._dropdown_2_onSelect(rowData)}
                                    /> */}
                                </View>

                                {this.props.selectedBrand !== undefined && this.props.selectedBrand !== '' ?
                                    this.props.selectedBrand.BrandID !== undefined ?
                                        this.props.selectedBrand.BrandID > 0 ?
                                            <View style={{ flexDirection: 'row' }}>
                                                <TouchableOpacity
                                                    style={{ flex: 1, flexDirection: 'row', borderColor: '#ff585c', borderWidth: 1 }}
                                                    onPress={() => this._clickChooseBrand(this)}>
                                                    <View style={{ justifyContent: 'center' }}>

                                                        <Image
                                                            style={imageStyle.logoStyle.md}
                                                            source={{
                                                                uri:
                                                                    GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.BRAND_LOGO + '/' + this.props.selectedBrand.BrandLogo
                                                            }}
                                                        />

                                                    </View>
                                                    <View style={{ margin: 3, justifyContent: 'center' }}>
                                                        <Text style={textStyle.logoStyle.xs}>{this.props.selectedBrand.BrandName}</Text>
                                                    </View>
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    style={{ width: 50, backgroundColor: '#ff585c', alignItems: 'center', justifyContent: 'center' }}
                                                    onPress={() => this._clickClearBrand(this)}>

                                                    <Text style={{ fontSize: 30, color: 'white' }}> X </Text>

                                                </TouchableOpacity>

                                            </View>
                                            :
                                            <View>
                                                <TouchableOpacity onPress={() => this._clickChooseBrand()}>
                                                    <Text style={{ margin: 5, }}>{Localizations('NewPost.ChooseBrand')}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        :
                                        <View>
                                            <TouchableOpacity onPress={() => this._clickChooseBrand()}>
                                                <Text style={{ margin: 5, }}>{Localizations('NewPost.ChooseBrand')}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    :
                                    <View>
                                        <TouchableOpacity onPress={() => this._clickChooseBrand()}>
                                            <Text style={{ margin: 5, }}>{Localizations('NewPost.ChooseBrand')}</Text>
                                        </TouchableOpacity>
                                    </View>

                                }

                                <View style={{ flexDirection: 'column' }}>
                                    {/* <View style={{ flexDirection: 'row', alignContent: 'flex-start', position: '' }}> */}
                                    <View style={{ flexDirection: 'row', alignContent: 'flex-start' }}>
                                        <TouchableOpacity onPress={() => this._clickAddPhotoFromCamera(this)}>
                                            <View style={[container.row, { margin: 3, }]}>
                                                <View>
                                                    <Image
                                                        style={imageStyle.iconStyle}
                                                        source={require('../images/icons/camera.png')}
                                                    />
                                                </View>
                                                <View>

                                                    <Text>{Localizations('Global.TakePhoto')}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => this._clickAddPhoto(this)}>
                                            <View style={[container.row, { margin: 3, }]}>
                                                <View>
                                                    <Image
                                                        style={imageStyle.iconStyle}
                                                        source={require('../images/icons/photo_large_black.png')}
                                                    />
                                                </View>
                                                <View>
                                                    <Text>{Localizations('NewPost.Photo')}</Text>

                                                </View>
                                            </View>
                                        </TouchableOpacity>

                                    </View>
                                    <View style={{}}>
                                        <ScrollView horizontal={true} style={{}}>

                                            {/* {this.state.image ? this.renderAsset(this.state.image) : null} */}
                                            {this.state.selectedImages ? this.state.selectedImages.map((i, index) => <View key={i.uri}>
                                                {this.renderAsset(i, index)}</View>) : null}
                                        </ScrollView>

                                    </View>
                                </View>
                            </View>

                        </View>

                    </CardCircle>

                    {/* Modal */}
                    <Modal animationType="slide" transparent={true} visible={this.state.imageModalVisible}>
                        <ImageViewer
                            imageUrls={photos}
                            enableSwipeDown={true}
                            saveToLocalByLongPress={false}
                            onCancel={() => { this.setImageModalVisible(!this.state.imageModalVisible); }}
                            onClick={() => { this.setImageModalVisible(!this.state.imageModalVisible); }}
                        />
                    </Modal>

                </ScrollView >
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
                        <HF_01 title={Localizations('Global.PostPurchaseScreen')} rightButtonJumpPage="postPurchaseScreen" parentMethod={this._clickSave} />
                    </View>
                    <View>
                        <Card>
                            {this.renderPurchaseArea()}
                        </Card>
                    </View>
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
    const { Purchase, imageModalVisible, selectedBrand, type, userToken, connectionError } = postResponse;
    const { SwoqyUserToken, SwoqyUserData } = startScreenResponse;
    return {
        Purchase, imageModalVisible, selectedBrand, type, userToken, connectionError, SwoqyUserToken, SwoqyUserData
    };
}

export default connect(mapStateToProps, { SelectedBrand, SetPurchase })(postPurchaseScreen);
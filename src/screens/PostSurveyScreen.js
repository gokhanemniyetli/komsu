import _ from 'lodash'
import React, { Component } from 'react';
import {
    Text, TextInput, View, ScrollView, Image, TouchableOpacity, FlatList, Linking,  Alert,
    Dimensions, Button, Modal, Picker, TouchableHighlight,
    Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform
} from 'react-native';
import { Card, CardCircle, CardSection, Spinner, Star, Link, GetSessionTicket, ShowMessage } from '../common';
import { Localizations, FormatDate } from '../../locales/i18n';
import { connect } from 'react-redux';

import { Actions, Reducer } from 'react-native-router-flux';
import { HF_11, HF_10, HF_01, HF_00 } from '../common/HF';
import DateTimePicker from "react-native-modal-datetime-picker"
import { getData, SelectedBrand, SetSurvey } from '../actions';

import ImagePicker from 'react-native-image-crop-picker'
// Modal
import ImageViewer from 'react-native-image-zoom-viewer';
// import ModalDropdown from 'react-native-modal-dropdown';

var dateFormat = require('dateformat');
var photos = [];

const GLOBAL = require('../common/Globals');
var styles = require('../styles/SwoqyStyles');


const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
        {children}
    </TouchableWithoutFeedback>
);

class PostSurveyScreen extends Component {
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
        loadingPostSurvey: false,
        txtProduct: '', txtPrice: '',
        type: '', userToken: '', connectionError: false,

        isDateTimePickerVisible: false,
        selectedDate: '',
        selectedBrand: '',
        selectedImage: '',
        selectedCurrency: '',
        survey: '',
        surveyItemList: [],
        editedSurveyItemIndex: ''
    };


    ListItemSurvey = (props) => {
        _clickActivity = () => {
            // Actions.activityDetailScreen(props.activity.ActivityID);
        }

        return (
            <TouchableOpacity onPress={() => this._clickEditSurveyItem(props.index)}>

                <View style={[{ flex: 1, flexDirection: 'row' }, props.selected ? { backgroundColor: '#ff585c' } : null]}>
                    <View style={{ flex: 2, }}>

                        {props.survey.SurveyItemImage ? props.survey.SurveyItemImage.map((image, index) =>
                            <TouchableOpacity style={{ margin: 5 }}
                                key={index}
                                onPress={() => {
                                    this.setImageModalVisible(
                                        true,
                                        image.uri
                                    );
                                }}>
                                <Image style={{ width: 40, height: 40, borderRadius: 3, resizeMode: 'cover' }} source={image} />
                            </TouchableOpacity>
                        ) : null}
                    </View>
                    <View style={{ flex: 4, margin: 3, }}>
                        <Text >{props.survey.BrandText}</Text>
                        <Text >{props.survey.SurveyItemText}</Text>
                    </View>
                    <View style={{ flex: 3, margin: 3, alignSelf: 'center', alignContent: 'center', alignItems: 'center' }}>
                        <Text >{props.survey.Price} {(props.survey.Price != undefined && props.survey.Price != "" && props.survey.Price != null) ? this._getCurrencyName(props.survey.CurrencyID, this.refs.dropdown_2.props.options, 'CurrencyName'): ""} </Text>
                    </View>
                    <TouchableOpacity style={{ flex: 1, margin: 5, alignSelf: 'flex-end', alignContent: 'flex-end', alignItems: 'flex-end' }} onPress={() => this._clickRemoveFromList(props.index)}>
                        <Text style={{ fontSize: 30 }}>X</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }


    //#region Component operations
    componentDidMount() {
        this.setState;

        // console.log(this.state.surveyItemList);
        // console.log(this.props.Survey);
        //  debugger;

        if (this.props.Survey !== "" && this.props.Survey !== undefined && this.props.Survey !== null) {

            //var endDate = new Date(this.props.Survey.EndDate);

            var d = this.props.Survey.EndDate.replace('/Date(', '').replace(')/', '');
            var myObj = JSON.parse('{"date_item":"' + d + '"}'),
                myDate = new Date(1 * myObj.date_item);


            this.setState({
                surveyItemList: this.props.Survey.SurveyItemList,
                // date set etme düzeltilecek
                selectedDate: myDate.toString()
            })
        }
        else {
            this.setCurrency(this.props.SwoqyUserData.DefaultCurrency);
        }
        this._clickClearBrand();
        // this.props.StoreScreenData({ storeID: this.props.storeID, userToken: this.props.SwoqyUserToken });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        res = nextProps.res;

        if (nextProps.type == 'set_survey') {
            // Actions.post();
        }

        // this.setState({
        // });
        // } else if (nextProps.type == 'set_store_favorite_data_success') {
        //     this.setState({
        //         favorite: res
        //     });
        // }
    }
    //#endregion

    //#region DateTimePicker functions
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        // console.log(date);
        //this.setState({ selectedDate: FormatDate(date.toString(), "dd.MM.yyyy HH:mm") });
        //this.setState({ selectedDate: date });
        this.setState({ selectedDate: date.toString() });
        //this.setState({ selectedDate: date.toUTCString() });
        this.hideDateTimePicker();
    };
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

    formNumberControl = (item, message) => {
        item = item.replace(',','.');
        if (isNaN(item)) {
            alert(message)
            return true;
        }
    }

    _clickSave = () => {
        var endDate = new Date(this.state.selectedDate);

        var now = new Date();

        tarih = "\/Date(" + endDate.getTime() + ")\/";

        if (this.state.selectedDate === undefined) {
            alert(Localizations('NewPost.NoDate'));
            return;
        }

        if (endDate <= now) {
            alert(Localizations('NewPost.NoNextDate'));
            return;
        }

        if (this.state.surveyItemList !== undefined) {
            if (this.state.surveyItemList.length < 2) {
                alert(Localizations('NewPost.NoTwoDate'));
            }
            else {
                this.formItemControl(this.state.selectedDate, Localizations('NewPost.NoEndDate'))

                var survey = JSON.stringify({
                    SurveyID: 0,
                    SurveyTypeID: 1, // standart anket: 1, ürün anketi: 2 
                    ReleaseTimeTypeID: 3, // kullanıcının seçeceği tarih: 3
                    // EndDate: this.state.selectedDate,
                    EndDate: tarih,
                    SurveyItemList: this.state.surveyItemList,
                    SurveyProductItemList: ''
                });

                this.props.SetSurvey({ survey: JSON.parse(survey), userToken: this.props.SwoqyUserToken });
            }
        }
        else {
            alert(Localizations('NewPost.NoTwoDate'));
        }
    }

    //#region click functions
    _clickAddToList = () => {
        if (this.formItemControl(this.state.txtProduct, Localizations('NewPost.NoProductName')) ||
            //this.formItemControl(this.state.txtPrice, Localizations('NewPost.NoProductPrice')) ||
            this.formItemControl(this.state.selectedCurrency, Localizations('NewPost.NoCurrency')) ||
            this.formItemControl(this.state.selectedImage, Localizations('NewPost.NoPicture')) //||
            //this.formNumberControl(this.state.txtPrice, Localizations('NewPost.WrongPrice'))
        ) {
            return;
        }
        
        if (this.state.txtPrice != "" && this.state.txtPrice != undefined && this.state.txtPrice != null) 
        {
            if (this.formNumberControl(this.state.txtPrice, Localizations('NewPost.WrongPrice')))
            {
                return;
            }
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
        // if (this.state.selectedCurrency != undefined) {
        //     currencyID = this.state.selectedCurrency.CurrencyID;
        //     currencyName = this.state.selectedCurrency.CurrencyName;
        // }
        currency = this.state.selectedCurrency;

        var surveyItem = JSON.parse(JSON.stringify({
            "SurveyID": 0,
            "SurveyItemText": this.state.txtProduct,
            "BrandID": brandID,
            "BrandText": brandName,
            "BrandLogo": brandLogo,
            "Price": (this.state.txtPrice != "" && this.state.txtPrice != undefined && this.state.txtPrice != null) ? this.state.txtPrice.replace(",",".") : null,
            "CurrencyID": currency,
            // "CurrencyName": currencyName,
            "ProductID": 0,
            "SurveyItemImage": this.state.selectedImage,
        }));

        var surveyItemList = [];

        if (this.state.surveyItemList != undefined) {
            surveyItemList = this.state.surveyItemList;
        }

        //  debugger;
        if (this.state.editedSurveyItemIndex === '' || this.state.editedSurveyItemIndex === undefined) {
            surveyItemList.push(surveyItem);
        } else {
            surveyItemList[this.state.editedSurveyItemIndex] = surveyItem;
        }





        this.setState({
            surveyItemList: surveyItemList,
            editedSurveyItemIndex: ''
        })

        this._clearForm();
    }


    _clickRemoveFromList(index) {

        this.state.surveyItemList.splice(index, 1);

        var surveyItemList = [];

        if (this.state.surveyItemList != undefined) {
            surveyItemList = this.state.surveyItemList;
        }

        this.setState({
            surveyItemList: surveyItemList
        })
    }

    _getIndex(value, arr, prop) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][prop] === value) {
                return i;
            }
        }
        return -1; //to handle the case where the value doesn't exist
    }

    _getCurrencyName(value, arr, prop) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i]["CurrencyID"] === value) {
                return arr[i][prop];
            }
        }
        return -1; //to handle the case where the value doesn't exist
    }


    _clickEditSurveyItem(index) {
        var item = this.state.surveyItemList[index];

        if (item) {
            // var currency = JSON.parse(JSON.stringify({
            //     CurrencyID: item.CurrencyID,
            //     CurrencyName: item.CurrencyName
            // }));

            this.setCurrency(item.CurrencyID);

            // var _index = this._getIndex(item.CurrencyID, this.refs.dropdown_2.props.options, 'CurrencyID');

            // this.refs.dropdown_2.select(_index);

            this.setState({
                txtProduct: item.SurveyItemText,
                txtPrice: item.Price,
                selectedImage: item.SurveyItemImage,
                //selectedCurrency: currency,

                editedSurveyItemIndex: index
            });

            var brand = JSON.parse(JSON.stringify({
                BrandID: item.BrandID,
                BrandName: item.BrandText,
                BrandLogo: item.BrandLogo,
                BrandReviewScore: 0,
                BrandReviewCount: 0
            }))

            this.props.SelectedBrand({ brand: brand, userToken: this.props.SwoqyUserToken });

        }
    }


    setCurrency = (currencyID) => {
        var _index = this._getIndex(currencyID, this.refs.dropdown_2.props.options, 'CurrencyID');
        this.refs.dropdown_2.select(_index);

        this.setState({
            selectedCurrency: currencyID
        })
    }



    _clearForm() {
        this.setState({
            txtProduct: '',
            txtPrice: '',
            // selectedCurrency: '',
            selectedImage: '',
            editedSurveyItemIndex: ''
        })

        this._clickClearBrand();
    }

    _clickChooseBrand = () => {
        Actions.brandSearchScreen();
    }

    _clickClearBrand = () => {
        this.props.SelectedBrand({ brand: '', userToken: this.props.SwoqyUserToken });
    }


    _clickAddPhoto = () => {

        ImagePicker.openPicker({
            mediaType:'photo',
            multiple: false,
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
            includeBase64: true,
            cropping: false,
            freeStyleCropEnabled: true,
            compressImageMaxWidth: 600,
            compressImageMaxHeight: 600,
            compressImageQuality: 0.6,
        }).then(image => {
            img = [];
            if (image != undefined) {
                img.push({ uri: image.path, mime: image.mime, name: image.filename, data: image.data });
            }
            // console.log(img);

            this.setState({
                selectedImage: img
            })
        });
        // .catch(e => console.log(e));

    }

    _clickAddPhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 600,
            height: 600,
            compressImageQuality: 0.6,
            includeBase64: true,
            cropping: false,
        }).then(image => {
            img = [];
            if (image != undefined) {
                img.push({ uri: image.path, mime: image.mime, name: "photoFromCamera.JPG", data: image.data });
            }

            this.setState({
                selectedImage: img
            });
        }).catch(e => console.log(e));
    }

    _removeSelectedImages() {
        img = [];

        this.setState({
            selectedImage: img
        });
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


    renderImage(image) {
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
            <TouchableOpacity onPress={() => this._removeSelectedImages()} style={{ backgroundColor: '#ff585c' }}>
                <View style={{ flex: 1, margin: 2, alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                    <Text style={{ fontSize: 30, color: 'white' }}>X</Text>
                </View>
            </TouchableOpacity>
        </View >
    }


    renderAsset(image) {
        if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
            return this.renderVideo(image);
        }

        return this.renderImage(image);
    }

    renderSurveyArea = () => {
        const { container, imageStyle, textStyle, textInputStyle } = styles;

        if (!this.state.loadingPostSurvey) {
            return (
                <View style={{ height: Dimensions.get('window').height }}>


                    <CardCircle >
                        <View style={{ flexDirection: 'row' }}>
                            <View >
                                <Text style={{}}>{Localizations('NewPost.EndDate')}:</Text>
                            </View>
                            <View >
                                {this.state.selectedDate == '' || this.state.selectedDate == undefined ?
                                    <TouchableOpacity onPress={this.showDateTimePicker}>
                                        <Text style={{ color: 'blue' }}> {Localizations('Global.ShowDatePicker')}</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={this.showDateTimePicker}>
                                        <Text style={{ color: 'blue' }}>   {dateFormat(this.state.selectedDate.toString(), "dd.mm.yyyy HH:MM")}</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                            <DateTimePicker
                                locale={Localizations('Global.Locale')}
                                isVisible={this.state.isDateTimePickerVisible}
                                onConfirm={this.handleDatePicked}
                                onCancel={this.hideDateTimePicker}
                                titleIOS={Localizations('NewPost.EndDate')}
                                mode='datetime'
                                // minimumDate={new Date().getDate()}
                                is24Hour={true}
                                confirmTextIOS={Localizations('Global.Select')}
                                cancelTextIOS={Localizations('Global.Cancel')}
                            />
                        </View>
                    </CardCircle>


                    {this.state.surveyItemList ?
                        this.state.surveyItemList.length > 0 ?

                            <CardCircle>

                                <FlatList
                                    data={this.state.surveyItemList.filter(x => 1 == 1)}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={info => (
                                        <this.ListItemSurvey
                                            survey={info.item}
                                            index={info.index}
                                            selected={this.state.editedSurveyItemIndex === info.index ? true : false}
                                        />
                                    )}
                                />
                            </CardCircle>
                            : null
                        : null
                    }

                    <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
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
                                        this.props.selectedBrand.BrandID > 0 ?
                                            <View style={{ flexDirection: 'row' }}>
                                                <TouchableOpacity
                                                    style={{ flex: 1, flexDirection: 'row', borderColor: '#ff585c', borderWidth: 1 }}
                                                    onPress={() => this._clickChooseBrand(this)}>
                                                    <View style={{ justifyContent: 'center', flexDirection: 'row',  }}>

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

                                    }

                                    <View style={{ flexDirection: 'row', }}>
                                        {/* <View style={{ alignContent: 'flex-start', position: '' }}> */}
                                        <View style={{ alignContent: 'flex-start' }}>
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
                                        <View style={{ alignContent: 'flex-end' }}>
                                            <ScrollView style={{}}>

                                                {/* {this.state.image ? this.renderAsset(this.state.image) : null} */}
                                                {this.state.selectedImage ? this.state.selectedImage.map(i => <View key={i.uri}>
                                                    {this.renderAsset(i)}</View>) : null}
                                            </ScrollView>
                                        </View>
                                    </View>
                                </View>

                            </View>


                            <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
                                <TouchableOpacity
                                    style={styles.buttonStyle.buttonStyle.lg}
                                    onPress={() => this._clickAddToList(this)}>
                                    <Text style={styles.buttonStyle.buttonTextStyle.lg}>{this.state.editedSurveyItemIndex === '' || this.state.editedSurveyItemIndex === undefined ?
                                        Localizations('NewPost.AddList')
                                        :
                                        Localizations('NewPost.Save')
                                    }</Text>
                                </TouchableOpacity>

                                {this.state.editedSurveyItemIndex !== '' && this.state.editedSurveyItemIndex !== undefined ?
                                    <TouchableOpacity
                                        style={styles.buttonStyle.buttonStyle.lg}
                                        onPress={() => this._clearForm()}>
                                        <Text style={styles.buttonStyle.buttonTextStyle.lg} >{Localizations('NewPost.New')}</Text></TouchableOpacity>
                                    :
                                    null
                                }
                            </View>
                        </CardCircle>

                    </KeyboardAvoidingView>
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
                        <HF_01 title={Localizations('Global.PostSurveyScreen')} rightButtonJumpPage="postSurveyScreen" parentMethod={this._clickSave} />
                    </View>
                    <ScrollView>
                        <DismissKeyboard>
                            <Card>
                                {this.renderSurveyArea()}
                            </Card>
                        </DismissKeyboard>
                    </ScrollView>
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
    const { imageModalVisible, Survey, selectedBrand, type, userToken, connectionError } = postResponse;
    const { SwoqyUserToken, SwoqyUserData } = startScreenResponse;
    return {
        imageModalVisible, Survey, selectedBrand, type, userToken, connectionError, SwoqyUserToken, SwoqyUserData
    };
}

export default connect(mapStateToProps, { SelectedBrand, SetSurvey })(PostSurveyScreen);

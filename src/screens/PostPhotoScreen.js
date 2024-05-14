import _ from 'lodash'
import React, { Component } from 'react';
import { Text, TextInput, View, ScrollView, Image, TouchableOpacity, FlatList, Linking,  Alert, NativeModules } from 'react-native';
import { Card, CardSection, Spinner, Star, Link, GetSessionTicket, ShowMessage, Favourite } from '../common';
import { Localizations, FormatDate } from '../../locales/i18n';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-crop-picker'

const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

class PostPhotoScreen extends Component {
    state = {
        res: '',
        loadingPhoto: false, pickerPhoto: null,
        type: '', userToken: '', connectionError: false
    };

    //#region Component operations
    UNSAFE_componentWillMount()  {
        this.setState
        // this.props.StoreScreenData({ storeID: this.props.storeID, userToken: this.props.SwoqyUserToken});
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        res = nextProps.res;

        // if (nextProps.type == 'store_screen_data_success') {
        //     this.setState({
        //     });
        // } else if (nextProps.type == 'set_store_favorite_data_success') {
        //     this.setState({
        //         favorite: res
        //     });
        // }
    }
    //#endregion

    //#region click functions
    openPicker() {

    }
    //#endregion

    //#region render operations
    renderPhotoArea = () => {
        //  console.log("newReview")
        if (!this.state.loadingPhoto) {
            return (
                ImagePicker.openPicker({
                    width: 300,
                    height: 300,
                    cropping: true,
                    mediaType: 'photo'
                }).then(image => {
                    this.setState({ pickerPhoto: image })
                })
            )
        }
        return <Spinner size="large" />;
    }

    render() {
        /// Server kaynaklı sorun olduğunda görüntülenecek.
        if (!this.props.connectionError) {
            return (
                <Card>
                    {this.renderPhotoArea()}
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

export default PostPhotoScreen;

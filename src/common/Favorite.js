import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { SetStoreFavoriteData, SetBrandFavoriteData, SetShoppingMallFavoriteData } from '../actions';
import { Localizations } from '../../locales/i18n';
import { Spinner } from '../common';

const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

class Favorite extends Component {
    state = { favorite: false, loadingSetFavorite: false };

    //#region Component operations
    UNSAFE_componentWillMount()  {
        // console.log(this.props);

        if (this.props.isFavorite == true) {
            this.setState({
                    favorite: true
                });
        }

        // this.props.favoriteType == 1 ? this.setState({ favorite: this.props.res[0].Favorite, userToken: this.props.SwoqyUserToken })
        //     : this.props.favoriteType == 2 ? this.setState({ favorite: this.props.res[1].Favorite, userToken: this.props.SwoqyUserToken })
        //         : this.props.favoriteType == 3 && this.setState({ favorite: this.props.res[2].Favorite, userToken: this.props.SwoqyUserToken })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        // console.log(this.props);
        // console.log(nextProps);

    //  debugger   

         if (nextProps.changedID[0] == this.props.ID || nextProps.changedID[1] == this.props.ID || nextProps.changedID[2] == this.props.ID) {

            //this.setState({ loadingSetFavorite: true })

            if (nextProps.type[0] == 'set_store_favorite_data_success' || nextProps.type[1] == 'set_brand_favorite_data_success' || nextProps.type[2] == 'set_shoppingmall_favorite_data_success') {
                this.props.favoriteType == 1 ? this.setState({ favorite: nextProps.res[0] })
                    : this.props.favoriteType == 2 ? this.setState({ favorite: nextProps.res[1], })
                        : this.props.favoriteType == 3 && this.setState({ favorite: nextProps.res[2] })

                
            }
            this.setState({ loadingSetFavorite: false })
         }
    }
    //#endregion

    _clickFavoriteData = (ID) => { 

        if (ID == this.props.ID || ID == this.props.ID || ID == this.props.ID) {

            this.setState({ loadingSetFavorite: true })






        this.props.favoriteType == 1 ? this.props.SetStoreFavoriteData({ storeID: ID, userToken: this.props.SwoqyUserToken })
            : this.props.favoriteType == 2 ? this.props.SetBrandFavoriteData({ brandID: ID, userToken: this.props.SwoqyUserToken })
                : this.props.favoriteType == 3 && this.props.SetShoppingMallFavoriteData({ shoppingMallID: ID, userToken: this.props.SwoqyUserToken })
        }
    }

    _clickFavorite = (ID) => { 
        if (this.props.SwoqyUserToken === '' || this.props.SwoqyUserToken === null || this.props.SwoqyUserToken === undefined) {
            Alert.alert(
                Localizations('BrandDetail.UserLogin'),
                Localizations('BrandDetail.FavoriteAlertMessage'),
                [
                    {
                        text: Localizations('BrandDetail.Cancel'),
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: Localizations('BrandDetail.Ok'), onPress: () => Actions.signInScreen() },
                ],
                { cancelable: false },
            );
        } else {
            this._clickFavoriteData(ID)
        }
    }

    render() {
        (!this.state.favorite
            ? iSource = require('../images/icons/heartPassive.png')
            : iSource = require('../images/icons/heartAktif.png')
        )

        if (!this.state.loadingSetFavorite) {
            return (
                <TouchableOpacity style={container.center} onPress={() => this._clickFavorite(this.props.ID)}>
                    <View style={container.center}>
                        <Image
                            style={imageStyle.favouriteStyle}
                            source={iSource}
                        />
                    </View>
                </TouchableOpacity >
            )
        } return <Spinner size='small' />
    }
}

const mapStateToProps = ({ storeScreenResponse, brandDetailScreenResponse, shoppingMallScreenResponse, startScreenResponse }) => {
    return {
        changedID: [storeScreenResponse.changedID, brandDetailScreenResponse.changedID, shoppingMallScreenResponse.changedID],
        type: [storeScreenResponse.type, brandDetailScreenResponse.type, shoppingMallScreenResponse.type],
        res: [storeScreenResponse.res, brandDetailScreenResponse.res, shoppingMallScreenResponse.res],
        userToken: [storeScreenResponse.userToken, brandDetailScreenResponse.userToken, shoppingMallScreenResponse.userToken],
        loadingSetFavorite: [storeScreenResponse.loadingSetStoreFavorite, brandDetailScreenResponse.loadingSetBrandFavorite, shoppingMallScreenResponse.loadingSetShoppingMallFavorite],
        SwoqyUserToken: (startScreenResponse.SwoqyUserToken),
    }
}

export default connect(mapStateToProps, { SetStoreFavoriteData, SetBrandFavoriteData, SetShoppingMallFavoriteData })(Favorite);

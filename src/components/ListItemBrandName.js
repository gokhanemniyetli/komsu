import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { CardSection, LetterCircle, Spinner } from '../common';
var dateFormat = require('dateformat');
import { Localizations, FormatDate } from '../../locales/i18n';
import CheckBox from 'react-native-check-box';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { SelectedBrand } from '../actions';

const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

class ListItemBrandName extends Component {
    state = ({ selectedBrand: '', color: 'white' })

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            selectedBrand: this.props.selectedBrand
        })
    }

    _clickItem = (brand) => {
        this.props.SelectedBrand({ brand: brand, userToken: this.props.SwoqyUserToken});
        Actions.pop();
    }


    render() {
        color = 'white';

        if (this.props.selectedBrand != undefined && this.props.selectedBrand != '') {
            if (this.props.selectedBrand.BrandID == this.props.brands.BrandID) {
                color = '#ff585c'
            }
            else {
                color = 'white'
            }
        }

        if (this.props.brands) {
            return (
                <CardSection >
                    <TouchableOpacity
                         style={{ flex: 1, borderColor: color, borderWidth:1 }}
                        onPress={() => { this._clickItem(this.props.brands) }}>

                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View >
                                <Image
                                    style={imageStyle.logoStyle.md}
                                    source={{
                                        uri:
                                            GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.BRAND_LOGO + '/' + this.props.brands.BrandLogo
                                    }}
                                />
                            </View>
                            <View style={{ margin: 3, alignContent:'center', alignItems:'center', alignSelf:'center', justifyContent:'center' }}>
                                <Text style={textStyle.logoStyle.xs}>{this.props.brands.BrandName}</Text>
                            </View>
                        </View>

                    </TouchableOpacity>
                </CardSection>
            )
        }
        return <Spinner size="large" />;
    }

}

const mapStateToProps = ({ postResponse, startScreenResponse }) => {
    const { selectedBrand, type, connectionError } = postResponse;
    const { SwoqyUserToken } = startScreenResponse;
    return {
        selectedBrand, type, connectionError, SwoqyUserToken
    };
}

export default connect(mapStateToProps, { SelectedBrand })(ListItemBrandName);

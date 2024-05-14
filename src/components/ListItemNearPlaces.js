import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { CardSection, LetterCircle, Spinner } from '../common';
var dateFormat = require('dateformat');
import { Localizations, FormatDate } from '../../locales/i18n';
import CheckBox from 'react-native-check-box';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { SelectedNearPlace } from '../actions';

const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

var color = 'white';

class ListItemNearPlaces extends Component {
    state = ({ selectedNearPlace: '', color: 'white' })

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            selectedNearPlace: this.props.selectedNearPlace
        })
    }

    _clickItem = (nearPlace) => {
        this.props.SelectedNearPlace({ nearPlace: nearPlace, userToken: this.props.SwoqyUserToken });
        Actions.pop();
    }

    render() {
        color = 'white';

        if (this.props.selectedNearPlace !== undefined && this.props.selectedNearPlace !== '' && this.props.selectedNearPlace !== null) {
            if (this.props.selectedNearPlace.ID == this.props.nearPlace.ID) {
                color = '#ff585c'
            }
            else {
                color = 'white'
            }
        }

        if (this.props) {
            return (
                <CardSection >

                    <TouchableOpacity
                        style={{ flex: 1, borderColor: color, borderWidth:1 }}
                        onPress={() => { this._clickItem(this.props.nearPlace) }}>

                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{alignItems:'center', justifyContent:'center'}} >
                                {this.props.nearPlace.Type == 1 ?
                                    <Image style={imageStyle.logoStyle.md}
                                        source={{
                                            uri: GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.SHOPPING_MALL_LOGO + '/' + this.props.nearPlace.Logo
                                        }} />
                                    :
                                    <Image style={imageStyle.logoStyle.md}
                                        source={{
                                            uri: GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.BRAND_LOGO + '/' + this.props.nearPlace.Logo
                                        }} />
                                }

                            </View>
                            <View style={{ margin: 3 }}>
                                <Text style={textStyle.logoStyle.xs}>{this.props.nearPlace.Name}</Text>

                                <Text style={[textStyle.logoStyle.sm, { paddingTop: 3, color:'gray' }]}>
                                {
                                    this.props.nearPlace.GoogleDistance.Distance < 500 ?
                                        this.props.nearPlace.GoogleDistance.Distance.toFixed(0) + " m"
                                        :
                                        (this.props.nearPlace.GoogleDistance.Distance / 1000).toFixed(1) + " km"
                                }
                            </Text>
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
    const { accessTypeID, selectedNearPlace, loadingNearPlaceList, type, connectionError } = postResponse;
    const { SwoqyUserToken } = startScreenResponse;
    return {
        accessTypeID, selectedNearPlace, loadingNearPlaceList, type, connectionError, SwoqyUserToken
    };
}

export default connect(mapStateToProps, { SelectedNearPlace })(ListItemNearPlaces);
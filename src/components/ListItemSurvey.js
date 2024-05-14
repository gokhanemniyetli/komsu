import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, Alert, Modal } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { SelectSurveyData } from '../actions';
import { CardSection, LetterCircle, Spinner } from '../common';
var dateFormat = require('dateformat');
import { Localizations, FormatDate } from '../../locales/i18n';

const GLOBAL = require('../common/Globals');
const { container, textStyle, imageStyle, buttonStyle } = require('../styles/SwoqyStyles');


// Modal
import ImageViewer from 'react-native-image-zoom-viewer';
var images = [];
//_______________________________________________________

var selectedSurveys = [];

class ListItemSurvey extends Component {
    state = ({
        userResponse: 0,
        //Modal 
        imageModalVisible: false,
    })

    // Modal
    setImageModalVisible(visible, imageUrl) {
        this.setState({ imageModalVisible: visible });
        images = [{ url: imageUrl }];
    }

    UNSAFE_componentWillMount()  {
        // console.log(this.props)
    }


    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.type == 'select_survey_data_success') {
            //  console.log(nextProps);
            this.setState({
                userResponse: nextProps.userResponse
            });
        }
    }

    _clickItemBrand = (brandID) => {
        Actions.brandDetailScreen({ brandID: brandID });
    }


    _clickSurveyResults = (surveyItemID, surveyID, userID, index) => {
        Actions.surveyResultScreen({ ID: surveyID, userID: userID, index: index });
    }

    _clickSelectSurveyItem = (surveyItemID, surveyID) => {

        if (this.props.SwoqyUserToken === '' || this.props.SwoqyUserToken === null || this.props.SwoqyUserToken === undefined) {
            Alert.alert(
                Localizations('Global.UserLogin'),
                Localizations('Global.RequireUserLoginAlertMessage'),
                [
                    {
                        text: Localizations('Store.Cancel'),
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: Localizations('Store.Ok'), onPress: () => Actions.signInScreen() },
                ],
                { cancelable: false },
            );
        } else {
            Alert.alert(
                "Seçiminizi göndermek üzereyiz.",
                "Onayınızla seçiminiz iletilecektir.",
                [
                    {
                        text: Localizations('Store.Cancel'),
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: Localizations('Store.Ok'), onPress: () => {
                            this.props.SelectSurveyData({ surveyItemID: surveyItemID, userToken: this.props.SwoqyUserToken ,
                                latitude: this.props.SwoqyUserData.Latitude,
                                longitude: this.props.SwoqyUserData.Longitude});
                            selectedSurveys.push(surveyID)
                        }
                    },
                ],
                { cancelable: false },
            );
        }
    }


    render() {
        if (this.props.surveys) {
            return (
                <View style={{ margin: 5 }}>
                    <View style={{
                        borderWidth: 0.5, borderColor: 'gray',
                        backgroundColor:
                            ((this.props.userSurveyItemResponse == this.props.surveys.SurveyItemID) ||
                                (this.state.userResponse == this.props.surveys.SurveyItemID)) ? '#ff585c' : '#fff', borderRadius: 5
                    }}>

                        <TouchableOpacity
                            onPress={() => {
                                this.setImageModalVisible(
                                    true,
                                    GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.POST_PHOTOS + '/' + this.props.userID + '/' + this.props.surveys.SurveyItemImage
                                );
                            }}>
                            <Image style={imageStyle.post.xl}
                                source={{
                                    uri: GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.POST_PHOTOS + '/' + this.props.userID + '/' + this.props.surveys.SurveyItemImage
                                }}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity style={container.center} onPress={() => this._clickItemBrand(this.props.surveys.BrandID)}>
                            <Text style={[textStyle.logoStyle.md, { fontWeight: '600' }]}>{this.props.surveys.BrandName}</Text>
                        </TouchableOpacity>

                        <View style={container.center}>
                            <Text style={textStyle.logoStyle.xs}>{this.props.surveys.SurveyItemText}</Text>
                            <Text style={[textStyle.logoStyle.sm, { fontWeight: '600' }]}>{this.props.surveys.Price > 0 && this.props.surveys.Price + " " + this.props.surveys.Currency}</Text>
                        </View>
                    </View>

                    {
                        !this.props.resultPage ?
                            (selectedSurveys.indexOf(this.props.surveys.SurveyID) != -1 || this.props.userSurveyItemResponse != 0 || this.props.finished == true || this.props.ownerViewing == true) ?
                                <View>
                                    {((this.props.finished == true) || (this.props.ownerViewing == true)) &&
                                        <TouchableOpacity
                                            style={buttonStyle.buttonStyle.md}
                                            onPress={() => this._clickSurveyResults(this.props.surveys.SurveyItemID, this.props.surveys.SurveyID, this.props.userID)} >
                                            <Text style={buttonStyle.buttonTextStyle.md}>{Localizations('WallScreen.Voter')} ({this.props.surveys.NumberOfVotes})</Text>
                                        </TouchableOpacity>
                                    }

                                </View>
                                :
                                this.props.readOnly ?
                                    null
                                    :
                                    <TouchableOpacity style={buttonStyle.buttonStyle.md}
                                        onPress={() => this._clickSelectSurveyItem(this.props.surveys.SurveyItemID, this.props.surveys.SurveyID)} >
                                        <Text style={buttonStyle.buttonTextStyle.md}>{Localizations('WallScreen.Select')}</Text>
                                    </TouchableOpacity>
                            :
                            null
                    }

                    {/* Modal */}
                    <Modal animationType="slide" transparent={true} visible={this.state.imageModalVisible}>
                        <ImageViewer
                            imageUrls={images}
                            enableSwipeDown={true}
                            saveToLocalByLongPress={false}
                            onCancel={() => { this.setImageModalVisible(!this.state.imageModalVisible); }}
                            onClick={() => { this.setImageModalVisible(!this.state.imageModalVisible); }}
                        />
                    </Modal>

                    {
                        this.props.resultPage &&
                        <View style={{ position: 'absolute', top: 0, left: 0, backgroundColor: 'lightgray', borderBottomRightRadius: 5, padding: 2, paddingHorizontal: 5 }}>
                            <Text style={{ fontWeight: 'bold' }}>{this.props.index}</Text>
                        </View>
                    }
                </View>
            )
        }
        return <Spinner size="large" />;
    }
}


const mapStateToProps = ({ postScreenResponse, startScreenResponse }) => {
    const { userResponse, selected, loadingSelectSurvey, type, userToken, connectionError } = postScreenResponse;
    const { SwoqyUserToken, SwoqyUserData } = startScreenResponse;
    return {
        userResponse, selected, loadingSelectSurvey, type, userToken, connectionError, SwoqyUserToken, SwoqyUserData
    };
}

export default connect(mapStateToProps, { SelectSurveyData })(ListItemSurvey);

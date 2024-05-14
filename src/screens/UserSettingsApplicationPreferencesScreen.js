import _ from 'lodash'
import React, { Component } from 'react';
import { Text, TextInput, View, Image, ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { UserGeneralSettingsScreenData, SetUserGeneralSettingsData, SignOut } from '../actions';
import { Card, CardSection, Spinner, ShowMessage, Link, GetSessionTicket, LetterCircle } from '../common';
import { Localizations, FormatDate } from '../../locales/i18n';
import { HF_11, HF_10, HF_01, HF_00 } from '../common/HF';
import SwitchSelector from "react-native-switch-selector";
import { Dropdown } from 'react-native-material-dropdown';

const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

class UserSettingsApplicationPreferencesScreen extends Component {
    state = {
        res: '',
        userAllData: '',
        textInputName: 'lightgray', textInputSurname: 'lightgray', textInputPhone: 'lightgray', textInputEmail: 'lightgray',
        selectedLanguage: '', selectedCurrency: '', inappropriateContent: true
    };

    //#region Component operations
    UNSAFE_componentWillMount()  {
        res = this.props.userAllData
        this.setState({
            //currency: res.DefaultCurrency,
            language: res.DefaultLanguage,
            inappropriateContent: res.InappropriateContent
        });

    }

    componentDidMount() {
        // debugger
        this.setLanguage(this.state.language);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps.type == "set_user_generalsettings_user_all_data") {

        }
    }
    //#endregion

    //#region click functions
    _clickSave = () => {
        //  debugger;

        // if (this.state.selectedLanguage && this.state.selectedCurrency) {
        if (this.state.selectedLanguage) {
            this.props.SetUserGeneralSettingsData({
                DefaultLanguage: this.state.selectedLanguage,
                //DefaultCurrency: this.state.selectedCurrency,
                InappropriateContent: this.state.inappropriateContent,
                OperationType: 3,
                userToken: this.props.SwoqyUserToken,
                latitude: this.props.SwoqyUserData.Latitude,
                longitude: this.props.SwoqyUserData.Longitude 
            });
        }
        else {
            alert(Localizations('Setting.Fill'));
            return;
        }
    }
    //#endregion

    _switchSelect = (data, iValue) => {

        // console.log(data + " : " + iValue )
        const options = [];
        options.push({ label: Localizations('Setting.Privacy.option.No'), value: false })
        options.push({ label: Localizations('Setting.Privacy.option.Yes'), value: true })
        // debugger
        return (
            <View style={container.center}>
                <SwitchSelector

                    style={{ alignSelf: 'flex-end', width: '100%' }}
                    initial={iValue ? 1 : 0}
                    onPress={value => this.setState({ inappropriateContent: value })}
                    textColor='#ff5a5c'
                    selectedColor='#ffffff'
                    buttonColor='#ff5a5c'
                    borderColor='#e9ebed'
                    hasPadding
                    options={options}
                />
            </View>
        )
    }


    _getIndex(value, arr, prop) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][prop] === value) {
                return i;
            }
        }
        return -1; //to handle the case where the value doesn't exist
    }


    //#region dropdown_language
    _dropdown_language_renderButtonText(rowData) {
        const { LanguageID, LanguageName } = rowData;
        //return `${LanguageID} - ${LanguageName}`;
        return `${LanguageName}`;
    }
    _dropdown_language_onSelect(language) {
        this.setState({
            selectedLanguage: language.LanguageID
        })
    }

    _dropdown_language_renderRow(rowData, rowID, highlighted) {
        let evenRow = rowID % 2;
        return (
            <TouchableHighlight underlayColor='cornflowerblue'>
                <View >

                    <Text >
                        {/* {`${rowData.LanguageID} (${rowData.LanguageName})`} */}
                        {rowData.LanguageName}

                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

    _dropdown_language_renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        let key = `spr_${rowID}`;
        return (<View style={{ backgroundColor: 'gray', margin: 3, height: 1 }}
            key={key}
        />);
    }

    _getLanguageName(value, arr, prop) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i]["LanguageID"] === value) {
                return arr[i][prop];
            }
        }
        return -1; //to handle the case where the value doesn't exist
    }

    setLanguage = (languageID) => {
        this.setState({
            selectedLanguage: languageID
        })
    }
    //#endregion

    onChangeText(text) {

        console.log(text)
        setLanguage({ languageID: text })
    }

    //#region render operations
    renderUserPersonalInformationArea = () => {
        const options = [
            { value: 1, label: Localizations('Setting.ApplicationPreferences.ApplicationLanguage.Turkish') },
            { value: 2, label: Localizations('Setting.ApplicationPreferences.ApplicationLanguage.English') },
            { value: 3, label: Localizations('Setting.ApplicationPreferences.ApplicationLanguage.Spanish') },
            { value: 4, label: Localizations('Setting.ApplicationPreferences.ApplicationLanguage.Italian') },
            { value: 5, label: Localizations('Setting.ApplicationPreferences.ApplicationLanguage.French') },
            { value: 6, label: Localizations('Setting.ApplicationPreferences.ApplicationLanguage.Chinese') },
            { value: 7, label: Localizations('Setting.ApplicationPreferences.ApplicationLanguage.Japanese') },
            { value: 8, label: Localizations('Setting.ApplicationPreferences.ApplicationLanguage.Hindi') },
            { value: 9, label: Localizations('Setting.ApplicationPreferences.ApplicationLanguage.Russian') },
            { value: 10, label: Localizations('Setting.ApplicationPreferences.ApplicationLanguage.Portuguese') },
            { value: 11, label: Localizations('Setting.ApplicationPreferences.ApplicationLanguage.Arabic') },
            { value: 12, label: Localizations('Setting.ApplicationPreferences.ApplicationLanguage.German') },
            { value: 13, label: Localizations('Setting.ApplicationPreferences.ApplicationLanguage.Korean') }


        ];


        if (!this.props.loadingUserGeneralSettings) {
            return (
                <View>

                    <View style={[container.row.sb, { marginVertical: 5, justifyContent: 'center' }]}>
                        <View style={{ flex: 2, marginTop: 20, }}>
                            <Text style={textStyle.settingStyle.privacy}>{Localizations('Setting.ApplicationPreferences.ApplicationLanguage.title')}</Text>
                        </View>

                        <View style={{ flex: 1, }}>

                            <Dropdown
                                ref={this.dropdown_language}
                                placeholder={Localizations('Global.Choose')}
                                data={options}
                                inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                value={this.state.language}
                                onChangeText={this.setLanguage}
                            />
                        </View>

                    </View>



                    <View style={[container.row.sb, { marginVertical: 5 }]}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={textStyle.settingStyle.privacy}>{Localizations('Setting.ApplicationPreferences.InappropriateContent')}</Text>
                        </View>

                        {this._switchSelect('inappropriateContent', this.state.inappropriateContent)}
                    </View>

                    <View style={{ height: 100 }}></View>

                    <View  >
                        <Card >
                            <View style={[container.row.sb, { marginVertical: 5, }]}>
                                <View style={{ flex: 2, justifyContent: 'center' }}>
                                    <Text style={textStyle.settingStyle.security}>{Localizations('Setting.ApplicationPreferences.Changes')}</Text>
                                </View>
                            </View>
                        </Card>
                    </View>
                </View>
            );
        } else {
            return <View style={{ flex: 1, backgroundColor: 'white' }}><Spinner style="large" /></View>;
        }
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <View style={{ height: 40 }}>
                    <HF_01 title={Localizations('Global.UserSettingsApplicationPreferencesScreen')} rightButtonJumpPage="userSettingsApplicationPreferancesScreen" parentMethod={this._clickSave} />
                </View>
                {!this.props.loadingUserGeneralSettings ?
                    <View style={{ flex: 1, backgroundColor: 'white', padding: 20, }}>
                        {this.renderUserPersonalInformationArea()}
                    </View>
                    :
                    <View style={{ flex: 1, backgroundColor: 'white' }}><Spinner style="large" /></View>
                }
            </View>
        );
    } 

    //#endregion
}

const mapStateToProps = ({ userGeneralSettingsScreenResponse, startScreenResponse }) => {
    const { res, userAllData, type, loadingUserGeneralSettings, userToken, connectionError } = userGeneralSettingsScreenResponse;
    const { SwoqyUserToken, SwoqyUserData } = startScreenResponse;
    return {
        res, userAllData, type, loadingUserGeneralSettings, userToken, connectionError, SwoqyUserToken,SwoqyUserData
    };
}

export default connect(mapStateToProps, { UserGeneralSettingsScreenData, SetUserGeneralSettingsData, SignOut })(UserSettingsApplicationPreferencesScreen);

import _ from 'lodash'
import React, { Component } from 'react';
import { Text, TextInput, View, Image, Button, ScrollView, TouchableOpacity, Modal, KeyboardAvoidingView, Platform, SafeAreaView, TouchableWithoutFeedback, StyleSheet, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { UserGeneralSettingsScreenData, SetUserGeneralSettingsData, SignOut } from '../actions';
import { Card, CardSection, DateFormat, Spinner, ShowMessage, Link, GetSessionTicket, LetterCircle, Slang } from '../common';
import { Localizations, FormatDate } from '../../locales/i18n';
import { getLanguages } from 'react-native-i18n';
import { HF_11, HF_10, HF_01, HF_00 } from '../common/HF';
import ImagePicker from 'react-native-image-crop-picker'
// import DateTimePicker from "react-native-modal-datetime-picker"
import ImageViewer from 'react-native-image-zoom-viewer';
import SwitchSelector from "react-native-switch-selector"; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


// var dateFormat = require('dateformat');

const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');
var photo = null;

class UserSettingsPersonalInformationScreen extends Component {
    constructor() {
        super();
        this.state = {
            image: null,
            images: null,
            //Modal 
            imageModalVisible: false,
            accountStatus: 1,
            systemLanguage: 'en'
        };
    }

    state = {
        res: '',
        textInputName: 'lightgray', textInputSurname: 'lightgray', textInputPhone: 'lightgray', textInputEmail: 'lightgray',
        selectedImage: '',
        // isDateTimePickerVisible: false, selectedDate: '', 
        accountStatus: 1,
        eula1: true, eula2: true,
        disableSaveButton: false

    };

    //#region Component operations
     UNSAFE_componentWillMount()  {

        // console.log(this.props);
        // console.log(this.props.SwoqyUserData );

        getLanguages().then(languages => {
           // console.log(languages); // ['en-US', 'en']

            this.setState({
                systemLanguage: (languages[0]).substring(0,2)
            })
            //debugger
          });

        //   console.log(this.state.systemLanguage);
        // console.log(this.props.userAllData);
        //debugger;

        if (this.props.userAllData) {
            if (this.props.userAllData.Email) {
                res = this.props.userAllData
                this.setState({
                    userID: res.UserID,
                    userName: res.Name,
                    userSurname: res.Surname,
                    //userBirthdate: res.BirthDate,

                    email: res.Email,
                    phone: res.Phone,

                    txtName: res.Name,
                    txtSurname: res.Surname,
                    txtPhone: res.Phone,
                    txtEmail: res.Email,
                    //txtDate: res.BirthDate,

                    eula1: res.Eula1,
                    eula2: res.Eula2
                });

                if (res.UserPhoto) {
                    this.setState({
                        userPhoto: res.UserPhoto.Name
                    })
                }
            }
        }
        else {
            this.setState({
                eula1: true,
                eula2: true
            });
        }

    }

    componentDidMount() {
        // debugger

        // this.myInput.focus();
        this.setState({ txtSurname: this.state.txtSurname });



        // if (this.props.userAllData) {
        //     if (this.props.userAllData.Email) {
        //         if (this.props.userAllData.BirthDate != "0001-01-01T00:00:00") {
        //             var sDate = new Date(this.props.userAllData.BirthDate);
        //             var t = sDate.getDay();
        //             if (t >= 0) {
        //                 var sDate = new Date(this.props.userAllData.BirthDate);
        //                 var strDate = "\/Date(" + sDate.getTime() + ")\/";

        //             }
        //             else {
        //                 strDate = this.props.userAllData.BirthDate;

        //             }

        //             var d = strDate.replace('/Date(', '').replace(')/', '');
        //             var myObj = JSON.parse('{"date_item":"' + d + '"}'),
        //                 myDate = new Date(1 * myObj.date_item);

        //             this.setState({
        //                 selectedDate: myDate.toString()
        //             })
        //         }
        //     }
        // }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        // if (nextProps.type == "set_user_generalsettings_user_all_data") {
        //     if (this.props.SwoqyUserToken) {
        //         Actions.userGeneralSettingsScreen();
        //     }
        //     else {
        //         Actions.userSettingsSecurityPasswordScreen();
        //     }
        // }
    }
    //#endregion





    validate = (text) => {
        // console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            // console.log("Email is Not Correct");
            this.setState({ email: text })
            return false;
        }
        else {
            this.setState({ email: text })
            // console.log("Email is Correct");
            return true;
        }
    }




    _switchSelect = (data, iValue) => {

        // console.log(data + " : " + iValue )
        const options = [];
        options.push({ label: Localizations('Setting.Privacy.option.No'), value: false })
        options.push({ label: Localizations('Setting.Privacy.option.Yes'), value: true })
        // debugger
        return (
            <View style={[container.center,]}>
                <SwitchSelector

                    style={{ alignSelf: 'flex-end', width: '80%' }}
                    initial={iValue ? 1 : 0}
                    onPress={value =>
                        (data == 'eula1' ?
                            this.setState({ eula1: value }) :
                            (data == 'eula2' ?
                                this.setState({ eula2: value }) :
                                null))
                    }
                    textColor='#ff5a5c'
                    selectedColor='#ffffff'
                    buttonColor='#ff5a5c'
                    borderColor='#e9ebed'
                    hasPadding
                    fontSize={13}
                    options={options}
                />
            </View>
        )
    }


    //#region click functions
    _clickSave = () => {

        if (!this.state.disableSaveButton) {
            if (this.state.txtName && this.state.txtSurname && this.state.txtEmail) {
                if (!this.props.SwoqyUserToken) {
                    // debugger;

                    // if (this.state.txtReEnterEmail) {
                    //     if (this.state.txtEmail != this.state.txtReEnterEmail) {
                    //         alert(Localizations('Setting.PersonalInformation.EmailSimilar'));
                    //         return;
                    //     }

                    if (!this.validate(this.state.txtEmail)) {
                        alert(Localizations('Setting.PersonalInformation.WrongEmail'));
                        return;
                    }
                    //     }
                }


                // birthDate = "";
                // if (this.state.selectedDate !== undefined) {
                //     var selectedDate = new Date(this.state.selectedDate);
                //     birthDate = "\/Date(" + selectedDate.getTime() + ")\/";

                //     var now = new Date();
                //     if (selectedDate >= now) {
                //         alert(Localizations('Setting.PersonalInformation.WrongDate'));
                //         return;
                //     }
                // }

                if (this.state.eula1 != 1) {
                    alert(Localizations('Setting.PersonalInformation.Deals'));
                    return;
                }

                if (this.state.selectedImage != undefined) {
                    userPhoto = JSON.stringify({
                        Uri: this.state.selectedImage.uri,
                        Type: this.state.selectedImage.mime,
                        Name: this.state.selectedImage.name,
                        ImageFile: this.state.selectedImage.data
                    });
                }

                {
                    this.state.slang ? Slang('', 2)
                        :
                        this.props.SetUserGeneralSettingsData({
                            name: this.state.txtName,
                            surname: this.state.txtSurname,
                            phone: this.state.txtPhone,
                            email: this.state.txtEmail,
                            OperationType: 1,
                            //BirthDate: birthDate,
                            selectedImage: this.state.selectedImage,
                            AccountStatus: this.state.accountStatus,
                            userToken: this.props.SwoqyUserToken,
                            eula1: this.state.eula1,
                            eula2: this.state.eula2,
                            latitude: this.props.SwoqyUserData ? this.props.SwoqyUserData.Latitude : 0.0,
                            longitude: this.props.SwoqyUserData ? this.props.SwoqyUserData.Longitude : 0.0,
                            deviceInfo: this.props.SwoqyUserData ? this.props.SwoqyUserData.DeviceInfo : "",
                            systemLanguage: this.state.systemLanguage
                        })
                }

                if (this.props.userGeneralSettingsError == false) {
                    this.setState({ disableSaveButton: true });
                }


            }
            else {
                alert(Localizations('Setting.Fill'));
            }
        }

    }
    //#endregion

    // #region AddPhoto functions
    _clickAddPhoto = () => {
        //debugger
        ImagePicker.openPicker({
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
            mediaType: 'photo'
        }).then(image => {
            //debugger
            img = null;
            if (image != undefined) {
                img = { uri: image.path, mime: image.mime, name: image.filename, data: image.data };
            }
            // console.log(img);

            this.setState({
                selectedImage: img
            })
        });
        // .catch(e => console.log(e));
    }

    _clickAddPhotoFromCamera = () => {
        //debugger
        ImagePicker.openCamera({
            width: 600,
            height: 600,
            compressImageQuality: 0.6,
            includeBase64: true,
            cropping: false,
        }).then(image => {
            img = null;
            if (image != undefined) {
                img = { uri: image.path, mime: image.mime, name: "photoFromCamera.JPG", data: image.data };
            }

            this.setState({
                selectedImage: img
            });
        }).catch(e => console.log(e));
    }

    _removeSelectedImages() {
        img = null;

        this.setState({
            selectedImage: img
        });
    }

    setImageModalVisible(visible, imageUrl) {
        //debugger
        this.setState({ imageModalVisible: visible });

        photo = [{ url: imageUrl }];
    }
    //#endregion

    //#region DateTimePicker functions
    // showDateTimePicker = () => {
    //     this.setState({ isDateTimePickerVisible: true });
    // };

    // hideDateTimePicker = () => {
    //     this.setState({ isDateTimePickerVisible: false });
    // };

    // handleDatePicked = date => {
    //     // this.setState({ selectedDate: FormatDate(date.toString(), "dd.MM.yyyy HH:mm") });
    //     this.setState({ selectedDate: date.toString() });
    //     this.hideDateTimePicker();
    // };
    //#endregion

    //#region render operations
    renderImage(image) {
        return <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
            <TouchableOpacity style={{ margin: 5 }}
                onPress={() => {
                    this.setImageModalVisible(
                        true,
                        image.uri
                    );
                }}><Image style={{ width: 100, height: 100, resizeMode: 'cover' }} source={image} />
            </TouchableOpacity>
            <TouchableOpacity style={{ margin: 5 }} onPress={() => this._removeSelectedImages()}>
                <Text style={{ fontSize: 30 }}>X</Text>
            </TouchableOpacity>
        </View>
    }

    renderAsset(image) {
        if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
            return this.renderVideo(image);
        }

        return this.renderImage(image);
    }

    renderUserPersonalInformationArea = () => {
        //console.log(this.state);
        // debugger
        // if (!this.props.loadingUserGeneralSettings) {
        return (
            <View style={{ justifyContent: 'space-around', }}>
                <View style={{ alignItems: 'center' }}>

                    {(this.state.selectedImage != undefined || this.props.userAllData.SelectedImage != null || this.props.userAllData.UserPhoto != null) &&
                        <View>
                            {
                                this.state.selectedImage != undefined ?
                                    <LetterCircle
                                        uri={this.state.selectedImage.uri}
                                        data={this.state.userName + " " + this.state.userSurname}
                                        circleSize={80}
                                    />
                                    :
                                    this.props.userAllData.SelectedImage != null ?
                                        <LetterCircle
                                            uri={this.props.userAllData.SelectedImage.uri}
                                            data={this.state.userName + " " + this.state.userSurname}
                                            circleSize={80}
                                        />
                                        :
                                        <LetterCircle
                                            photo={this.props.userAllData.UserPhoto.Name}
                                            data={this.state.userName + " " + this.state.userSurname}
                                            circleSize={80}
                                        />
                            }
                        </View>
                    }

                    <View style={{ flexDirection: 'row' }}>
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
                </View>

                <View style={{ margin: 5 }}>
                    {/* <View>
                        <Text style={textStyle.settingStyle.general}>{Localizations('Setting.PersonalInformation.Name')}</Text>
                    </View> */}
                    <View>
                        <TextInput
                            style={{ padding: 4, margin: 4, fontSize: 18, borderColor: this.state.textInputName, borderColor: '#ff585c', borderBottomWidth: 1 }}
                            onChangeText={(txtName) => (this.setState({ txtName }), (Slang(txtName, 1) ? this.setState({ slang: true }) : this.setState({ slang: false })))}
                            value={this.state.txtName}
                            keyboardType='default'
                            placeholder={Localizations('Setting.PersonalInformation.Name')}
                        // ref={input => this.myInput = input}

                        // onFocus={() => this.setState({ textInputName: '#ff585c' })}
                        // onBlur={() => this.setState({ textInputName: '#lightgray' })}
                        />
                    </View>
                </View>

                <View style={{ margin: 5 }}>
                    {/* <View>
                        <Text style={textStyle.settingStyle.general}>{Localizations('Setting.PersonalInformation.Surname')}</Text>
                    </View> */}
                    <View>
                        <TextInput
                            style={{ padding: 4, margin: 4, fontSize: 18, borderColor: this.state.textInputSurname, borderColor: '#ff585c', borderBottomWidth: 1 }}
                            onChangeText={(txtSurname) => (this.setState({ txtSurname }), (Slang(txtSurname, 1) ? this.setState({ slang: true }) : this.setState({ slang: false })))}
                            value={this.state.txtSurname}
                            placeholder={Localizations('Setting.PersonalInformation.Surname')}
                        // onFocus={() => this.setState({ textInputSurname: '#ff585c' })}
                        // onBlur={() => this.setState({ textInputSurname: '#lightgray' })}
                        />
                    </View>
                </View>

                <View style={{ margin: 5 }}>
                    {/* <View>
                        <Text style={textStyle.settingStyle.general}>{Localizations('Setting.PersonalInformation.Email')}</Text>
                    </View> */}
                    <View>
                        <TextInput
                            style={{ padding: 4, margin: 4, fontSize: 18, borderColor: this.state.textNew, borderColor: '#ff585c', borderBottomWidth: 1 }}
                            onChangeText={(txtEmail) => (this.setState({ txtEmail }), this.setState({ txtEmail: txtEmail, textNew: 'green', textReNew: 'green' }),
                                (Slang(txtEmail, 1) ? this.setState({ slang: true }) : this.setState({ slang: false })))}
                            value={this.state.txtEmail}
                            placeholder={Localizations('Setting.PersonalInformation.Email')}
                            onFocus={() => this.state.txtEmail == null ? this.setState({ textNew: '#ff585c' }) : null}
                            keyboardType='email-address'
                            autoCapitalize='none'
                            editable={this.props.emailChange == false ? this.props.emailChange : true}
                        />
                    </View>
                </View>

                {/* {this.props.emailChange != false &&
                    <View style={{ margin: 5 }}>
                        <View>
                            <Text style={textStyle.settingStyle.general}>{Localizations('Setting.PersonalInformation.ReEnterEmail')}</Text>
                        </View>
                        <View>
                            <TextInput
                                style={{ padding: 4, margin: 4, fontSize: 18, borderColor: this.state.textReNew, borderColor: '#ff585c', borderBottomWidth: 1 }}
                                onChangeText={(txtReEnterEmail) => (this.setState({ txtReEnterEmail }), (this.state.txtEmail == txtReEnterEmail ? this.setState({ txtReEnterEmail: txtReEnterEmail, textNew: 'green', textReNew: 'green' }) : this.setState({ textNew: '#ff585c', textReNew: '#ff585c' })), (Slang(txtReEnterEmail, 1) ? this.setState({ slang: true }) : this.setState({ slang: false })))}
                                value={this.state.txtReEnterEmail}
                                placeholder={Localizations('Setting.PersonalInformation.ReEnterEmail')}
                                onFocus={() => this.state.txtReEnterEmail == null ? this.setState({ textNew: '#ff585c' }) : null}
                                keyboardType='email-address'
                                autoCapitalize='none'
                            />
                        </View>
                    </View>
                } */}


                <View style={{ margin: 5 }}>
                    {/* <View>
                        <Text style={textStyle.settingStyle.general}>{Localizations('Setting.PersonalInformation.Phone')}</Text>
                    </View> */}
                    <View>
                        <TextInput
                            style={{ padding: 4, margin: 4, fontSize: 18, borderColor: this.state.textInputPhone, borderBottomWidth: 1 }}
                            onChangeText={(txtPhone) => (this.setState({ txtPhone }), (Slang(txtPhone, 1) ? this.setState({ slang: true }) : this.setState({ slang: false })))}
                            value={this.state.txtPhone}
                            keyboardType='numeric'
                            placeholder={Localizations('Setting.PersonalInformation.Phone')}
                        // onFocus={() => this.setState({ textInputPhone: '#ff585c' })}
                        // onBlur={() => this.setState({ textInputPhone: '#lightgray' })}
                        />
                    </View>
                </View>

                {//!this.props.SwoqyUserToken &&
                    // <View style={{ margin: 5, }}>
                    //     {/* <View>
                    //         <Text style={textStyle.settingStyle.general}>{Localizations('Setting.PersonalInformation.InviteCode')}</Text>
                    //     </View> */}
                    //     <View>
                    //         <TextInput
                    //             style={{ padding: 4, margin: 4, fontSize: 18, borderColor: this.state.textInputPhone, borderBottomWidth: 1 }}
                    //             //onChangeText={(txtReEnterEmail) => (this.setState({ txtReEnterEmail }), (this.state.txtEmail == txtReEnterEmail ? this.setState({ txtReEnterEmail: txtReEnterEmail, textNew: 'green', textReNew: 'green' }) : this.setState({ textNew: '#ff585c', textReNew: '#ff585c' })), (Slang(txtReEnterEmail, 1) ? this.setState({ slang: true }) : this.setState({ slang: false })))}
                    //             value={this.state.txtInviteCode}
                    //             placeholder={Localizations('Setting.PersonalInformation.InviteCode')}
                    //             onFocus={() => this.state.txtInviteCode == null ? this.setState({ textNew: '#ff585c' }) : null}
                    //             autoCapitalize='none'
                    //         />
                    //     </View>
                    // </View>
                }

                {/* <View style={{ margin: 5, flexDirection: 'row', borderBottomWidth: 1, justifyContent: 'center', alignItems: 'flex-start', alignContent: 'flex-start' }}>
                 
                    <View style={{ flexDirection: 'row', flex: 1, }}>
                        <Text style={{ padding: 4, margin: 4, fontSize: 18 }}>{Localizations('Setting.PersonalInformation.Birthdate')}:</Text>

                        {this.state.selectedDate == '' || this.state.selectedDate == undefined ?
                            <Button title={Localizations('Global.Select')} onPress={this.showDateTimePicker} />
                            :
                            // <Button title={FormatDate(this.state.selectedDate, "dd.MM.yyyy")} onPress={this.showDateTimePicker} />
                            <Button title={dateFormat(this.state.selectedDate, "dd.mm.yyyy")} onPress={this.showDateTimePicker} />
                        }
                    </View>
                    <DateTimePicker
                        locale={Localizations('Global.Locale')}
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                        titleIOS={Localizations('Setting.PersonalInformation.Birthdate')}
                        mode='date'
                        customStyles={{
                            dateInput: {
                                borderWidth: 0,
                                borderBottomWidth: 1,
                                borderBottomColor: 'green',
                            },
                            dateText: {
                                color: 'red',
                                fontSize: 49,
                                justifyContent: 'flex-start'
                            }
                        }}

                        // minimumDate={new Date().getDate()}
                        confirmTextIOS={Localizations('Global.Select')}
                        cancelTextIOS={Localizations('Global.Cancel')}
                    />
                </View> */}

                <View style={[container.row.sb, { marginVertical: 15, }]}>
                    <View style={{ flex: 2 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={textStyle.settingStyle.eula}>{Localizations('Setting.PersonalInformation.IAccept1')}</Text>
                            <TouchableOpacity onPress={() => Actions.eulaScreen()}><Text style={textStyle.settingStyle.eulaLink}>{Localizations('Setting.PersonalInformation.MembershipConditions')}</Text></TouchableOpacity>
                            <Text style={textStyle.settingStyle.eula}> {Localizations('Setting.PersonalInformation.And')} </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => Actions.kvkkScreen()}><Text style={textStyle.settingStyle.eulaLink}>{Localizations('Setting.PersonalInformation.KVKK')}</Text></TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={textStyle.settingStyle.eula}>{Localizations('Setting.PersonalInformation.IAccept2')}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        {this._switchSelect('eula1', this.state.eula1)}
                    </View>
                </View>

                <View style={[container.row.sb, { marginVertical: 5 }]}>
                    <View style={{ flex: 2 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={textStyle.settingStyle.eula}>{Localizations('Setting.PersonalInformation.ElektronicMessage1')}</Text>
                            <TouchableOpacity onPress={() => Actions.electronicMessageScreen()}><Text style={textStyle.settingStyle.eulaLink}>{Localizations('Setting.PersonalInformation.ElektronicMessage2')}</Text></TouchableOpacity>
                            <Text style={textStyle.settingStyle.eula}>{Localizations('Setting.PersonalInformation.ElektronicMessage3')}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={textStyle.settingStyle.eula}>{Localizations('Setting.PersonalInformation.ElektronicMessage4')}</Text>
                            <Text style={textStyle.settingStyle.eula}>{Localizations('Setting.PersonalInformation.ElektronicMessage5')}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        {this._switchSelect('eula2', this.state.eula2)}
                    </View>
                </View>


                {/* Modal */}
                <Modal animationType="slide" transparent={true} visible={this.state.imageModalVisible}>
                    <ImageViewer
                        imageUrls={photo}
                        enableSwipeDown={true}
                        saveToLocalByLongPress={false}
                        onCancel={() => { this.setImageModalVisible(!this.state.imageModalVisible); }}
                        onClick={() => { this.setImageModalVisible(!this.state.imageModalVisible); }}
                    />
                </Modal>

            </View>
        );
        // } else {
        //     return <Spinner style="large" />
        // }
    }

    render() {
        // debugger

        if (!this.props.loadingUserGeneralSettings) {
            return (


                <View style={{ flex: 1 }}>
                    <View style={{ height: 40 }}>
                        <HF_01 title={Localizations('Global.UserSettingsPersonalInformationScreen')} rightButtonJumpPage="userSettingsApplicationPreferancesScreen" parentMethod={this._clickSave} from={this.props.from} />
                    </View>
                    <KeyboardAwareScrollView style={{ backgroundColor: 'white' }}>
                        <View style={{ padding: 10 }}>
                            <Card style={{ margin: 5, }}>
                                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                    <ScrollView style={{ flex: 1, backgroundColor: 'white', padding: 20, }}>

                                        {this.renderUserPersonalInformationArea()}
                                    </ScrollView>

                                </TouchableWithoutFeedback>
                            </Card>
                        </View>
                    </KeyboardAwareScrollView>

                </View>

            );
        }
        return <View style={{ flex: 1, backgroundColor: 'white' }}><Spinner style="large" /></View>;
    }
    //#endregion
}

const mapStateToProps = ({ userGeneralSettingsScreenResponse, startScreenResponse }) => {
    const { res, loadingUserGeneralSettings, userGeneralSettingsError, imageModalVisible, userAllData, type, userToken, connectionError } = userGeneralSettingsScreenResponse;
    const { SwoqyUserToken, SwoqyUserData } = startScreenResponse;
    return {
        res, loadingUserGeneralSettings, userGeneralSettingsError, imageModalVisible, userAllData, type, userToken, connectionError, SwoqyUserToken, SwoqyUserData
    };
}

export default connect(mapStateToProps, { UserGeneralSettingsScreenData, SetUserGeneralSettingsData, SignOut })(UserSettingsPersonalInformationScreen);



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: "flex-end",
    },

});

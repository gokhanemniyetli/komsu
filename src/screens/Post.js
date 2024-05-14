import _ from 'lodash'
import React, { Component } from 'react';
import {
    Text, TextInput, View, ScrollView, Image, TouchableOpacity, FlatList, Linking, Alert, Dimensions, Modal,
    Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, TouchableHighlight
} from 'react-native';
import { Card, CardSection, Spinner, Star, Link, GetSessionTicket, ShowMessage, PrivacyText, LetterCircle, Slang } from '../common';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
// import { PostSendData, GetPostByIDData } from '../actions';
import { SetPostText, ClearPostData, PostData, GetPostByIDData, SelectedNearPlace, SelectedImages, SetAccessTypeID, GetFakeData } from '../actions';
import { Localizations, FormatDate } from '../../locales/i18n';
import { HF_11, HF_10, HF_01, HF_00 } from '../common/HF';

// import ModalDropdown from 'react-native-modal-dropdown';
import { Dropdown } from 'react-native-material-dropdown';


import ListItemPost2 from '../components/ListItemPost2';


import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import ImagePicker from 'react-native-image-crop-picker'
// Modal
import ImageViewer from 'react-native-image-zoom-viewer';
var photos = [];

var { LoginControl } = require('../common/GlobalFunctions');


const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle, buttonStyle } = require('../styles/SwoqyStyles');


const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
        {children}
    </TouchableWithoutFeedback>
);


class PostScreen extends Component {
    constructor() {
        super();
        this.state = {
            image: null,
            images: null,
            //Modal
            imageModalVisible: false,
            disableSaveButton: false
        };
    }

    state = {
        res: '',
        loadingPost: false,
        newPost: false, postText: '',
        type: '', userToken: '',
        connectionError: false,
        rePost: '',
        AccessTypeID: 0,
        PostText: '',
        SharingType: 0,
        SharingUserList: '',
        PostImageList: '',
        Place: '',
        Survey: '',
        Purchase: '',
        Question: '',
        Latitude: '',
        Longitude: '',
        selectedNearPlace: '',
        post: null,
        selectedFakeUser: 0,
        selectedFakeShoppingMall: 0

    };

    //#region Component operations


    UNSAFE_componentWillMount() {
        this.setState

        if (LoginControl(this.props.SwoqyUserToken)) {
            if (this.props.RePostID != null) {
                this.props.GetPostByIDData({ ID: this.props.RePostID, userToken: this.props.SwoqyUserToken });
            }
            // debugger;
            if (this.props.accessTypeID === undefined || this.props.accessTypeID === '' || this.props.accessTypeID === 0) {
                this.props.SetAccessTypeID({ AccessTypeID: "1", userToken: this.props.SwoqyUserToken });
            }

            if (this.props.SwoqyUserData.AdminUser == true) {
                this.props.GetFakeData({ userToken: this.props.SwoqyUserToken });
            }
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        res = nextProps.res;

        if (nextProps.type == 'get_fake_data_success') {

            const ObjDropdown_1 = [];
            res.UserList.map((item, key) =>
                ObjDropdown_1.push({ 'FakeUserID': item.UserID, 'FakeUserName': item.Name + ' ' + item.Surname, 'FakeUserPhoto': item.UserPhoto })
            )

            const ObjDropdown_2 = [];
            res.ShoppingMallList.map((item, key) =>
                ObjDropdown_2.push({ 'FakeShoppingMallID': item.ShoppingMallID, 'FakeShoppingMallName': item.ShoppingMallName, 'FakeShoppingMallLogo': item.ShoppingMallLogo })
            )

            if (ObjDropdown_1.length > 0 && ObjDropdown_2.length > 0) {
                this.setState({
                    fakeUsers: ObjDropdown_1,
                    fakeShoppingMalls: ObjDropdown_2
                })
            }
        }

        if (nextProps.type == 'post_data_success') {
            this.setState({
                userToken: res.UserToken,
                sharingType: res.SharingType,
                sharingUserList: res.SharingUserList,
            });
        }
        // console.log(nextProps);
        if (nextProps.type == 'get_post_by_id_data_success') {
            this.setState({
                rePost: nextProps.rePost
            });
        }
    }




    //#region dropdown  // User List


    setFakeUser = (fakeUserID) => {
        this.setState({
            selectedFakeUser: fakeUserID
        })

     //   console.log(fakeUserID)
    }

    //#endregion




    // Modal
    setImageModalVisible(visible, imageUrl) {
        this.setState({ imageModalVisible: visible });
        photos = [{ url: imageUrl }];
    }
    //#endregion

    //#region click functions
    _clickSetPrivacy = () => {
        Actions.postPrivacyScreen()
    }

    _clickBtnCancel = () => {
        this.props.ClearPostData()
    }

    _clickSave = () => {
        if (!this.state.disableSaveButton) {
            var sharingUserList = [];
            if (this.props.selectedFriendList) {
                this.props.selectedFriendList.map(item => sharingUserList.push(item));
            }

            

            if (this.props.accessTypeID == 0) {
                alert(Localizations('NewPost.NoWhoSee'));
                return;
            } else if (this.props.accessTypeID == 3) {
                if (sharingUserList.length === 0) {
                    alert(Localizations('NewPost.NoWhoSee'));
                    return;
                }
            }

            var postImageList = [];
            if (this.props.selectedImages) {
                postImageList = this.props.selectedImages.map(item => {
                    //console.log(item);
                    return { Uri: item.uri, Type: item.mime, Name: item.name, ImageFile: item.data };
                })
            }
//debugger;
            if (this.props.PostText === "" && postImageList.length == 0) {
                alert(Localizations('NewPost.NoText'));
                return;
            // } else if (this.props.PostText === "" && postImageList.length > 0) {
            //     this.props.SetPostText({ postText: " " });
            }



            var _survey = this.props.Survey
            if (this.props.Survey) {
                var surveyItems = [];
                var imageItems = [];
                surveyItems = _survey.SurveyItemList.map(s_item => {
                    //console.log(s_item)
                    imageItems = [];
                    imageItems = s_item.SurveyItemImage.map(item => {
                        //console.log(item)
                        return { Uri: item.uri, Type: item.mime, Name: item.name, ImageFile: item.data };
                    })
                    s_item.SurveyItemImage = imageItems;
                    return s_item;
                })
                _survey.SurveyItemList = surveyItems;
            }
            ////////////////////////
            {
                console.log(this.state.selectedFakeUser)
                this.state.slang ? Slang('', 2)
                    :
                    this.props.PostData({
                        postedPostID: this.props.RePostID,
                        userToken: this.props.SwoqyUserToken,
                        accessTypeID: this.props.accessTypeID,
                        postText: (this.props.PostText == "" && postImageList.length > 0) ? "   " : this.props.PostText,
                        sharingUserList: sharingUserList,
                        postImageList: postImageList,
                        place: this.props.selectedNearPlace,
                        question: this.props.Question,
                        survey: _survey,
                        purchased: this.props.Purchase,
                        latitude: this.props.SwoqyUserData.Latitude,
                        longitude: this.props.SwoqyUserData.Longitude,
                        fakeShoppingMall: this.state.selectedFakeShoppingMall == undefined ? 0 : this.state.selectedFakeShoppingMall,
                        fakeUser: this.state.selectedFakeUser == undefined ? 0 : this.state.selectedFakeUser
                    })
            }

            

            this.setState({ disableSaveButton: true })
        }

        // Actions.userGeneralSettingsScreen();
        // return;
        // debugger
        //  Actions.wallScreen();
    }

    _clickAddPhoto = () => {
        imageCount = 0;
        if (this.props.selectedImages) {
            imageCount = this.props.selectedImages.length;
        }
        if (imageCount >= GLOBAL.IMAGE_COUNT) {
            alert(Localizations('NewPost.MaxImageCount') + ": " + GLOBAL.IMAGE_COUNT);
        } else {
            ImagePicker.openPicker({
                multiple: true,
                waitAnimationEnd: false,
                includeExif: true,
                forceJpg: true,
                //includeBase64: true,
                cropping: true,
                freeStyleCropEnabled: true,
                compressImageMaxWidth: 600,
                compressImageMaxHeight: 600,
                compressImageQuality: 0.6
            }).then(images => {
                imgs = [];
                if (this.props.selectedImages) {
                    this.props.selectedImages.map(i =>
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
                this.props.SelectedImages(imgs);
            });
            // .catch(e => alert(e));
        }
    }



    _clickAddVideo = () => {
        imageCount = 0;
        if (this.props.selectedImages) {
            imageCount = this.props.selectedImages.length;
        }
        if (imageCount >= GLOBAL.IMAGE_COUNT) {
            alert(Localizations('NewPost.MaxImageCount') + ": " + GLOBAL.IMAGE_COUNT);
        } else {
            ImagePicker.openPicker({
                multiple: true,
                mediaType: "video"
            }).then(images => {
                imgs = [];
                if (this.props.selectedImages) {
                    this.props.selectedImages.map(i =>
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
                this.props.SelectedImages(imgs);
            });
            // .catch(e => alert(e));
        }
    }



    _clickAddPhotoFromCamera = () => {
        imageCount = 0;
        if (this.props.selectedImages) {
            imageCount = this.props.selectedImages.length;
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
                if (this.props.selectedImages) {
                    this.props.selectedImages.map(i =>
                        imgs.push({ uri: i.uri, mime: i.mime, name: i.name, data: i.data })
                    );
                }
                if (image != undefined) {
                    imgs.push({ uri: image.path, mime: image.mime, name: "photoFromCamera.JPG", data: image.data });
                }
                this.props.SelectedImages(imgs);
            }).catch(e => console.log(e));
        }
    }



    _clickAddVideoFromCamera = () => {
        ImagePicker.openCamera({
            mediaType: 'video',
        }).then(image => {
            // console.log(image);
        }).catch(e => console.log(e));

        // ImagePicker.openCamera({
        //     mediaType: 'video', 
        // }).then(image => {
        //     imgs = [];

        //     if (this.props.selectedImages) {
        //         this.props.selectedImages.map(i =>
        //             imgs.push({ uri: i.uri, mime: i.mime, name: i.name, data: i.data })
        //         );
        //     }
        //     if (image != undefined) {
        //         imgs.push({ uri: image.path, width: image.width, height: image.height, mime: image.mime, data: image.data });
        //     }
        //     this.props.SelectedImages(imgs);
        // }).catch(e => console.log(e));

    }

    _clickAddLocation = () => {
        Actions.postLocationScreen()
    }

    _clickClearLocation = () => {
        this.props.SelectedNearPlace({ nearPlace: '', userToken: this.props.SwoqyUserToken });
    }

    _clickSurvey = () => {
        Actions.postSurvey()
    }

    _clickQuestion = () => {
        Actions.postQuestionScreen()
    }

    _clickAddPurchased = () => {
        Actions.postPurchaseScreen()
    }

    _removeSelectedImages(index) {
        this.props.selectedImages.splice(index, 1);
        imgs = [];
        if (this.props.selectedImages) {
            this.props.selectedImages.map(i =>
                imgs.push({ uri: i.uri, mime: i.mime, name: i.name, data: i.data })
            );
        }
        this.props.SelectedImages(imgs);
    }
    //#endregion

    //#region render operations
    renderPostArea = () => {
        //console.log(this.props);
        if (!this.state.loadingPost && this.props) {

            const options = [];

            this.state.fakeUsers ? this.state.fakeUsers.map((item, index) =>
                options.push({ value: item.FakeUserID, label: item.FakeUserName })
            ) : null




            return (
                <View
                // style={{ height: Dimensions.get('window').height }}
                >
                    <View style={container.row}>
                        {(this.props.SwoqyUserData) &&
                            <LetterCircle
                                photo={this.props.SwoqyUserData.UserPhoto}
                                data={this.props.SwoqyUserData.UserNameSurname}
                                circleSize={80}
                            />
                        }
                        <View style={{ marginLeft: 10 }}>
                            <View>
                                {(this.props.SwoqyUserData) &&
                                    <Text style={[textStyle.commentStyle.name, { fontSize: 20 }]}>{this.props.SwoqyUserData.UserNameSurname}</Text>
                                }
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity
                                    style={[container.row.sb, { alignSelf: 'center', padding: 3, borderWidth: 1, borderColor: 'lightgray', borderRadius: 5, }]}
                                    onPress={() => this._clickSetPrivacy(this)}>
                                    {PrivacyText(this.state.sharingType)}
                                    <Text>{Localizations('Global.PostPrivacyScreen')}</Text>

                                    {this.props.accessTypeID != undefined && this.props.accessTypeID != '' &&
                                        <View
                                            style={[container.row.sb, { marginLeft: 5, padding: 3, borderWidth: 0.5, color: 'white', backgroundColor: '#ff585c', borderColor: 'gray', borderRadius: 5 }]}>
                                            <Text style={{ color: 'white' }}>{PrivacyText(this.props.accessTypeID)}</Text>
                                        </View>
                                    }

                                    <Image
                                        style={{ marginHorizontal: 5, resizeMode: 'stretch', tintColor: 'gray' }}
                                        source={require('../images/icons/arrow_down.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>


                    {
                        (this.props.SwoqyUserData.AdminUser == true) &&
                        <View style={{ backgroundColor: 'lightblue', borderColor: 'lightgray', borderWidth: 1, padding: 5 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                                <Text style={{ fontWeight: 'bold', marginTop:20 }}>Kullanıcı:</Text>
                                {/* <ModalDropdown
                                    style={{ flex: 1, borderWidth: 1, borderRadius: 5, margin: 10, padding: 10, fontSize: 16, justifyContent: 'center' }}
                                    ref="dropdown_1"
                                    dropdownStyle={{ height: 300, width: 200, backgroundColor: 'white' }}
                                    options={this.state.fakeUsers}
                                    renderButtonText={(rowData) => this._dropdown_1_renderButtonText(rowData)}
                                    renderRow={this._dropdown_1_renderRow.bind(this)}
                                    renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this._dropdown_1_renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
                                    onSelect={(indx, rowData) => this._dropdown_1_onSelect(rowData, indx)}
                                // onSelect={rowData => this._dropdown_1_onSelect(rowData)}
                                /> */}

                                <View style={{ flex: 1, }}>
                                    <Dropdown 
                                    style={{marginLeft:20}}
                                        ref={this.dropdown_1}
                                        placeholder={Localizations('Global.Choose')}
                                        data={options}
                                        inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                        value={this.state.fakeUser}
                                        onChangeText={this.setFakeUser}
                                    />
                                </View>
                            </View>

                            {/* <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                                <Text style={{ fontWeight: 'bold' }}>AVM:</Text>
                                <ModalDropdown
                                    style={{ flex: 1, borderWidth: 1, borderRadius: 5, margin: 10, padding: 10, fontSize: 16, justifyContent: 'center' }}
                                    ref="dropdown_2"
                                    dropdownStyle={{ height: 300, width: 200, margin: 10, backgroundColor: 'white' }}
                                    options={this.state.fakeShoppingMalls}

                                    // options={[
                                    //     { 'FakeShoppingMallID': 1, 'FakeShoppingMallName': 'AVM nin adı' },
                                    //     { 'FakeShoppingMallID': 1, 'FakeShoppingMallName': 'AVM nin adı' }
                                    // ]}
                                    renderButtonText={(rowData) => this._dropdown_2_renderButtonText(rowData)}
                                    renderRow={this._dropdown_2_renderRow.bind(this)}
                                    renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this._dropdown_2_renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
                                    onSelect={(indx, rowData) => this._dropdown_2_onSelect(rowData, indx)}
                                // onSelect={rowData => this._dropdown_2_onSelect(rowData)}
                                />
                            </View> */}
                        </View>

                    }


                    <View>
                        <TextInput
                            value={this.props.PostText}
                            onChangeText={txt => (this.props.SetPostText({ postText: txt }), (Slang(txt, 1) ? this.setState({ slang: true }) : this.setState({ slang: false })))}
                            style={[textInputStyle, { fontSize: 16, height: 100 }]}
                            placeholder={Localizations('NewPost.TextInputPlaceHolder')}
                            scrollEnabled={true}
                            multiline={true}
                            autoGrow={true}
                            maxLength={500}
                        />
                    </View>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                        <View style={[container.row, { margin: 3, }]}>
                            <TouchableOpacity style={container.column} onPress={() => this._clickAddPhotoFromCamera(this)}>
                                <View>
                                    <Image
                                        style={imageStyle.iconStyle}
                                        source={require('../images/icons/camera.png')}
                                    />
                                </View>
                                <View>
                                    <Text style={{ textAlign: 'center', width: 70 }} multiline>{Localizations('Global.TakePhoto')}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={[container.row, { margin: 3, }]}>
                            <TouchableOpacity style={container.column} onPress={() => this._clickAddPhoto(this)}>
                                <View>
                                    <Image
                                        style={imageStyle.iconStyle}
                                        source={require('../images/icons/photo_large_black.png')}
                                    />
                                </View>
                                <View>
                                    <Text style={{ textAlign: 'center', width: 70 }} multiline>{Localizations('NewPost.Photo')}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={[container.row, { margin: 3, }]}>
                            <TouchableOpacity style={container.column} onPress={() => this._clickAddVideo(this)}>
                                <View>
                                    <Image
                                        style={imageStyle.iconStyle}
                                        source={require('../images/icons/video.png')}
                                    />
                                </View>
                                <View>
                                    <Text style={{ textAlign: 'center', width: 70 }} multiline>{Localizations('NewPost.Video')}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>


                    </View>



                    {this.props.selectedNearPlace != undefined && this.props.selectedNearPlace != '' ?
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={{ flex: 1, flexDirection: 'row', borderColor: '#ff585c', borderWidth: 1 }}
                                onPress={() => this._clickAddLocation(this)}>
                                <View style={{ justifyContent: 'center' }}>
                                    {this.props.selectedNearPlace.Type == 1 ?
                                        <Image style={imageStyle.logoStyle.md}
                                            source={{
                                                uri: GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.SHOPPING_MALL_LOGO + '/' + this.props.selectedNearPlace.Logo
                                            }} />
                                        :
                                        <Image style={imageStyle.logoStyle.md}
                                            source={{
                                                uri: GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.BRAND_LOGO + '/' + this.props.selectedNearPlace.Logo
                                            }} />
                                    }

                                </View>
                                <View style={{ margin: 3, justifyContent: 'center' }}>
                                    <Text style={textStyle.logoStyle.xs}>{this.props.selectedNearPlace.Name}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ width: 50, backgroundColor: '#ff585c', alignItems: 'center', justifyContent: 'center' }}
                                onPress={() => this._clickClearLocation(this)}>
                                <Text style={{ fontSize: 30, color: 'white' }}> X </Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View></View>
                    }

                    <ScrollView horizontal={true} style={{}}>
                        {/* {this.state.image ? this.renderAsset(this.state.image) : null} */}
                        {this.props.selectedImages ? this.props.selectedImages.map((i, index) => <View key={i.uri}>
                            {this.renderAsset(i, index)}</View>) : null}
                    </ScrollView>

                    {this.props.survey != null &&
                        <View>
                        </View>
                    }

                    {this.props.question != null &&
                        <View>
                        </View>
                    }

                    {this.props.purchase != null &&
                        <View>
                        </View>
                    }

                    {this.props.RePostID != null &&
                        <View>
                            <ListItemPost2 posts={this.state.rePost} repost="1" readOnly={true} />
                        </View>
                    }

                    <View style={[container.row, { height: 100, justifyContent: 'flex-end' }]}>
                        <View style={{ margin: 3, }}>
                            <TouchableOpacity style={buttonStyle.buttonStyle.md} onPress={() => this._clickBtnCancel(this)}>
                                <Text style={buttonStyle.buttonTextStyle.md}>{Localizations('NewPost.Cancel')}</Text>
                            </TouchableOpacity>
                        </View>

                        {/* <View style={{ margin: 3 }}>
                            <TouchableOpacity style={buttonStyle.buttonStyle.md} onPress={() => this._clickSave(this)}>
                                <Text style={buttonStyle.buttonTextStyle.md}>{Localizations('NewPost.Share')}</Text>
                            </TouchableOpacity>
                        </View> */}
                    </View>

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

    renderVideo(video, index) {


        return <View style={{ flex: 1, flexDirection: 'column', alignSelf: 'flex-end', margin: 5, }}>
            <View style={{ backgroundColor: '#ff585c', width: 120, height: 120 }}>

                {/* <Video source={{ uri: video.uri, type: video.mime }} */}

<VideoPlayer
source={{ uri: video.uri }}
disableBack={true}
disableVolume={true}
disableFullscreen={true}
paused={true}
                    ref={(ref) => {
                        this.player = ref
                    }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                    }}
                    rate={1}
                    paused={true}
                    volume={1}
                    muted={false}
                    resizeMode={'cover'}
                    onBuffer={this.onBuffer}                // Callback when remote video is buffering
                    onError={this.videoError}
                    onError={e => console.log(e)}
                    onLoad={load => console.log(load)}
                    repeat={false}
                    // controls={true}
                    // filterEnabled={true}
                //filter={'CIColorMonochrome'}  // pekçok filter var. ileride filtre özellikleri de ekleyeceğiz.
                />
            </View>
            <TouchableOpacity onPress={() => this._removeSelectedImages(index)} style={{ backgroundColor: '#ff585c' }}>
                <View style={{ flex: 1, margin: 2, alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                    <Text style={{ fontSize: 30, color: 'white' }}>X</Text>
                </View>
            </TouchableOpacity>
        </View >

    }


    renderImage(image, index) {
        //debugger
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
        //debugger;
        if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
            return this.renderVideo(image, index);
        }
        return this.renderImage(image, index);
    }

    render() {
        if (this.props.SwoqyUserToken == null || this.props.SwoqyUserToken == undefined || this.props.SwoqyUserToken == "") {
            return (
                <ShowMessage backgroundStyle="bgStyle"
                    textStyle="txtStyle" text={Localizations('Global.RequireUserLoginAlertMessage')}
                />
            );
            Actions.signInScreen();
        } else {
            /// Server kaynaklı sorun olduğunda görüntülenecek.
            if (!this.props.connectionError) {
                return (
                    <View style={{ flex: 1, backgroundColor: 'white' }}>
                        <View style={{ height: 40 }}>
                            <HF_01 title={Localizations('NewPost.NewPostScreen')} rightButtonJumpPage="postScreen" parentMethod={this._clickSave} />
                        </View>

                        <ScrollView>
                            <DismissKeyboard>
                                <KeyboardAvoidingView
                                    style={{ flex: 1 }}
                                    behavior="padding"
                                >
                                    <View style={styles.container}>
                                        {this.renderPostArea()}
                                    </View>

                                </KeyboardAvoidingView>
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
    }
    //#endregion
}

const mapStateToProps = ({ postResponse, startScreenResponse }) => {
    const { res, PostText, Survey, Question, Purchase, selectedImages, accessTypeID, selectedFriendList, selectedNearPlace, images, rePost, loadingPost, type, userToken, connectionError, loadingFakeData } = postResponse;
    const { SwoqyUserToken, SwoqyUserData } = startScreenResponse;
    return {
        res, PostText, Survey, Question, Purchase, selectedImages, accessTypeID, selectedFriendList, selectedNearPlace, images, rePost, loadingPost, type, userToken, connectionError, loadingFakeData, SwoqyUserToken, SwoqyUserData
    };
}

export default connect(mapStateToProps, { SetPostText, ClearPostData, PostData, GetPostByIDData, SelectedNearPlace, SelectedImages, SetAccessTypeID, GetFakeData })(PostScreen);


const styles = {
    container: {
        //borderBottomWidth: 1,
        padding: 20,
        paddingTop: 10,
        backgroundColor: '#fff',
        borderColor: '#ddd',
        elevation: 3,
    }
};
import _ from 'lodash'
import React, { Component } from 'react';
import {
    Platform, Text, TextInput, View, ScrollView, Image, TouchableOpacity, FlatList,  Button,
    Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, SafeAreaView, Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { GetChatData, GetChatMessagesData, SendMessageData } from '../../actions';
import { Spinner, ShowNumber, ShowMessage, LetterCircle, Slang } from '../../common';
import { Localizations, FormatDate } from '../../../locales/i18n';
import { HF_11, HF_10, HF_01, HF_00 } from '../../common/HF';

import ListItemChatMessage from '../../components/Communication/ListItemChatMessage';


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

var dateFormat = require('dateformat');
var sortJsonArray = require('sort-json-array');
const GLOBAL = require('../../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../../styles/SwoqyStyles');



const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
        {children}
    </TouchableWithoutFeedback>
);


class MessageViewScreen extends Component {
    state = {
        res: '', type: '', userToken: '', connectionError: false, message: '', upDown: 0, height: 0
    };

    //#region Component operations
    UNSAFE_componentWillMount()  {
        this.setState
        this.props.GetChatData({ ID: this.props.ID, minMessageID: 0, lastMessageID: 0, count: 5, userToken: this.props.SwoqyUserToken,
            latitude: this.props.SwoqyUserData.Latitude,
            longitude: this.props.SwoqyUserData.Longitude });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        // console.log(nextProps)
        res = nextProps.res;

        if ((nextProps.type == 'get_chat_data_success')) {
            this.setState({
                messageList: res.MessageList,
                notReadMessageList: res.NotReadMessageList,
                user: res.User
            });
            // this.setMessageStatus();
        } else if (nextProps.type == 'get_chat_messages_data_success') {
            //  debugger
            if (this.state.upDown == 1) {
                this.setState((state) => ({
                    messageList: [...state.messageList, ...res.MessageList]
                }));
            } else if (this.state.upDown == -1) {
                this.setState((state) => ({
                    messageList: [...res.MessageList, ...state.messageList]
                }));
                this.scrollToFirst();
            } else if (this.state.upDown == 0) {

                messageList = this.state.messageList;

                res.MessageList.forEach(item => {
                    var found = false;
                    messageList.forEach(element => {
                        if (element.MessageID == item.MessageID) {
                            found = true;
                        }
                    });

                    if (!found) {
                        messageList.push(item);
                    }
                });

                this.setState({
                    messageList: messageList
                });

                setTimeout(() => {
                    if (this.props.res) {
                        if (this.props.res.MessageList) {
                            if (this.props.res.MessageList.length > 0) {
                                // console.log(this);
                                this.scrollToEnd()
                            }
                        }
                    }
                }, 1000)
            }

            this.setState({
                upDown: 0,
                notReadMessageList: res.NotReadMessageList,
            });

            //this.setMessageStatus();

        } else if (nextProps.type == 'send_message_data_success') {
            //this.setState({ message: '' });
            // debugger
            this.state.messageList.length > 0
                ? this._clickGetChatMessages(this.state.messageList[this.state.messageList.length - 1].MessageID, 0, 20)
                : this._clickGetChatMessages(0, 0, 20)
        }
    }

    componentDidMount() {
        setInterval(() => {
            if (this.state.messageList != undefined)
            {
                this.state.messageList.length > 0
                    ? this._clickGetChatMessages(this.state.messageList[this.state.messageList.length - 1].MessageID, null, 20)
                    : this._clickGetChatMessages(0, null, 20)

                    this.setMessageStatus();
            }
            
        }, 5000)

        if (this.props.type == 'get_chat_data_success') {
            //burada sebebini anlayamadÄ±ÄŸÄ±m bir ÅŸeyden Ã¶tÃ¼rÃ¼ fazlaca bekliyor

            setTimeout(() => {
                // console.log('Open')
                this.scrollToEnd()
            }, 5000)
        }

        this.keyboardSub = Keyboard.addListener('keyboardWillShow', () => { this.scrollToEnd() })
    }
    componentWillUnmount() {
        this.keyboardSub.remove()
    }

    componentDidUpdate() {
        // debugger
        if (this.props.type == 'get_chat_data_success') {
            // setTimeout(() => {
            //     console.log('Open2')
            //     this.scrollToEnd()
            //   }, 3000)
        }
    }

    //#endregion

    //#region upDown control
    isCloseToTopOrBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {

        if (contentOffset.y < 0) {
            if (this.props.loadingGetChatMessages != true) {
                this._clickGetChatMessages(0, this.state.messageList[0].MessageID, 10);
                this.setState({ upDown: -1 });
            }
            //     // } else if (contentOffset.y > 20) {
            //     //     debugger
            //     //     console.log("AÅŸaÄŸÄ±ya " + contentOffset.y);
            //     //     this._clickGetChatMessages(this.state.messageList[this.state.messageList.length - 1].MessageID);
            //     //     this.setState({ upDown: 1 });
        };
    }

    isCloseToTopOrBottomAndroid = () => {
        if (this.props.loadingGetChatMessages != true) {
            this._clickGetChatMessages(0, this.state.messageList[0].MessageID, 10);
            this.setState({ upDown: -1 });
        }
    };





    //#endregion

    //#region functions
    _clickItemDetail = () => {
        Actions.userProfileScreen({ ID: this.state.MessageList.User.UserID });
    }

    _clickSendMessage = () => {
        if (this.state.message.trim() != "") {
            if (this.state.slang) {
                Slang('', 2)
            } else {
                this.props.SendMessageData({ ID: this.props.ID, messageText: this.state.message, userToken: this.props.SwoqyUserToken });
                this.setState({ message: '' })
            }
        }
        else
            console.log("mesaj girilmedi")
    }

    _clickGetChatMessages = (lastMessageID, minMessageID, count) => {
        //debugger
        this.props.GetChatMessagesData({ ID: this.props.ID, minMessageID: minMessageID, lastMessageID: lastMessageID, count: count, userToken: this.props.SwoqyUserToken,
            latitude: this.props.SwoqyUserData.Latitude,
            longitude: this.props.SwoqyUserData.Longitude });
    }

    setMessageStatus = () => {
   
        if (this.state.notReadMessageList) {
    
            arr = this.state.messageList;
            arr.forEach(element => {
                if (element.UserID != this.state.user.UserID) {
                    if (this.state.notReadMessageList.indexOf(element.MessageID) == -1) {
                        element.MessageStatus = 2
                    }
                    else {
                        element.MessageStatus = 1
                    }
                }
            });

            this.setState({
                messageList: arr
            })
        }
    }

    scrollToFirst = () => {
        if (this.flatListRef) {
            this.flatListRef.scrollToIndex({ animated: true, index: 0 });
        }
    }
    scrollToEnd = () => {
        if (this.flatListRef) {
            this.flatListRef.scrollToEnd({ animated: true });
        }
    }
    scrollToIndex = () => {
        if (this.flatListRef) {
            this.flatListRef.scrollToIndex({ animated: true, index: this.state.messageList.length - 1 });
        }
    }
    handleScroll = (event) => {
        // console.log(event.nativeEvent.contentOffset.y);
    }
    // endregion
    renderMessageViewArea = () => {
        if (!this.props.loadingGetChat) {
            if (this.state.messageList != '' && this.state.messageList != undefined && this.state.messageList != null) {
                var oObject = sortJsonArray(this.state.messageList, 'MessageDate', 'asc')
                return (
                    <View style={{ flex: 1, backgroundColor:'white' }}>
                        {
                            (this.props.loadingGetChatMessages == true && this.state.upDown == -1) ?
                                <View style={{ height: 100 }}>
                                    <Spinner />
                                </View>
                                :
                                // (Platform.OS != 'ios') &&
                                <TouchableOpacity onPress={() => this.isCloseToTopOrBottomAndroid()}>
                                    <Text style={{ alignContent: 'center', alignItems: 'center', alignSelf: 'center', fontSize: 16, fontWeight: 'bold', marginLeft: 5 }} >{Localizations('Messages.Previously')}</Text>
                                </TouchableOpacity>

                        }



                        <FlatList
                            data={this.state.messageList}
                            ref={(ref) => { this.flatListRef = ref; }}
                            scrollEnabled={true}
                            onScroll={({ nativeEvent }) => { this.isCloseToTopOrBottom(nativeEvent) }}
                            scrollEventThrottle={4000}
                            onScrollToIndexFailed={info => {
                                // console.log(info)
                                // index= info.index,
                                // highestMeasuredFrameIndex= info.highestMeasuredFrameIndex,
                                // averageItemLength= info.averageItemLength
                                //console.log(info);
                            }}
                            // keyExtractor={item => item}
                            getItemLayout={this.getItemLayout}
                            renderItem={(info, index) => (
                                <ListItemChatMessage
                                    messageList={info.item}
                                    user={this.state.user}
                                    whichUser={info.item.UserID == this.state.user.UserID ? true : false}
                                    date={FormatDate(this.state.messageList[info.index].MessageDate, "dd.MM.yyyy")}
                                    oldDate={info.index == 0 ? null : FormatDate(this.state.messageList[info.index - 1].MessageDate, "dd.MM.yyyy")}
                                    index={info.index}
                                />
                            )}

                        // renderItem={({ item, index}) => (
                        //     <View style={{...style, backgroundColor: this.getColor(index)}}>
                        //       <Text>{item}</Text>
                        //     </View>
                        //   )}
                        />

                        {/* </ScrollView> */}

                        {/* {this.scrollToEnd()} */}
                    </View>
                )
            }
        } else
            return <View style={{ flex: 1 }}>
                <Spinner />
            </View>
    }

    render() {
        if (!this.props.connectionError) {
            return (
                <SafeAreaView style={[styles.container, {backgroundColor:'white', }]}>
                    <KeyboardAvoidingView style={styles.keyboardAvoidContainer} behavior="padding">


                        <View style={{ height: 45 }}>
                            {/* <HF_01 title={this.state.user.Name + ' ' + this.state.user.Surname} /> */}
                            <HF_01 user={this.state.user} />
                        </View>

                        <View style={{ flex: 1 }}>
                            {this.renderMessageViewArea()}


                        </View>

                        <View style={[container.row.sb, { width: '98%', alignSelf: 'center', justifyContent: 'flex-end', padding: 20 }]}>
                            <TextInput
                                style={[textStyle.logoStyle.lg, { flex: 1, borderRadius: 10, borderWidth: 0.5, padding: 10, height: Math.min(120, Math.max(35, this.state.height)) }]}
                                onChangeText={(message) => (this.setState({ message }), (Slang(message, 1) ? this.setState({ slang: true }) : this.setState({ slang: false })))}
                                onContentSizeChange={(event) => this.setState({ height: event.nativeEvent.contentSize.height })}
                                value={this.state.message}
                                multiline={true}
                            />

                            <TouchableOpacity onPress={this._clickSendMessage.bind(this)}
                                style={{
                                    backgroundColor: '#ff585c', borderRadius: 8, borderWidth: 1,
                                    borderColor: 'lightgray', padding: 5, margin: 5, justifyContent: 'center', alignSelf: 'center', alignContent: 'center', alignContent: 'center',
                                    height: Math.min(120, Math.max(35, this.state.height))
                                }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white', }} >{Localizations('NewPost.Send')}</Text>
                            </TouchableOpacity>
                        </View>

                    </KeyboardAvoidingView>
                </SafeAreaView>
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

const mapStateToProps = ({ communicationScreenResponse, startScreenResponse }) => {
    const { res, loadingOldMessage, loadingGetChat, loadingGetChatMessages, loadingSendMessage, type, userToken, connectionError } = communicationScreenResponse;
    const { SwoqyUserToken, SwoqyUserData } = startScreenResponse;
    return {
        res, loadingOldMessage, loadingGetChat, loadingGetChatMessages, loadingSendMessage, type, userToken, SwoqyUserToken, SwoqyUserData, connectionError
    };
}

export default connect(mapStateToProps, { GetChatData, GetChatMessagesData, SendMessageData })(MessageViewScreen);



const styles = {
    container: {
        flex: 1
    },
    keyboardAvoidContainer: {
        height:screenHeight-50,
        // flex: 1,
    }
}
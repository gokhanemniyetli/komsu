import _ from 'lodash'
import React, { Component} from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, FlatList, Linking,  Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { SignOut  } from '../actions';
import { Card, CardSection, Spinner, ShowMessage, Link, GetSessionTicket } from '../common';
import ListItemOpportunity from '../components/ListItemOpportunity';
import call from 'react-native-phone-call';
import { Localizations, FormatDate } from '../../locales/i18n';

const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

class UserSettingsScreen extends Component {
    
    state = { res:'', loadingSingOut:false};

    //#region Component operations
    UNSAFE_componentWillMount()  {
        this.setState
//debugger
        if (this.props.SwoqyUserToken == null || this.props.SwoqyUserToken == undefined || this.props.SwoqyUserToken == "") 
        {
            Actions.signInScreen();
        }
    }


    UNSAFE_componentWillReceiveProps(nextProps) {
        
    }
    //#endregion

    //#region click functions
    _clickSignOut = () => {
        //debugger;
        this.props.SignOut();
    }

    //#endregion

    //#region render operations

    renderUserSettingsArea = () => {
//        debugger
        if (this.props.SwoqyUserToken == null || this.props.SwoqyUserToken == undefined || this.props.SwoqyUserToken == "") {
            return(
                <ShowMessage backgroundStyle="bgStyle" 
                textStyle="txtStyle"text="Giriş yapmalısınız !" 
                />
            );
            Actions.signInScreen();
        } else {
            if (!this.props.loadingSingOut) {
                return (

                    
                
                    <ScrollView style={{ flex: 1, backgroundColor: 'white', padding:10 }}>
                        <View style={{ flexDirection:'row', margin:5,}}>
                            <View style={{height:100, width:100}}>
                                <Text>resim</Text>
                            </View>
                            <View>
                                <Text>Gökhan Emniyetli</Text>
                            </View>
                        </View>
                        
                        <View >
                            <View
                                style={{
                                    borderBottomColor: 'black',
                                    borderBottomWidth: 1,
                                    margin:1
                                }}
                            /> 
                        </View>  
                        
                        <TouchableOpacity onPress={() => this._clickUserInfo()}>
                            <View style={{ flexDirection:'row', margin:10}}>
                                <View style={{ flexDirection:'row', width:50}}>
                                    <Text>resim</Text>
                                </View>
                                <View>
                                    <Text>Kullanıcı Bilgileri</Text>
                                </View>
                            </View>
                        </TouchableOpacity>                
                        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginLeft:55 }}/> 

                        <TouchableOpacity onPress={() => this._clickFallows()}>
                            <View style={{ flexDirection:'row', margin:10}}>
                                <View style={{ flexDirection:'row', width:50}}>
                                    <Text>resim</Text>
                                </View>
                                <View>
                                    <Text>Takipler</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginLeft:55 }}/> 
                        
                        <TouchableOpacity onPress={() => this._clickSharing()}>
                            <View style={{ flexDirection:'row', margin:10}}>
                                <View style={{ flexDirection:'row', width:50}}>
                                    <Text>resim</Text>
                                </View>
                                <View>
                                    <Text>Paylaşımlar</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginLeft:55 }}/> 
                        
                        <TouchableOpacity onPress={() => this._clickFavorites()}>
                            <View style={{ flexDirection:'row', margin:10}}>
                                <View style={{ flexDirection:'row', width:50}}>
                                    <Text>resim</Text>
                                </View>
                                <View>
                                    <Text>Favoriler</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginLeft:55 }}/> 
                        
                        <TouchableOpacity onPress={() => this._clickMyEarings()}>
                            <View style={{ flexDirection:'row', margin:10}}>
                                <View style={{ flexDirection:'row', width:50}}>
                                    <Text>resim</Text>
                                </View>
                                <View>
                                    <Text>Kazandıklarım</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginLeft:55 }}/> 
                        
                        <TouchableOpacity onPress={() => this._clickAgreementl()}>
                            <View style={{ flexDirection:'row', margin:10}}>
                                <View style={{ flexDirection:'row', width:50}}>
                                    <Text>resim</Text>
                                </View>
                                <View>
                                    <Text>Yasal bilgiler ve İlkeler</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginLeft:55 }}/> 
                        
                        <TouchableOpacity onPress={() => this._clickSignOut()}>
                            <View style={{ flexDirection:'row', margin:10}}>
                                <View style={{ flexDirection:'row', width:50}}>
                                    <Text>resim</Text>
                                </View>
                                <View>
                                    <Text>Çıkış</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginLeft:55 }}/> 
                        
                        <TouchableOpacity onPress={() => this._clickOtherSettings()}>
                            <View style={{ flexDirection:'row', margin:10}}>
                                <View style={{ flexDirection:'row', width:50}}>
                                    <Text>resim</Text>
                                </View>
                                <View>
                                    <Text>Diğer Ayarlar</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginLeft:55 }}/> 
                    </ScrollView>
                );
            } else {
                return <View style={{flex:1, backgroundColor:'white'}}><Spinner style="large" /></View>;
            } 
        }
    }

    render() {
        return (
            this.renderUserSettingsArea() 
        );
    }
    //#endregion
}

const mapStateToProps = ({ userSettingsScreenResponse, startScreenResponse }) => {
    const { res, loadingSingOut } = userSettingsScreenResponse;
    const { SwoqyUserToken } = startScreenResponse;
    return {
        res, loadingSingOut, SwoqyUserToken
    };
}

export default connect(mapStateToProps, { SignOut })(UserSettingsScreen);
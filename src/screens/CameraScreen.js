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
import ImagePicker from 'react-native-image-crop-picker';


export default class CameraScreen extends Component {
    
    state = { res:'', loadingSingOut:false};

    //#region Component operations
    UNSAFE_componentWillMount()  {
        this.setState

       
    }

    _clickUserInfo = () => {

      //single image
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      }).then(image => {
        console.log(image);
      });



      // Call multiple image picker

      // ImagePicker.openPicker({
      //   multiple: true
      // }).then(images => {
      //   console.log(images);
      // });




      //Select video only from gallery

      // ImagePicker.openPicker({
      //   mediaType: "video",
      // }).then((video) => {
      //   console.log(video);
      // });



      //Select from camera
      //Image
      
      // ImagePicker.openCamera({
      //   width: 300,
      //   height: 400,
      //   cropping: true,
      // }).then(image => {
      //   console.log(image);
      // });



      // Video
      
      // ImagePicker.openCamera({
      //   mediaType: 'video',
      // }).then(image => {
      //   console.log(image);
      // });


      
      //Crop picture

      // ImagePicker.openCropper({
      //   path: 'my-file-path.jpg',
      //   width: 300,
      //   height: 400
      // }).then(image => {
      //   console.log(image);
      // });

    }


    render() {
        return (
          <ScrollView style={{ flex: 1, backgroundColor: 'white', padding:10 }}>
                        
          <TouchableOpacity onPress={() => this._clickUserInfo()}>
              <View style={{ flexDirection:'row', margin:10}}>
                  
                  <View>
                      <Text>Kamera aç / Resim seç</Text>
                  </View>
              </View>
          </TouchableOpacity>                
          
      </ScrollView>
        );
    }
    //#endregion
}


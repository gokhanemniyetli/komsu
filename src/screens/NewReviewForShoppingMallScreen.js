import React from 'react';
import { Text, View, Button, Image, FlatList, TextInput } from 'react-native';
import Loading from '../common/Loading';
import { Localizations, FormatDate } from '../../locales/i18n';

import SearchBarComponent from '../components/SearchBarComponent';

const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');
const GLOBAL = require('../common/Globals');

export default class NewReviewForShoppingMallScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        screenContent: "", 
        isLoading : true,
        txtReview: "",
    }
  }

  componentDidMount() {
    this.setState({ isLoading : true});

    this.GetScreenContent();

    this.setState({ isLoading : false});
  }


  GetScreenContent() {
    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webServerUserPhotosPath = GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.USER_PHOTO + '/';
    var webService = 'NewReviewForShoppingMallScreen';

    var webServiceUrl = webServerUrl + webService;

    fetch(webServiceUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "ID": 4,
            "userToken": "4811da92-ea54-4847-8062-2104bf5157f4",
            "Latitude": data.latitude,
            "Longitude": data.longitude
        })
    })
    .then((res) => res.json())
    .then((res) => {
        if (res != -1) 
        {
          res = JSON.parse(res);
          this.setState({
            userPhotoPath : webServerUserPhotosPath ,
            shoppingMallID: res.ShoppingMallID,
            shoppingMallName: res.ShoppingMallName,
            shoppingMallReviewScore : res.ShoppingMallReviewScore,
            shoppingMallReviewCount : res.ShoppingMallReviewCount,
            userID : res.UserID,
            userPhoto : webServerUserPhotosPath + res.UserPhoto,
            userNameSurname : res.UserNameSurname,
          });  
        }
        else
        {
            // this.setState({ isLoading : false});   
        }
    })
    .catch((err) => {
        //alert(this.state.lblConnectionError + "\n" + err);
        //this.setState({ isLoading : false});
    })
  }

DataSend () {
    // alert(this.state.txtReview);
    // alert(this.state.shoppingMallID);
    // alert(this.state.userID);
    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webServerUserPhotosPath = GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.USER_PHOTO + '/';
    var webService = 'NewReviewForShoppingMallScreen';
    var webServiceUrl = webServerUrl + webService;



    fetch(webServiceUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "ID": this.state.shoppingMallID,
            "userToken": "4811da92-ea54-4847-8062-2104bf5157f4",
            "review": this.state.txtTeviev,
            "Latitude": data.latitude,
            "Longitude": data.longitude

        })
    })
    .then((res) => res.json())
    .then((res) => {
        if (res != -1) 
        {
          debugger;
          res = JSON.parse(res);
         alert(res);

          this.setState({
            success : res.Success,
          });  

          //alert(this.state.success);
        }
        else
        {
            // this.setState({ isLoading : false});   
        }
    })
    .catch((err) => {
        //alert(this.state.lblConnectionError + "\n" + err);
        //this.setState({ isLoading : false});
    })
}

  render() {
    if(this.state.isLoading ) {
      return (
          <View>
              <Loading /> 
          </View>
      );
    } else {    
      /* 2. Get the param, provide a fallback value if not available */
      const { navigation } = this.props;
      const itemId = navigation.getParam('itemId', 'NO-ID');
      const otherParam = navigation.getParam('otherParam', 'some default value');
  
      return (
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'yellow', paddingTop: 20, justifyContent:'center'}}>
          <View style={{flex: 1, height: 50, backgroundColor: 'green'}}>
            <SearchBarComponent 
              placeHolder="Ne aramıştınız?" 
              returnScreen="Home"  
              returnScreenTitle="Ana ekran"
            />
          </View>

          <View style={{flex:10, backgroundColor: 'lightgray'}}>
            
            <Text style={{fontSize:20, backgroundColor: 'pink'}}>Shopping Mall Review Screen</Text>
            
            
            <Text>ShoppingMallID: {JSON.stringify(this.state.shoppingMallID)}</Text>
            <Text>ShoppingMallName: {JSON.stringify(this.state.shoppingMallName)}</Text>
            <Text>ShoppingMallReviewScore: {JSON.stringify(this.state.shoppingMallReviewScore)}</Text>
            <Text>ShoppingMallReviewCount: {JSON.stringify(this.state.shoppingMallReviewCount)}</Text>
            
            <Text>Kullanıcılar hakkında bilgi </Text>    
            <Text>****************************************** </Text>    
            <Text> UserNameSurname: {JSON.stringify(this.state.userNameSurname)}</Text>
            <Text> UserPhoto:  </Text>
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: 'contain',
              }}
              source={{    uri:
                this.state.userPhoto,
              }}
            />


            <TextInput 
                            style={{height:100, width:'80%', alignSelf:'center', backgroundColor:'white'}} 
                            multiline={true}
                            numberOfLines={10}
                            placeholder='Yorumunuz'
                            value={this.state.txtReview}
                            onChangeText={(value) => this.setState({txtReview: value})}
                            autoCapitalize='none'
                            />
                  
                  

            <Button
              title="iptal"
              onPress={() =>
                this.props.navigation.push('Details', {
                  itemId: Math.floor(Math.random() * 100),
                })}
            />
            <Button
              title="yayinla"
              onPress={() =>
                this.DataSend()
                }
            />

            <Button
              title="Go back"
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
        </View>

      );
    }
  }
}
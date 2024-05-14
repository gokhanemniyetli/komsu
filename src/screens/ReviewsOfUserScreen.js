import React from 'react';
import { Text, View, Button, Image, FlatList } from 'react-native';
import Loading from '../common/Loading';
import { Localizations, FormatDate } from '../../locales/i18n';

import SearchBarComponent from '../components/SearchBarComponent';
const GLOBAL = require('../common/Globals');

const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

export default class ReviewsOfUserScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        screenContent: "", 
        isLoading : true,
        reviewData: []
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
    var webServerImagePath = GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.SHOPPING_MALL_LOGO + '/';
    var webService = 'ReviewsOfUserScreen';

    var webServiceUrl = webServerUrl + webService;


    fetch(webServiceUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "ID": 2,
            "userToken": "4811da92-ea54-4847-8062-2104bf5157f4"
        })
    })
    .then((res) => res.json())
    .then((res) => {
        if (res != -1) 
        {
          res = JSON.parse(res);
          this.setState({
            userID: res.UserID,
            userNameSurname: res.UserName,
            userPhoto: webServerUserPhotosPath + res.UserPhoto,
            logoPath : webServerImagePath ,
            userReviewCount : res.UserReviewCount,
            userReviews : res.UserReviews,
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
            
            <Text style={{fontSize:20, backgroundColor: 'white'}}>Reviews Of User Screen</Text>
            

            <Image
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'contain',
                }}
                source={{    uri:
                  this.state.userPhoto
                }}
              />

            <Text>UserID: {JSON.stringify(this.state.userID)}</Text>
            <Text>UserNameSurname: {JSON.stringify(this.state.userNameSurname)}</Text>
            <Text>UserReviewCount: {JSON.stringify(this.state.userReviewCount)}</Text>
            
            
            <Text>Yorumlar hakkında bilgi </Text>    
            <Text>****************************************** </Text>    

            <FlatList
              data={this.state.userReviews}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) =>
              <View  >
                <Text>AVM ya da mağaza hakkında bilgi </Text>    
              <Text> Name: {JSON.stringify(item.Name)}</Text>
              <Text> logo:  {console.log(this.state.logoPath + item.Logo)}</Text>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'contain',
                }}
                source={{    uri:
                  this.state.logoPath + item.Logo,
                }}
              />

              <Text> ReviewCount: {JSON.stringify(item.ReviewCount)}</Text>
              <Text> ReviewID: {JSON.stringify(item.ReviewID)}</Text>
              <Text> ReviewItemType: {JSON.stringify(item.ReviewItemType)}</Text>
              <Text> ReviewLikeCount: {JSON.stringify(item.ReviewLikeCount)}</Text>
              <Text> ReviewText: {JSON.stringify(item.ReviewText)}</Text>
              <Text> Point: {JSON.stringify(item.Point)}</Text>
              <Text> ReviewDate: {JSON.stringify(item.ReviewDate)}</Text>
            <Text>____________________________________________________ </Text>    
              
              </View>
              }
              keyExtractor={item => item.UserNameSurname}
            />



{/* // for of
for (let userObject of this.state.users) {
    console.log(userObject.username);
}
// map
this.state.users.map((userData) => {
    console.log(userData.username);
});


 */}

            <Button
              title="Go to Details... again"
              onPress={() =>
                this.props.navigation.push('Details', {
                  itemId: Math.floor(Math.random() * 100),
                })}
            />
            <Button
              title="Go to Home"
              onPress={() => this.props.navigation.navigate('Home')}
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
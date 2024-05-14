import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { LetterCircle } from './LetterCircle';
import ListItemFavoriteShoppingMall from '../components/ListItemFavoriteShoppingMall';
import ListItemBrandStore from '../components/ListItemBrandStore';
import ListItemBrand from '../components/ListItemBrand';
import ListItemOpportunity from '../components/ListItemOpportunity';
import { Actions } from 'react-native-router-flux';
import { Localizations, FormatDate } from '../../locales/i18n';
import { DateFormat, } from '../common';



const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

const WallActionItem = (props) => {
  //console.log(props);
  _clickUserDetail = (userID) => {
    // debugger;
    Actions.userProfileScreen({ ID: userID });
  }
  //console.log(props.posts);
  return (
    <View style={{
      backgroundColor: 'white', padding: 5, borderRadius: 0,
      shadowOffset: { width: 0, height: 2 }, shadowRadius: 2, shadowOpacity: 0.2,
      elevation: 3,
    }}>
      <View style={[{ flex: 1, marginLeft: 10, }]}>
        <TouchableOpacity onPress={() => this._clickUserDetail(props.posts.ActionUserID)} style={container.row}>
          <LetterCircle
            photo={props.posts.ActionUserPhoto}
            data={props.posts.ActionUserNameSurname}
            circleSize={30}
          />
          <View style={[{ marginLeft: 10 }]}>

            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>

              <Text style={[textStyle.logoStyle.sm, { fontWeight: 'bold' }]}>{props.posts.ActionUserNameSurname}</Text>
              {
                props.posts.ActionUserRegistered &&
                <Image
                  style={imageStyle.registeredTinyStyle}
                  source={require('../images/icons/registered.png')}
                />
              }
              <Text style={[textStyle.logoStyle.sm]}> {props.posts.ActionTypeName}</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>

              <Text style={textStyle.logoStyle.xs}>
                {props.posts.ActionDateDiff > 0 ? props.posts.ActionDateDiff : null} {
                  props.posts.ActionDateDiff == 1 ?
                    Localizations('WallScreen.TimeType.' + props.posts.ActionDateDiffType.toString())
                    :
                    Localizations('WallScreen.TimeTypes.' + props.posts.ActionDateDiffType.toString())
                }
              </Text>


              {props.posts.GoogleDistance &&
                <Text style={[textStyle.logoStyle.sm, { color: 'gray' }]}>
                  {props.posts.GoogleDistance.Distance == 99999999 ?
                    " - !!! "
                    :
                    props.posts.GoogleDistance.Distance < 1000 ?
                      " - " + props.posts.GoogleDistance.Distance.toFixed(0) + " m "
                      :
                      " - " + (props.posts.GoogleDistance.Distance / 1000).toFixed(1) + " km "
                  }
                  {Localizations('WallScreen.Near')}
                </Text>
              }
            </View>

          </View>
        </TouchableOpacity>

        {
          (props.posts.ShoppingMall != null || props.posts.Brand != null || props.posts.Opportunity != null) &&
          <View style={{ height: 2, backgroundColor: 'lightgray', marginTop: 10, marginBottom: 10 }}></View>
        }

        {
          props.posts.ShoppingMall != null ?
            <ListItemFavoriteShoppingMall from="wall" shoppingMalls={props.posts.ShoppingMall} />
            :
            props.posts.Store != null ?
              <ListItemBrandStore from="wall" stores={props.posts.Store} />
              :
              props.posts.Brand != null ?
                <ListItemBrand from="wall" brands={props.posts.Brand} />
                :
                props.posts.Opportunity != null ?
                  <ListItemOpportunity from="wall" opportunity={props.posts.Opportunity} />
                  :

                  null
        }
      </View>
    </View>
  );
};



export { WallActionItem };

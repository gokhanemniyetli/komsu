import _ from 'lodash'
import React, { Component} from 'react';
import { Text, View, ScrollView, Image, ListView, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { ShoppingMallServiceListData } from '../actions';
import SwitchSelector from "react-native-switch-selector";


import { Card, CardSection, Spinner } from '../common';
import { Actions } from 'react-native-router-flux';

// import { Localizations, FormatDate } from '../../locales/i18n';
// import { Actions } from 'react-native-router-flux';

var sortJsonArray = require('sort-json-array');
var groupBy = require('json-groupby')


var dateFormat = require('dateformat');
const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');


const IMAGES = {
    image_1: require('../images/icons/lift.png'), 
    image_2: require('../images/icons/atm.png'),
    image_3: require('../images/icons/babyRoom.png'), 
    image_4: require('../images/icons/bicycleParking.png'),
    image_5: require('../images/icons/gastro.png'),
    image_6: require('../images/icons/theStroller.png'),
    image_7: require('../images/icons/childrensPlayground.png'),
    image_8: require('../images/icons/childWc.png'),
    image_9: require('../images/icons/information.png'),
    image_10: require('../images/icons/safetyCabinet.png'), //emanet dolabı
    image_11: require('../images/icons/disabledParking.png'),
    image_12: require('../images/icons/disabledWc.png'),
    image_13: require('../images/icons/parkingGarage.png'), // kapalı otopark
    image_14: require('../images/icons/mosque.png'),
    image_15: require('../images/icons/carWash.png'),
    image_16: require('../images/icons/infirmary.png'),
    image_17: require('../images/icons/chargedVehicleParking.png'),
    image_18: require('../images/icons/taxi.png'),
    image_19: require('../images/icons/vale.png'),
    image_20: require('../images/icons/shuttle.png'),
    image_21: require('../images/icons/taxFree.png'),
    image_22: require('../images/icons/freeWifi.png'),
    image_23: require('../images/icons/pharmacy.png'), // excane
    image_24: require('../images/icons/electricCar.png'), // electrikli araç şarj ünitesi
    image_25: require('../images/icons/wheelchair.png'), // tekerlekli sandalye
    image_26: require('../images/icons/dryCleaning.png'), // kuru temizleme
    image_27: require('../images/icons/shoeShine.png'), // lostra
    image_28: require('../images/icons/hairdresser.png'), // kuaför
    image_29: require('../images/icons/highchairs.png'), // mama sandalyesi
    image_30: require('../images/icons/formulaBottle.png'), // mama ve biberon
    image_31: require('../images/icons/mobileCharge.png'), // telefon şarj hizmetimotor
    image_32: require('../images/icons/motorbikeParking.png'), // Motorsiklet park alanı
    image_33: require('../images/icons/travelAgency.png'), // seyahat acentesi
    image_34: require('../images/icons/tailor.png'), // tailor
    image_35: require('../images/icons/disabledCharge.png'),
    image_36: require('../images/icons/parkingGarage.png'), // açık otopark
    image_37: require('../images/icons/supermarket.png'), // süpermarket otopark
    image_38: require('../images/icons/onlineCheckIn.png'), // online check in
    image_39: require('../images/icons/ptt.png'), // ptt
    image_40: require('../images/icons/cinema.png'), // sinema
    image_41: require('../images/icons/theatre.png'), // tiyatro
    image_42: require('../images/icons/gym.png'), // spor salonu
    image_43: require('../images/icons/animalFriendly.png'), // Hayvan dosyu
    
}

getImage = (num) => { 
    return IMAGES['image_' + num];
}

const ListItemServices = (props) => { 
    _clickService = () => {
        Actions.serviceDetailScreen(props.service.ServiceID);
    }
   
    return (
        <View style={{
        padding:10,
        width:110,  alignItems:'center'}}>
            <Image 
            //  style={{ width:60, height:60, marginTop: 15, marginLeft:15, marginRight:15, marginButton:5}}
             style={imageStyle.iconStyleLarge}
                 source={getImage(props.service.ServiceID)} 
            />
            <Text style={{ fontSize: 14, color:'#ff5a5d', margin:5 }}>{props.service.ServiceName}</Text>
        </View>
    )
}


class ServiceList extends Component {
    state = { res:'', loadingServiceList:false, serviceList:'' };

    UNSAFE_componentWillMount()  {
       
       this.props.ShoppingMallServiceListData({ shoppingMallID: this.props.shoppingMallID, userToken: this.props.SwoqyUserToken })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        res = nextProps.res;
    
        this.setState({
            serviceList : nextProps.serviceList
        
        });  
    }

    
    renderContentArea = () => {
    
        if (!this.state.loadingServiceList && this.state.serviceList != '' && this.state.serviceList != undefined && this.state.serviceList != null) {
            var oObject = this.state.serviceList;
        
            return (
                <View style={{flex:1, alignItems:'center', margin:10, paddingBottom:100,}}>
                    <FlatList
                        numColumns={3}
                        data={sortJsonArray(this.state.serviceList.LstShoppingMallServicesListItemDTO, 'ServiceName', 'asc')}
                        keyExtractor={(item, index) => index.toString()}
                        //scrollEnabled={false}
                        renderItem={info => (
                            <ListItemServices
                                service={info.item}
                            />
                        )}
                    />
                </View>
            )
        }
        return <Spinner size="large" />;
    }

    render() {
        return (this.renderContentArea());
    }
}

const mapStateToProps = ({ shoppingMallScreenResponse, startScreenResponse }) => {
    const { res, serviceList, loadingServiceList } = shoppingMallScreenResponse;
    const { SwoqyUserToken } = startScreenResponse;
    return {
        res, serviceList, loadingServiceList, SwoqyUserToken
    };
}

export default connect(mapStateToProps, { ShoppingMallServiceListData})(ServiceList);

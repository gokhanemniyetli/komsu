import _ from 'lodash'
import React, { Component } from 'react';
import { Text, View, ScrollView, Image, ListView, TouchableOpacity, FlatList, Modal  } from 'react-native';
import { connect } from 'react-redux';
import { ShoppingMallFloorPlanListData } from '../actions';
import ListItemShoppingMallStore from '../components/ListItemShoppingMallStore';
import SwitchSelector from "react-native-switch-selector";



import { Card, CardSection, Spinner } from '../common';

// Modal
import ImageViewer from 'react-native-image-zoom-viewer';
var images = [];
//_______________________________________________________



// import { Localizations, FormatDate } from '../../locales/i18n';
// import { Actions } from 'react-native-router-flux';

var sortJsonArray = require('sort-json-array');

const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

var allImages = [];

class FloorPlanList extends Component {
    state = { //Modal 
        imageModalVisible: false, 
        res: '', loadingFloorPlanList: false, floorPlanList: '', selectedListItem: 0 };

    UNSAFE_componentWillMount() {
        this.props.ShoppingMallFloorPlanListData({ shoppingMallID: this.props.shoppingMallID, userToken: this.props.SwoqyUserToken })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        res = nextProps.res;
        // debugger
        this.setState({
            floor: '',
            storeID: 0
        })

        if (this.props.storeID) {
            this.setState({
                floor: this.props.floor,
                storeID: this.props.storeID
            })
        }

        this.setState({
            floorPlanList: nextProps.floorPlanList

        });
    }


    // Modal
    setImageModalVisible(visible, imageUrl) {
        this.setState({
            imageModalVisible: visible,
        });
    }
    
    _changeListType = (item) => {

        this.setState({
            selectedListItem: item
        })

    }

    renderContentArea = () => {

        if (!this.state.loadingFloorPlanList && this.state.floorPlanList != '' && this.state.floorPlanList != undefined && this.state.floorPlanList != null) {

            var oObject = this.state.floorPlanList.LstShoppingMallFloorPlanListDTO;

            const options = [];

            imageName = "";
            if (oObject.length > 0) {
                imageName = oObject.filter(x => x.FloorNumber == this.state.selectedListItem)[0].ImageName;

                var i = this.state.floor;


                var defaultSwitchNumber = 0;

                oObject.forEach(item => {
                    options.push({ label: item.FloorNumber, value: item.FloorNumber })

                    if (item.FloorNumber == 0) {
                        //console.log(i);
                        defaultSwitchNumber = i;
                    }
                    i++;
                });
            }


            allImages = [];
            selectedImageIndex = 0;

            // var imageList = this.props.allPhotos;
            // for (let index = 0; index < imageList.length; index++) {
            //     if (imageList[index] == this.props.photo) {
            //         selectedImageIndex = index;
            //     }

                // allImages.push({ url: GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.POST_PHOTOS + '/' + this.props.userID + '/' + imageList[index] });
            // }
            allImages.push({ url: GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.FLOOR_PLAN + '/' + imageName });

            

            //  console.log(imageName);
            // console.log(imageItem[0].ImageName);
            // console.log(options);

            if (options.length == 0) {
                return (<View></View>)
            } else {
                return (

                    <View style={{ flex: 1 }}>
                        <View>
                            <View style={{ alignItems: 'center' }}>
                                <SwitchSelector
                                    style={{ width: '80%', margin: 5, marginTop: 13 }}
                                    initial={defaultSwitchNumber}
                                    onPress={value => this._changeListType(value)}
                                    textColor='#ff5a5c'
                                    selectedColor='#ffffff'
                                    buttonColor='#ff5a5c'
                                    borderColor='#e9ebed'
                                    hasPadding
                                    options={options}
                                />
                            </View>
                        </View>


                        <ScrollView
                            style={{}}
                            maximumZoomScale={2} scrollEnabled={true} minimumZoomScale={1}
                            showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>

                            <TouchableOpacity
                                onPress={() => {
                                    this.setImageModalVisible(
                                        true,
                                        GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.FLOOR_PLAN + '/' + imageName
                                    );
                                }}>

                                <Image
                                    style={{ height: 250, }}
                                    source={{
                                        uri: GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.FLOOR_PLAN + '/' + imageName
                                    }}
                                />
                            </TouchableOpacity>

                        </ScrollView>

                        {/* Modal */}
                        <Modal animationType="slide" transparent={true} visible={this.state.imageModalVisible}>
                            <ImageViewer
                                imageUrls={allImages}
                                enableSwipeDown={true}
                                saveToLocalByLongPress={false}
                                index={selectedImageIndex}
                                onCancel={() => { this.setImageModalVisible(!this.state.imageModalVisible); }}
                                onClick={() => { this.setImageModalVisible(!this.state.imageModalVisible); }}
                            />
                        </Modal>

                    </View>
                )
            }
        }
        return <Spinner size="large" />;
    }


    render() {
        return (this.renderContentArea());

    }
}

const mapStateToProps = ({ shoppingMallScreenResponse, startScreenResponse }) => {
    const { res, floorPlanList, loadingFloorPlanList } = shoppingMallScreenResponse;
    const { SwoqyUserToken } = startScreenResponse;
    return {
        res, floorPlanList, loadingFloorPlanList, SwoqyUserToken
    };
}


export default connect(mapStateToProps, { ShoppingMallFloorPlanListData })(FloorPlanList);






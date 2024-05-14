import React, { Component } from 'react';
import { Dimensions, Text, View, Image, TouchableOpacity,TouchableNativeFeedback, Modal, YellowBox } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection, LetterCircle, Spinner } from '../common';
var dateFormat = require('dateformat');
import { Localizations, FormatDate } from '../../locales/i18n';

import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';

// Modal
import ImageViewer from 'react-native-image-zoom-viewer';
var images = [];
//_______________________________________________________

const screenWidth = Math.round(Dimensions.get('window').width);

var imageWidth = screenWidth;


const GLOBAL = require('../common/Globals');
const { container, textStyle, imageStyle } = require('../styles/SwoqyStyles');

var allImages = [];

class ListItemPhoto extends Component {
    state = ({
        //Modal 
        imageModalVisible: false,
        imageWidth: this.props.imageCount > 1 ? screenWidth / 2 : screenWidth
    })

    UNSAFE_componentWillMount()  {
        if (this.props.from) {
            switch (this.props.from) {
                case "Purchased":
                    this.setState({ imageWidth: 130 })

                    break;
                case "Question":
                    this.setState({ imageWidth: 130 })
                    break;
                case "ShoppingMallPhotos":
                    this.setState({ imageWidth: '100%' })
                    break;

                default:
                    break;
            }
        }
    }


    // Modal
    setImageModalVisible(visible, imageUrl) {
        this.setState({
            imageModalVisible: visible,
        });
    }


componentDidMount() {
    YellowBox.ignoreWarnings(['Animated: `useNativeDriver`']);
}

    renderVideo(url, type) {

        //debugger;
        return <View style={[imageStyle.post.free, { width: this.state.imageWidth }]}>
            <VideoPlayer
                source={{ uri: url }}
                disableBack={true}
                paused={true}
                showOnStart={true}
                tapAnywhereToPause={true}
                //disableFullscreen={false}
                //disableVolume={true}
                //isFullscreen={false}
                // ref={(ref) => {
                //     this.player = ref
                // }}
                style={{
                    backgroundColor: 'white',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0
                }}
                // rate={1} 
                // volume={3}
                // muted={false}
                // resizeMode={'cover'}
                onBuffer={this.onBuffer}                // Callback when remote video is buffering
                bufferConfig={{
                    minBufferMs: 10000,
                    maxBufferMs: 15000,
                    bufferForPlaybackMs: 2500,
                    bufferForPlaybackAfterRebufferMs: 5000
                }}
                // disableFocus={false}
                // pictureInPicture={true}
                // onError={this.videoError}
                // onError={e => console.log(e)}
                //onLoad={load => console.log(load)}
                repeat={false}
                

            // filterEnabled={true}
            //filter={'CIColorMonochrome'}  // pekçok filter var. ileride filtre özellikleri de ekleyeceğiz.
            />





        </View >

    }


    render() {
        allImages = [];
        selectedImageIndex = 0;
        //debugger
        var imageList = this.props.allPhotos;

        let i = 0;
        for (let index = 0; index < imageList.length; index++) {

            if (this.props.from == "ShoppingMallPhotos") {
                if (imageList[index].ImageName == this.props.photo) {
                    selectedImageIndex = index;
                }
                allImages.push({ url: GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.SHOPPING_MALL_PHOTO + '/' + imageList[index].ImageName });
            } else {

                if ((imageList[index]).Type) {
                    if (((imageList[index]).Type).includes('video') == false) {
                        if (imageList[index] == this.props.photo) {

                            selectedImageIndex = i;
                        }

                        allImages.push({ url: GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.POST_PHOTOS + '/' + this.props.userID + '/' + imageList[index].Name });

                        i++;
                    }
                }
                else {
                    if (imageList[index] == this.props.photo) {

                        selectedImageIndex = i;
                    }

                    allImages.push({ url: GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.POST_PHOTOS + '/' + this.props.userID + '/' + imageList[index] });

                    i++;
                }

            }
        }

        //console.log(allImages);
        
        if (this.props.photo) {
            //debugger;

            var thisVideo = false;

            if (this.props.photo.Type) {
                if ((this.props.photo.Type).includes('video')) {
                    thisVideo = true;
                }
            }

            return (
                <View style={{ }}>
                    {
                        (thisVideo) ?
                            this.renderVideo(GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.POST_PHOTOS + '/' + this.props.userID + '/' + this.props.photo.Name, this.props.photo.Type)
                            :
                            <TouchableNativeFeedback
                                onPress={() => {
                                    this.setImageModalVisible(
                                        true,
                                        (this.props.from == "ShoppingMallPhotos") ?
                                            GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.SHOPPING_MALL_PHOTO + '/' + this.props.photo
                                            :
                                            GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.POST_PHOTOS + '/' + this.props.userID + '/' + (this.props.photo.Name ? this.props.photo.Name : this.props.photo)
                                    );
                                }}>
                                {
                                    <Image 
                                    resizeMode="cover"
                                    style={[imageStyle.post.free, { width: this.state.imageWidth}]}
                                        source={{
                                            uri:
                                                (this.props.from == "ShoppingMallPhotos") ?
                                                    GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.SHOPPING_MALL_PHOTO + '/' + this.props.photo
                                                    :
                                                    GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.POST_PHOTOS + '/' + this.props.userID + '/' + (this.props.photo.Name ? this.props.photo.Name : this.props.photo)
                                        }}
                                    />
                                }
                            </TouchableNativeFeedback>
                    }
                              

                    {/* Modal */}
                    <Modal animationType="slide" transparent={true} visible={this.state.imageModalVisible}>
                        <ImageViewer
                            useNativeDriver={true}
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
        return <Spinner size="large" />;
    }
}

export default ListItemPhoto;
import React from 'react';
import { Text, View, Image } from 'react-native';

const GLOBAL = require('../common/Globals');

const LetterCircle = (props) => {
    //debugger;
    const photo = props.photo;
    const uri = props.uri;
    const str = props.data;
    const circleSize = props.circleSize;
    var letter = '';

    var bgColor = '#ff585c';
    var textColor = '#ffffff';

    if (props.contrast) {
        bgColor = '#ffffff';
        textColor = '#ff585c';
    }

    if (str) {
        const arrLetter = str.split(' ');
        arrLetter.forEach(word => {
            letter += word.charAt(0)
        });
    }

    return (
        <View>
            {(photo != null || uri != null) ?
                <View style={{backgroundColor:'#ff585c', height: circleSize+6, aspectRatio: 1, borderRadius: (circleSize+6) / 2, alignSelf: 'center', alignContent:'center', alignItems:'center', justifyContent:'center' }}>
                    <Image style={{ height: circleSize, aspectRatio: 1, borderRadius: circleSize / 2, alignSelf: 'center', resizeMode: 'cover', }}
                        source={{
                            uri: (uri != null) ? uri : GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.USER_PHOTO + '/' + photo
                        }}
                    />
                </View>
                :
                <View style={{ width: circleSize, height: circleSize, borderRadius: circleSize / 2, backgroundColor: bgColor, alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ fontWeight: 'bold', fontSize: circleSize * 2 / 5, color: textColor }}>
                        {letter}
                    </Text>
                </View>
            }
        </View>
    );
};

export { LetterCircle };

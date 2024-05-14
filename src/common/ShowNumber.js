import React from 'react';
import { Text, View } from 'react-native';
import { Localizations } from '../../locales/i18n';

const ShowNumber = (props) => {
    var text = "";
    if (props.type == "review")
    {
        if (props.number > 1)
        {
            text = Localizations("NewPost.ReviewsCount");
        }
        else
        {
            text = Localizations("NewPost.ReviewsCount");
        }
    } else if (props.type == "like")
    {
        if (props.number > 1)
        {
            text = Localizations("NewPost.LikesCount");
        }
        else
        {
            text = Localizations("NewPost.LikesCount");
        }
    }


    var str = "";
    if (props.number >= 1000000000) {
        str = Math.floor(props.number / 1000000000);
        if (str < 100) {
            str += " "
        }
        str += "M" // "ingilizce için "b"
    }
    else if (props.number >= 1000000) {
        str = Math.floor(props.number / 1000000)
        if (str < 100) {
            str += " "
        }
        str += " m" // ingilizce için "m"
    }
    else if (props.number >= 1000) {
        // str = Math.floor(props.number / 1000);
        str = (props.number / 1000);
        str = str.toFixed(1);
        // console.log(str.length)
        if (str < 100) {
            str += " "
        }
        str += "b" // ingilizce için "k"
    }
    else {
        str = props.number;
    }

str = str + ( (text != "") ? ( " " + text) : ""); 

    switch (props.numberStyle) {
        case "1":
            var fontSize = 12;
            var fontColor = 'white';
            var lineColor = '#ff585c';
            // console.log(props)

            return (
                <View style={{
                    padding: 3,
                    marginHorizontal: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: lineColor,
                    borderRadius: 8
                }}>
                    <Text style={{
                        // fontWeight: 'bold',
                        fontSize: fontSize,
                        color: fontColor,
                        textAlign: 'center'
                    }}>{str}</Text>
                </View>
            );

            break;
        case "2":
            var circleSize = 0;
            circleSize = props.circleSize
            // console.log(props)

            return (
                <View style={{
                    width: circleSize,
                    height: circleSize,
                    borderRadius: circleSize / 2,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: '#ff585c',
                    borderWidth: 1
                }}>
                    <Text style={{
                        // fontWeight: 'bold',
                        fontSize: circleSize * 2 / 4,
                        color: '#ff585c'
                    }}>{str}</Text>
                </View>
            );

            break;

    }


};

export { ShowNumber };

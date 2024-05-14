import React from 'react';
import { View, Image, Text, FlatList } from 'react-native';
var sortJsonArray = require('sort-json-array');


const StarArray = () => {
    return (
        <View style={{}}>
            <Image style={{ width: 53, height: 53, tintColor: '#8e8e93' }} source={require('../images/icons/starArray_640.png')} />
        </View>
    )
};

const Chart = (data) => {
    //  console.log(data);

    var sum = 0;
    if (data) {
        
        sortedData = sortJsonArray(data.filter(x => x.Point >= 0), 'Point', 'des');

        sortedData.forEach(item => { sum += item.Count });
        // data.reverse();
    }

    return (
        <View style={{  }}>
            <FlatList
                data={sortedData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={info => (
                    <View style={{ flex: 1, height: 5, width: 162, margin: 3, backgroundColor: '#e5e5ea', }}>
                        <View style={{
                            height: 5, width: (100 * info.item.Count / sum) + '%',
                            backgroundColor: '#ff9500',
                        }} />
                    </View>
                )
                }
            />
        </View >
    )
}

const Scoring = (props) => {
    // console.log(data);
    return (
        <View style={{ flexDirection: 'row', alignContent:'flex-end', alignItems:'flex-end' }}>
            <View style={{alignContent:'flex-start', alignSelf:'flex-start', alignSelf:'flex-start'}}>{StarArray()}</View>
            <View style={{alignContent:'flex-start', alignSelf:'flex-start', alignSelf:'flex-start'}}>{Chart(props.data)}</View>
        </View>
    )
}

export { Scoring };

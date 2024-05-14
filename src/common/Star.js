import React from 'react';
import { View, Image } from 'react-native';

const Star = ({ score, size, average }) => {
    var payments = [];

    var halfCount = parseInt(2 * score);
    var fillStar = parseInt(halfCount / 2);
    var halfStar = halfCount - 2 * fillStar;
    var starStyle = (size == 'lg' ? styles.lg : (size == 'sm' ? styles.sm : (size == 'xs' ? styles.xs : styles.md)))

    for (var i = 0; i < 5; i++) {
        if (i < fillStar) {
            payments.push(<Image style={starStyle} key={i} source={require('../images/icons/fillStar.png')} />)
        }
        else if (i < (fillStar + halfStar)) {
            payments.push(<Image style={starStyle} key={i} source={require('../images/icons/halfStar.png')} />)
        }
        else if (i < 5) {
            payments.push(<Image style={[starStyle, { tintColor: '#cccccc' }]} key={i} source={require('../images/icons/fillStar.png')} />)
        }
    }

    return <View style={[{ flexDirection: 'row' }]}>{payments}</View>;
};

export { Star };

const styles = {
    lg: { width: 25, height: 25, marginHorizontal: 1, marginVertical: 5, tintColor: '#ffb702' },
    md: { width: 20, height: 20, marginHorizontal: 1, marginVertical: 5, tintColor: '#ffb702' },
    sm: { width: 15, height: 15, marginHorizontal: 1, marginVertical: 5, tintColor: '#ffb702' },
    xs: { width: 12, height: 15, marginHorizontal: 1, marginVertical: 5, tintColor: '#ffb702' },
};

import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { SetAccessTypeID } from '../actions';
import { Actions } from 'react-native-router-flux';

class RadioButtonScreen extends Component {
	state = {
		value: null,
	};

	UNSAFE_componentWillMount() {
//		debugger
		if (this.props.accessTypeID != undefined) {
			this.setState({
				value: this.props.accessTypeID
			})
		}
	}

	_clickRadioButton = (value) => {
		this.setState({
			value: value
		})
//debugger
		this.props.SetAccessTypeID({ AccessTypeID: value, userToken: this.props.SwoqyUserToken });

		if (value == "3") {
			Actions.postPrivacySpecificFriendsScreen();
		} else {
			Actions.pop();
		}
	}



	render() {
		// console.log(this.props);
		const { options } = this.props;
		const { value } = this.state;
// debugger
		return (
			<View >
				{options.map(item => {
					return (
						<TouchableOpacity key={item.key} style={styles.buttonContainer} onPress={() => this._clickRadioButton(item.key)}>
							<View style={styles.circle}>
								{value === item.key && <View style={styles.checkedCircle} />}
							</View>
							<Text style={{ fontSize: 16, color: '#1f1f1f', margin: 10, }}>{item.text}</Text>
						</TouchableOpacity>
					);
				})}
			</View>
		);
	}
}

const mapStateToProps = ({ postResponse, startScreenResponse }) => {
	const { accessTypeID, connectionError } = postResponse;
	const { SwoqyUserToken } = startScreenResponse;
	return {
		accessTypeID, connectionError, SwoqyUserToken
	};
}

export default connect(mapStateToProps, { SetAccessTypeID })(RadioButtonScreen);


const styles = StyleSheet.create({
	buttonContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 10,
	},

	circle: {
		height: 14,
		width: 14,
		borderRadius: 7,
		borderWidth: 1,
		borderColor: '#ACACAC',
		alignItems: 'center',
		justifyContent: 'center',
	},

	checkedCircle: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: '#ff585c',
	},
});

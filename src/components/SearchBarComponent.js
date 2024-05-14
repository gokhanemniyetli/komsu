import React from 'react';
import { Text, View, Button, TextInput, StyleSheet, Image } from 'react-native';

import { Localizations, FormatDate } from '../../locales/i18n';

var styles = require('../styles/SearchBarStyles');

export default class SearchBarComponent extends React.Component {
    state = {
        strSearchText: "",
    };

    Search() {
        return "";
    }

    render() {
        const placeHolder = "123"
        const { navigation } = this.props;
        navigator=this.props.navigation;

        return (
            <View style={styles.searchBarContainer}>
                <View  style={styles.backButton}>
                    <Button
                        title={this.props.returnScreenTitle}
                        onPress={() => this.props.navigator.navigate(this.props.returnScreen)}
                    />
                </View>

              



                <View  style={styles.searchText}>
                    <TextInput
                        style={styles.inputText}
                        placeholder={this.props.placeHolder}
                        value={this.state.strSearchText}
                        onChangeText={(value) => this.setState({ strSearchText: value })}
                        keyboardType='email-address'
                        autoCapitalize='none'
                    />
                </View>

                




                <View  style={styles.searchButton}>
                    <Button
                        title="ARA"
                        onPress={() => this.props.navigation.Search()}
                    />
                </View>
            </View>
        );
    }
}


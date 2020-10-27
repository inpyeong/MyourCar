/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    Alert,
    StyleSheet,
    Linking,
} from 'react-native';
import DeepLinking from 'react-native-deep-linking';
import AsyncStorage from '@react-native-community/async-storage';

class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Main Page Screen</Text>
                <Button
                    title='Clear AsyncStorage'
                    onPress={() => AsyncStorage.clear()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MainScreen;

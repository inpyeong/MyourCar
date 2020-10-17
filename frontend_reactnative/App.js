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
    StyleSheet,
    View,
    Button,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/home';
import WebViewUI from './src/webViewUI';

const Stack = createStackNavigator();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
        }
    }

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen
                        name="WebViewUI"
                        component={WebViewUI}
                        options={{
                            headerTintColor: "green",
                            title: "WebViewUI",
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

const styles = StyleSheet.create({});

export default App;

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
    ActivityIndicator,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Screen from './src/component/screen';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            currentUser: null,
            loading: true,
        }
    }

    componentDidMount = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                setTimeout(() => {
                    this.setState({
                        authenticated: true,
                        loading: false,
                    });
                }, 2000);
            } else {
                setTimeout(() => {
                    this.setState({
                        loading: false,
                    });
                }, 2000);
            }
        } catch (e) {
            console.log('error from AsyncStorage', e);
        }
    }

    isAuthenticated = () => {
        this.setState({
            authenticated: true,
        })
    }

    render() {
        const LoginScreenOptions = { headerShown: false };
        const SignUpScreenOptions = {
            headerTitle: "휴대폰 본인인증",
            headerBackTitleVisible: false,
        };
        const Oauth2ScreenOptions = {
            headerTitle: "소셜 로그인",
            headerBackTitleVisible: false,
        }
        const MainScreenOptions = {
            headerShown: false,
        }

        const authScreens = {
            Login: {
                screen: Screen.LoginScreen,
                options: LoginScreenOptions,
            },
            SignUpStepOne: {
                screen: Screen.StepOneScreen,
                options: SignUpScreenOptions,
            },
            SignUpStepTwo: {
                screen: Screen.StepTwoScreen,
                options: SignUpScreenOptions,
            },
            Oauth2: {
                screen: Screen.Oauth2Screen,
                options: Oauth2ScreenOptions,
                initialParams: { isAuthenticated: this.isAuthenticated },
            },
        };
        const userScreens = {
            Main: {
                screen: Screen.MainScreen,
                options: MainScreenOptions,
            }
        }
        if(this.state.loading) {
            return (
                <ActivityIndicator
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}
                    size='large'
                    color='black'
                    animating={true}
                />
            );
        }
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    {Object.entries({
                        ...(this.state.authenticated ? userScreens : authScreens),
                    }).map(([name, props]) => (
                        <Stack.Screen
                            name={name}
                            component={props.screen}
                            options={props.options}
                            initialParams={props.initialParams}
                        />
                    ))}
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

const styles = StyleSheet.create({});

export default App;

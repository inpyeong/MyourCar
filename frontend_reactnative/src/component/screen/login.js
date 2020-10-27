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
    TouchableOpacity,
    TextInput,
    Alert,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    Button,
} from 'react-native';
import googleLogo from '../../assets/pics/googleLogo.png';
import { loginStyles } from '../style/loginStyles';
import AsyncStorage from '@react-native-community/async-storage';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    // go = () => {
    //     const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //     if (reg.test(this.state.email) === true){
    //         alert('valid');
    //     }
    //     else{
    //         alert();
    //     }

    // }

    onLogin = () => {
    }

    onSignUp = () => {
        this.props.navigation.navigate('SignUpStepOne');
    }

    onOAuth2 = () => {
        this.props.navigation.navigate('Oauth2');
    }

    render() {
        return (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={loginStyles.flexContainer}>
                        <View style={loginStyles.logoTextContainer}>
                            <Text style={loginStyles.logoText}>MYOURCAR</Text>
                        </View>
                        <View style={loginStyles.inputTextContainer}>
                            <TextInput
                                value={this.state.username}
                                style={loginStyles.inputText}
                                onChangeText={email => this.setState({ email })}
                                autoCapitalize='none'
                                placeholder="가입한 이메일 주소 입력"
                            />
                            <TextInput
                                value={this.state.password}
                                onChangeText={password => this.setState({ password })}
                                secureTextEntry={true}
                                style={loginStyles.inputText}
                                placeholder="비밀번호 입력"
                            />
                        </View>
                        <View style={loginStyles.loginButtonContainer}>
                            <TouchableOpacity
                                style={loginStyles.loginButton}
                            >
                                <View style={loginStyles.loginButtonTextContainer}>
                                    <Text style={loginStyles.loginButtonText}>로그인하기</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={loginStyles.userTextContainer}>
                            <Text
                                style={loginStyles.userText}
                                onPress={this.onSignUp}
                            >
                                회원가입
                            </Text>
                            <Text style={loginStyles.userText}>가입정보 찾기</Text>
                        </View>
                        <View style={loginStyles.oauth2ImageContainer}>
                            <TouchableOpacity
                                onPress={this.onOAuth2}
                                style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}
                            >
                                <Image
                                    style={loginStyles.oauth2Image}
                                    source={googleLogo}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>
                        <Button 
                            title='Clear AsyncStorage'
                            onPress={() => AsyncStorage.clear()}
                        />
                    </View>
                </TouchableWithoutFeedback>
        );
    }
}

export default LoginScreen;

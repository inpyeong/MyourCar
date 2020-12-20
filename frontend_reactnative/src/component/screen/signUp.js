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
} from 'react-native';
import Modal from 'react-native-modal';
import {
    stepOneStyles,
    stepTwoStyles
} from '../style/signUpStyles';

export class StepOneScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            serialNumber: '',
            phoneNumber: '',
            nativeInfo: '',
            nativeModal: false,
            carrierInfo: '',
            carrierModal: false,
        };
    }

    setNativeInfo = (nativeInfo) => {
        this.setState({
            nativeInfo: this.state.nativeInfo ? false : true
        })
    }

    setNativeInfo = (nativeInfo) => {
        this.setState({
            nativeInfo: this.state.nativeInfo ? false : true
        })
    }

    handleNativeModal = () => {
        this.setState({
            nativeModal: this.state.nativeModal ? false : true
        })
    }

    handleCarrierModal = () => {
        this.setState({
            carrierModal: this.state.carrierModal ? false : true
        })
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={stepOneStyles.flexContainer}>
                    <View style={stepOneStyles.userNameContainer}>
                        <Text style={stepOneStyles.label}>이름</Text>
                        <View style={stepOneStyles.content}>
                            <TouchableOpacity
                                style={stepOneStyles.selectNativeInfo}
                                onPress={this.handleNativeModal}
                            >
                                <Text>내국인</Text>
                            </TouchableOpacity>
                            <TextInput
                                value={this.state.userName}
                                onChangeText={userName => this.setState({ userName })}
                                autoCapitalize='none'
                                style={stepOneStyles.nameTextInput}
                                placeholder="본인 실명"
                            />
                        </View>
                        <Modal
                            isVisible={this.state.nativeModal}
                            onBackdropPress={() => this.handleNativeModal()}
                            style={{ justifyContent: 'flex-end', margin: 0}}
                        >
                            <View style={{
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                                borderRadius: 4,
                                borderColor: 'rgba(0, 0, 0, 0.1)',
                            }}>
                                <View style={{ width: '100%', height: 60, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#CACACA' }}>
                                    <Text style={{ paddingLeft: 20, fontWeight: 'bold', }}>국적 선택</Text>
                                </View>
                                <TouchableOpacity
                                    style={{ height: 60, justifyContent: 'center', paddingLeft: 20, }}
                                    onPress={() => this.setNativeInfo('내국인')}
                                >
                                    <Text>내국인</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ height: 60, justifyContent: 'center', marginBottom: 50, paddingLeft: 20, }}

                                >
                                    <Text>외국인</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </View>
                    <View style={stepOneStyles.serialNumberContainer}>
                        <Text style={stepOneStyles.label}>주민등록번호 앞 7자리</Text>
                        <View>
                            <TextInput
                                value={this.state.serialNumber}
                                onChangeText={serialNumber => this.setState({ serialNumber })}
                                autoCapitalize='none'
                                style={stepOneStyles.serialNumberTextInput}
                                secureTextEntry={true}
                            />
                            <Text 
                                style={{ position: 'absolute', textAlignVertical: 'center', top: '35%', left: '3%', fontSize: 13, opacity: 0.1, fontWeight: 'bold', }}
                            >
                                {'\u25cf'}{'\u2003'}{'\u25cf'}{'\u2003'}{'\u25cf'}{'\u2003'}{'\u25cf'}{'\u2003'}{'\u25cf'}{'\u2003'}{'\u25cf'}{'\u2003'}
                            </Text>
                            <Text 
                                style={{ position: 'absolute', textAlignVertical: 'center', top: '35%', left: '40%', fontSize: 13, opacity: 0.1, fontWeight: 'bold', }}
                            >
                                {'\u2015'}
                            </Text>
                            <Text 
                                style={{ position: 'absolute', textAlignVertical: 'center', top: '35%', left: '43%', fontSize: 13, opacity: 0.1, fontWeight: 'bold', }}
                            >
                                {'\u2003'}{'\u25cf'}
                            </Text>
                            <Text 
                                style={{ position: 'absolute', textAlignVertical: 'center', top: '34%', left: '50%', fontSize: 15, opacity: 0.1, fontWeight: 'bold', }}
                            >
                                {'\u2003'}{'\u22C7'}{'\u2003'}{'\u22C7'}{'\u2003'}{'\u22C7'}{'\u2003'}{'\u22C7'}{'\u2003'}{'\u22C7'}{'\u2003'}{'\u22C7'}
                            </Text>
                        </View>
                    </View>
                    <View style={stepOneStyles.phoneNumberContainer}>
                        <Text style={stepOneStyles.label}>휴대폰 정보</Text>
                        <View style={{ flexDirection: 'column',}}>
                            <View style={stepOneStyles.content}>
                                <TouchableOpacity
                                    style={stepOneStyles.selectCarrierInfo}
                                    onPress={this.handleCarrierModal}
                                >
                                    <Text>선택</Text>
                                </TouchableOpacity>
                                <TextInput
                                    value={this.state.phoneNumber}
                                    onChangeText={phoneNumber => this.setState({ phoneNumber })}
                                    autoCapitalize='none'
                                    style={stepOneStyles.phoneNumberTextInput}
                                    placeholder="'-' 제외하고 입력"
                                />
                            </View>
                            <TouchableOpacity
                                style={stepOneStyles.phoneNumberAuthBtn}
                            >
                                <View style={stepOneStyles.phoneNumberAuthBtnTextContainer}>
                                    <Text style={stepOneStyles.phoneNumberAuthBtnText}>인증번호 발송</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Modal
                            isVisible={this.state.carrierModal}
                            onBackdropPress={() => this.handleCarrierModal()}
                            style={{ justifyContent: 'flex-end', margin: 0}}
                        >
                            <View style={{
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                                borderRadius: 4,
                                borderColor: 'rgba(0, 0, 0, 0.1)',
                            }}>
                                <View style={{ width: '100%', height: 60, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#CACACA' }}>
                                    <Text style={{ paddingLeft: 20, fontWeight: 'bold', }}>통신사 선택</Text>
                                </View>
                                <TouchableOpacity
                                    style={{ height: 60, justifyContent: 'center', paddingLeft: 20, }}
                                    onPress={() => this.setNativeInfo('내국인')}
                                >
                                    <Text>SKT</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ height: 60, justifyContent: 'center', marginBottom: 50, paddingLeft: 20, }}

                                >
                                    <Text>KT</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </View>
                    <TouchableOpacity
                        style={stepOneStyles.loginButton}
                        onPress={() => this.props.navigation.navigate('SignUpStepTwo', {
                            userName: this.state.userName,
                        })}
                    >
                        <View style={stepOneStyles.loginButtonTextContainer}>
                            <Text style={stepOneStyles.loginButtonText}>다음 단계</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export class StepTwoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
        };
    }

    setNativeInfo = (nativeInfo) => {
        this.setState({
            nativeInfo: this.state.nativeInfo ? false : true
        })
    }

    setNativeInfo = (nativeInfo) => {
        this.setState({
            nativeInfo: this.state.nativeInfo ? false : true
        })
    }

    handleNativeModal = () => {
        this.setState({
            nativeModal: this.state.nativeModal ? false : true
        })
    }

    handleCarrierModal = () => {
        this.setState({
            carrierModal: this.state.carrierModal ? false : true
        })
    }

    render() {
        const { params } = this.props.route;
        const userName = params ? params.userName : null;

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={stepOneStyles.flexContainer}>
                    <View style={stepTwoStyles.guideTextContainer}>
                        <View style={stepTwoStyles.firstGuideText}>
                            <Text style={{ color: '#3897f1', fontSize: 17, }}>{userName}</Text><Text>{'\u2003'}님,</Text>
                        </View>
                        <View style={stepTwoStyles.secondGuideText}>
                            <Text>MyourCar 이용을 위한 기본 정보를 입력해주세요.</Text>
                        </View>
                    </View>
                    <View style={stepTwoStyles.emailContainer}>
                        <Text style={stepTwoStyles.label}>아이디</Text>
                        <View style={stepTwoStyles.content}>
                            <TextInput 
                                value={this.state.email}
                                onChangeText={email => this.setState({ email })}
                                autoCapitalize='none'
                                placeholder='이메일 주소 입력'
                                style={stepTwoStyles.textInput}
                            />
                        </View>
                    </View>
                    <View style={stepTwoStyles.passwordContainer}>
                        <Text style={stepTwoStyles.label}>비밀번호</Text>
                        <View style={stepTwoStyles.content}>
                            <TextInput 
                                value={this.state.password}
                                onChangeText={password => this.setState({ password })}
                                autoCapitalize='none'
                                placeholder='비밀번호 입력'
                                secureTextEntry={true}
                                style={stepTwoStyles.textInput}
                            />
                        </View>
                    </View>
                    <View style={stepTwoStyles.confirmPasswordContainer}>
                        <Text style={stepTwoStyles.label}>비밀번호 확인</Text>
                        <View style={stepTwoStyles.content}>
                            <TextInput 
                                value={this.state.confirmPassword}
                                onChangeText={confirmPassword => this.setState({ confirmPassword })}
                                autoCapitalize='none'
                                placeholder='비밀번호 재입력'
                                secureTextEntry={true}
                                style={stepTwoStyles.textInput}
                            />
                        </View>
                    </View>
                    <TouchableOpacity
                        style={stepTwoStyles.submitButton}
                        onPress={() => this.props.navigation.navigate('SignUpStepTwo')}
                    >
                        <View style={stepTwoStyles.submitButtonTextContainer}>
                            <Text style={stepTwoStyles.submitButtonText}>입력 완료</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

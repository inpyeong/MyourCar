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
    Image,
    Button,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import {
    createDrawerNavigator,
} from '@react-navigation/drawer';
import {
    useNavigation,
    DrawerActions,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { mainStyles } from '../style/mainStyles';
import { getCurrentUser } from '../../util/APIUtils';
import Menu from '../../assets/pics/menu2.png';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../assets/pics/Logo.png';
import messaging from '@react-native-firebase/messaging';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {},
        };
    }

    requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    }

    loadCurrentlyLoggedInUser = async () => {
        try {
            let currentUser = await AsyncStorage.getItem('user');
            currentUser = JSON.parse(currentUser);
            if(currentUser === null) {
                console.log("There's no user value in AsyncStotrage, so call API to get user value.")
                currentUser = await getCurrentUser();
                await AsyncStorage.setItem('user', JSON.stringify(currentUser));
            }
            // console.log(currentUser);
            this.setState({ currentUser }, () => console.log(currentUser));
        } catch(err) {
            console.error(err);
        }
    }


    componentDidMount = () =>{
        // AsyncStorage.clear()
        //     .then(res => {
        //         console.log(res);
        //     })
        this.loadCurrentlyLoggedInUser();
        // this.requestUserPermission();
    }

    render() {
        const { currentUser } = this.state;
        return (
            <View style={mainStyles.flexContainer}>
                <View style={mainStyles.userContainer}>
                    <View style={mainStyles.userImageWrapper}>
                        {currentUser.imageUrl ? (
                            <Image
                                source={{uri: currentUser.imageUrl}}
                                style={{ width: 70, height: 70, borderRadius: 50, }}
                                resizeMode='contain'
                            />
                        ) : (
                            <Ionicons
                                name={"car-sport-outline"}
                                style={{ borderRadius: 50, marginBottom: 10, }}
                                size={70}
                            />
                        )}
                    </View>
                    <View style={mainStyles.userInfoWrapper}>
                        <Text style={mainStyles.userName}>{currentUser.name}</Text>
                        <Text style={mainStyles.userEmail}>{currentUser.email}</Text>
                    </View>
                    <View style={mainStyles.userIconWrapper}>
                        <Ionicons
                            name='mail-outline'
                            size={35}
                            style={{ marginRight: 10, marginLeft: 20,}}
                        />
                        <Ionicons
                            name='cog-outline'
                            size={35}
                            onPress={() => this.props.navigation.navigate('Setting', {
                                currentUser: this.state.currentUser,
                            })}
                        />
                    </View>
                </View>
                <View style={mainStyles.emptyView} />
                <View style={mainStyles.optionContainer}>
                    <View style={mainStyles.questionWrapper}>
                        <Text style={mainStyles.question}>차를 빌려줄래요</Text>
                    </View>
                    <TouchableOpacity
                        style={mainStyles.requestWrapper}
                        onPress={() => this.props.navigation.navigate('RegisterCarStepOne', {
                            userId: currentUser.id,
                        })}
                    >
                        <Text style={mainStyles.request}>차량 등록하기</Text>
                        <Ionicons
                            name='chevron-forward-outline'
                            size={20}
                            color='rgb(167, 169, 177)'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={mainStyles.requestWrapper}
                        onPress={() => this.props.navigation.navigate('CheckRegisteredCarStepOne', {
                            currentUser: this.state.currentUser,
                        })}
                    >
                        <Text style={mainStyles.request}>등록한 차량 확인하기</Text>
                        <Ionicons
                            name='chevron-forward-outline'
                            size={20}
                            color='rgb(167, 169, 177)'
                        />
                    </TouchableOpacity>
                </View>
                <View style={mainStyles.emptyView} />
                <View style={mainStyles.optionContainer}>
                    <View style={mainStyles.questionWrapper}>
                        <Text style={mainStyles.question}>차를 이용할래요</Text>
                    </View>
                    <TouchableOpacity
                        style={mainStyles.requestWrapper}
                        onPress={() => this.props.navigation.navigate('CallCarStepOneMap', {
                            currentUser: this.state.currentUser,
                        })}
                    >
                        <Text style={mainStyles.request}>부름 신청하기</Text>
                        <Ionicons
                            name='chevron-forward-outline'
                            size={20}
                            color='rgb(167, 169, 177)'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={mainStyles.requestWrapper}
                        onPress={() => {
                            this.props.navigation.navigate('CheckReservedCarStepOne', {
                                currentUser,
                            });
                        }}
                    >
                        <Text style={mainStyles.request}>신청 차량 확인하기</Text>
                        <Ionicons
                            name='chevron-forward-outline'
                            size={20}
                            color='rgb(167, 169, 177)'
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.7, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: 'rgb(230, 230, 230)'}}>
                    {/*<Image*/}
                    {/*    source={Logo}*/}
                    {/*    resizeMode='contain'*/}
                    {/*    style={mainStyles.logo}*/}
                    {/*/>*/}
                    <Ionicons
                        name={"car-sport-outline"}
                        size={200}
                        style={{ color: 'skyblue', position: 'absolute', bottom: 3, opacity: 0.8, }}
                    />
                </View>
            </View>
        );
    }
}

export default MainScreen;



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
    TouchableOpacity,
} from 'react-native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import {
    useNavigation,
    DrawerActions,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import myourCarLogo from '../../assets/pics/logo.png';
import menu from '../../assets/pics/menu.png';
import SideDrawerScreen from './sideDrawer';
import { mainStyles} from '../style/mainStyles';

const Drawer = createDrawerNavigator();

class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    clearAsyncStorage = async () => {
        try {
            await AsyncStorage.clear();
        } catch(err) {
            console.error(err);
        }
    }


    stackMainScreen = () => {
        const navigation = useNavigation();
        return (
            <View style={mainStyles.flexContainer}>
                <View
                    style={{
                        flex: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                        <TouchableOpacity
                            style={{ marginTop: 55, marginRight: 310, alignItems: 'flex-start', justifyContent: 'flex-start', }}
                            onPress={() => {
                                navigation.dispatch(DrawerActions.openDrawer());
                            }}
                        >
                            <Image
                                style={{ width: 50, height: 50,}}
                                source={menu}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    <View
                        style={{
                            flex: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >
                        <Image
                            style={mainStyles.mainLogo}
                            source={myourCarLogo}
                            resizeMode="contain"
                        />
                    </View>
                </View>
                <View
                    style={{ flex: 0.7, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}
                >
                    <TouchableOpacity
                        style={{backgroundColor: 'rgb(167, 169, 177)',  width: '50%', height: '100%', justifyContent: 'center', }}
                    >
                        <Text
                            style={{ textAlign: 'center', fontSize: 17, color: '#FFFFFF', marginBottom: 30, }}
                        >
                            등록한 차량보기
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{backgroundColor: 'rgb(64, 102, 169)', width: '50%', height: '100%', justifyContent: 'center', }}
                    >
                        <Text
                            style={{ textAlign: 'center', color: '#FFFFFF', fontSize: 17, marginBottom: 30, }}
                        >
                            부름 예약하기
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    render() {
        return (
            <Drawer.Navigator
                initialRouteName="Home"
                drawerType="front"
                drawerPosition="left"
                drawerStyle={{
                    width: 320,
                }}
                drawerContentOptions={{
                    activeTintColor: 'red',
                    activeBackgroundColor: 'skyblue',
                }}
                drawerContent={props => <SideDrawerScreen {...props} />}
            >
                <Drawer.Screen
                    name="Route"
                    component={this.stackMainScreen}
                />
            </Drawer.Navigator>
        );
    }
}

export default MainScreen;

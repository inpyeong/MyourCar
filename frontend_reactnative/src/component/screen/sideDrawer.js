/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView, TouchableOpacity, Image,
} from 'react-native';
import {CommonActions, DrawerActions, useNavigation} from '@react-navigation/native';
import Menu from '../../assets/pics/menu2.png';

export class SideDrawerScreen extends Component {

    navigateToScreen = (route) => () => {
        this.props.navigation.dispatch(
            CommonActions.navigate({
                name: route,
                params: {},
            })
        )
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center', }}>
                <View style={{ flex: 1, width: '100%', backgroundColor: 'rgb(224, 224, 224)' }}>
                    <View style={{ flex: 2, justifyContent: 'center', marginLeft: 20, }}>
                        <View style={{ marginTop: 30, }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, }}>홍길동</Text>
                            <Text style={{ marginTop: 20, }}>hong@gmail.com</Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.7, justifyContent: 'center', borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#B4B4B4', }}>
                        <Text style={{ marginLeft: 20, }}>메시지</Text>
                    </View>
                    <View style={{ flex: 0.8, }}>
                        <Text></Text>
                    </View>
                </View>
                <View style={{ flex: 2, width: '100%', }}>
                    <View style={{ flex: 0.8, justifyContent: 'center', }}>
                        <View style={{ flex: 1, justifyContent: 'center', }}>
                            <Text style={{ marginLeft: 20, }}>이용 내역</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', borderBottomWidth: 1, borderColor: '#B4B4B4', }}>
                            <Text style={{ marginLeft: 20, }}>설정</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', }}>
                            <Text style={{ marginLeft: 20, }}>고객센터</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', }}>
                            <Text style={{ marginLeft: 20, }}>공지사항</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>

                    </View>
                </View>
            </View>
        );
    }
}

export const OpenDrawer = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flexDirection: 'row', paddingRight: 15 }}>
            <TouchableOpacity
                onPress={() => {
                    navigation.dispatch(DrawerActions.openDrawer());
                }}
            >
                <Image
                    style={{ width: 25, height: 30, marginLeft: 35, }}
                    source={Menu}
                />
            </TouchableOpacity>
        </View>
    );
}


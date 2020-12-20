import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import { settingStyles } from '../../style/settingStyles';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';

const payContents = [
    "결제 정보 및 설정",
]

const printPhoneNumber = (phoneNumber) => {
    let ret = phoneNumber.substr(0, 3);
    ret += '-';
    ret += phoneNumber.substr(3, 4);
    ret += '-';
    ret += phoneNumber.substr(7);
    return ret;
}

const SettingScreen = (props) => {
    const { params } = props.route;
    const currentUser = params ? params.currentUser : null;

    const accountContents = {
        "비밀번호 재설정": () => props.navigation.navigate("SettingPassword", {
            userEmail: currentUser.email,
        }),
        "휴대폰 번호 재설정": () => props.navigation.navigate("SettingPhoneNumber"),
        "자기소개 재설정": () => props.navigation.navigate("SettingIntroduce"),
    }

    return (
        <View style={settingStyles.flexContainer}>
            <View style={settingStyles.userContainer}>
                <View style={settingStyles.userInfoWrapper}>
                    <Text style={settingStyles.userName}>{currentUser.name}</Text>
                    <Text style={settingStyles.userEmail}>{currentUser.email}</Text>
                    <Text style={settingStyles.userPhoneNumber}>{printPhoneNumber(currentUser.phoneNumber)}</Text>
                </View>
                <View style={settingStyles.userImgWrapper}>
                    <Image
                        source={{uri: currentUser.imageUrl}}
                        style={{ width: 85, height: 85, borderRadius: 50, }}
                        resizeMode='contain'
                    />
                </View>
            </View>
            <View style={settingStyles.settingContainer}>
                <Text style={settingStyles.title}>
                    계정 관리
                </Text>
                {Object.entries({
                    ...accountContents,
                }).map(([name, navigation]) => (
                    <TouchableOpacity
                        style={settingStyles.content}
                        onPress={navigation}
                    >
                        <Text>{name}</Text>
                        <Ionicons
                            name='chevron-forward-outline'
                            size={20}
                            color='rgb(167, 169, 177)'
                        />
                    </TouchableOpacity>
                ))}
            </View>
            <View style={settingStyles.settingContainer}>
                <Text style={settingStyles.title}>
                    결제 및 할인
                </Text>
                {payContents.map((value, index) => {
                    return (
                        <TouchableOpacity style={settingStyles.content}>
                            <Text>{value}</Text>
                            <Ionicons
                                name='chevron-forward-outline'
                                size={20}
                                color='rgb(167, 169, 177)'
                            />
                        </TouchableOpacity>
                    )
                })}
            </View>
            <View style={settingStyles.settingContainer}>
                <Text style={settingStyles.title}>
                    이용 정보
                </Text>
                <TouchableOpacity style={settingStyles.content}>
                    <Text>마이유어카 이용약관</Text>
                    <Ionicons
                        name='chevron-forward-outline'
                        size={20}
                        color='rgb(167, 169, 177)'
                    />
                </TouchableOpacity>
                <TouchableOpacity style={settingStyles.content}>
                    <Text>앱 버전</Text>
                    <Text>1.0.0</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={settingStyles.logOutBtn}
                onPress={() => {
                    AsyncStorage.clear()
                        .then(res => {
                            props.route.params.isUnauthenticated();
                        })
                }}
            >
                <Text>로그아웃</Text>
            </TouchableOpacity>
        </View>
    );
}

export default SettingScreen;


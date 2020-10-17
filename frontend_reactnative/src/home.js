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
} from 'react-native';
import CookieManager from '@react-native-community/cookies';
import axios from 'axios';

const testURL = 'http://localhost:8080/api/user/1';
const _testURL = 'http://localhost:8080/oauth2/authorization/google';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            JSESSIONID: "",
        }
    }

    testFunc = async () => {
        try {
            const cookie = await CookieManager.clearAll(true);
            console.log(cookie);
            this.props.navigation.navigate('WebViewUI');
        } catch(err) {
            console.error(err)
        }
    }

    _testFunc = async (JSESSIONID) => {
        try {
            console.log(JSON.stringify(JSESSIONID));
            console.log(`JSESSIONID=${JSESSIONID}`);
            const setCookie = await CookieManager.set(testURL, {
                name: 'JSESSIONID',
                value: JSON.stringify(JSESSIONID),
                domain: 'localhost',
                path: '/',
                version: '1',
                httpOnly: true,
                secure: false,
            });
            console.log(setCookie);

            const res = await axios.get(testURL, {
                withCredentials: true,
            });
            console.log(res.status);
            console.log(res.headers);
            console.log(res.request.responseURL);
            console.log(res.data);
        } catch(err) {
            console.error(err);
        }
    }

    render() {
        const { params } = this.props.route;
        const JSESSIONID = params ? params.JSESSIONID : null;
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{ marginBottom: 10 }}>Home Screen</Text>
                <Button
                    title="To WebView Screen"
                    onPress={this.testFunc}
                />
                <Button
                    title="Get Request"
                    onPress={() => this._testFunc(JSESSIONID)}
                />
            </View>
        )
    }
}

export default HomeScreen;

import React, { Component } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet, Linking,
} from 'react-native';
import { WebView } from "react-native-webview";
import CookieManager from '@react-native-community/cookies';
import AsyncStorage from '@react-native-community/async-storage';
import DeepLinking from 'react-native-deep-linking';

const testURL = 'http://localhost:8080/api/user';
const _testURL = 'http://localhost:8080/oauth2/authorization/google';
const __testURL = 'http://localhost:8080/oauth2/authorize/google?redirect_uri=myapp://';

class Oauth2Screen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: {},
            token: '',
        };
        this.webviewRef = React.createRef(null);
    }


    webViewGoBack = () => {
        if (this.webviewRef.current) this.webviewRef.current.goBack();
    }

    webViewNext = () => {
        if (this.webviewRef.current) this.webviewRef.current.goForward();
    }

    LoadingIndicatorView = () => {
        return (
            <ActivityIndicator
                color="#009b88"
                size="large"
                style={styles.ActivityIndicatorStyle}
            />
        );
    }

    testFunc = async () => {
        try {
            const cookies = await CookieManager.getAll(true);
            console.log(cookies);

            await AsyncStorage.setItem('JSESSIONID', JSON.stringify(cookies.JSESSIONID.value));

            props.navigation.navigate("Home", {
                JSESSIONID: cookies.JSESSIONID.value,
            });
        } catch(err) {
            console.error(err);
        }
    }

    handleWebViewNavigationStateChange = (newNavState) => {
        const { url } = newNavState;
        if (!url) return;

        console.log(newNavState);
        if(url.includes('?token')) {
            // const cookies = await CookieManager.getAll(true);
            // console.log(cookies);
            // await AsyncStorage.setItem('JSESSIONID', JSON.stringify(cookies.JSESSIONID.value));

            // this.webviewRef.current.stopLoading();
            // this.props.navigation.navigate("Home");

            // const newURL = 'myapp://';
            // const redirectTo = 'window.location = "' + newURL + '"';
            // this.webviewRef.current.injectJavaScript(redirectTo);
        }

        //
        // console.log(newNavState);
        // console.log(url);
        // if(url.includes("=consent#")) {
        //     props.navigation.navigate("Home");
        // }
    }

    componentDidMount = () => {
        DeepLinking.addScheme('myapp://');
        Linking.addEventListener('url', this.handleUrl);

        DeepLinking.addRoute('//:token', (response) => {
            this.setState({ response }, () => console.log(1111));
        });

        Linking.getInitialURL().then((url) => {
            if (url) {
                Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    componentWillUnmount = () => {
        Linking.removeEventListener('url', this.handleUrl);
    }

    handleUrl = ({ url }) => {
        // Linking.canOpenURL(url).then((supported) => {
        //     if (supported) {
        //         DeepLinking.evaluateUrl(url);
        //     }
        // });
        this.webviewRef.current.canOpenURL(url).then((supported) => {
            if (supported) {
                DeepLinking.evaluateUrl(url);
            }
        });
    }

    render() {
        return (
            <>
                <SafeAreaView style={styles.flexContainer}>
                    <WebView
                        source={{ uri: __testURL }}
                        renderLoading={this.LoadingIndicatorView}
                        startInLoadingState={true}
                        ref={this.webviewRef}
                        userAgent='Mozilla/5.0 (Linux; Android 6.0.1; SM-G532G Build/MMB29T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.83 Mobile Safari/537.36'
                        sharedCookiesEnabled={true}
                        // onNavigationStateChange={this.handleWebViewNavigationStateChange}
                        originWhitelist={['http://*', 'https://*', 'myapp://*']}
                        onShouldStartLoadWithRequest={(req) => {
                            if (req.url.includes('?token')) {
                                console.log(req.url);
                                console.log(req.url.split('=')[1].slice(0, -1));
                                const token = req.url.split('=')[1].slice(0, -1);
                                this.setState({ token: token }, () => {
                                    AsyncStorage.setItem('token', token);
                                    // this.props.navigation.navigate("Login");
                                    this.props.route.params.isAuthenticated();
                                })
                                return false;
                            } else return true;
                        }}
                    />
                    <View style={styles.tabBarContainer}>
                        <TouchableOpacity onPress={this.webViewGoBack}>
                            <Text style={{ color: "green" }}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.testFunc}>
                            <Text style={{ color: "green" }}>Exit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.webViewNext}>
                            <Text style={{ color: "green" }}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </>
        );
    }


}

const styles = StyleSheet.create({
    ActivityIndicatorStyle: {
        flex: 1,
        justifyContent: "center",
    },
    flexContainer: {
        flex: 1,
    },
    tabBarContainer: {
        backgroundColor: "#d3d3d3",
        height: 56,
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 16,
        justifyContent: "space-between",
    },
    button: {
        fontSize: 24,
    },
    arrow: {
        color: "#ef4771",
    },
    icon: {
        width: 20,
        height: 20,
    },
});

export default Oauth2Screen;

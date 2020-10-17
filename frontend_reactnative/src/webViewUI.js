import React from "react";
import {
    View,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
} from "react-native";
import { WebView } from "react-native-webview";
import CookieManager from '@react-native-community/cookies';

function WebViewUI(props) {
    const webviewRef = React.useRef(null);
    const testURL = 'http://localhost:8080/api/user/1';
    const _testURL = 'http://localhost:8080/oauth2/authorization/google';

    function webViewGoBack() {
        if (webviewRef.current) webviewRef.current.goBack();
    }

    function webViewNext() {
        if (webviewRef.current) webviewRef.current.goForward();
    }

    function LoadingIndicatorView() {
        return (
            <ActivityIndicator
                color="#009b88"
                size="large"
                style={styles.ActivityIndicatorStyle}
            />
        );
    }

    const testFunc = async () => {
        try {
            const cookies = await CookieManager.getAll(true);
            console.log(cookies);
            props.navigation.navigate("Home", {
                JSESSIONID: cookies.JSESSIONID.value,
            });
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <>
            <SafeAreaView style={styles.flexContainer}>
                <WebView
                    source={{ uri: testURL }}
                    renderLoading={LoadingIndicatorView}
                    startInLoadingState={true}
                    ref={webviewRef}
                    userAgent='Mozilla/5.0 (Linux; Android 6.0.1; SM-G532G Build/MMB29T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.83 Mobile Safari/537.36'
                    sharedCookiesEnabled={true}
                />
                <View style={styles.tabBarContainer}>
                    <TouchableOpacity onPress={webViewGoBack}>
                        <Text style={{ color: "green" }}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={testFunc}>
                        <Text style={{ color: "green" }}>Exit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={webViewNext}>
                        <Text style={{ color: "green" }}>Next</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    );
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

export default WebViewUI;

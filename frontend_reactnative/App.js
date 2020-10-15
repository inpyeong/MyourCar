/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
        }
    }

    _signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.setState({ userInfo, loggedIn: true });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                console.log(1);
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
                console.log(2);
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                console.log(3);
            } else {
                // some other error happened
                console.log(4);
                console.log(error);
            }
        }
    }

    signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.setState({ user: null, loggedIn: false }); // Remember to remove the user from your app's state as well
        } catch (error) {
            console.error(error);
        }
    };

    getCurrentUserInfo = async () => {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            this.setState({ userInfo }, () => {
                console.log(this.state.userInfo);
            });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                // user has not signed in yet
            } else {
                // some other error
            }
        }
    }

    getCurrentUser = async () => {
        const currentUser = await GoogleSignin.getCurrentUser();
        this.setState({ currentUser });
    };

    isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        this.setState({ isLoginScreenPresented: !isSignedIn });
    };

    componentDidMount = () => {
        GoogleSignin.configure({
            // webClientId: '218580306048-ikle5jtm4dpp21dilc9jedgiu7so4qvm.apps.googleusercontent.com',
            // androidClientId: '318580306048-ikle5jtm4dpp21dilc9jedgiu7so4qvm.apps.googleusercontent.com',
            // offlineAccess: true,
        });
    }

    render() {
        return (
            <View>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                    <View style={styles.sectionContainer}>
                        <GoogleSigninButton
                            style={{ width: 192, height: 48 }}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={this._signIn}
                            disabled={this.state.isSigninInProgress} />
                    </View>
                    <View style={styles.buttonContainer}>
                        {!this.state.loggedIn && <Text>You are currently logged out</Text>}
                        {this.state.loggedIn && <Button onPress={this.signOut}
                                                        title="Signout"
                                                        color="#841584">
                        </Button>}
                    </View>
                    {this.state.loggedIn && <View>
                        <View style={styles.listHeader}>
                            <Text>User Info</Text>
                        </View>
                        <View style={styles.dp}>
                            <Image
                                style={{ width: 100, height: 100 }}
                                source={{ uri: this.state.userInfo && this.state.userInfo.user && this.state.userInfo.user.photo }}
                            />
                        </View>
                        <View style={styles.detailContainer}>
                            <Text style={styles.title}>Name</Text>
                            <Text style={styles.message}>{this.state.userInfo && this.state.userInfo.user && this.state.userInfo.user.name}</Text>
                        </View>
                        <View style={styles.detailContainer}>
                            <Text style={styles.title}>Email</Text>
                            <Text style={styles.message}>{this.state.userInfo && this.state.userInfo.user && this.state.userInfo.user.email}</Text>
                        </View>
                        <View style={styles.detailContainer}>
                            <Text style={styles.title}>ID</Text>
                            <Text style={styles.message}>{this.state.userInfo && this.state.userInfo.user && this.state.userInfo.user.id}</Text>
                        </View>
                    </View>}
                </SafeAreaView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    listHeader: {
        backgroundColor: '#eee',
        color: "#222",
        height: 44,
        padding: 12
    },
    detailContainer: {
        paddingHorizontal: 20
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 10
    },
    message: {
        fontSize: 14,
        paddingBottom: 15,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1
    },
    dp:{
        marginTop: 32,
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

export default App;

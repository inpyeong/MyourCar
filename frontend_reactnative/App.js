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
    LogBox,
    StatusBar,
    ActivityIndicator,
} from 'react-native';
import {
    NavigationContainer,
} from '@react-navigation/native';
import {
    createDrawerNavigator,
} from '@react-navigation/drawer';
import StackNavigator from './src/component/screen';
import AsyncStorage from '@react-native-community/async-storage';
import { SideDrawerScreen } from './src/component/screen/sideDrawer';

const Drawer = createDrawerNavigator();
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            currentUser: null,
            loading: true,
        }
    }

    componentDidMount = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                setTimeout(() => {
                    this.setState({
                        authenticated: true,
                        loading: false,
                    });
                }, 2000);
            } else {
                setTimeout(() => {
                    this.setState({
                        loading: false,
                    });
                }, 2000);
            }
        } catch (e) {
            console.log('error from AsyncStorage', e);
        }
    }

    isAuthenticated = () => {
        this.setState({
            authenticated: true,
        })
    }

    isUnauthenticated = () => {
        this.setState({
            authenticated: false,
        })
    }

    render() {

        if(this.state.loading) {
            return (
                <ActivityIndicator
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}
                    size='large'
                    color='black'
                    animating={true}
                />
            );
        }
        return (
            <NavigationContainer>
                <StatusBar barStyle={"dark-content"} />
                <Drawer.Navigator
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
                    edgeWidth={0}
                >
                    <Drawer.Screen
                        name="Route"
                        options={{
                            gestureEnabled: this.state.authenticated ? true : false,
                        }}
                    >
                        {props =>
                            <StackNavigator
                                {...props}
                                authenticated={this.state.authenticated}
                                isAuthenticated={this.isAuthenticated}
                                isUnauthenticated={this.isUnauthenticated}
                            />}
                    </Drawer.Screen>
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }
}

export default App;

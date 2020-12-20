import React from 'react';
import {
    Animated,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './login';
import {
    StepOneScreen,
    StepTwoScreen,
} from './signUp';
import Oauth2Screen from './Oauth2';

import MainScreen from './main';
import SettingScreen from './setting';
import CallCarScreen from './callCar';
import RegisterCarScreen from './registerCar';
import CheckRegisteredCarScreen from './checkRegisteredCar';
import CheckReservedCarScreen from './checkReservedCar';

const Stack = createStackNavigator();

// authScreen options
const LoginScreenOptions = { headerShown: false };
const SignUpScreenOptions = {
    headerTitle: "휴대폰 본인인증",
    headerBackTitleVisible: false,
};
const Oauth2ScreenOptions = {
    headerTitle: "소셜 로그인",
    headerBackTitleVisible: false,
}

// userScreen options
const MainScreenOptions = {
    headerShown: false,
    // headerTitle: "MyourCar",
    // headerBackTitleVisible: false,
    // headerLeft: ({}) => <OpenDrawer />,
}
const SettingScreenOptions = {
    headerTitle: "",
    headerTransparent: true,
    headerBackTitleVisible: false,
}
const forFade = ({ current }) => ({
    cardStyle: {
        opacity: current.progress,
    },
});
const _forFade = ({ current, next }) => {
    const opacity = Animated.add(
        current.progress,
        next ? next.progress : 0
    ).interpolate({
        inputRange: [0, 1, 2],
        outputRange: [0, 1, 0],
    });

    return {
        leftButtonStyle: { opacity },
        rightButtonStyle: { opacity },
        titleStyle: { opacity },
        backgroundStyle: { opacity },
    };
};
const CallCarScreenOptions = {
    headerTitle: "차량부름 신청",
    // headerTransparent: true,
    headerBackTitleVisible: false,
    // cardStyleInterpolator: forFade,
    // headerStyleInterpolator: _forFade,
}

const CallCarSearchScreenOptions = {
    headerTitle: "",
    headerTransparent: true,
    headerBackTitleVisible: false,
    cardStyleInterpolator: forFade,
    // headerStyleInterpolator: _forFade,
}

const RegisterCarScreenOptions = {
    headerTitle: "공유차량 등록",
    headerBackTitleVisible: false,
}

const CheckRegisteredCarScreenOptions = {
    headerTitle: "차량 정보 확인",
    headerBackTitleVisible: false,
}

const CheckReservedCarScreenOptions = {
    headerTitle: "차량 정보 확인",
    headerBackTitleVisible: false,
}

const CheckReservedCarStepTwoScreenOptions = {
    headerTitle: "차량 리뷰 작성",
    headerBackTitleVisible: false,
}

// authScreens
const authScreens = {
    Login: {
        screen: LoginScreen,
        options: LoginScreenOptions,
    },
    SignUpStepOne: {
        screen: StepOneScreen,
        options: SignUpScreenOptions,
    },
    SignUpStepTwo: {
        screen: StepTwoScreen,
        options: SignUpScreenOptions,
    },
    Oauth2: {
        screen: Oauth2Screen,
        options: Oauth2ScreenOptions,
    },
};

// userScreens
const userScreens = {
    Main: {
        screen: MainScreen,
        options: MainScreenOptions,
    },
    Setting: {
        screen: SettingScreen.SettingScreen,
        options: SettingScreenOptions,
    },
    SettingPassword: {
        screen: SettingScreen.PasswordScreen,
        options: SettingScreenOptions,
    },
    SettingPhoneNumber: {
        screen: SettingScreen.PhoneNumberScreen,
        options: SettingScreenOptions,
    },
    SettingIntroduce: {
        screen: SettingScreen.IntroduceScreen,
        options: SettingScreenOptions,
    },
    CallCarStepOneMap: {
        screen: CallCarScreen.StepOneMapScreen,
        options: CallCarScreenOptions,
    },
    CallCarStepOneSearch: {
        screen: CallCarScreen.StepOneSearchScreen,
        options: CallCarSearchScreenOptions,
    },
    CallCarStepTwo: {
        screen: CallCarScreen.StepTwoScreen,
        options: CallCarScreenOptions
    },
    CallCarStepThree: {
        screen: CallCarScreen.StepThreeScreen,
        options: CallCarScreenOptions
    },
    ReviewScreen: {
        screen: CallCarScreen.ReviewScreen,
        options: CallCarScreenOptions
    },
    RegisterCarStepOne: {
        screen: RegisterCarScreen.StepOneScreen,
        options: RegisterCarScreenOptions,
    },
    RegisterCarStepTwo: {
        screen: RegisterCarScreen.StepTwoScreen,
        options: RegisterCarScreenOptions,
    },
    CheckRegisteredCarStepOne: {
        screen: CheckRegisteredCarScreen.StepOneScreen,
        options: CheckRegisteredCarScreenOptions,
    },
    CheckRegisteredCarStepTwo: {
        screen: CheckRegisteredCarScreen.StepTwoScreen,
        options: CheckRegisteredCarScreenOptions,
    },
    CheckRegisteredCarStepThree: {
        screen: CheckRegisteredCarScreen.StepThreeScreen,
        options: CheckRegisteredCarScreenOptions,
    },
    CheckReservedCarStepOne: {
        screen: CheckReservedCarScreen.StepOneScreen,
        options: CheckReservedCarScreenOptions,
    },
    CheckReservedCarStepTwo: {
        screen: CheckReservedCarScreen.StepTwoScreen,
        options: CheckReservedCarStepTwoScreenOptions,
    },
}

const StackNavigator = (props) => {
    return (
            <Stack.Navigator>
                {Object.entries({
                    ...(props.authenticated ? userScreens : authScreens),
                }).map(([name, properties]) => (
                    <Stack.Screen
                        name={name}
                        component={properties.screen}
                        options={properties.options}
                        initialParams={{
                            isAuthenticated: props.isAuthenticated,
                            isUnauthenticated: props.isUnauthenticated,
                        }}
                    />
                ))}
            </Stack.Navigator>
    );
}

export default StackNavigator;


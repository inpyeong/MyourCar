import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Image,
    Alert,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { getServices } from '../../../util/APIUtils';
import { stepOneStyles } from '../../style/checkReservedCarStyles';
import {calcServiceTime, transformUTCToDateJson} from '../../../util/TimeUtils';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

let imageSource;

const StepOneScreen = (props) => {
    const { params } = props.route;
    const currentUser = params ? params.currentUser : null;

    const mounted = useRef();
    const [state, setState] = useState({
        service: {},
        serviceStartTimeObj: { D: "", H: "", M: ""},
        serviceEndTimeObj: { D: "", H: "", M: ""},
        dateDiff: {
            date: 0,
            text: "",
        },
    });

    useEffect(() => {
        getServices("user", currentUser.id)
            .then(res => {
                console.log("useEffect, getServices", res);
                const { date, text } = setDateDiffText(res);
                setState({
                    service: res,
                    serviceStartTimeObj: transformUTCToDateJson(res.serviceStartTime),
                    serviceEndTimeObj: transformUTCToDateJson(res.serviceEndTime),
                    dateDiff: {
                        date,
                        text
                    },
                });
            })
            .catch(err => console.log("error:", err))
    }, [])

    useEffect(() => {
        let timeOutId;
        if(!mounted.current) {
            mounted.current = true;
        } else {
            let ok = false;
            state.dateDiff.date > 0 && (timeOutId = setTimeout(() => {
                ok = true;
                const stateCopy = { ...state };
                const { date, text } = setDateDiffText(state.service);
                console.log(date, text);
                stateCopy.dateDiff.date = date;
                stateCopy.dateDiff.text = text;
                setState(stateCopy);
            }, 5000));
            if(state.dateDiff.date <= 0 && !ok) {
                Alert.alert(
                    "차량 서비스 가능",
                    "차량 이용이 가능합니다.",
                    [
                        { text: "확인", onPress: () => {
                                console.log("OK Pressed");
                            }},
                    ]
                );
            }
        }
        return (() => clearTimeout(timeOutId));
    }, [state]);

    const setDateDiffText = (res) => {
        const serviceStartDate = new Date(res.serviceStartTime)
        const now = new Date();
        const _now = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes()));

        let _dateDiff = serviceStartDate - _now;
        let dateDiff = serviceStartDate - _now;

        const day = !parseInt(dateDiff / 86400000) ? `` : `${parseInt(dateDiff / 86400000)}일 `;
        dateDiff = dateDiff % 86400000;
        const hour = !parseInt(dateDiff / 3600000) ? `` : `${parseInt(dateDiff / 3600000)}시간 `;
        dateDiff = dateDiff % 3600000;
        const minute = !parseInt(dateDiff / 60000) ? `` : `${parseInt(dateDiff /= 60000)}분`;

        return {
            date: _dateDiff,
            text: `${day}${hour}${minute}`,
        };
    }

    const Timer = () => {
        const {serviceStartTimeObj, serviceEndTimeObj, dateDiff } = state;
        return (
            <View style={stepOneStyles.TimerWrapper}>
                <Text style={stepOneStyles.TimerText}>
                    {`${serviceStartTimeObj.D.length > 2 ? serviceStartTimeObj.D.substr(5, 7) : serviceStartTimeObj.D} ${serviceStartTimeObj.H}:${serviceStartTimeObj.M}`}
                </Text>
                <Text sytle={stepOneStyles.TimerText}>
                    {dateDiff.date > 0 ? dateDiff.text + ' 뒤 시작' : '차량 이용 중'}
                    {/*{dateDiff.text} 뒤 시작*/}
                </Text>
                <Text style={stepOneStyles.TimerText}>
                    {`${serviceEndTimeObj.D.length > 2 ? serviceEndTimeObj.D.substr(5, 7) : serviceEndTimeObj.D} ${serviceEndTimeObj.H}:${serviceEndTimeObj.M}`}
                </Text>
            </View>
        )
    }

    const Car = () => {
        if (!state.service.cars) {
            return (
                <ActivityIndicator
                    style={stepOneStyles.indicatorStyle}
                    size='large'
                    color='black'
                    animating={true}
                />
            );
        } else {
            switch(state.service.cars.name) {
                case 'K5':
                    imageSource = require('../../../assets/pics/K5.png');
                    break;
                case 'Volvo':
                    imageSource = require('../../../assets/pics/Volvo.png');
                    break;
                case 'Lamborghini':
                    imageSource = require('../../../assets/pics/Lamborghini.png');
                    break;
                case 'Tivoli':
                    imageSource = require('../../../assets/pics/Tivoli.png');
                    break;
            }
            return (
                <View style={stepOneStyles.carImageNameContainer}>
                    <View style={stepOneStyles.carImageWrapper}>
                        <Image
                            source={imageSource}
                            style={stepOneStyles.carImage}
                            resizeMode='contain'
                        />
                    </View>
                    <View style={stepOneStyles.carNameWrapper}>
                        <Text style={stepOneStyles.carName}>{state.service.cars.name}</Text>
                        <Ionicons
                            name='chevron-forward-outline'
                            size={25}
                            style={{ opacity: 0.6, marginTop: 2, }}
                            color='rgb(167, 169, 177)'
                        />
                    </View>
                </View>
            );
        }
    }

    const Action = () => {
        return (
            <View style={stepOneStyles.actionContainer}>
                <View style={stepOneStyles.openLockWrapper}>
                    <Ionicons
                        name={"lock-open-outline"}
                        size={100}
                        style={[stepOneStyles.actionIcon]}
                        onPress={() => {
                            if(state.dateDiff.date > 0) {
                                Alert.alert(
                                    "알림",
                                    "아직 이용하실 수 없습니다.",
                                    [
                                        { text: "확인", onPress: () => {
                                                console.log("OK Pressed");
                                            }},
                                    ]
                                );
                            } else {
                                Alert.alert(
                                    "알림",
                                    "문이 열렸습니다.",
                                    [
                                        { text: "확인", onPress: () => {
                                                console.log("OK Pressed");
                                            }},
                                    ]
                                );
                            }
                        }}
                    />
                    <Ionicons
                        name={"radio-button-off"}
                        size={40}
                        style={[stepOneStyles.actionIcon, stepOneStyles.open]}
                        onPress={() => {
                            if(state.dateDiff.date > 0) {
                                Alert.alert(
                                    "알림",
                                    "아직 이용하실 수 없습니다.",
                                    [
                                        { text: "확인", onPress: () => {
                                                console.log("OK Pressed");
                                            }},
                                    ]
                                );
                            } else {
                                Alert.alert(
                                    "알림",
                                    "문이 열렸습니다.",
                                    [
                                        { text: "확인", onPress: () => {
                                                console.log("OK Pressed");
                                            }},
                                    ]
                                );
                            }
                        }}
                    />
                    <Text style={stepOneStyles.openLockText}>문열기</Text>
                </View>
                <View style={stepOneStyles.closedLockWrapper}>
                    <Ionicons
                        name={"lock-closed-outline"}
                        size={100}
                        style={[stepOneStyles.actionIcon, stepOneStyles.closedLock]}
                        onPress={() => {
                            if(state.dateDiff.date > 0) {
                                Alert.alert(
                                    "알림",
                                    "아직 이용하실 수 없습니다.",
                                    [
                                        { text: "확인", onPress: () => {
                                                console.log("OK Pressed");
                                            }},
                                    ]
                                );
                            } else {
                                Alert.alert(
                                    "알림",
                                    "문이 잠겼습니다.",
                                    [
                                        { text: "확인", onPress: () => {
                                                console.log("OK Pressed");
                                            }},
                                    ]
                                );
                            }
                        }}
                    />
                    <Ionicons
                        name={"close"}
                        size={40}
                        style={[stepOneStyles.actionIcon, stepOneStyles.close]}
                        onPress={() => {
                            if(state.dateDiff.date > 0) {
                                Alert.alert(
                                    "알림",
                                    "아직 이용하실 수 없습니다.",
                                    [
                                        { text: "확인", onPress: () => {
                                                console.log("OK Pressed");
                                            }},
                                    ]
                                );
                            } else {
                                Alert.alert(
                                    "알림",
                                    "문이 잠겼습니다.",
                                    [
                                        { text: "확인", onPress: () => {
                                                console.log("OK Pressed");
                                            }},
                                    ]
                                );
                            }
                        }}
                    />
                    <Text style={stepOneStyles.closedLockText}>문잠금</Text>
                </View>
                <View style={stepOneStyles.triangleWrapper}>
                    <Ionicons
                        name={"triangle-outline"}
                        size={100}
                        style={[stepOneStyles.actionIcon]}
                        onPress={() => {
                            if(state.dateDiff.date > 0) {
                                Alert.alert(
                                    "알림",
                                    "아직 이용하실 수 없습니다.",
                                    [
                                        { text: "확인", onPress: () => {
                                                console.log("OK Pressed");
                                            }},
                                    ]
                                );
                            } else {
                                Alert.alert(
                                    "알림",
                                    "비상등이 켜졌습니다.",
                                    [
                                        { text: "확인", onPress: () => {
                                                console.log("OK Pressed");
                                            }},
                                    ]
                                );
                            }
                        }}
                    />
                    <Ionicons
                        name={"triangle-outline"}
                        size={40}
                        style={[stepOneStyles.actionIcon, stepOneStyles.smallTriangle]}
                        onPress={() => {
                            if(state.dateDiff.date > 0) {
                                Alert.alert(
                                    "알림",
                                    "아직 이용하실 수 없습니다.",
                                    [
                                        { text: "확인", onPress: () => {
                                                console.log("OK Pressed");
                                            }},
                                    ]
                                );
                            } else {
                                Alert.alert(
                                    "알림",
                                    "비상등이 켜졌습니다.",
                                    [
                                        { text: "확인", onPress: () => {
                                                console.log("OK Pressed");
                                            }},
                                    ]
                                );
                            }
                        }}
                    />
                    <Text style={stepOneStyles.triangleText}>비상등</Text>
                </View>
                <View style={stepOneStyles.megaphoneWrapper}>
                    <Ionicons
                        name={"volume-medium-outline"}
                        size={100}
                        style={[stepOneStyles.actionIcon, stepOneStyles.megaphone]}
                        onPress={() => {
                            if(state.dateDiff.date > 0) {
                                Alert.alert(
                                    "알림",
                                    "아직 이용하실 수 없습니다.",
                                    [
                                        { text: "확인", onPress: () => {
                                                console.log("OK Pressed");
                                            }},
                                    ]
                                );
                            } else {
                                Alert.alert(
                                    "알림",
                                    "경적이 울립니다.",
                                    [
                                        { text: "확인", onPress: () => {
                                                console.log("OK Pressed");
                                            }},
                                    ]
                                );
                            }
                        }}
                    />
                    <Text style={stepOneStyles.megaphoneText}>경적</Text>
                </View>
                <View style={stepOneStyles.logoWrapper}>
                    <Text style={stepOneStyles.logo}>MYOURCAR</Text>
                </View>
                <View style={[stepOneStyles.line, stepOneStyles.leftColumn]} />
                <View style={[stepOneStyles.line, stepOneStyles.rightColumn]} />
                <View style={[stepOneStyles.line, stepOneStyles.leftRow]} />
                <View style={[stepOneStyles.line, stepOneStyles.rightRow]} />
            </View>
        );
    }

    const Buttons = () => {
        return (
            <View style={stepOneStyles.btnContainer}>
                <TouchableOpacity
                    style={stepOneStyles.returnBtn}
                    onPress={() => {
                        Alert.alert(
                            "차량 반납",
                            "차량을 반납하실건가요?",
                            [
                                { text: "취소", onPress: () => {
                                        console.log("Cancle Pressed");
                                    }},
                                { text: "확인", onPress: () => {
                                        Alert.alert(
                                            "경고",
                                            "차량을 반납하시면 더 이상 차량을 \n이용하실 수 없습니다.",
                                            [
                                                { text: "취소", onPress: () => {
                                                        console.log("Cancle Pressed");
                                                    }},
                                                { text: "확인", onPress: () => {
                                                        console.log("OK Pressed");

                                                        // 차량 반납을 완료하였습니다. alert 추가하기
                                                        // alert onPress 에 service 컬럼 수정하기

                                                        // props.navigation.navigate('Main');
                                                        Alert.alert(
                                                            "차량 반납 완료",
                                                            "차량 리뷰를 남기시겠습니까?",
                                                            [
                                                                { text: "아니요", onPress: () => {
                                                                    console.log("Cancle Pressed");
                                                                    }},
                                                                { text: "예", onPress: () => {
                                                                        console.log("OK Pressed");
                                                                        props.navigation.navigate('CheckReservedCarStepTwo', {
                                                                            car: state.service.cars,
                                                                            carImage: imageSource,
                                                                        });
                                                                    }},

                                                            ]
                                                        )
                                                    }},
                                            ],
                                            { cancelable: false }
                                        )
                                    }},
                            ],
                            { cancelable: false }
                        )
                    }}
                >
                    <Text>차량 반납</Text>
                </TouchableOpacity>
            </View>
        )
    }

    props.navigation.setOptions({
        headerTitle: state.service.cars ? state.service.cars.licensePlateNumber : ""
    });

    return (
        <View style={stepOneStyles.flexContainer}>
            <Timer />
            <View style={stepOneStyles.emptyView} />
            <Car />
            <View style={stepOneStyles.emptyView} />
            <Action />
            <Buttons />
        </View>
    );
};

export default StepOneScreen;

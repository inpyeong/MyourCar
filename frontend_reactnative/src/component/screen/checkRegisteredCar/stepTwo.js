import React, { useState, useEffect, useRef, useLayoutEffect, } from 'react';
import {
    View,
    Text,
    Alert,
    Switch,
    Keyboard,
    TextInput,
    ScrollView,
    LayoutAnimation,
    TouchableOpacity,
    ActivityIndicator,
    TouchableWithoutFeedback,
} from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';
import MapView, { PROVIDER_GOOGLE, Marker, Overlay } from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import {
    calcServiceTime,
    getDefaultServiceTime,
    transformUTCToDateJson,
    transferToUriDate,
    isEqual,
} from '../../../util/TimeUtils';
import { reverseGeocoding, patchCars, } from '../../../util/APIUtils';
import StepTwoServiceTimeModal from './stepTwoServiceTimeModal';
import StepTwoReturnLocationModal from './stepTwoReturnLocationModal';
import { stepTwoStyles } from '../../style/checkRegisteredCarStyles';

const StepTwoScreen = (props) => {
    const { params } = props.route;
    const car = params ? params.car : null;
    // console.log(car);

    const originStateValues = useRef();
    const [alertWhenGoBack, setAlertWhenGoBack] = useState(false);

    const [isEnabled, setIsEnabled] = useState(car.serviceEnable ? true : false);
    const toggleSwitch = () => {
        console.log("here");
        if(car.serviceEnable) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            Alert.alert(
                "주의",
                "정말로 서비스를 비활성화 하시나요?",
                [
                    { text: "확인", onPress: () => {
                            console.log("OK Pressed");
                            setIsEnabled(previousState => !previousState);
                        }
                    },
                    { text: "취소", onPress: () => {
                            console.log("Cancle Pressed")
                        }
                    }
                ],
                { cancelable: false }
            )
        } else {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setIsEnabled(previousState => !previousState);
        }
    }

    const [serviceTime, setServiceTime] = useState(() => setInitialServiceTimeValue(car));
    console.log("serviceTime", serviceTime);
    const [openServiceTimeModal, setOpenServiceTimeModal] = useState(false);

    const mapRef = useRef(null);
    const [coords, setCoords] = useState(() => setInitialCoordsValue(car));
    const [returnAddress, setReturnAddress] = useState({});
    const [openReturnLocationModal, setOpenReturnLocationModal] = useState(false);

    const [rentFee, setRentFee] = useState(car.rentFee ? car.rentFee : '');
    const [timeFee, setTimeFee] = useState(car.timeFee ? car.timeFee : '');

    useEffect(() => {
        if(!originStateValues.current) {
            originStateValues.current = {
                serviceTime,
                coords,
                rentFee,
                timeFee,
            };
            // console.log("current", originStateValues.current);
        } else {
            if(isEnabled) {
                mapRef.current.getCamera()
                    .then(camera => {
                        // console.log(camera);
                        camera.center.latitude = coords.latitude;
                        camera.center.longitude = coords.longitude;
                        mapRef.current.setCamera(camera, 1000);
                    })
            }
        }
    }, [coords]);

    useEffect(() => {
        if(!coords) {
            Geolocation.getCurrentPosition(
                (info) => {
                    originStateValues.current.coords = info.coords;
                    setCoords({...info.coords});
                },
                (err) => {
                    console.log('err:', err)
                },
            )
        }
    },[])

    useEffect(() => {
        if(coords) {
            reverseGeocoding(coords)
                .then(res => {
                    res = res.results[0];
                    const firstAddress = `${res.region.area3.name} ${res.region.area4.name} ${res.land.number1}${res.land.number2.length ? `-${res.land.number2}` : ``}`;
                    const secondAddress = `${res.region.area1.name} ${res.region.area2.name} ${firstAddress}`;

                    const newReturnAddress = {
                        firstAddress,
                        secondAddress,
                    }
                    setReturnAddress(newReturnAddress);
                })
                .catch(err => console.log("error: ", err));
        }
    }, [coords])

      useLayoutEffect(() => {
          props.navigation.setOptions({
             headerLeft: (_props) => (
                 <HeaderBackButton
                     {..._props}
                     onPress={() => {

                         props.navigation.goBack();
                     }}
                 />
             ),
      });
    }, [props.navigation]);

    const isActive = () => {
        if(originStateValues.current) {
            const hasEmptyState = (serviceTime === null || rentFee.toString().length === 0 || timeFee.toString().length === 0);
            const hasNoStateChanges = (
                isEqual(originStateValues.current.serviceTime, serviceTime) &&
                (coords.latitude === originStateValues.current.coords.latitude && coords.longitude === originStateValues.current.coords.longitude) &&
                rentFee === originStateValues.current.rentFee &&
                timeFee === originStateValues.current.timeFee
            );
            if(!hasEmptyState && !hasNoStateChanges) return true;
        }
        return false;
    }

    if (!coords) {
        return (
            <ActivityIndicator
                style={stepTwoStyles.indicatorStyle}
                size='large'
                color='black'
                animating={true}
            />
        );
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={stepTwoStyles.flexContainer}>
                <View style={stepTwoStyles.switchContainer}>
                    <View style={stepTwoStyles.iconTitleWrapper}>
                        <Ionicons
                            name={"ios-people-circle-outline"}
                            size={30}
                            style={{ color: 'rgb(119, 191, 243)',}}
                        />
                        <Text style={stepTwoStyles.title}>서비스 활성화</Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={{ position: 'absolute', zIndex: 1, top: 0, right: 0, left: 0, bottom: 0, }}
                            onPress={() => toggleSwitch()}
                        />
                        <Switch
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                </View>
                {isEnabled && (
                    <View style={{ flex: 1, }}>
                        <View style={stepTwoStyles.contentContainer}>
                            <View style={stepTwoStyles.header}>
                                <View style={stepTwoStyles.iconTitleWrapper}>
                                    <Ionicons
                                        name={"time-outline"}
                                        size={30}
                                        style={{ color: 'rgb(119, 191, 243)',}}
                                    />
                                    <Text style={stepTwoStyles.title}>서비스 시간</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => setOpenServiceTimeModal(true)}
                                    activeOpacity={1}
                                >
                                    <Text style={stepTwoStyles.settingText}>설정하기</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={stepTwoStyles.body}>
                                {serviceTime ? (
                                    <View>
                                        <Text style={stepTwoStyles.calcServiceTime}>총 {calcServiceTime(serviceTime)} 설정</Text>
                                        <Text style={stepTwoStyles.serviceTime}>{`${serviceTime.startD} ${serviceTime.startH}:${serviceTime.startM} - ${serviceTime.endD === '오늘' ? '' : serviceTime.endD} ${serviceTime.endH}:${serviceTime.endM}`}</Text>
                                    </View>
                                ) : (
                                    <Text style={stepTwoStyles.pleaseText}>시간을 설정해주세요.</Text>
                                )}
                            </View>
                            <StepTwoServiceTimeModal
                                isVisible={openServiceTimeModal}
                                handleModal={setOpenServiceTimeModal}
                                serviceTime={serviceTime}
                                setServiceTime={setServiceTime}
                                serviceEnable={car.serviceEnable}
                            />
                        </View>
                        <View style={stepTwoStyles.contentContainer}>
                            <View style={stepTwoStyles.header}>
                                <View style={stepTwoStyles.iconTitleWrapper}>
                                    <Ionicons
                                        name={"card-outline"}
                                        size={29}
                                        style={{ color: 'rgb(119, 191, 243)',}}
                                    />
                                    <Text style={stepTwoStyles.title}>요금 설정</Text>
                                </View>
                            </View>
                            <View style={stepTwoStyles.body}>
                                <View style={stepTwoStyles.feeWrapper}>
                                    <Text style={stepTwoStyles.feeText}>대여요금</Text>
                                    <FontAwesome
                                        name={'won'}
                                        size={15}
                                        style={{ color: rentFee.toString().length ? "#000" : "rgb(197, 197, 199)", marginRight: 3 }}
                                    />
                                    <TextInput
                                        style={stepTwoStyles.feeTextInput}
                                        value={rentFee.toString()}
                                        onChangeText={rentFee => setRentFee(rentFee)}
                                        placeholder="대여요금 입력"
                                        keyboardType='numeric'
                                    />
                                </View>
                                <View style={[stepTwoStyles.feeWrapper, {marginTop: 10}]}>
                                    <Text style={stepTwoStyles.feeText}>시간요금</Text>
                                    <FontAwesome
                                        name={'won'}
                                        size={15}
                                        style={{ color: timeFee.toString().length ? "#000" : "rgb(197, 197, 199)", marginRight: 3 }}
                                    />
                                    <TextInput
                                        style={stepTwoStyles.feeTextInput}
                                        value={timeFee.toString()}
                                        onChangeText={timeFee => setTimeFee(timeFee)}
                                        placeholder="시간요금 입력"
                                        keyboardType='numeric'
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={stepTwoStyles.contentContainer}>
                            <View style={stepTwoStyles.header}>
                                <View style={stepTwoStyles.iconTitleWrapper}>
                                    <Ionicons
                                        name={"md-car-outline"}
                                        size={30}
                                        style={{ color: 'rgb(119, 191, 243)',}}
                                    />
                                    <Text style={stepTwoStyles.title}>차량 복귀위치</Text>
                                </View>
                            </View>
                            <View style={stepTwoStyles.body}>
                                <MapView
                                    ref={mapRef}
                                    rotateEnabled={false}
                                    scrollEnabled={false}
                                    style={{
                                        width: '100%',
                                        height: 200,
                                    }}
                                    provider={PROVIDER_GOOGLE}
                                    initialRegion={{
                                        latitude: coords.latitude,
                                        longitude: coords.longitude,
                                        latitudeDelta: 0.003,
                                        longitudeDelta: 0.003,
                                    }}
                                    onRegionChange={(Region) => {
                                        setCoords({ ...Region });
                                    }}
                                >
                                    <Marker
                                        coordinate={{
                                            latitude: coords.latitude,
                                            longitude: coords.longitude,
                                        }}
                                        tracksViewChanges={false}
                                    />
                                </MapView>
                                <View style={stepTwoStyles.addressContainer}>
                                    <Text style={stepTwoStyles.firstAddress}>{returnAddress.firstAddress}</Text>
                                    <View style={stepTwoStyles.secondAddressWrapper}>
                                        <Text style={stepTwoStyles.secondAddress}>{returnAddress.secondAddress}</Text>
                                        <TouchableOpacity
                                            onPress={() => setOpenReturnLocationModal(true)}
                                            activeOpacity={1}
                                        >
                                            <Text style={{ fontSize: 14, color: 'rgb(88, 141, 249)', }}>위치 수정</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <StepTwoReturnLocationModal
                                        isVisible={openReturnLocationModal}
                                        handleModal={setOpenReturnLocationModal}
                                        coords={coords}
                                        setCoords={setCoords}
                                        returnAddress={returnAddress}
                                    />
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={[stepTwoStyles.submitButton, { backgroundColor: isActive() ? "#3897f1" : "rgb(229, 230, 235)" }]}
                            onPress={() => {
                                const requestBody = {
                                    serviceEnable: 1,
                                    availableStartTime: `${transferToUriDate(serviceTime.startD)} ${serviceTime.startH}:${serviceTime.startM}:00`,
                                    availableEndTime: `${transferToUriDate(serviceTime.endD)} ${serviceTime.endH}:${serviceTime.endM}:00`,
                                    returnLocationLatitude: coords.latitude,
                                    returnLocationLongitude: coords.longitude,
                                    rentFee: rentFee,
                                    timeFee: timeFee,
                                }
                                patchCars(car.id, requestBody)
                                    .then(res => {
                                        // console.log(res);
                                        Alert.alert(
                                            "차량 정보 수정완료",
                                            "차량 정보가 수정되었습니다.",
                                            [
                                                { text: "확인", onPress: () => {
                                                        console.log("OK Pressed")
                                                        originStateValues.current = {
                                                            serviceTime,
                                                            coords,
                                                            rentFee,
                                                            timeFee,
                                                        }
                                                    }
                                                }
                                            ],
                                            { cancelable: false }
                                        )
                                    })
                                    .catch(err => console.log("error:", err));
                            }}
                        >
                            <Text style={stepTwoStyles.submitButtonText}>
                                차량 정보 수정
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    )
};

const setInitialServiceTimeValue = (car) => {
    let ret = null;
    if(car.availableStartTime && car.availableEndTime) {
        const availableStartTimeObj = transformUTCToDateJson(car.availableStartTime);
        const availableEndTimeObj = transformUTCToDateJson(car.availableEndTime);
        console.log("here");
        ret = {
            startD: `${availableStartTimeObj.D}`,
            startH: `${availableStartTimeObj.H}`,
            startM: `${availableStartTimeObj.M}`,
            endD: `${availableEndTimeObj.D}`,
            endH: `${availableEndTimeObj.H}`,
            endM: `${availableEndTimeObj.M}`,
        }
    }
    return ret;
}

const setInitialCoordsValue = (car) => {
    console.log("setInitialCoordsValue", car);
    let ret = null;
    if(car.returnLocationLatitude && car.returnLocationLongitude) {
        ret = {
            latitude: car.returnLocationLatitude,
            longitude: car.returnLocationLongitude,
        }
    }
    return ret;
}

export default StepTwoScreen;

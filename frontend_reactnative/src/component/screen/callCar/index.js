import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    LayoutAnimation,
    ScrollView,
    Image,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Overlay } from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { getRecommendCars } from '../../../util/APIUtils';
import { calcServiceTime, transferToUriDate, getDefaultServiceTime, } from '../../../util/TimeUtils';
import Stack from '../../../util/StackUtils';
import {
    callCarStepOneMapStyles,
    callCarStepOneSearchStyles,
    callCarStepTwoStyles,
} from '../../style/callCarStyles';
import { getLocationList, getLonLat, reverseGeocoding, } from '../../../util/APIUtils';
import StepOneModal from './stepOneModal';
import StepThreeScreen from './StepThreeScreen';
import ReviewScreen from './ReviewScreen';

const StepOneMapScreen = (props) => {
    const mapRef = useRef(null);

    const [coords, setCoords] = useState(null);
    const [searchCoords, setSearchCoords] = useState(null);
    const [serviceTime, setServiceTime] = useState(getDefaultServiceTime);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        Geolocation.getCurrentPosition(
            (info) => {
                console.log(info.coords);
                setCoords({...info.coords, btnOnMarker: true, });
            },
            (err) => {
                console.log('err:', err)
            },
        )
    },[])

    useEffect(() => {
        if(searchCoords) {
            mapRef.current.getCamera()
                .then(camera => {
                    console.log(camera);
                    camera.center.latitude = searchCoords.latitude;
                    camera.center.longitude = searchCoords.longitude;
                    mapRef.current.setCamera(camera, 1000);
                })
        }
    }, [searchCoords]);

    if (!coords) {
        return (
            <ActivityIndicator
                style={callCarStepOneMapStyles.indicatorStyle}
                size='large'
                color='black'
                animating={true}
            />
        );
    }

    return (
        <View style={callCarStepOneMapStyles.container}>
            <MapView
                ref={mapRef}
                style={{
                    // ...StyleSheet.absoluteFillObject,
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                }}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                        latitudeDelta: 0.008,
                        longitudeDelta: 0.008,
                }}
                onRegionChange={(Region) => {
                    console.log(Region);
                    console.log(coords);
                    setCoords({...Region, btnOnMarker: false, });
                }}
                onRegionChangeComplete={(Region) => {
                    LayoutAnimation.configureNext(LayoutAnimation.create(300, 'easeInEaseOut', 'opacity'));
                    setCoords({...coords, btnOnMarker: true, })
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
            <View style={callCarStepOneMapStyles.searchBarContainer}>
                <TouchableOpacity
                    style={callCarStepOneMapStyles.searchBarWrapper}
                    underlayColor="#DDDDDD"
                    onPress={() => props.navigation.navigate('CallCarStepOneSearch', {
                        setSearchCoords: setSearchCoords,
                    })}
                    activeOpacity={1}
                >
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center',}}>
                        <Ionicons
                            name='ios-search-outline'
                            size={18}
                            style={{ marginRight: 10, marginLeft: 5, opacity: 0.4,}}
                        />
                        <Text style={callCarStepOneMapStyles.searchBar}>주소 또는 건물명 검색</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {coords.btnOnMarker && (
                <View style={{ position: 'absolute', top: '38%', left: '35.5%', }}>
                    <TouchableOpacity
                        style={{ width: 120, height: 35, backgroundColor: 'rgb(64, 78, 79)', borderRadius: 20, justifyContent: 'center', alignItems: 'center', }}
                        activeOpacity={1}
                        onPress={() => {
                            props.navigation.navigate('CallCarStepTwo', {
                                coords,
                                serviceTime,
                                currentUser: props.route.params.currentUser,
                            })
                        }}
                    >
                        <View>
                            <Text style={{ color: "#FFF", fontSize: 12, fontWeight: '600', }}>여기로 차량 부르기</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}
            <View style={callCarStepOneMapStyles.serviceTimeContainer}>
                <TouchableOpacity
                    style={callCarStepOneMapStyles.serviceTimeWrapper}
                    onPress={() => {
                        setModal(true);
                    }}
                    activeOpacity={1}
                >
                    <Ionicons
                        name="time-outline"
                        size={30}
                        style={{ color: 'rgb(119, 191, 243)', marginBottom: '8%', }}
                    />
                    <View style={callCarStepOneMapStyles.serviceTimeTextInfoWrapper}>
                        <Text style={callCarStepOneMapStyles.serviceTimeText}>이용시간 설정하기</Text>
                        <Text style={callCarStepOneMapStyles.serviceTimeInfo}>
                            {`${serviceTime.startD} ${serviceTime.startH}:${serviceTime.startM} - ${serviceTime.endD === '오늘' ? '' : serviceTime.endD} ${serviceTime.endH}:${serviceTime.endM}`}
                        </Text>
                    </View>
                    <Ionicons
                        name="chevron-up-outline"
                        size={25}
                        style={{ opacity: 0.5, marginBottom: '8%', }}
                    />
                </TouchableOpacity>
            </View>
            <StepOneModal
                isVisible={modal}
                handleModal={setModal}
                serviceTime={serviceTime}
                setServiceTime={setServiceTime}
            />
        </View>
    );
}

const unescapeHtml = (str) => {
    if (str == null) {
        return "";
    }
    return str
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&#39;/g, "'");
}

const getFormattedLocationTitle = (locationQuery, locationTitle) => {
    let clearText = unescapeHtml(locationTitle)
        .replace(/(<([^>]+)>)/gi, "");
    const indexOfFirst = clearText.indexOf(locationQuery.trim());
    if(indexOfFirst === -1) {
        return (
            <View style={callCarStepOneSearchStyles.locationWrapper}>
                <Text style={callCarStepOneSearchStyles.locationInfo}>{clearText}</Text>
            </View>
        );
    } else {
        return (
            <View style={callCarStepOneSearchStyles.locationWrapper}>
                <Text style={callCarStepOneSearchStyles.locationQuery}>{clearText.slice(indexOfFirst,indexOfFirst+locationQuery.trim().length)}</Text>
                <Text style={callCarStepOneSearchStyles.locationInfo}>{clearText.slice(indexOfFirst+locationQuery.trim().length)}</Text>
            </View>
        );
    }
}

const StepOneSearchScreen = (props) => {
    const textInputRef = useRef(null);
    useEffect(() => {
        textInputRef.current.focus();
    }, []);

    const [query, setQuery] = useState('');
    const [queryCopy, setQueryCopy] = useState('');
    const [locationList, setLocationList] = useState({query: query, items: [], });
    useEffect(() => {
         if(query === queryCopy) {
             console.log("Call API");
             getLocationList(query)
                 .then(res => {
                     if(res) {
                         console.warn(res);
                         setLocationList({query: query, items: res.items, });
                     } else {
                         setLocationList({query: query, items: [], });
                     }
                 })
                 .catch(err => {
                     console.log("error:", err);
                 });
         }
    }, [queryCopy]);

    return (
            <View style={callCarStepOneSearchStyles.flexContainer}>
                <View style={callCarStepOneSearchStyles.textInputContainer}>
                    <View style={callCarStepOneSearchStyles.textInputWrapper}>
                        <TextInput
                            ref={textInputRef}
                            style={callCarStepOneSearchStyles.textInput}
                            value={query}
                            onChangeText={query => {
                                setQuery(query)
                                setTimeout(() => {
                                    setQueryCopy(query);
                                }, 1500);
                            }}
                            autoCapitalize='none'
                            placeholder="주소 또는 건물명 검색"
                        />
                    </View>
                </View>
                <View style={callCarStepOneSearchStyles.locationListContainer}>
                    {locationList.items.length ? locationList.items.map((address, i) => {
                        return (
                            <TouchableOpacity
                                style={callCarStepOneSearchStyles.locationContainer}
                                onPress={() => {
                                    getLonLat(address.address)
                                        .then(res => {
                                            const newLat = res.addresses[0].y;
                                            const newLon = res.addresses[0].x;
                                            props.route.params.setSearchCoords({
                                                latitude: parseFloat(newLat),
                                                longitude: parseFloat(newLon),
                                                latitudeDelta: 0.005,
                                                longitudeDelta: 0.005,
                                            });
                                            props.navigation.navigate('CallCarStepOneMap');
                                        })
                                        .catch(err => console.log("error:",err))
                                }}
                            >
                                {getFormattedLocationTitle(locationList.query, address.title)}
                                <Text>{address.address}</Text>
                            </TouchableOpacity>
                        );
                    })
                        :
                        <View style={callCarStepOneSearchStyles.locationNotFoundWrapper}>
                            <Text style={callCarStepOneSearchStyles.locationNotFound}>검색 결과가 없습니다.</Text>
                        </View>
                    }
                </View>
            </View>
    );
}

const StepTwoScreen = (props) => {
    const { params } = props.route;
    const { navigation } = props;
    const [state, setState] = useState({
        coords: params.coords,
        serviceTime: params.serviceTime,
        addressTitle: "",
        cars: [],
    });

    useEffect(() => {
        reverseGeocoding(state.coords)
            .then(res => {
                res = res.results[0];
                let addressTitle = `${res.region.area1.name} ${res.region.area2.name} ${res.region.area3.name} ${res.region.area4.name} ${res.land.number1}-${res.land.number2}`;

                const coords = `${state.coords.latitude},${state.coords.longitude}`;
                let { startD, endD } = state.serviceTime;
                if(startD.length > 2) startD = transferToUriDate(startD);
                if(endD.length > 2) endD = transferToUriDate(endD);
                const serviceTime = `${startD},${state.serviceTime.startH},${state.serviceTime.startM},${endD},${state.serviceTime.endH},${state.serviceTime.endM}`
                getRecommendCars(coords, serviceTime)
                    .then(res => {
                        console.log(res);
                        let stateCopy = {...state};
                        stateCopy.addressTitle = addressTitle;
                        stateCopy.cars = res;
                        setState(stateCopy);
                    })
                    .catch(err => console.log("error: ", err));
            })
    },[])

    return (
        <View style={callCarStepTwoStyles.flexContainer}>
            <View style={callCarStepTwoStyles.titleContainer}>
                <View style={callCarStepTwoStyles.titleWrapper}>
                    <Text style={callCarStepTwoStyles.title}>{state.addressTitle}</Text>
                </View>
                <View style={callCarStepTwoStyles.descriptionWrapper}>
                    <Text style={callCarStepTwoStyles.description}>이 장소로 차량이 배달됩니다.</Text>
                </View>
            </View>
            <View style={callCarStepTwoStyles.timeContainer}>
                <View style={callCarStepTwoStyles.totalTimeWrapper}>
                    <Ionicons
                        name="time-outline"
                        size={25}
                        style={{ color: 'rgb(119, 191, 243)', }}
                    />
                    <Text style={callCarStepTwoStyles.totalTime}>총 {calcServiceTime(state.serviceTime)} 이용</Text>
                </View>
                <Text style={callCarStepTwoStyles.startTime}>{state.serviceTime.startD} {state.serviceTime.startH}:{state.serviceTime.startM}</Text>
            </View>
            <ScrollView
                bounces={false}
                style={{ flex: 1, }}
            >
                <CarList
                    coords={state.coords}
                    cars={state.cars}
                    navigation={navigation}
                    serviceTime={state.serviceTime}
                    addressTitle={state.addressTitle}
                    currentUser={params.currentUser}
                />
            </ScrollView>
        </View>
    );
}

const CarList = ({ coords, cars, navigation, serviceTime, addressTitle, currentUser }) => {
    return (
        <View>
            {cars.map((value, index) => {
                let imageSource;
                switch(value.name) {
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
                    <TouchableOpacity
                        style={callCarStepTwoStyles.carContainer}
                        onPress={() => {
                            navigation.navigate('CallCarStepThree', {
                                coords: coords,
                                car: cars[index],
                                serviceTime: serviceTime,
                                addressTitle: addressTitle,
                                carImageSource: imageSource,
                                currentUser: currentUser,
                            });
                        }}
                        activeOpacity={1}
                    >
                        <Image
                            source={imageSource}
                            style={callCarStepTwoStyles.carImage}
                            resizeMode='contain'
                        />
                        <View style={callCarStepTwoStyles.textContainer}>
                            <Text style={callCarStepTwoStyles.carTitle}>{value.name}</Text>
                            <Text style={callCarStepTwoStyles.carRentFee}>{AddCommaToRentFee(value.rentFee)}원</Text>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    )
}

const AddCommaToRentFee = (rentFee) => {
    rentFee = rentFee.toString();
    const stack = new Stack();
    for(let i = 0; i < rentFee.length; ++i) {
        stack.push(rentFee[i]);
    }
    const size = stack.size();
    let ret = '';
    for(let i = 0; i < size; ++i) {
        if(i%3 == 0 && i > 0) ret = ',' + ret;
        ret = stack.peek() + ret;
        stack.pop();
    }
    return ret;
}

export default {
    StepOneMapScreen,
    StepOneSearchScreen,
    StepTwoScreen,
    StepThreeScreen,
    ReviewScreen,
}

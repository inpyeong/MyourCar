import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { getCars } from '../../../util/APIUtils';
import { stepOneStyles } from '../../style/checkRegisteredCarStyles';

const StepOneScreen = (props) => {
    const { params } = props.route;
    const currentUser = params ? params.currentUser : null;
    const [cars, setCars] = useState([]);

    useEffect(() => {
        getCars(currentUser.id)
            .then(res => {
                // console.log(res);
                setCars(res);
            })
            .catch(err => console.log("error:", err));
    }, []);

    return (
        <View style={stepOneStyles.flexContainer}>
            <ScrollView
                bounces={false}
                style={{ flex: 1, }}
            >
                <CarList
                    cars={cars}
                    navigation={props.navigation}
                />
            </ScrollView>
        </View>
    );
}

const CarList = ({ cars, navigation, }) => {
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
                    <View
                        style={stepOneStyles.carContainer}
                        activeOpacity={1}
                    >
                        <Image
                            source={imageSource}
                            style={stepOneStyles.carImage}
                            resizeMode='contain'
                        />
                        <View style={stepOneStyles.textContainer}>
                            <Text style={stepOneStyles.carTitle}>{value.name}</Text>
                            {value.serviceEnable === 1 && (
                                <Text style={stepOneStyles.carServiceEnable}>서비스 진행중</Text>
                            )}
                        </View>
                        <View style={stepOneStyles.ioniconsWrapper}>
                            <Ionicons
                                name={"location-sharp"}
                                style={{ color: 'skyblue'}}
                                onPress={() => {
                                    navigation.navigate('CheckRegisteredCarStepThree', {
                                        car: value,
                                    });
                                }}
                                size={35}
                            />
                            <Ionicons
                                name={"cog-outline"}
                                onPress={() => {
                                    navigation.navigate('CheckRegisteredCarStepTwo', {
                                        car: value,
                                    });
                                }}
                                size={35}
                            />
                        </View>
                    </View>
                );
            })}
        </View>
    )
}

export default StepOneScreen;

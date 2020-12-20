import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Modal,
    Alert,
    LayoutAnimation,
    TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MapView, { PROVIDER_GOOGLE, Marker, Overlay } from "react-native-maps";
import { reverseGeocoding } from '../../../util/APIUtils';
import { callCarStepOneMapStyles } from '../../style/callCarStyles';
import {stepOneStyles} from '../../style/signUpStyles';
import {stepTwoStyles} from '../../style/checkRegisteredCarStyles';

const StepTwoReturnLocationModal = ({ isVisible, handleModal, coords, setCoords, returnAddress }) => {
    const [coordsInModal, setCoordsInModal] = useState(coords);
    const [returnAddressInModal, setReturnAddressInModal] = useState(returnAddress);

    return (
        <Modal
            visible={isVisible}
            presentationStyle='pageSheet'
            animationType='slide'
        >
            <View style={callCarStepOneMapStyles.modalWrapper}>
                <Ionicons
                    name='ios-close'
                    size={35}
                    style={{ margin: 10, zIndex: 1, }}
                    onPress={() => {
                        setCoordsInModal(coords);
                        handleModal(false)
                    }}
                />
                <MapView
                    style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                    }}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: coordsInModal.latitude,
                        longitude: coordsInModal.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }}
                    onRegionChange={(Region) => {
                        setCoordsInModal({ ...Region });
                    }}
                    onRegionChangeComplete={(Region) => {
                        LayoutAnimation.configureNext(LayoutAnimation.create(300, 'easeInEaseOut', 'opacity'));
                        setCoordsInModal({ ...Region });
                        reverseGeocoding(coordsInModal)
                            .then(res => {
                                res = res.results[0];
                                const firstAddress = `${res.region.area3.name} ${res.region.area4.name} ${res.land.number1}${res.land.number2.length ? `-${res.land.number2}` : ``}`;
                                const secondAddress = `${res.region.area1.name} ${res.region.area2.name} ${firstAddress}`;

                                const newReturnAddressInModal = {
                                    firstAddress,
                                    secondAddress,
                                }
                                setReturnAddressInModal(newReturnAddressInModal);
                            })
                            .catch(err => console.log("err: ", err));
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: coordsInModal.latitude,
                            longitude: coordsInModal.longitude,
                        }}
                        tracksViewChanges={false}
                    />
                </MapView>
            </View>
            <View style={stepTwoStyles.addressWrapperInModal}>
                <Text style={stepTwoStyles.firstAddress}>{returnAddressInModal.firstAddress}</Text>
                <Text style={stepTwoStyles.secondAddress}>{returnAddressInModal.secondAddress}</Text>
            </View>
            <TouchableOpacity
                style={callCarStepOneMapStyles.button}
                activeOpacity={1}
                onPress={() => {
                    setCoords(coordsInModal);
                    handleModal(false)
                }}
            >
                <View style={stepOneStyles.buttonTextContainer}>
                    <Text style={stepOneStyles.buttonText}>복귀위치 설정하기</Text>
                </View>
            </TouchableOpacity>
        </Modal>
    );
}

export default StepTwoReturnLocationModal;

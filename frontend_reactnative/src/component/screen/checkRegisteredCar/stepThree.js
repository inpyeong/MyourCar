import React, { useState, useEffect, useRef, useLayoutEffect, } from 'react';
import { HeaderBackButton } from '@react-navigation/stack';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import io from 'socket.io-client';
import { stepThreeStyles } from '../../style/checkRegisteredCarStyles';
import MapView, { PROVIDER_GOOGLE, Marker, Overlay } from "react-native-maps";
import {reverseGeocoding} from '../../../util/APIUtils';
import {callCarStepOneMapStyles} from '../../style/callCarStyles';
import {transformUTCToDateJson} from '../../../util/TimeUtils';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

let ioClient;
let idx = 0;
let firstAddress = "", secondAddress = "";

const StepThreeScreen = (props) => {
    const { params } = props.route;
    console.log(params.car);
    const availableStartTimeObj = transformUTCToDateJson(params.car.availableStartTime);
    const availableEndTimeObj = transformUTCToDateJson(params.car.availableEndTime);
    const mapRef = useRef(null);
    const mounted = useRef({});
    const _mounted = useRef();
    const [coords, setCoords] = useState({
        latitude: params.car.currentLocationLatitude,
        longitude: params.car.currentLocationLongitude,
        battery: 70,
    });

    useEffect(() => {
        ioClient = io('http://localhost:3000');
        if(!_mounted.current) {
            _mounted.current = true;
            onServer(idx++);
        } else {
            const timer = setTimeout(() => onServer(idx++), 3000);
            return () => {
                if(idx == 10)
                    idx = 0;
                clearTimeout(timer);
            }
        }
    }, [coords]);

      useEffect(() => {
              mapRef.current.getCamera()
                  .then(camera => {
                      camera.center.latitude = coords.latitude;
                      camera.center.longitude = coords.longitude;
                      camera.zoom = 16.829204559326172;
                      mapRef.current.setCamera(camera, 1000);
                  })
              reverseGeocoding(coords)
                  .then(res => {
                      res = res.results[0];
                      mounted.current.firstAddress = `${res.region.area3.name} ${res.region.area4.name} ${res.land.number1}${res.land.number2.length ? `-${res.land.number2}` : ``}`;
                      mounted.current.secondAddress = `${res.region.area1.name} ${res.region.area2.name} ${mounted.current.firstAddress}`;
                  })
                  .catch(err => console.log("error:", err))
      }, [coords]);

      const onServer = (idx) => {
          const sendObject = {
              idx: idx,
          }
          ioClient.emit('move', sendObject);
          ioClient.on('coordinate', (data) => {
              console.log(data);
              const coordsCopy = { ...coords };
              coordsCopy.latitude = data.result.latitude;
              coordsCopy.longitude = data.result.longitude;
              coordsCopy.battery = data.result.battery;
              setCoords(coordsCopy);
              ioClient.disconnect()
          })
      };

      useLayoutEffect(() => {
          props.navigation.setOptions({
             headerLeft: (_props) => (
                 <HeaderBackButton
                     {..._props}
                     onPress={() => {
                         props.navigation.goBack();
                         ioClient.disconnect();
                         idx = 0;
                     }}
                 />
             ),
      });
    }, [props.navigation]);

    return (
        <View style={{ flex: 1, }}>
            <MapView
                ref={mapRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    bottom: '30%',
                    left: 0,
                    right: 0,
                }}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
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
            <View style={stepThreeStyles.infoWrapper}>
                <View style={stepThreeStyles.addressWrapper}>
                    <Text style={stepThreeStyles.firstAddress}>{mounted.current.firstAddress}</Text>
                    <Text style={stepThreeStyles.secondAddress}>{mounted.current.secondAddress}</Text>
                </View>
                <View style={stepThreeStyles.timeWrapper}>
                    <Ionicons
                        name={"time-outline"}
                        size={30}
                        style={{ color: 'rgb(119, 191, 243)'}}
                    />
                    <Text style={stepThreeStyles.timeText}>서비스 시간 : </Text>
                    <Text style={stepThreeStyles.time}>{`${availableStartTimeObj.D} ${availableStartTimeObj.H}:${availableStartTimeObj.M} - ${availableEndTimeObj.D === '오늘' ? '' : availableEndTimeObj.D} ${availableEndTimeObj.H}:${availableEndTimeObj.M}`}</Text>
                </View>
                <View style={stepThreeStyles.batteryWrapper}>
                    <Ionicons
                        name={"battery-half-sharp"}
                        size={30}
                        style={{ color: 'rgb(119, 191, 243)'}}
                    />
                    <Text style={stepThreeStyles.batteryText}>남은 배터리 : </Text>
                    <Text style={stepThreeStyles.battery}> {coords.battery}%</Text>
                </View>
            </View>
        </View>
    )
};

export default StepThreeScreen;

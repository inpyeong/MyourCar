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
import { callCarStepOneMapStyles } from '../../style/callCarStyles';
import {Picker, PickerIOS} from '@react-native-picker/picker';
import { DAY } from '../../../constants';
import {stepOneStyles} from '../../style/signUpStyles';

const StepOneModal = ({ isVisible, handleModal, serviceTime, setServiceTime }) => {
    const [expanded, setExpanded] = useState({
        start: false,
        end: false,
    });

    const [serviceTimeInModal, setServiceTimeInModal] = useState({...serviceTime});

    const setServiceD = (type, date, itemIndex) => {
        let serviceTimeInModalCopy = {...serviceTimeInModal};
        if(itemIndex === 0) {
            type === "start" ? serviceTimeInModalCopy.startD = '오늘' : serviceTimeInModalCopy.endD = '오늘';
        } else if (itemIndex === 1) {
            type === "start" ? serviceTimeInModalCopy.startD = '내일' : serviceTimeInModalCopy.endD = '내일';
        } else {
            type === "start" ? serviceTimeInModalCopy.startD = date : serviceTimeInModalCopy.endD = date;
        }
        if(checkServiceTimeIsAvailable(serviceTimeInModalCopy)) {
            setServiceTimeInModal(serviceTimeInModalCopy);
        } else {
            return (
                Alert.alert(
                    "시간 설정 오류",
                    "다시 시간을 확인해주세요.",
                    [
                        { text: "확인", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                )
            );
        }
    }

    const setServiceHM = (_type, type, value) => {
        let serviceTimeInModalCopy = {...serviceTimeInModal};
        if(type === "H")
            _type === "start" ? serviceTimeInModalCopy.startH = value : serviceTimeInModalCopy.endH = value;
        else
            _type === "start" ? serviceTimeInModalCopy.startM = value : serviceTimeInModalCopy.endM = value;

        if(checkServiceTimeIsAvailable(serviceTimeInModalCopy)) {
            setServiceTimeInModal(serviceTimeInModalCopy);
        } else {
            return (
                Alert.alert(
                    "시간 설정 오류",
                    "다시 시간을 확인해주세요.",
                    [
                        { text: "확인", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                )
            );
        }
    }

    console.log(serviceTimeInModal);

    return (
        <Modal
            visible={isVisible}
            presentationStyle='pageSheet'
            animationType='slide'
        >
            <View style={callCarStepOneMapStyles.modalWrapper}>
                <Ionicons
                    name='close-outline'
                    size={30}
                    style={{ margin: 10, opacity: 0.6, }}
                    onPress={() => {
                        setServiceTimeInModal({...serviceTime})
                        handleModal(false)
                    }}
                />
                <Text style={callCarStepOneMapStyles.modalTitle}>
                    총 {calcServiceTime(serviceTimeInModal)} 이용
                </Text>
                <Text style={callCarStepOneMapStyles.modalSubtitle}>
                    {`${serviceTimeInModal.startD} ${serviceTimeInModal.startH}:${serviceTimeInModal.startM} - ${serviceTimeInModal.endD} ${serviceTimeInModal.endH}:${serviceTimeInModal.endM}`}
                </Text>
                <TouchableOpacity
                    style={callCarStepOneMapStyles.serviceContainer}
                    activeOpacity={1}
                    onPress={() => {
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                        let expandedCopy = {...expanded};
                        expandedCopy.start = !expandedCopy.start;
                        expandedCopy.end = false
                        setExpanded(expandedCopy);
                    }}
                >
                    <Text style={callCarStepOneMapStyles.serviceText}>
                        시작 시각
                    </Text>
                    <View style={callCarStepOneMapStyles.serviceInfoContainer}>
                        <Text style={callCarStepOneMapStyles.serviceInfo}>
                            {`${serviceTimeInModal.startD} ${serviceTimeInModal.startH}:${serviceTimeInModal.startM}`}
                        </Text>
                        <Ionicons
                            name={expanded.start ? 'chevron-up-outline' : 'chevron-down-outline'}
                            size={25}
                            style={{ opacity: 0.5, marginRight: '6%', }}
                        />
                    </View>
                </TouchableOpacity>
                {expanded.start && (
                    <View style={callCarStepOneMapStyles.pickerWrapper}>
                        <AllServiceD
                            type="start"
                            serviceTime={serviceTimeInModal}
                            setServiceD={setServiceD}
                        />
                        <AllServiceH
                            type="start"
                            serviceTime={serviceTimeInModal}
                            setServiceHM={setServiceHM}
                        />
                        <AllServiceM
                            type="start"
                            serviceTime={serviceTimeInModal}
                            setServiceHM={setServiceHM}
                        />
                    </View>
                )}
                <TouchableOpacity
                    style={callCarStepOneMapStyles.serviceContainer}
                    activeOpacity={1}
                    onPress={() => {
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                        let expandedCopy = {...expanded};
                        expandedCopy.end = !expandedCopy.end;
                        expandedCopy.start = false;
                        setExpanded(expandedCopy);
                    }}
                >
                    <Text style={callCarStepOneMapStyles.serviceText}>
                        종료 시각
                    </Text>
                    <View style={callCarStepOneMapStyles.serviceInfoContainer}>
                        <Text style={callCarStepOneMapStyles.serviceInfo}>
                            {`${serviceTimeInModal.endD} ${serviceTimeInModal.endH}:${serviceTimeInModal.endM}`}
                        </Text>
                        <Ionicons
                            name={expanded.end ? 'chevron-up-outline' : 'chevron-down-outline'}
                            size={25}
                            style={{ opacity: 0.5, marginRight: '6%', }}
                        />
                    </View>
                </TouchableOpacity>
                {expanded.end && (
                    <View style={callCarStepOneMapStyles.pickerWrapper}>
                        <AllServiceD
                            type="end"
                            serviceTime={serviceTimeInModal}
                            setServiceD={setServiceD}
                        />
                        <AllServiceH
                            type="end"
                            serviceTime={serviceTimeInModal}
                            setServiceHM={setServiceHM}
                        />
                        <AllServiceM
                            type="end"
                            serviceTime={serviceTimeInModal}
                            setServiceHM={setServiceHM}
                        />
                    </View>
                )}
            </View>
            <TouchableOpacity
                style={callCarStepOneMapStyles.button}
                activeOpacity={1}
                onPress={() => {
                    setServiceTime(serviceTimeInModal)
                    handleModal(false)
                }}
            >
                <View style={stepOneStyles.buttonTextContainer}>
                    <Text style={stepOneStyles.buttonText}>확인</Text>
                </View>
            </TouchableOpacity>
        </Modal>
    );
}

const getServiceTimeDateObject = (serviceTime) => {
    const now = new Date();

    let startYear, startMonth, startDay, startHour, startMinute;
    let endYear, endMonth, endDay, endHour, endMinute;

    if(serviceTime.startD === "오늘" || serviceTime.startD === "내일") {
        startYear = now.getFullYear();
    } else startYear = serviceTime.startD.substr(0, 4);
    if(serviceTime.endD === "오늘" || serviceTime.endD === "내일") {
        endYear = now.getFullYear();
    } else endYear = serviceTime.endD.substr(0, 4);

    if(serviceTime.startD === "오늘" || serviceTime.startD === "내일") {
        startMonth = now.getMonth() + 1;
        if(startMonth.toString().length === 1) startMonth = '0' + startMonth;
    } else startMonth = serviceTime.startD.substr(5, 2);
    if(serviceTime.endD === "오늘" || serviceTime.endD === "내일") {
        endMonth = now.getMonth() + 1;
        if(endMonth.toString().length === 1) endMonth = '0' + endMonth;
    } else endMonth = serviceTime.endD.substr(5, 2);

    if(serviceTime.startD === "오늘") {
        startDay = now.getDate();
        if(startDay.toString().length === 1) startDay = '0' + startDay;
    } else if (serviceTime.startD === "내일") {
        startDay = now.getDate() + 1;
        if(startDay.toString().length === 1) startDay = '0' + startDay;
    }
    else startDay = serviceTime.startD.substr(10, 2);
    if(serviceTime.endD === "오늘") {
        endDay = now.getDate();
        if(endDay.toString().length === 1) endDay = '0' + endDay;
    } else if (serviceTime.endD === "내일") {
        endDay = now.getDate() + 1;
        if(endDay.toString().length === 1) endDay = '0' + endDay;
    } else endDay = serviceTime.endD.substr(10, 2);

    startHour = serviceTime.startH;
    endHour = serviceTime.endH;

    startMinute = serviceTime.startM;
    endMinute = serviceTime.endM;

    console.log(startYear, startMonth, startDay, startHour, startMinute);
    console.log(endYear, endMonth, endDay, endHour, endMinute);

    const serviceStartTime = new Date(`${startYear}-${startMonth}-${startDay}T${startHour}:${startMinute}:00`)
    const serviceEndTime = new Date(`${endYear}-${endMonth}-${endDay}T${endHour}:${endMinute}:00`)

    return { now, serviceStartTime, serviceEndTime };
}

const calcServiceTime = (serviceTime) => {
    const dateObject = getServiceTimeDateObject(serviceTime);
    let dateDiff = dateObject.serviceEndTime - dateObject.serviceStartTime;

    const day = !parseInt(dateDiff / 86400000) ? `` : `${parseInt(dateDiff / 86400000)}일 `;
    dateDiff = dateDiff % 86400000;
    const hour = !parseInt(dateDiff / 3600000) ? `` : `${parseInt(dateDiff / 3600000)}시간 `;
    dateDiff = dateDiff % 3600000;
    const minute = !parseInt(dateDiff / 60000) ? `` : `${parseInt(dateDiff /= 60000)}분`;

    return `${day}${hour}${minute}`;
}

const checkServiceTimeIsAvailable = (serviceTime) => {

    const dateObject = getServiceTimeDateObject(serviceTime);

    if(dateObject.now - dateObject.serviceStartTime > 0) return false;
    if(dateObject.serviceStartTime - dateObject.serviceEndTime >= 0) return false;
    return true;
}

const AllServiceD = ({ type, serviceTime, setServiceD }) => {
    let ret = [], now = new Date();
    for(let i = 0; i < 365; ++i) {
        let dayOfWeek = DAY[now.getDay()],
            day = now.getDate(),
            month = now.getMonth() + 1,
            year = now.getFullYear();
        if(day.toString().length == 1) day = '0' + day;
        if(month.toString().length == 1) month = '0' + month;
        ret.push(`${year} ${month} / ${day} (${dayOfWeek})`)
        now.setTime(now.getTime() + (24 * 60 * 60 * 1000));
    }

    const setValue = (retIndex, originValue)  => {
        if(retIndex === 0) {
            return "오늘";
        } else if (retIndex === 1) {
            return "내일";
        } else return originValue;
    }

    return (
        <Picker
            style={{ width: 150, justifyContent: 'flex-start', }}
            selectedValue={type === "start" ? serviceTime.startD : serviceTime.endD}
            onValueChange={(itemValue, itemIndex) => setServiceD(type, itemValue, itemIndex)}
        >
            {ret.map((value, i) => {
                return (
                    <Picker.Item label={value.slice(5)} value={setValue(i, value)} />
                );
            })}
        </Picker>
    );
}

const AllServiceH = ({ type, serviceTime, setServiceHM }) => {
    let ret = [];
    for(let i = 0; i < 24; ++i) {
        if(!parseInt(i / 10)) ret.push('0' + i);
        else ret.push(i.toString());
    }
    return (
        <Picker
            style={{ width: 100, justifyContent: 'flex-start', }}
            selectedValue={type === "start" ? serviceTime.startH.toString() : serviceTime.endH.toString()}
            onValueChange={(itemValue, itemIndex) => setServiceHM(type, "H",itemValue)}
        >
            {ret.map((value) => {
                return (
                    <Picker.Item label={value} value={value} />
                );
            })}
        </Picker>
    );
}

const AllServiceM = ({ type, serviceTime, setServiceHM }) => {
    let ret = [];
    for(let i = 0; i < 60; i+=10) {
        if(i === 0) ret.push('00');
        else ret.push(i.toString());
    }
    return (
        <Picker
            style={{ width: 100, justifyContent: 'flex-start', }}
            selectedValue={type === "start" ? serviceTime.startM.toString() : serviceTime.endM.toString()}
            onValueChange={(itemValue, itemIndex) => setServiceHM(type, "M", itemValue)}
        >
            {ret.map((value) => {
                return (
                    <Picker.Item label={value} value={value} />
                );
            })}
        </Picker>
    );
}

export default StepOneModal;

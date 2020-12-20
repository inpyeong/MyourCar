import React, { useState, useEffect, useRef, } from 'react';
import {
    View,
    Text,
    Image,
    Alert,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { callCarStepThreeStyles } from '../../style/callCarStyles';
import Stars from 'react-native-stars';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { calcServiceTime, calcServiceTimeToMinute, transferToUriDate, } from '../../../util/TimeUtils';
import { getReviews, postService } from '../../../util/APIUtils';
import Modal from 'react-native-modal';

const StepThreeScreen = (props) => {
    const { params } = props.route;
    const [modal, openModal] = useState(false);
    const [parkingType, setParkingType] = useState({
        comment: "주차장 유형을 선택해주세요.",
        type: 0,
    });
    const [reviewsInfo, setReviewsInfo] = useState(null);

    const _setParkingType = (comment, type) => {
        const parkingTypeCopy = { ...parkingType };
        parkingTypeCopy.comment = comment;
        parkingTypeCopy.type = type;
        setParkingType(parkingTypeCopy);
        openModal(false);
    }

    useEffect(() => {
        getReviews(params.car.id, 0, 5)
            .then(res => {
                console.log(res);
                setReviewsInfo(res)
            })
    }, []);

    console.log(params);
    return (
        <View style={{ flex: 1, }}>
            <ScrollView
                style={callCarStepThreeStyles.flexContainer}
                bounces={false}
            >
                <View style={callCarStepThreeStyles.carInfoContainer}>
                    <View style={callCarStepThreeStyles.carImageNameContainer}>
                        <View style={callCarStepThreeStyles.carImageWrapper}>
                            <Image
                                source={params.carImageSource}
                                style={callCarStepThreeStyles.carImage}
                                resizeMode="contain"
                            />
                        </View>
                        <View style={callCarStepThreeStyles.carNameWrapper}>
                            <Text style={callCarStepThreeStyles.carName}>{params.car.name}</Text>
                            <Ionicons
                                name='chevron-forward-outline'
                                size={25}
                                style={{ opacity: 0.6, marginTop: 2, }}
                                color='rgb(167, 169, 177)'
                            />
                        </View>
                    </View>
                    <View style={callCarStepThreeStyles.feeContainer}>
                        <View style={callCarStepThreeStyles.feeWrapper}>
                            <Text style={callCarStepThreeStyles.feeText}>대여 요금</Text>
                            <Text style={callCarStepThreeStyles.feeValue}>{params.car.rentFee}원</Text>
                        </View>
                        <View style={callCarStepThreeStyles.feeWrapper}>
                            <Text style={callCarStepThreeStyles.feeText}>시간 요금</Text>
                            <Text style={callCarStepThreeStyles.feeValue}>{params.car.timeFee}원 /분</Text>
                        </View>
                    </View>
                </View>
                <View style={callCarStepThreeStyles.emptyView} />
                <View style={callCarStepThreeStyles.reviewRatingContainer}>
                    <View style={callCarStepThreeStyles.reviewRatingTextWrapper}>
                        <Text style={callCarStepThreeStyles.title}>차량 리뷰 및 평점</Text>
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate('ReviewScreen', {
                                reviewsInfo: reviewsInfo,
                                carId: params.car.id,
                            })}
                        >
                            <Text style={callCarStepThreeStyles.actionLink}>리뷰 확인하기</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={callCarStepThreeStyles.ratingWrapper}>
                         <Stars
                             default={getStarAvg(reviewsInfo)}
                             spacing={4}
                             count={5}
                             fullStar={
                                 <Ionicons
                                     name={'star'}
                                     style={callCarStepThreeStyles.fullStar}
                                     size={30}
                                 />
                             }
                             emptyStar={
                                 <Ionicons
                                     name={'star-outline'}
                                     style={callCarStepThreeStyles.fullStar}
                                     size={30}
                                 />
                             }
                         />
                         <Text style={callCarStepThreeStyles.reviewCnt}>({reviewsInfo ? reviewsInfo.totalElements : null})</Text>
                     </View>
                </View>
                <View style={callCarStepThreeStyles.emptyView} />
                <View style={callCarStepThreeStyles.serviceTimeContainer}>
                    <View style={callCarStepThreeStyles.serviceTimeHeaderWrapper}>
                        <Text style={callCarStepThreeStyles.title}>이용 시간</Text>
                        <Text style={callCarStepThreeStyles.actionLink}>변경하기</Text>
                    </View>
                    <View style={callCarStepThreeStyles.serviceTimeContentWrapper}>
                        <Text style={callCarStepThreeStyles.calcServiceTime}>{calcServiceTime(params.serviceTime)}</Text>
                        <Text style={callCarStepThreeStyles.serviceTime}>
                            {`${params.serviceTime.startD} ${params.serviceTime.startH}:${params.serviceTime.startM} - ${params.serviceTime.endD === '오늘' ? '' : params.serviceTime.endD} ${params.serviceTime.endH}:${params.serviceTime.endM}`}
                        </Text>
                    </View>
                </View>
                <View style={callCarStepThreeStyles.emptyView} />
                <View style={callCarStepThreeStyles.callLocationContainer}>
                    <View style={callCarStepThreeStyles.callLocationHeaderWrapper}>
                        <Text style={callCarStepThreeStyles.title}>대여 장소</Text>
                    </View>
                    <View style={callCarStepThreeStyles.callLocationContentWrapper}>
                        <Text style={callCarStepThreeStyles.callLocation}>{params.addressTitle}</Text>
                    </View>
                    <TouchableOpacity
                        style={callCarStepThreeStyles.parkingTypeBtn}
                        onPress={() => openModal(true)}
                    >
                        <Text
                            style={[callCarStepThreeStyles.modalBtnPlaceHolder,
                                { color: parkingType.type === 0 ? 'rgb(190, 190, 193)' : '#000'}]}
                        >
                            {parkingType.comment}
                        </Text>
                        <Ionicons
                            name={"chevron-down-outline"}
                            size={20}
                            style={{ paddingRight: 15, opacity: 0.4, }}
                        />
                    </TouchableOpacity>
                    <Modal
                        style={callCarStepThreeStyles.parkingTypeModal}
                        isVisible={modal}
                        onBackdropPress={() => openModal(false)}
                    >
                        <View style={callCarStepThreeStyles.modalContainer}>
                            <View style={callCarStepThreeStyles.modalTitleWrapper}>
                                <Text style={callCarStepThreeStyles.modalTitle}>주차장 유형 선택</Text>
                            </View>
                            <TouchableOpacity
                                style={callCarStepThreeStyles.modalContent}
                                onPress={() => _setParkingType("아파트 / 오피스텔", 1)}
                            >
                                <Text>아파트 / 오피스텔</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={callCarStepThreeStyles.modalContent}
                                onPress={() => _setParkingType("빌딩 / 상가 / 관공서", 2)}
                            >
                                <Text>빌딩 / 상가 / 관공서</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[callCarStepThreeStyles.modalContent, { marginBottom: 50, }]}
                                onPress={() => _setParkingType("일반 / 공영 주차장", 3)}
                            >
                                <Text>일반 / 공영 주차장</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </View>
                <View style={callCarStepThreeStyles.emptyView} />
                <View style={callCarStepThreeStyles.paymentContainer}>
                    <View style={callCarStepThreeStyles.paymentHeaderWrapper}>
                        <Text style={callCarStepThreeStyles.title}>결제수단</Text>
                    </View>
                    <View style={callCarStepThreeStyles.methodContentWrapper}>
                        <Text style={callCarStepThreeStyles.method}>비씨 0752 / 개인</Text>
                    </View>
                </View>
                <View style={callCarStepThreeStyles.emptyView} />
                <View style={callCarStepThreeStyles.noticeContainer}>

                </View>
            </ScrollView>
            <View style={callCarStepThreeStyles.bottomBtnContainer}>
                <View style={callCarStepThreeStyles.totalCostWrapper}>
                    <Text style={callCarStepThreeStyles.totalCostPrefix}>총 합계 </Text>
                    <Text style={callCarStepThreeStyles.totalCost}>{getTotalCost(params)}</Text>
                    <Text style={callCarStepThreeStyles.totalCostPost}>원</Text>
                </View>
                <TouchableOpacity
                    style={callCarStepThreeStyles.submitWrapper}
                    onPress={() => {
                        const { serviceTime } = params;
                        const serviceStartTime = `${transferToUriDate(serviceTime.startD)} ${serviceTime.startH}:${serviceTime.startM}:00`;
                        const serviceEndTime = `${transferToUriDate(serviceTime.endD)} ${serviceTime.endH}:${serviceTime.endM}:00`;
                        const requestBody = {
                            callLocationLatitude: params.coords.latitude,
                            callLocationLongitude: params.coords.longitude,
                            serviceStartTime: serviceStartTime,
                            serviceEndTime: serviceEndTime,
                            parkingType: parkingType.comment,
                            userId: params.currentUser.id,
                            carId: params.car.id,
                        }
                        postService(requestBody)
                            .then(res => {
                                console.log(res);
                                Alert.alert(
                                    "부름 신청 완료",
                                    "예약 차량 확인에서 예약 차량을 \n확인하실 수 있습니다.",
                                    [
                                        { text: "확인", onPress: () => {
                                            console.log("OK Pressed");
                                            props.navigation.navigate('Main');
                                        }}
                                    ],
                                    { cancelable: false }
                                )
                            })
                            .catch(err => console.log("error:", err));

                    }}
                >
                    <Text style={callCarStepThreeStyles.submit}>부름 신청하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const getStarAvg = (reviewsInfo) => {
    let totalScore = 0;
    if(!reviewsInfo) return 0;
    reviewsInfo.content.forEach(review => {
        totalScore += review.score;
    })
    if(reviewsInfo.totalElements === 0) {
        return 0;
    } else return totalScore / reviewsInfo.totalElements;
}

const getTotalCost = (params) => {
    return calcServiceTimeToMinute(params.serviceTime) * params.car.timeFee + params.car.rentFee;
}

export default StepThreeScreen;

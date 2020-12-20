import React, { useState, useEffect, useRef } from 'react'
import {
    View,
    Text,
    Image,
    Alert,
    Keyboard,
    TextInput,
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Stars from 'react-native-stars';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import { postReviews } from '../../../util/APIUtils';
import { stepTwoStyles } from "../../style/checkReservedCarStyles";

const StepTwoScreen = (props) => {
    const { params } = props.route;
    // console.log(params);

    const [starVal, setStarVal] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [reviewImage, setReviewImage] = useState([]);

    const Submit = () => {
        return (
            <TouchableOpacity
                style={stepTwoStyles.submitBtn}
                onPress={() => {
                    const requestBody = {
                        score: starVal,
                        comment: reviewText,
                    };
                    postReviews(params.car.id, requestBody)
                        .then(res => {
                            console.log(res);
                            Alert.alert(
                                "리뷰 등록 완료",
                                "소중한 리뷰 감사합니다.",
                                [
                                    { text: "확인", onPress: () => {
                                        props.navigation.navigate("Main");
                                        }}
                                ]
                            );
                        })
                }}
            >
                <Text style={stepTwoStyles.submitText}>리뷰 작성</Text>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={stepTwoStyles.flexContainer}>
                <Car
                    params={params}
                    starVal={starVal}
                    setStarVal={setStarVal}
                />
                <View style={stepTwoStyles.emptyView} />
                <ReviewText
                    multiline
                    numberOfLines={4}
                    onChangeText={text => setReviewText(text)}
                    value={reviewText}
                    placeholder={"차량의 리뷰를 작성해주세요.\n\n" +
                    "솔직한 리뷰는 다른 고객에게 큰 도움이 됩니다."}
                />
                <View style={stepTwoStyles.emptyView} />
                <ReviewImage
                    reviewImage={reviewImage}
                    setReviewImage={setReviewImage}
                />
                <View style={[stepTwoStyles.emptyView, { height: '100%', }]} />
                <Submit />
            </View>
        </TouchableWithoutFeedback>
    )
}

const Car = ({ params, starVal, setStarVal }) => {
    return (
        <View style={stepTwoStyles.carContainer}>
            <Image
                source={params.carImage}
                style={stepTwoStyles.carImage}
                resizeMode='contain'
            />
            <View style={stepTwoStyles.starContainer}>
                <Text style={stepTwoStyles.carName}>{params.car.name}</Text>
                <Stars
                    spacing={2}
                    count={5}
                    update={(starVal) => setStarVal(starVal)}
                    fullStar={
                        <FontAwesome
                            name={'star'}
                            style={stepTwoStyles.fullStar}
                            size={25}
                        />
                    }
                    emptyStar={
                        <FontAwesome
                            name={'star-o'}
                            style={stepTwoStyles.fullStar}
                            size={25}
                        />
                    }
                />
            </View>
        </View>

    );
}

const ReviewText = (props) => {
    return (
            <View style={stepTwoStyles.reviewTextContainer}>
                <TextInput
                    {...props}
                    style={stepTwoStyles.textInput}
                    editable
                    maxLength={225}
                />
            </View>
    );
}

const ReviewImage = ({ reviewImage, setReviewImage }) => {

    const selectFile = () => {
        const options = {
            title: 'Select Image',
        };

        ImagePicker.showImagePicker(options, (res) => {
            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                alert(res.customButton);
            } else {
                const reviewImageCopy = [ ...reviewImage ];
                reviewImageCopy.push(res.uri);
                setReviewImage(reviewImageCopy);
            }
        });
    }

    return (
        <View style={stepTwoStyles.reviewImageContainer}>
            <ScrollView
                style={{ marginBottom: 5, }}
                horizontal
            >
                <View style={stepTwoStyles.boxWrapper}>
                    <Ionicons
                        name={"camera"}
                        size={80}
                        onPress={() => selectFile()}
                        style={{ backgroundColor: 'rgb(197, 197, 197)', color: '#FFF', }}
                    />
                </View>
                {reviewImage.map((uri) => {
                    return (
                        <Image
                            source={{ uri: uri }}
                            style={{ width: 110, height: 110, marginRight: 10,}}
                        />
                    );
                })}
            </ScrollView>
            <View style={stepTwoStyles.imageNumWrapper}>
                <Text>{reviewImage.length} / 5</Text>
            </View>
        </View>
    );
}

export default StepTwoScreen;

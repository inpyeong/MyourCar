import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Alert,
    TouchableOpacity,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { postCar } from '../../util/APIUtils';
import { ACCESS_KEY_ID, SECRET_ACCESS_KEY, } from '../../constants';
import fs from 'react-native-fs';
import {decode} from 'base64-arraybuffer';
import S3 from 'aws-sdk/clients/s3';
import { registerCarStepOneStyles, registerCarStepTwoStyles } from '../style/registerCarStyles';

class StepOneScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            carName: '',
            carLicensePlateNum: ','
        };
    }

    selectFile = () => {
        let options = {
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
                let source = res;
                this.setState({
                    image: source.uri,
                });
            }
        });
    };

    render() {
        const { image } = this.state;
        let imageButton = image ?
            <Image
                source={{uri: image}}
                style={{width: '100%', height: '100%'}}
            />
            :
            <Ionicons
                style={{ opacity: 0.8, color: '#FFF'}}
                name={"add-sharp"}
                size={80}
            />

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={registerCarStepOneStyles.container}>
                    <View style={registerCarStepOneStyles.setNameView}>
                        <Text style={registerCarStepOneStyles.label}>차량 명</Text>
                        <TextInput
                            style={registerCarStepOneStyles.inputBox}
                            placeholder="차량 명을 입력해주세요."
                            autoCorrect={false}
                            onChangeText={(carName) => this.setState({ carName })}
                        />
                    </View>
                    <View style={registerCarStepOneStyles.setNumberView}>
                        <Text style={registerCarStepOneStyles.label}>차량 번호</Text>
                        <TextInput
                            style={registerCarStepOneStyles.inputBox}
                            placeholder="차량 번호를 입력해주세요."
                            autoCorrect={false}
                            onChangeText={(carLicensePlateNum) => this.setState({ carLicensePlateNum})}
                        />
                    </View>
                    <View style={registerCarStepOneStyles.setImageView}>
                        <Text style={registerCarStepOneStyles.label}>운전 면허증 등록</Text>
                        <TouchableOpacity
                            style={registerCarStepOneStyles.setImageButtonContainer}
                            onPress={() => this.selectFile('front')}>
                            {imageButton}
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={registerCarStepOneStyles.nextButtonContainer}
                        onPress={() => this.props.navigation.navigate('RegisterCarStepTwo', {
                            userId: this.props.route.params.userId,
                            licenseImage: image,
                            carName: this.state.carName,
                            carLicensePlateNum: this.state.carLicensePlateNum,
                        })}
                    >
                        <View style={registerCarStepOneStyles.nextButtonTextContainer}>
                            <Text style={registerCarStepOneStyles.nextButtonText}>다음 단계</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

class StepTwoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: {
                front: '',
                back: '',
                left: '',
                right: '',
            },
        };
    }
    selectFile = (param) => {
        let options = {
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
                let source = res;
                let temp = this.state.image;
                temp[param] = source.uri;
                this.setState({
                    image: temp,
                });
            }
        });
    };

    uploadImageOnS3 = (images, userId, carName) => {
        return new Promise((resolve, reject) => {
            // const imageLocation = {
            //     certificateImage: '',
            //     frontImage: '',
            //     backImage: '',
            //     rightImage: '',
            //     leftImage: '',
            // };
            const imageLocation = {};
            imageLocation[userId + '-' + carName + '-certificateImage'] = '';
            imageLocation[userId + '-' + carName + '-frontImage'] = '';
            imageLocation[userId + '-' + carName + '-backImage'] = '';
            imageLocation[userId + '-' + carName + '-rightImage'] = '';
            imageLocation[userId + '-' + carName + '-leftImage'] = '';

            console.log("images", images);
            console.log("imageLocation", imageLocation);

            const s3bucket = new S3({
                accessKeyId: ACCESS_KEY_ID,
                secretAccessKey: SECRET_ACCESS_KEY,
                Bucket: 'capstone2-bucket',
                signatureVersion: 'v4',
            });
            s3bucket.createBucket();
            const params = {
                Bucket: 'capstone2-bucket',
                Key: "",
                Body: null,
                ContentDisposition: "",
                ContentType: 'image/jpeg',
            };

            let mapIndex = 0;
            {Object.entries({ ...images }).map(([fileName, fileUri]) => {
                const file = {
                    uri: fileUri,
                    name: fileName,
                };
                let contentDeposition = 'inline;filename="' + file.name + '"';
                fs.readFile(file.uri, 'base64')
                    .then(base64 => {
                        const arrayBuffer = decode(base64);
                        console.log("file", file);
                        console.log("arrayBuffer", arrayBuffer);

                        // Change params's value
                        params.Key = file.name;
                        params.Body = arrayBuffer;
                        params.ContentDisposition = contentDeposition;

                        s3bucket.upload(params, (err, data) => {
                            if (err) {
                                reject("Error: Fail to upload image to s3");
                                console.log('error in callback');
                                console.log("error:", err);
                            }
                            console.log("data", data);
                            console.log('success');
                            //url 받아옴
                            console.log('Response URL : ' + data.Location);
                            imageLocation[fileName] = data.Location;
                            if(++mapIndex === Object.keys(imageLocation).length) resolve(imageLocation);
                        });
                    })
                    .catch(err => console.log("error:", err));
            })};
        })
    };

    setButton = (state, direction) => {
        return state ?
            <Image
                source={{uri: this.state.image[direction]}}
                style={{width: '100%', height: '100%', borderRadius: 10, }}
            />
            :
            <Ionicons
                style={{ opacity: 0.8, color: '#FFF'}}
                name={"add-sharp"}
                size={80}
            />
    }

    render() {
        const { front, back, left, right } = this.state.image;
        let frontButton = this.setButton(front, 'front');
        let backButton = this.setButton(back, 'back');
        let rightButton = this.setButton(right, 'right');
        let leftButton = this.setButton(left, 'left');

        const { params } = this.props.route;
        const userId = params ? params.userId : null;
        const licenseImage = params ? params.licenseImage : null;
        const carName = params ? params.carName : null;
        const carLicensePlateNum = params ? params.carLicensePlateNum : null;

        return (
            <View style={registerCarStepTwoStyles.mainContainer}>
                <ScrollView>
                    <View style={registerCarStepTwoStyles.container}>
                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                            <Text style={registerCarStepTwoStyles.titleText}>차량 외관사진 등록</Text>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <View style={registerCarStepTwoStyles.btnContainer}>
                                <Text style={registerCarStepTwoStyles.label}>정면 사진</Text>
                                <TouchableOpacity
                                    style={registerCarStepTwoStyles.buttonContainer}
                                    onPress={() => this.selectFile('front')}>
                                    {frontButton}
                                </TouchableOpacity>
                            </View>
                            <View style={registerCarStepTwoStyles.btnContainer}>
                                <Text style={registerCarStepTwoStyles.label}>후면 사진</Text>
                                <TouchableOpacity
                                    style={registerCarStepTwoStyles.buttonContainer}
                                    onPress={() => this.selectFile('back')}>
                                    {backButton}
                                </TouchableOpacity>
                            </View>
                            <View style={registerCarStepTwoStyles.btnContainer}>
                                <Text style={registerCarStepTwoStyles.label}>오른쪽 사진</Text>
                                <TouchableOpacity
                                    style={registerCarStepTwoStyles.buttonContainer}
                                    onPress={() => this.selectFile('right')}>
                                    {rightButton}
                                </TouchableOpacity>
                            </View>
                            <View style={[registerCarStepTwoStyles.btnContainer, { marginBottom: 20}]}>
                                <Text style={registerCarStepTwoStyles.label}>왼쪽 사진</Text>
                                <TouchableOpacity
                                    style={registerCarStepTwoStyles.buttonContainer}
                                    onPress={() => this.selectFile('left')}>
                                    {leftButton}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity
                    style={registerCarStepTwoStyles.nextButtonContainer}
                    onPress={ async () => {
                        // const images = {
                        //     certificateImage: licenseImage,
                        //     frontImage: front,
                        //     backImage: back,
                        //     rightImage: right,
                        //     leftImage: left,
                        // };
                        const images = {};
                        images[userId + '-' + carName + '-certificateImage'] = licenseImage;
                        images[userId + '-' + carName + '-frontImage'] = front;
                        images[userId + '-' + carName + '-backImage'] = back;
                        images[userId + '-' + carName + '-rightImage'] = right;
                        images[userId + '-' + carName + '-leftImage'] = left;

                        const imageLocation = await this.uploadImageOnS3(images, userId, carName);
                        console.log(imageLocation);
                        const requestBody = {
                            name: carName,
                            licensePlateNumber: carLicensePlateNum,
                            certificateImage : imageLocation[userId + '-' + carName + '-certificateImage'],
                            frontImage : imageLocation[userId + '-' + carName + '-frontImage'],
                            backImage : imageLocation[userId + '-' + carName + '-backImage'],
                            rightImage : imageLocation[userId + '-' + carName + '-rightImage'],
                            leftImage : imageLocation[userId + '-' + carName + '-leftImage'],
                        };
                        postCar(requestBody)
                            .then(res => {
                                console.log(res);
                                Alert.alert(
                                    "차량 등록 완료",
                                    "차량 정보가 등록되었습니다.",
                                    [
                                        { text: "확인", onPress: () => {
                                                console.log("OK Pressed")
                                                this.props.navigation.navigate("Main");
                                            }
                                        }
                                    ],
                                    { cancelable: false }
                                )
                            })
                            .catch(err => console.log("error:", err))
                    }}
                >
                    <View style={registerCarStepTwoStyles.nextButtonTextContainer}>
                        <Text style={registerCarStepTwoStyles.nextButtonText}>등록 완료</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default { StepOneScreen, StepTwoScreen };

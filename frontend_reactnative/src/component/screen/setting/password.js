import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';


export default class PasswordScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { params } = this.props.route;
        const userEmail = params ? params.userEmail : null;
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.flexContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.userEmail}>{userEmail}</Text>
                        <Text style={styles.textUnderEmail}>비밀번호를 재설정해주세요.</Text>
                    </View>
                    <View style={styles.setNewPasswordContainer}>
                        <Text style={styles.label}>새 비밀번호</Text>
                        <TextInput
                            style={styles.inputBox}
                            placeholder="영문, 숫자 포함 8자리 이상 입력"
                            onChangeText={(text) => this.setState({text})}
                        />
                    </View>
                    <View style={styles.checkNewPasswordContainer}>
                        <Text style={styles.label}>새 비밀번호 확인</Text>
                        <TextInput
                            style={styles.inputBox}
                            placeholder="비밀번호 재입력"
                            onChangeText={(text) => this.setState({text})}
                        />
                    </View>
                    <TouchableOpacity style={styles.submitButtonContainer}>
                        <Text style={styles.submitButtonText}>비밀번호 변경하기</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    flexContainer: {
        backgroundColor: '#FFF',
        flex: 1,
        paddingLeft: 25,
    },
    titleContainer: {
        flex: 1.2,
        justifyContent: 'flex-end',
    },
    userEmail: {
        color: 'rgb(0, 171, 249)',
        fontSize: 27,
        fontWeight: '600',
    },
    textUnderEmail: {
        color: 'rgb(44 ,55, 70)',
        fontSize: 25,
        fontWeight: '600',
        marginTop: 8,
    },
    setNewPasswordContainer: {
        flex: 1,
        marginTop: 30,
        justifyContent: 'center',
    },
    checkNewPasswordContainer: {
        flex: 3.6,
    },
    label: {
        marginLeft: 5,
        marginBottom: 12,
        fontSize: 17,
    },
    inputBox: {
        borderWidth: 1,
        borderColor: '#CACACA',
        padding: 10,
        width: 370,
        backgroundColor: '#FFFFFF',
        height: 60,
    },
    submitButtonContainer: {
        position: 'absolute',
        backgroundColor: '#3897f1',
        height: 90,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        marginBottom: 20,
    },
});

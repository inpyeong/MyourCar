import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Button,
    TouchableOpacity,
} from 'react-native';


export default class PhoneNumberScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.curPasswordContainer}>
                    <Text style={styles.label}>현재 전화번호</Text>
                    <TextInput
                        style={styles.inputBox}
                        placeholder="내용을 입력해주세요."
                        onChangeText={(text) => this.setState({text})}
                    />
                </View>
                <View style={styles.setNewPasswordContainer}>
                    <Text style={styles.label}>새 전화번호</Text>
                    <TextInput
                        style={styles.inputBox}
                        placeholder="내용을 입력해주세요."
                        onChangeText={(text) => this.setState({text})}
                    />
                </View>
                <View style={styles.checkNewPasswordContainer}>
                    <Text style={styles.label}>새 전화번호 확인</Text>
                    <TextInput
                        style={styles.inputBox}
                        placeholder="내용을 입력해주세요."
                        onChangeText={(text) => this.setState({text})}
                    />
                </View>
                <TouchableOpacity style={styles.nextButtonContainer}>
                    <View style={styles.nextButtonTextContainer}>
                        <Text style={styles.nextButtonText}>다음 단계</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    curPasswordContainer: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'flex-start',
    },
    setNewPasswordContainer: {
        alignItems: 'flex-start',
        flexDirection: 'column',
        flex: 1,
    },
    checkNewPasswordContainer: {
        alignItems: 'flex-start',
        flex: 2,
        flexDirection: 'column',
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
    nextButtonContainer: {
        backgroundColor: '#3897f1',
        width: '100%',
        height: 90,
    },
    nextButtonTextContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nextButtonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 20,
    },
});

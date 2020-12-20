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


export default class IntroduceScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.setIntroductionContainer}>
                    <Text style={styles.label}>자기소개 재설정</Text>
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
        backgroundColor: '#FFF',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    setIntroductionContainer: {
        flex: 1,
        justifyContent: 'center',
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
        textAlignVertical: 'top',
        width: 370,
        backgroundColor: '#FFFFFF',
        height: 200,
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

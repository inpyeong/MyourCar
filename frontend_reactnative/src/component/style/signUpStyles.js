import { StyleSheet } from 'react-native';

export const stepOneStyles = StyleSheet.create({
    flexContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FDFBFB',
    },
    label: {
        marginLeft: 5,
        marginBottom: 12,
        fontSize: 17,
    },
    content: {
        flexDirection: 'row',
    },
    nameTextInput: {
        width: 270,
        height: 60,
        padding: 10,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderColor: '#CACACA',
        backgroundColor: '#FFFFFF',
    },
    phoneNumberTextInput: {
        width: 270,
        height: 60,
        padding: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: '#CACACA',
        backgroundColor: '#FFFFFF',
    },
    serialNumberTextInput: {
        width: 370,
        height: 60,
        padding: 10,
        borderWidth: 1,
        borderColor: '#CACACA',
        backgroundColor: '#FFFFFF',
    },
    userNameContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        marginBottom: 20,
    },
    selectNativeInfo: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 60,
        borderWidth: 1,
        borderColor: '#CACACA',
    },
    selectCarrierInfo: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 60,
        borderWidth: 1,
        borderColor: '#CACACA',
    },
    serialNumberContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        marginBottom: 20,
    },
    phoneNumberContainer: {
        flex: 4,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: 15,
    },
    phoneNumberAuthBtn: {
        backgroundColor: '#FDFBFB',
        width: 370,
        height: 60,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#CACACA',
    },
    phoneNumberAuthBtnTextContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    phoneNumberAuthBtnText: {
        color: '#3897F1',
        textAlign: 'center',
        fontSize: 17,
    },
    button: {
        backgroundColor: '#3897f1',
        width: '100%',
        height: 90,
    },
    buttonTextContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "#ffffff",
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 20,
    },
});

export const stepTwoStyles = StyleSheet.create({
    flexContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FDFBFB',
    },
    label: {
        marginLeft: 5,
        marginBottom: 12,
        fontSize: 17,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    textInput: {
        width: 370,
        height: 60,
        padding: 10,
        borderWidth: 1,
        borderColor: '#CACACA',
        backgroundColor: '#FFFFFF',
    },
    guideTextContainer: {
        flex: 0.3,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        width: '100%',
        marginLeft: 50,
        marginTop: 30,
    },
    firstGuideText: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondGuideText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emailContainer: {
        flex: 0.8,
        alignItems: "flex-start",
        justifyContent: "center",
    },
    passwordContainer: {
        flex: 0.5,
        alignItems: "flex-start",
        justifyContent: "center",
        marginBottom: 30,
    },
    confirmPasswordContainer: {
        flex: 2,
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    submitButton: {
        backgroundColor: '#3897f1',
        width: '100%',
        height: 90,
    },
    submitButtonTextContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    submitButtonText: {
        color: "#ffffff",
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 20,
    },

});

import { StyleSheet } from 'react-native';

export const registerCarStepOneStyles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    setNameView: {
        flex: 0.8,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    setNumberView: {
        flex: 0.7,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    setImageView: {
        flex: 2.5,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    setTextView: {
        flex: 1,
        width: 370,
        marginTop: 15,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
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
        borderRadius: 10,
    },
    setImageButtonContainer: {
        backgroundColor: 'rgb(197, 197, 197)',
        width: 370,
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
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

export const registerCarStepTwoStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    label: {
        color: 'rgb(100, 100, 100)',
        marginLeft: 5,
        marginBottom: 12,
        fontSize: 17,
    },
    buttonImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
    },
    titleText: {
        marginLeft: 5,
        marginBottom: 12,
        marginTop: 20,
        fontSize: 23,
        fontWeight: '500',
        width: 370,
    },
    btnContainer: {
        marginTop: 20,
    },
    buttonContainer: {
        width: 370,
        height: 300,
        backgroundColor: 'rgb(197, 197, 197)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
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

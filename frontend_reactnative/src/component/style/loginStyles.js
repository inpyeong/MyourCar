import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
    flexContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FDFBFB',
    },
    logoTextContainer: {
        flex: 1.8,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    logoText: {
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 170,
    },
    inputTextContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    inputText: {
        width: 360,
        height: 60,
        padding: 10,
        borderWidth: 1,
        borderColor: '#CACACA',
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: '#FFFFFF',
    },
    loginButtonContainer: {
        flex: 0.5,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    loginButton: {
        backgroundColor: '#3897f1',
        borderRadius: 15,
        width: 360,
        height: 60,
    },
    loginButtonTextContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    loginButtonText: {
        color: "#ffffff",
        textAlign: 'center',
        fontSize: 18,
    },
    userTextContainer: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center",
        flexDirection: "row",
        marginLeft: 10,
    },
    userText: {
        marginHorizontal: 30,
        textDecorationLine: 'underline',
    },
    oauth2ImageContainer: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center",
        flexDirection: "row",
    },
    oauth2Image: {
        width: '25%',
        height: '25%',
        marginTop: 15,
    },
});
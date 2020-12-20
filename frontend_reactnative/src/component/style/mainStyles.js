import { StyleSheet } from 'react-native';

export const mainStyles = StyleSheet.create({
    flexContainer: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    userContainer: {
        flex: 0.45,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '10%',
        borderBottomWidth: 1,
        borderColor: '#CADEDE',
        backgroundColor: "#FFF"
    },
    userImageWrapper: {
        flex: 1,
        alignItems: 'center',
        marginLeft: 25,
    },
    userInfoWrapper: {
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: '100%',
        marginLeft: 15,
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 19,
    },
    userEmail: {
        marginTop: 7,
        marginBottom: 12,
    },
    userIconWrapper: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    optionContainer: {
        flex: 0.85,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#CADEDE',
        backgroundColor: "#FFF"
    },
    questionWrapper: {
        flex: 0.33,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: 25,
        width: '100%',
    },
    question: {
        fontWeight: '500',
        fontSize: 25,
        color: '#000',
    },
    requestWrapper: {
        flex: 0.4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        width: '100%',
    },
    request: {
        color: 'rgb(95, 98, 115)',
        fontSize: 16,
    },
    logo: {
        // opacity: 1,
        // marginBottom: 10,
        // marginHorizontal: '28%',
    },
    emptyView: {
        width: '100%',
        height: 6,
        backgroundColor: 'rgb(230, 230, 230)',
        borderBottomWidth: 1,
        borderColor: '#CADEDE'
    },
});

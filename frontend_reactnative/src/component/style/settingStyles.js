import { StyleSheet } from 'react-native';

export const settingStyles = StyleSheet.create({
    flexContainer: {
        flex: 1,
    },
    userContainer: {
        flex: 0.6,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        borderBottomWidth: 0.3,
        borderColor: '#CADEDE',
    },
    userInfoWrapper: {
        marginLeft: '7%',
        marginBottom: 20,
    },
    userName: {
        letterSpacing: 1,
        fontWeight: 'bold',
        fontSize: 27,
        marginBottom: 10,
    },
    userEmail: {
        color: '#7A7E7E',
        marginBottom: 5,
    },
    userPhoneNumber: {
        color: '#7A7E7E',
    },
    userImgWrapper: {
        marginRight: '6%',
        marginBottom: 20,
    },
    settingContainer: {
        marginTop: 5,
        backgroundColor: '#FFF',
        borderTopWidth: 0.3,
        borderBottomWidth: 0.3,
        borderColor: '#CADEDE',
    },
    title: {
        paddingVertical: '5%',
        marginLeft: '7%',
        fontWeight: '600',
        fontSize: 16,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: '4%',
        marginLeft: '7%',
        marginRight: '5%',
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: '#EEEEEE',
    },
    logOutBtn: {
        flex: 0.15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5%',
        marginHorizontal: '5%',
        backgroundColor: '#FAFAFA',
        borderWidth: 0.3,
        borderColor: '#CADEDE',
    }
});

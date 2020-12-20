import { StyleSheet } from 'react-native';

export const stepOneStyles = StyleSheet.create({
   flexContainer: {
       flex: 1,
       backgroundColor: 'rgb(250, 250, 250)',
   },
    carContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        borderBottomWidth: 0.3,
        borderColor: 'rgb(230, 230, 230)',
        alignItems: 'center',
    },
    carImage: {
        width: 100,
        height: 100,
    },
    textContainer: {
        justifyContent: 'center',
        marginLeft: 20,
    },
    carTitle: {
        fontSize: 16,
        color: 'rgb(101, 102, 112)',
        marginBottom: 3,
    },
    carServiceEnable: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        color: "rgb(101, 191, 249)",
    },

    ioniconsWrapper: {
        flexDirection: 'row',
        position: 'absolute',
        right: 0,
    },
});

export const stepTwoStyles = StyleSheet.create({
    flexContainer: {
        flex: 1,
        backgroundColor: '#FFF',
    },

    emptyView: {
        width: '100%',
        height: 8,
        backgroundColor: 'rgb(247, 247, 247)',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'rgb(238, 237, 240)'
    },
    contentContainer: {
        paddingVertical: 15,
        // backgroundColor: 'pink',
        marginHorizontal: '5%',
        borderColor: 'rgb(237, 237, 241)',
        borderBottomWidth: 2,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconTitleWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 5,
    },
    settingText: {
        fontSize: 13,
        color: 'rgb(129, 131, 144)',
    },
    body: {
        marginTop: 15,
        justifyContent: 'center',
    },
    pleaseText: {
        color: 'rgb(129, 131, 144)',
    },

    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '10%',
        marginHorizontal: '5%',
        borderColor: 'rgb(237, 237, 241)',
        borderBottomWidth: 2,
    },

    calcServiceTime: {
        color: 'rgb(51, 50, 67)',
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 5,
    },
    serviceTime: {
        color: 'rgb(46, 56, 70)',
        fontSize: 14,
    },


    addressContainer: {
        marginTop: 15,
    },
    firstAddress: {
        color: 'rgb(48, 49, 65)',
        fontSize: 17,
        fontWeight: '500',
        marginBottom: 8,
    },
    secondAddressWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    secondAddress: {
        color: 'rgb(90, 91, 107)',
    },
    addressWrapperInModal: {
        justifyContent: 'center',
        backgroundColor: '#FFF',
        position: 'absolute',
        bottom: 90,
        height: 90,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: {
            height: 0.5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        paddingHorizontal: 20,
    },

    feeWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    feeText: {
        fontSize: 15,
        marginRight: 10,
    },
    feeTextInput: {
        fontSize: 15,
        paddingBottom: 3,
    },

    submitButton: {
        // backgroundColor: "#3897f1",
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '14%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitButtonText: {
        color: "#FFF",
        fontSize: 16,
        marginBottom: 25,
    },

    indicatorStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export const stepThreeStyles = StyleSheet.create({
    infoWrapper: {
        backgroundColor: '#FFF',
        position: 'absolute',
        bottom: 0,
        height: '25%',
        width: '100%',
        shadowColor: '#000',
        shadowOffset: {
            height: 0.5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        paddingHorizontal: 20,
    },

    addressWrapper: {
        marginTop: 15,
    },
    firstAddress: {
        color: 'rgb(48, 49, 65)',
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 8,
    },
    secondAddress: {
        color: 'rgb(90, 91, 107)',
        fontSize: 18,
    },

    timeWrapper: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 80,
        left: 20,
        alignItems: 'center',
        marginTop: 20,
    },
    timeText: {
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 5,
    },
    time: {
        fontSize: 18,
        color: 'rgb(129, 131, 144)',
    },

    batteryWrapper: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 40,
        left: 20,
        alignItems: 'center',
        marginTop: 20,
    },

    batteryText: {
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 5,
    },
    battery: {
        fontSize: 18,
        color: 'rgb(129, 131, 144)',
    },

});

import { StyleSheet } from 'react-native';

export const stepOneStyles = StyleSheet.create({
   flexContainer: {
       flex: 1,
       backgroundColor: "#FFF",
   } ,

    TimerWrapper: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        justifyContent: 'space-between',
        paddingVertical: 15,
        marginHorizontal: 20,
        // borderBottomWidth: 1,
        // borderColor: 'rgb(210, 210, 213)',
    },
    TimerText: {
        color: 'rgb(150, 170, 190)',
        fontSize: 14,
    },

    indicatorStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    carImageNameContainer: {
        // borderBottomWidth: 1,
        // borderColor: 'rgb(230, 230, 230)',
        paddingBottom: 25,
        marginHorizontal: 20,
    },
    carImageWrapper: {
        alignItems: 'center',
    },
    carImage: {
        width: 250,
        height: 200,
    },
    carNameWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    carName: {
        color: 'rgb(51, 50, 67)',
        fontSize: 24,
        fontWeight: '500',
    },

    actionContainer: {
        flex: 0.75,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        // borderBottomWidth: 1,
        // borderColor: 'rgb(230, 230, 230)',
    },
    actionIcon: {
        color: 'rgb(228, 231, 234)',
    },

    openLockWrapper: {
        position: 'absolute',
        top: 17,
        left: 35,
        alignItems: 'center',
    },
    open: {
        position: 'absolute',
        top: 50,
        left: 30,
    },
    openLockText: {
        color: 'rgb(200, 200, 200)',
        fontSize: 15,
        marginTop: 8,
    },

    closedLockWrapper: {
        position: 'absolute',
        top: 17,
        right: 35,
        alignItems: 'center',
    },
    close: {
        position: 'absolute',
        top: 50,
        right: 30,
    },
    closedLockText: {
        color: 'rgb(200, 200, 200)',
        fontSize: 15,
        marginTop: 8,
    },

    triangleWrapper: {
        position: 'absolute',
        top: 210,
        left: 35,
        alignItems: 'center',
    },
    smallTriangle: {
        position: 'absolute',
        top: 40,
        left: 30,
    },
    triangleText: {
        color: 'rgb(200, 200, 200)',
        fontSize: 15,
    },

    megaphoneWrapper: {
        position: 'absolute',
        top: 210,
        right: 30,
        alignItems: 'center',
    },
    megaphoneText: {
        color: 'rgb(200, 200, 200)',
        fontSize: 15,
    },

    logoWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 5,
        borderColor: 'rgb(228, 231, 234)',
        borderRadius: 50,
        width: 100,
        height: 100,
    },
    logo: {
        color: 'rgb(77, 194, 219)',
        fontSize: 15,
    },

    line: {
        position: 'absolute',
        backgroundColor: 'rgb(228, 231, 234)',
    },
    leftRow: {
        left: 60,
        width: 45,
        height: 3,
    },
    rightRow: {
        right: 60,
        width: 45,
        height: 3,
    },
    leftColumn: {
        top: 45,
        width: 3,
        height: 45,
    },
    rightColumn: {
        top: 260,
        width: 3,
        height: 45,
    },

    btnContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 130,
        borderTopWidth: 0.3,
        borderColor: '#CADEDE',
        backgroundColor: 'rgb(240, 240, 240)',
    },
    reviewBtn: {
        width: '50%',
        backgroundColor: '#3897f1',
        alignItems: 'center',
        justifyContent: 'center',
    },

    // returnBtn: {
    //     width: '50%',
    //     backgroundColor: 'rgb(50, 60, 74)',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    // btnText: {
    //     color: "#FFF",
    //     fontSize: 17,
    //     fontWeight: '500',
    //     paddingBottom: 20,
    // },

    emptyView: {
        width: '100%',
        height: 8,
        backgroundColor: 'rgb(240, 240, 240)',
        borderTopWidth: 1,
        borderBottomWidth: 0.3,
        borderColor: '#CADEDE'
    },

    returnBtn: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5%',
        marginHorizontal: '5%',
        backgroundColor: '#FAFAFA',
        borderWidth: 0.3,
        borderColor: '#CADEDE',
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
        backgroundColor: 'rgb(240, 240, 240)',
        borderTopWidth: 1,
        borderBottomWidth: 0.3,
        borderColor: '#CADEDE'
    },

    carContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        alignItems: 'center',
    },
    carImage: {
        width: 150,
        height: 120,
    },

    starContainer: {
    },
    carName: {
        fontSize: 18,
        marginLeft: 3,
        marginBottom: 10,
    },
    fullStar: {
        color: "rgb(229, 153, 38)",
    },

    reviewTextContainer: {
        marginHorizontal: 20,
        marginVertical: 15,
        height: 65,
    },

    reviewImageContainer: {
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    boxWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(197, 197, 197)',
        padding: 10,
        paddingHorizontal: 15,
        marginRight: 10,
    },
    imageNumWrapper: {
        alignItems: 'flex-end',
    },

    submitBtn: {
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '10%',
        backgroundColor: '#3897f1',
    },
    submitText: {
        color: '#FFF',
        fontSize: 18,
        paddingBottom: 20,
    },
});

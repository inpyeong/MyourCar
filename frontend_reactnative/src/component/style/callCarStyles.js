import { StyleSheet } from 'react-native';

export const callCarStepOneMapStyles = StyleSheet.create({
    indicatorStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
    },
    flexContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchBarContainer: {
        flex: 0.15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchBarWrapper: {
        width: '90%',
        height: '45%',
        justifyContent: 'center',
        padding: 10,
        marginBottom: '5%',
        backgroundColor: '#FFFFFF',
        shadowColor: 'black',
        shadowOffset: {
            height: 2,
        },
        shadowOpacity: 0.35,
        borderRadius: 4,
    },
    searchBar: {
        color: 'rgb(200, 200, 200)',
    },
    serviceTimeContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0,
        left: 0,
        right: 0,
        height: '17%',
    },
    serviceTimeWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '93%',
        height: '100%',
        backgroundColor: '#FFF',
        shadowColor: 'black',
        shadowOffset: {
            height: 2,
        },
        shadowOpacity: 0.35,
        borderRadius: 10,
    },
    serviceTimeTextInfoWrapper: {
        width: '65%',
        marginLeft: 15,
        marginBottom: '8%',
    },
    serviceTimeText: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: '4%',
    },
    serviceTimeInfo: {
        color: 'rgb(200, 200, 200)',
    },

    // button on marker






    modalWrapper: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 4,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    modalTitle: {
        fontSize: 25,
        fontWeight: '600',
        marginLeft: '6%',
        marginBottom: '3%',
    },
    modalSubtitle: {
        fontSize: 17,
        fontWeight: '400',
        marginLeft: '6%',
        marginBottom: '8%',
    },
    serviceContainer: {
        width: '100%',
        height: '7%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 0.3,
        borderColor: 'rgb(200, 200, 200)',
    },
    serviceText: {
        opacity: 0.7,
        marginLeft: '6%',
    },
    serviceInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    serviceInfo: {
        fontSize: 16,
        fontWeight: '600',
        // color: 'rgb(119, 191, 243)',
        marginRight: 10,
    },
    pickerWrapper: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
    },
    button: {
        position: 'absolute',
        bottom: 0,
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
})

export const callCarStepOneSearchStyles = StyleSheet.create({
    flexContainer: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    textInputContainer: {
        flex: 0.11,
        backgroundColor: '#FFF',
        shadowColor: 'black',
        shadowOffset: {
            height: 2,
        },
        shadowOpacity: 0.3,
    },
    textInputWrapper: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    },
    textInput: {
        fontSize: 16,
        width: '100%',
        height: '40%',
        marginBottom: '2.2%',
        marginLeft: '10%',
    },
    locationListContainer: {
        flex: 0.89,
    },
    locationContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: "rgb(231, 234, 236)",
        paddingVertical: '4.5%',
        paddingLeft: '5%',
    },
    locationWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    locationQuery: {
        color: "rgb(101, 191, 249)",
        fontSize: 17,
    },
    locationInfo: {
        fontSize: 17,
    },
    locationNotFoundWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    locationNotFound: {
        color: 'rgb(193, 196, 203)',
        fontSize: 15,
        marginTop: '25%',
    },
});

export const callCarStepTwoStyles = StyleSheet.create({
    flexContainer: {
        flex: 1,
        backgroundColor: 'rgb(250, 250, 250)',
    },
    titleContainer: {
        flex: 0.2,
        borderBottomWidth: 0.3,
        borderColor: 'rgb(198, 199, 203)',
        marginHorizontal: 20,
    },
    titleWrapper: {
        flex: 0.5,
        justifyContent: 'flex-end',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
    },
    descriptionWrapper: {
        flex: 0.5,
        justifyContent: 'center',
    },
    description: {
        fontSize: 15,
        color: 'rgb(126, 126, 133)',
    },
    timeContainer: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        borderBottomWidth: 0.3,
        borderColor: 'rgb(198, 199, 203)',
    },
    totalTimeWrapper: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    totalTime: {
        fontSize: 16,
        fontWeight: '600',
        color: 'rgb(59, 59, 75)',
        paddingTop: 4,
        paddingLeft: 5,
    },
    startTime: {
        fontSize: 16,
        color: 'rgb(68, 64, 82)',
        marginRight: 10,
    },
    carContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        borderBottomWidth: 0.3,
        borderColor: 'rgb(230, 230, 230)'
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
    carRentFee: {
        fontSize: 17,
        fontWeight: '600',
        marginBottom: 8,
    }
});

export const callCarStepThreeStyles = StyleSheet.create({
    flexContainer: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    carInfoContainer: {
    },
    carImageNameContainer: {
        borderBottomWidth: 1,
        borderColor: 'rgb(230, 230, 230)',
        paddingBottom: 25,
        marginHorizontal: 40,
    },
    carImageWrapper: {
        alignItems: 'center',
    },
    carImage: {
        width: 250,
        height: 150,
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
    feeContainer: {
        paddingTop: 25,
        marginHorizontal: 40,
        paddingBottom: 15,
    },
    feeWrapper: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    feeText: {
        color: 'rgb(51, 50, 67)',
        fontSize: 17,
        fontWeight: '600',
        marginRight: 15,
    },
    feeValue: {
        fontSize: 17,
        fontWeight: '500',
        color: 'rgb(119, 191, 243)'
    },
    emptyView: {
        width: '100%',
        height: 8,
        backgroundColor: 'rgb(240, 240, 240)',
        borderTopWidth: 1,
        borderBottomWidth: 0.3,
        borderColor: '#CADEDE'
    },
    reviewRatingContainer: {
        height: 95,
        marginHorizontal: 40,
        alignItems: 'flex-start',
        marginTop: 25,
    },
    reviewRatingTextWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    title: {
        color: 'rgb(51, 50, 67)',
        fontSize: 20,
        fontWeight: '600',
    },
    actionLink: {
        color: 'rgb(125, 128, 139)',
    },
    ratingWrapper: {
        position: 'absolute',
        left: -5,
        top: 35,
    },
    fullStar: {
        color: "rgb(229, 153, 38)",
    },
    reviewCnt: {
        position: 'absolute',
        right: -25,
        bottom: 2,
    },
    serviceTimeContainer: {
        marginHorizontal: 40,
        marginVertical: 25,
    },
    serviceTimeHeaderWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    serviceTimeContentWrapper: {

    },
    calcServiceTime: {
        color: 'rgb(51, 50, 67)',
        fontSize: 18,
        marginBottom: 10,
    },
    serviceTime: {
        color: 'rgb(46, 56, 70)',
        fontSize: 16,
    },
    callLocationContainer: {
        marginHorizontal: 40,
        marginVertical: 25,
    },
    callLocationHeaderWrapper: {
        marginBottom: 25,
    },
    callLocationContentWrapper: {
    },
    callLocation: {
        color: 'rgb(51, 50, 67)',
        fontSize: 16,
        marginBottom: 15,
    },
    parkingTypeBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
        borderWidth: 1,
        borderColor: '#CACACA',
    },
    modalBtnPlaceHolder: {
        fontSize: 15,
        paddingLeft: 15,
    },
    parkingTypeModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContainer: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalTitleWrapper: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#CACACA'
    },
    modalTitle: {
        paddingLeft: 20,
        fontWeight: 'bold',
    },
    modalContent: {
        height: 60,
        justifyContent: 'center',
        paddingLeft: 20,
        width: '100%',
    },
    bottomBtnContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        height: '10%',
    },
    totalCostWrapper: {
        flexDirection: 'row',
        backgroundColor: 'rgb(50, 60, 74)',
        alignItems: 'center',
        justifyContent: 'center',
        width: '60%',
    },
    submitWrapper: {
        backgroundColor: '#3897f1',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40%',
    },
    totalCostPrefix: {
        color: "#FFF",
        fontSize: 15,
        paddingBottom: 20,
    },
    totalCostPost: {
        color: "#FFF",
        fontSize: 15,
        paddingBottom: 20,
    },
    totalCost: {
        color: "#FFF",
        fontSize: 17,
        paddingBottom: 20,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    submit: {
        color: "#FFF",
        fontSize: 15,
        fontWeight: '500',
        paddingBottom: 20,
    },
    paymentContainer: {
        marginHorizontal: 40,
        marginTop: 25,
        marginBottom: 100,
    },
    paymentHeaderWrapper: {
        marginBottom: 25,
    },
    methodContentWrapper: {
    },
    method: {
        color: 'rgb(51, 50, 67)',
        fontSize: 16,
    },
});

export const reviewStyles = StyleSheet.create({
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
    starReviewCntContainer: {
        flexDirection: 'row',
        paddingHorizontal: 25,
        paddingVertical: 20,
    },
    star: {
        color: "rgb(229, 153, 38)",
    },
    totalElements: {
        fontSize: 24,
        fontWeight: '300',
        marginLeft: 8,
    },
    reviewsContainer: {
        marginHorizontal: 25,
    },
    reviewWrapper: {
        marginTop: 12,
        height: 120,
        borderBottomWidth: 1,
        borderColor: '#CACACA',
    },
    imgCommentWrapper: {
        flexDirection: 'row',
        marginTop: 3,
    },
    reviewImg: {
        width: 80,
        height: 80,
        marginRight: 10,
        borderWidth: 0.3,
    },
    reviewComment: {
        flex: 1,
        flexWrap: 'wrap',
        fontSize: 11,
    },
    pageNumsContainer: {
        position: 'absolute',
        bottom: 35,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    pageNumsWrapper: {
        paddingHorizontal: 10,
    },
    pageNums: {
        color: '#3897f1',
        fontSize: 17,
    }
});

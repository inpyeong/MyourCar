import React, { useState, useEffect, } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import Stars from 'react-native-stars';
import { reviewStyles } from '../../style/callCarStyles';
import { getReviews } from '../../../util/APIUtils';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

const ReviewScreen = (props) => {
    const { params } = props.route;
    const [reviewsInfo, setReviewsInfo] = useState({
        content: [],
        pageable: {},
    });
    console.log(params.reviewsInfo);

    useEffect(() => {
        setReviewsInfo(params.reviewsInfo);
    }, []);

    return (
        <View style={reviewStyles.flexContainer}>
            <StarReviewCnt
                reviewsInfo={reviewsInfo}
            />
            <View style={reviewStyles.emptyView} />
            <Reviews
                reviewsInfo={reviewsInfo}
            />
            <PageNums
                carId={params.carId}
                reviewsInfo={reviewsInfo}
                setReviewsInfo={setReviewsInfo}
            />
        </View>
    )
};

const StarReviewCnt = ({ reviewsInfo }) => {

    const getStarAvg = (reviewsInfo) => {
        let totalScore = 0;
        reviewsInfo.content.forEach(review => {
            totalScore += review.score;
        })
        console.log(reviewsInfo)
        return totalScore / reviewsInfo.totalElements;
    }

    return (
        <View style={reviewStyles.starReviewCntContainer}>
            <Stars
                 default={getStarAvg(reviewsInfo)}
                 spacing={4}
                 count={5}
                 fullStar={
                     <Ionicons
                         name={'star'}
                         style={reviewStyles.star}
                         size={25}
                     />
                 }
                 emptyStar={
                     <Ionicons
                         name={'star-outline'}
                         style={reviewStyles.star}
                         size={25}
                     />
                 }
             />
             <Text style={reviewStyles.totalElements}>{reviewsInfo.totalElements}</Text>
         </View>
    )
}

const Reviews = ({ reviewsInfo }) => {
    return (
        <View style={reviewStyles.reviewsContainer}>
            {reviewsInfo.content.map((review, index) => (
                <View style={reviewStyles.reviewWrapper}>
                    <View
                        style={{marginBottom: 5, alignItems: 'flex-start', }}>
                        <Stars
                            half={true}
                            default={review.score}
                            disabled={true}
                            count={5}
                            fullStar={
                             <Ionicons
                                 name={'star'}
                                 style={reviewStyles.star}
                                 size={20}
                             />
                             }
                             emptyStar={
                                 <Ionicons
                                     name={'star-outline'}
                                     style={reviewStyles.star}
                                     size={20}
                                 />
                             }
                        />
                    </View>
                    <View style={reviewStyles.imgCommentWrapper}>
                        {review.image ?
                            <Image
                                source={{ url : review.image}}
                                style={reviewStyles.reviewImg}
                                resizeMode={'contain'}
                            /> : <View />}
                        <Text style={reviewStyles.reviewComment}>
                            {review.comment}
                        </Text>
                    </View>
                </View>
            ))}
        </View>
    )
}

const PageNums = ({ carId, reviewsInfo, setReviewsInfo }) => {
    const pageNums = (totalPages) => {
        const ret = [];
        for(let i = 1; i <= totalPages; ++i)
            ret.push(i);
        return ret;
    }

    return (
        <View style={reviewStyles.pageNumsContainer}>
            {pageNums(reviewsInfo.totalPages).map(value => {
                return (
                    <TouchableOpacity
                        style={reviewStyles.pageNumsWrapper}
                        onPress={() => {
                            getReviews(carId, value-1, 5)
                                .then(res => {
                                    setReviewsInfo(res);
                                })
                        }}
                    >
                        <Text style={reviewStyles.pageNums}>{value}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    )
}

export default ReviewScreen;

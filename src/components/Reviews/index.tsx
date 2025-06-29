import React from 'react';
import './Review.scss';
import type { IReview } from 'src/models/Review';
interface ReviewListProps {
    reviews: IReview[];
}
const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
    return (
        <div className='reviewsContainer'>
            <ul className='reviewsList'>
                {reviews && reviews.length > 0 ? (
                    reviews.map((review) => {
                        return (
                            <li className='reviewCard'>
                                <div className='reviewTitle'></div>
                                <div className='reviewContent'>
                                    <p>{review.content}</p>
                                </div>
                            </li>
                        );
                    })
                ) : (
                    <></>
                )}
            </ul>
        </div>
    );
};

export default ReviewList;

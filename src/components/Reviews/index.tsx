import React from 'react';
import './Review.scss';
import type { IReview } from 'src/models/Review';
import ReviewCard from '@components/Card/Review';
import EmptyAnswer from '@components/Message/Answer';
interface ReviewListProps {
    reviews: IReview[];
}
const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
    return (
        <div className='reviewsContainer'>
            <h2 className='containerTitle'>Отзывы:</h2>
            <ul className='reviewsList'>
                {reviews && reviews.length > 0 ? (
                    reviews.map((review) => {
                        return <ReviewCard {...review} />;
                    })
                ) : (
                    <>
                        <EmptyAnswer message={'Пока нет отзывов'} />
                    </>
                )}
            </ul>
        </div>
    );
};

export default ReviewList;

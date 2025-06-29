import { DateConverter } from '@utils/converter/DateConverter';
import React, { useEffect, useState } from 'react';
import type { IReview } from 'src/models/Review';
import avatar from '@assets/userAvatar.jpg';
import './ReviewCard.scss';

const ReviewCard: React.FC<IReview> = ({ imageUrl, fullName, createTime, rating, content }) => {
    const dateConverter: DateConverter = new DateConverter();
    const [ratingClass, setClass] = useState<string>('');

    useEffect(() => {
        if (rating == 0) {
            return setClass('default');
        }
        if (rating > 0 && rating < 3.0) {
            return setClass('bad');
        }
        if (rating >= 3.0 && rating <= 4.2) {
            return setClass('good');
        }
        if (rating > 4.2) {
            return setClass('great');
        }
    }, []);
    return (
        <>
            <li className='reviewCard'>
                <div className='reviewTitle'>
                    <div className='userWrapper'>
                        <img src={imageUrl != null ? imageUrl : avatar} alt='User photo' />
                        <span className='authorName'>{fullName}</span>
                    </div>
                    <div className='ratingWrapper'>
                        <span>
                            Дата:{' '}
                            {dateConverter.convertToLocaleString(
                                dateConverter.formattedDate(createTime),
                            )}
                        </span>
                        <div className={ratingClass}>{rating}</div>
                    </div>
                </div>
                <div className='reviewContent'>
                    <p>{content}</p>
                </div>
            </li>
        </>
    );
};

export default ReviewCard;

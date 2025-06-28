import React from 'react';
import './Answer.scss';
import emptyResult from '@assets/mono.svg';
import crying from '@assets/sad.svg';

interface AnswerProps {
    message: string;
}

const EmptyAnswer: React.FC<AnswerProps> = ({ message }) => {
    return (
        <>
            <div className='answerCard'>
                <div className='answerContent'>
                    <img src={emptyResult} alt='' />
                </div>
                <h2 className='answerMessage'>{message}</h2>
            </div>
        </>
    );
};

export default EmptyAnswer;

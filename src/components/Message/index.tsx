import React, { useEffect, useState } from 'react';
import error from '@assets/error-svg.svg';
import success from '@assets/success-svg.svg';

import './Message.scss';
interface MessageProps {
    message: string;
    type?: string;
    visible: boolean;
}

const Message: React.FC<MessageProps> = ({ message, type, visible }) => {
    return (
        <>
            <div
                className={`message`}
                style={{
                    visibility: visible ? 'visible' : 'hidden',
                    opacity: visible ? 1 : 0,
                    transition: 'opacity 0.1s linear, visibility 0.2s linear',
                }}
            >
                <img src={type === 'error' ? error : success} alt='icon' />
                <p>{message}</p>
            </div>
        </>
    );
};

export default Message;

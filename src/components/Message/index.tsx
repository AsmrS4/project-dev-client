import React, { useEffect, useState } from 'react';
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
                className={`message ${type ?? ''}`}
                style={{
                    visibility: visible ? 'visible' : 'hidden',
                    opacity: visible ? 1 : 0,
                    transition: 'opacity 0.1s linear, visibility 0.2s linear',
                }}
            >
                {message}
            </div>
        </>
    );
};

export default Message;

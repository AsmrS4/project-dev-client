import React, { useEffect, useState } from 'react';
import avatar from '@assets/userAvatar.jpg';
import './Guest.scss';
import type { IGuestCard } from 'src/models/Guest';

const GuestCard: React.FC<IGuestCard> = ({ id, fullName, role, image }) => {
    return (
        <>
            <li className='guestCard'>
                <div className='guestImage'>
                    <img src={image != null ? image : avatar} alt='Фото гостя' />
                </div>
                <div className='guestContent'>
                    <div className='guestName'>{fullName}</div>
                    <div className='guestRole'>{role == 'CLIENT' ? 'Гость' : 'Аноним'}</div>
                </div>
            </li>
        </>
    );
};

export default GuestCard;

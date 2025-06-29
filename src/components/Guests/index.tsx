import GuestCard from '@components/Card/Guest';
import React from 'react';
import type { IGuestCard } from 'src/models/Guest';
import './Guests.scss';
interface GuestListProps {
    guests: IGuestCard[];
}
const GuestsList: React.FC<GuestListProps> = ({ guests }) => {
    return (
        <div className='guestContainer'>
            <div className='guestsList'>
                {guests.map((item) => {
                    return <GuestCard {...item} />;
                })}
            </div>
        </div>
    );
};

export default GuestsList;

import GuestCard from '@components/Card/Guest';
import React from 'react';
import type { IGuestCard } from 'src/models/Guest';
import './Guests.scss';
import EmptyAnswer from '@components/Message/Answer';
interface GuestListProps {
    guests: IGuestCard[];
}
const GuestsList: React.FC<GuestListProps> = ({ guests }) => {
    return (
        <div className='guestContainer'>
            <div className='guestsList'>
                {guests.length > 0 ? (
                    guests.map((item) => {
                        return <GuestCard {...item} />;
                    })
                ) : (
                    <>
                        <EmptyAnswer message={'Ничего не найдено'} />
                    </>
                )}
            </div>
        </div>
    );
};

export default GuestsList;

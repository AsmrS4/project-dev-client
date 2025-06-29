import { Spin } from 'antd';
import React from 'react';
import styles from './Loader..module.scss';
const Loader = () => {
    return (
        <>
            <Spin className={styles.loader} size='large' />
        </>
    );
};

export default Loader;

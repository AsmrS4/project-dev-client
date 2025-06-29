import React from 'react';
import styles from './Form.module.scss';
import Button from '@components/Button';

interface AuthFormProps {
    title: string;
    children: React.ReactNode;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    readonly?: boolean | false;
}
interface ChildrenFormProps {
    children: React.ReactNode;
}

const Form: React.FC<AuthFormProps> = ({ title, children, onSubmit, readonly }) => {
    return (
        <form action='' className={styles.form} onSubmit={onSubmit}>
            <span className={styles.formTitle}>{title}</span>
            <div className={styles.inputWrapper}>{children}</div>
            {!readonly && <Button title='ОТПРАВИТЬ' type={'submit'} />}
        </form>
    );
};

export const EditForm: React.FC<ChildrenFormProps> = ({ children }) => {
    const disableSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };
    return (
        <form action='' className={styles.editForm} onSubmit={disableSubmit}>
            <div className={styles.inputWrapper}>{children}</div>
        </form>
    );
};

export const EventForm: React.FC<ChildrenFormProps> = ({ children }) => {
    const disableSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };
    return (
        <form action='' className={styles.eventForm} onSubmit={disableSubmit}>
            <div className={styles.inputWrapper}>{children}</div>
        </form>
    );
};

export default Form;

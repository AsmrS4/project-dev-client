import { useEffect, useState } from "react";

export const useValidation = (value: string | number | null, validations: any) => {
    const [isEmpty, setIsEmpty] = useState<boolean>(true);
    const [minLengthError, setMinLengthError] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [phoneError, setPhoneError] = useState<boolean>(false);

    const isEmailValid = (email: string) => {
        let regex =
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        return regex.test(String(email).trim().toLowerCase());
    };

    const isPhoneValid = (phone: string) => {
        let regex = /^(\+|)(7|8)( |)\d{3}( |)\d{3}( |)(\d{2}( |)){2}$/;
        return regex.test(String(phone).toLowerCase());
    };
    const isPasswordValid = (password: string) => {
        let regex = /\d/;
        return regex.test(password);
    }
    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'minLength':
                    String(value).trim().length < validations[validation]
                        ? setMinLengthError(true)
                        : setMinLengthError(false);
                    break;
                case 'isEmpty':
                    String(value).trim() ? setIsEmpty(false) : setIsEmpty(true);
                    break;
                case 'isEmailValid':
                    !value || isEmailValid(String(value)) ? setEmailError(false) : setEmailError(true);
                    break;
                case 'isPhoneValid':
                    !value || isPhoneValid(String(value)) ? setPhoneError(false) : setPhoneError(true);
                    break;
                case 'isPasswordValid':
                    !value || isPasswordValid(String(value)) ? setPasswordError(false) : setPasswordError(true);
                    break;
            }
        }
    }, [value]);

    return { isEmpty, minLengthError, emailError, phoneError, passwordError };
};
const userNameInit = {
        initialValue: '',
        label: 'ФИО',
        type: 'text',
        placeholder: 'John Doe',
        validations: { isEmpty: true },
    }
const emailInit = {
        initialValue: '',
        label: 'Email',
        type: 'text',
        placeholder: 'user@example.com',
        validations: { isEmailValid: true, isEmpty: true },
    }

const passwordInit = {
        initialValue: '',
        label: 'Пароль',
        type: 'password',
        validations: { isPasswordValid: true, minLength: 8, isEmpty: true },
    }

const phoneInit = {
        initialValue: '',
        label: 'Телефон',
        type: 'number',
        placeholder: '+7(xxx) xxx xx-xx',
        validations: { isPhoneValid: true, isEmpty: true },
    }

export {emailInit, userNameInit, passwordInit, phoneInit}
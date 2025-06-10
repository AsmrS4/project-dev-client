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
export {emailInit, passwordInit}
import style from '../Field.module.scss';

interface TextFieldProps {
    label: string;
    type?: string | 'text';
    value: string | number;
}

const TextField = (props: TextFieldProps) => {
    return (
        <div className={style.inputField}>
            <label className={style.inputField__label} htmlFor=''>
                {props.label}
            </label>
            <input
                type={props.type}
                value={props.value}
                name={props.label}
                className={style.inputField__input}
                readOnly
            />
        </div>
    );
};

export default TextField;

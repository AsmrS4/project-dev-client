import style from '../Field.module.scss';

interface InputProps {
    label?: string;
    type?: string | 'text';
    value: string | number | undefined;
    placeholder?: string | '';
    onChange: (value: any) => void;
}

const Field = (props: InputProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(event);
    };
    return (
        <div className={style.inputField}>
            {props.label && (
                <label className={style.inputField__label} htmlFor=''>
                    {props.label}
                </label>
            )}
            <input
                type={props.type}
                value={props.value}
                name={props.label}
                className={style.inputField__input}
                placeholder={props.placeholder}
                onChange={handleChange}
            />
        </div>
    );
};

export default Field;

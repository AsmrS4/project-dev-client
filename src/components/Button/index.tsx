import style from './Button.module.scss';

interface ButtonProps {
    title: string;
    type: 'submit' | 'button' | 'reset';
}

const Button = (props: ButtonProps) => {
    return (
        <button type={props.type} className={style.button}>
            {props.title}
        </button>
    );
};

export default Button;

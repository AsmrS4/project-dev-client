import { useNavigate } from 'react-router-dom';
import style from './Button.module.scss';

interface ButtonProps {
    title: string;
    type: 'submit' | 'button' | 'reset';
}

interface ILinkButton {
    title: string;
    type: 'submit' | 'button' | 'reset';
    href: string;
}

interface IActionButton {
    title: string;
    type: 'submit' | 'button' | 'reset';
    onClick: () => void | void;
    disabled?: boolean;
}

const Button = (props: ButtonProps) => {
    return (
        <button type={props.type} className={style.button}>
            {props.title}
        </button>
    );
};

export const ActionButton = (props: IActionButton) => {
    return (
        <button
            type={props.type}
            className={style.button}
            onClick={() => {
                props.onClick();
            }}
            disabled={props.disabled}
        >
            {props.title}
        </button>
    );
};

export const LinkButton: React.FC<ILinkButton> = (props) => {
    const navigate = useNavigate();
    return (
        <button
            type={props.type}
            className={style.button}
            onClick={() => {
                navigate(props.href);
            }}
        >
            {props.title}
        </button>
    );
};

export default Button;

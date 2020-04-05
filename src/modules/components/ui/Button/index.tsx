import React from 'react';
import { Button as MUIButton, ButtonProps } from '@material-ui/core';
import Link from '../Link';

interface IButton extends ButtonProps {
    to?: string;
}

const Button = (props: IButton) => (
    <MUIButton {...props}>
        {props.to ? (
            <Link to={props.to} hideUnderline>
                {props.children}
            </Link>
        ) : (
            props.children
        )}
    </MUIButton>
);

Button.defaultProps = {
    variant: 'contained',
    color: 'primary',
    style: { color: 'white' },
};

export default Button;

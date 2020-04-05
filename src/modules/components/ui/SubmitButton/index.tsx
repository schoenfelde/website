import React from 'react';
import Button from '../Button';
import Loading from '../Loading';
import { ButtonProps } from '@material-ui/core';
import omit from 'lodash/omit';
interface ISubmitButton extends ButtonProps {
    submitting: boolean;
}

const SubmitButton: React.FC<ISubmitButton> = props => (
    <Button
        variant="contained"
        color="primary"
        type="submit"
        {...omit(props, 'submitting')}
        disabled={props.disabled || props.submitting}
        style={{ color: 'white', borderRadius: 25, ...(props.style || {}) }}
    >
        {props.submitting ? <Loading size={25} /> : props.children}
    </Button>
);

export default SubmitButton;

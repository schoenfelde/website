import React from 'react';
import { TextField as MUITextField, TextFieldProps } from '@material-ui/core';

type ITextField = TextFieldProps;

const TextField = (props: ITextField) => <MUITextField {...props} />;

TextField.defaultProps = {
    variant: 'outlined',
    margin: 'dense',
};

export default TextField;

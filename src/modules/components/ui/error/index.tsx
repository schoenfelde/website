import React from 'react';
import { Typography } from '@material-ui/core';

const Error = ({ error }: { error: Error }) => (
    <Typography color="error">{error.toString()}</Typography>
);

export default Error;

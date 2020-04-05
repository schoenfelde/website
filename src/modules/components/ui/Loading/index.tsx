import React from 'react';
import { CircularProgress, CircularProgressProps } from '@material-ui/core';

const Loading: React.FC<CircularProgressProps> = props => (
    <CircularProgress {...props} />
);

export default Loading;

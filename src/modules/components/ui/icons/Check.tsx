import React from 'react';
import CheckCircle from '@material-ui/icons/CheckCircle';
import { SvgIconProps } from '@material-ui/core';
const Check: React.FC<SvgIconProps> = props => <CheckCircle {...props} />;
Check.defaultProps = {
    color: 'secondary',
};
export default Check;

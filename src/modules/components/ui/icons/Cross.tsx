import React from 'react';
import Cancel from '@material-ui/icons/Cancel';
import { SvgIconProps } from '@material-ui/core';
const Cross: React.FC<SvgIconProps> = props => <Cancel {...props} />;
Cross.defaultProps = {
    color: 'disabled',
};
export default Cross;

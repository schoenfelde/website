import React from 'react';
import { Link as RRLink, LinkProps } from 'react-router-dom';
import { Typography, useTheme } from '@material-ui/core';
interface ILink extends LinkProps {
    color?:
        | 'textSecondary'
        | 'textPrimary'
        | 'inherit'
        | 'initial'
        | 'primary'
        | 'secondary'
        | 'error';
    hideUnderline?: boolean;
}
const Link: React.FC<ILink> = props => {
    const theme = useTheme();
    return (
        <RRLink
            style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: props.hideUnderline ? 'none' : 'underline',
            }}
            {...props}
        >
            <Typography
                color={props.color || 'textSecondary'}
                style={
                    props.hideUnderline
                        ? {
                              textDecoration: 'none',
                          }
                        : {
                              textDecorationColor: theme.palette.text.secondary,
                              textDecoration: 'underline',
                          }
                }
            >
                {props.children}
            </Typography>
        </RRLink>
    );
};

export default Link;

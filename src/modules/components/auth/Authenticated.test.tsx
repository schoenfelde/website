import React from 'react';
import { render, act } from '@testing-library/react';
import Authenticated from './Authenticated';
import { MemoryRouter } from 'react-router-dom';
import withProvider from '../../redux/withProvider';

test('renders an authenticated input', async () => {
    const Div = () => <div />;
    const AuthenticatedDiv = withProvider(Authenticated(Div));
    await act(async () => {
        render(
            <MemoryRouter>
                <Div />
            </MemoryRouter>,
        );
    });
});

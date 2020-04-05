import React from 'react';
import { render, act } from '@testing-library/react';
import Router from './';
import withProvider from '../../redux/withProvider';
const TestableRouter = withProvider(Router);

test('renders the router', async () => {
    await act(async () => {
        render(<TestableRouter />);
    });
});

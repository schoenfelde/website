import React from 'react';
import { render } from '@testing-library/react';
import ResetPassword from '.';
import { MemoryRouter } from 'react-router-dom';
import withProvider from '../../../redux/withProvider';

const TestableResetPassword = withProvider(() => (
    <MemoryRouter>
        <ResetPassword />
    </MemoryRouter>
));

test('renders the reset password screen', () => {
    render(<TestableResetPassword />);
});

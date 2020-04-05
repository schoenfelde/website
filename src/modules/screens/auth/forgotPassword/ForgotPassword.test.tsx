import React from 'react';
import { render } from '@testing-library/react';
import ForgotPassword from '.';
import { MemoryRouter } from 'react-router-dom';
import withProvider from '../../../redux/withProvider';
const TestableForgotPassword = withProvider(() => (
    <MemoryRouter>
        <ForgotPassword />
    </MemoryRouter>
));

test('renders the forgot password screen', () => {
    render(<TestableForgotPassword />);
});

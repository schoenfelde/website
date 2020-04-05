import React from 'react';
import { render } from '@testing-library/react';
import Register from '.';
import { MemoryRouter } from 'react-router-dom';
import withProvider from '../../../redux/withProvider';
const TestableRegister = withProvider(() => (
    <MemoryRouter>
        <Register />
    </MemoryRouter>
));

test('renders the reset password screen', () => {
    render(<TestableRegister />);
});

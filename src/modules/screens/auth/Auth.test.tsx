import React from 'react';
import { render } from '@testing-library/react';
import Login from '.';
import { MemoryRouter } from 'react-router-dom';
import withProvider from '../../redux/withProvider';
const TestableLogin = withProvider(() => (
    <MemoryRouter>
        <Login />
    </MemoryRouter>
));
test('renders log in button', () => {
    const { getByText } = render(<TestableLogin />);
    const logIn = getByText(/Login/i);
    expect(logIn).toBeInTheDocument();
});

test('renders the log in screen', () => {
    render(<TestableLogin />);
});

import React from 'react';
import { render } from '@testing-library/react';
import Login from '.';
import { MemoryRouter } from 'react-router-dom';
import withProvider from '../../../redux/withProvider';
const TestableLogin = withProvider(() => (
    <MemoryRouter>
        <Login />
    </MemoryRouter>
));
test('renders log in button', () => {
    const { getAllByText } = render(<TestableLogin />);
    const logIn = getAllByText(/Login/i)[0];
    expect(logIn).toBeInTheDocument();
});

test('renders the log in screen', () => {
    render(<TestableLogin />);
});

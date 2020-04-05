import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import withProvider from '../../../../redux/withProvider';
import SetUpProfile from '.';
const TestableSetUpProfile = withProvider(() => (
    <MemoryRouter>
        <SetUpProfile />
    </MemoryRouter>
));

test('renders the set up profile screen', () => {
    render(<TestableSetUpProfile />);
});

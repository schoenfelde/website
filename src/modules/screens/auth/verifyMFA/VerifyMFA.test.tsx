import React from 'react';
import { render } from '@testing-library/react';
import VerifyMFA from '.';
import withProvider from '../../../redux/withProvider';
import { MemoryRouter } from 'react-router-dom';
const TestableVerifyMFA = withProvider(() => (
    <MemoryRouter>
        <VerifyMFA />
    </MemoryRouter>
));
it('Renders the MFA Verification', () => {
    render(<TestableVerifyMFA />);
});

import React from 'react';
import { render } from '@testing-library/react';
import Link from '.';
import { MemoryRouter } from 'react-router-dom';

test('renders a Link ', () => {
    render(
        <MemoryRouter>
            <Link to="/" />
        </MemoryRouter>,
    );
});

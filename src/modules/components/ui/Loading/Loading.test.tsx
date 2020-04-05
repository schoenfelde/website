import React from 'react';
import { render } from '@testing-library/react';
import Loading from './';

test('renders a loading indicator', () => {
    render(<Loading />);
});

import React from 'react';
import { render } from '@testing-library/react';
import Button from '../Input';

test('renders a button', () => {
    render(<Button>Click Me</Button>);
});

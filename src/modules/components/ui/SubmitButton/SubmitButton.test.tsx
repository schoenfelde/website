import React from 'react';
import { render } from '@testing-library/react';
import SubmitButton from '.';

test('renders a SubmitButton indicator', () => {
    render(<SubmitButton submitting={false}>Submit</SubmitButton>);
});

test('renders a submitting SubmitButton indicator', () => {
    render(<SubmitButton submitting={true}>Submitting</SubmitButton>);
});

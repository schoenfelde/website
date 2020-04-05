import React from 'react';
import { render } from '@testing-library/react';
import Snackbar from './';
import withProvider from '../../redux/withProvider';
const SnackbarTest = withProvider(Snackbar);
it('Renders a snackbar', () => {
    render(<SnackbarTest />);
});

import React from 'react';
import { useForm } from './';
import { render, act, fireEvent } from '@testing-library/react';
import withProvider from '../../redux/withProvider';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

it('renders with useForm', () => {
    const FormComponent = withProvider(() => {
        const form = useForm({ defaultValues: {} });
        return <div />;
    });
    render(<FormComponent />);
});

it('renders the correct initial values', async () => {
    const FormComponent = () => {
        const form = useForm({ defaultValues: { a: 'b' } });
        return (
            <div>
                <input data-testid="abc" defaultValue={form.values.a} />
            </div>
        );
    };
    const TestableForm = () => (
        <Provider store={createStore(() => {})}>
            <FormComponent />
        </Provider>
    );
    await act(async () => {
        const { getByTestId } = render(<TestableForm />);
        const input = getByTestId('abc');
        expect((input as any).value).toEqual('b');
    });
});

it('tracks the changed value', async () => {
    const FormComponent = () => {
        const form = useForm({ defaultValues: { a: 'b' } });
        return (
            <input
                data-testid="abcd"
                name="a"
                value={form.values.a}
                onChange={form.handleChange}
            />
        );
    };
    const TestableForm = () => (
        <Provider store={createStore(() => {})}>
            <FormComponent />
        </Provider>
    );
    await act(async () => {
        const c = render(<TestableForm />);
        const input = c.getByTestId('abcd');
        await act(async () => {
            fireEvent.change(input, { target: { name: 'a', value: 'c' } });
        });
        expect((input as any).value).toEqual('c');
    });
});

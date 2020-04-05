import React from 'react';
import TextField from '../../ui/Input';

interface IPhoneNumber {
    form: any;
}

const NUMBERS = /\d/g;

export const getNumbers = (val: string) => {
    const numbers = val.match(NUMBERS);
    if (numbers) {
        return numbers.join('');
    } else return '';
};

const PhoneNumber: React.FC<IPhoneNumber> = ({ form }) => {
    const onChange = function({ target: { value } }: any) {
        const digits = getNumbers(value);
        if (!digits)
            return form.handleChange({
                target: { name: 'phoneNumber', value: '' },
            });
        if (value.length > 0 && value.length < 5)
            return form.handleChange({
                target: {
                    name: 'phoneNumber',
                    value: `(${digits}`,
                },
            });
        if (value.length >= 5 && value.length < 10) {
            return form.handleChange({
                target: {
                    name: 'phoneNumber',
                    value: `(${digits.slice(0, 3)}) ${digits.slice(3)}`,
                },
            });
        }
        if (value.length >= 10 && value.length < 15) {
            const digits = getNumbers(value);
            return form.handleChange({
                target: {
                    name: 'phoneNumber',
                    value: `(${digits.slice(0, 3)}) ${digits.slice(
                        3,
                        6,
                    )}-${digits.slice(6)}`,
                },
            });
        }
    };
    return (
        <TextField
            name="phoneNumber"
            placeholder="Phone Number"
            required
            error={!!form.errors.phoneNumber}
            value={form.values.phoneNumber}
            helperText={form.errors.phoneNumber}
            onChange={onChange}
        />
    );
};

export default PhoneNumber;

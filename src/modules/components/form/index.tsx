import { useState, useEffect, useCallback, FormEventHandler } from 'react';
import { get, set } from 'lodash';
import { useDispatch } from 'react-redux';
import { displaySnackbarMessage } from '../../redux/actions/snackbar';

type FormValue = any;
type FormValues = { [fieldName: string]: FormValue };
type Validator = {
    message: string;
    validate: (fieldValue: FormValue, formValues: FormValues) => boolean;
};
type Validations = { [fieldName: string]: Validator | Validator[] };
type Errors = { [fieldName: string]: string };

interface FormOptions {
    defaultValues: FormValues;
    validations?: Validations;
    props?: any;
    onValueChange?: (values: FormValues, valid: boolean) => {};
    errorReducer?: (apiError: any) => Errors;
    onSuccess?: Function;
    hideMessages?: boolean;
}

export const useForm = (options: FormOptions) => {
    let [values, setFormValue] = useState(
        getValue(options.defaultValues, options.props),
    );
    let [touched, setTouched] = useState({});
    let [formTouched, setFormTouched] = useState(false);
    let [errors, setErrors] = useState<Errors>({});
    const [submitting, setSubmitting] = useState(false);
    const [validations] = useState(options.validations || {});
    const onValueChange = options.onValueChange;
    const [isFormValid, setFormValid] = useState(false);
    const dispatch = useDispatch();
    const setValue = (name: string, value: FormValue) => {
        setFormTouched(true);
        set(touched, name.split('.'), true);
        setTouched(touched);
        set(values, name.split('.'), value);
        setFormValue({ ...values });
    };

    const checkValid = useCallback(() => {
        const getValidationErrors = (
            name: string,
            value: FormValue,
            values: FormValues,
        ) => {
            let validationForField = validations[name];
            if (!validationForField) return '';
            const validationsForField = Array.isArray(validationForField)
                ? validationForField
                : [validationForField];
            return validationsForField.reduce((errors: string[], v, idx) => {
                const isError = !v.validate(value, values);
                let errorMessage = '';
                if (isError) {
                    errorMessage = validationsForField[idx].message;
                    return [...errors, errorMessage];
                } else return errors;
            }, []);
        };

        let hasErrors = false;
        let errorMessages: string[] = [];
        let errors: Errors = {};
        Object.keys(validations).forEach(name => {
            const value = get(values, name.split('.'));
            const errorMessage = getValidationErrors(name, value, values);
            if (errorMessage && errorMessage.length > 0) {
                errorMessages.push(...errorMessage);
                hasErrors = true;
                const isTouched = get(touched, name.split('.'));
                if (isTouched) errors[name] = errorMessage.join(', ');
            }
        });
        setErrors(errors);
        return { isValid: !hasErrors, errorMessages };
    }, [touched, validations, values]);

    const handleChange = function(...args: any) {
        const argument = args[0];
        if (argument && argument.target) {
            const {
                target: { name, value, files, type, checked },
            } = args[0];
            if (files) setValue(name, files[0]);
            else if (type === 'checkbox') setValue(name, checked);
            else setValue(name, value);
        } else if (argument && argument.label && argument.value) {
            const { name: selectName } = args[1];
            if (argument.data) setValue(selectName, argument.data);
            else setValue(selectName, argument.value);
        } else if (
            Array.isArray(argument) ||
            (argument === null && args[1].name)
        ) {
            const { name: multiSelectName } = args[1];
            if (argument === null) setValue(multiSelectName, []);
            else {
                const firstElement = argument[0];
                if (firstElement && firstElement.data)
                    setValue(
                        multiSelectName,
                        argument.map((a: any) => a.data),
                    );
                else
                    setValue(
                        multiSelectName,
                        argument.map((a: any) => a.value),
                    );
            }
        }
        // else if (moment.isMoment(argument)) {
        //     const momentName = args[1];
        //     setValue(momentName, argument)
        // }
        else if (args[0] === null) {
            setValue(args[1], null);
        }
    };

    useEffect(() => {
        const valid = checkValid();
        setFormValid(valid.isValid);
        if (onValueChange) onValueChange(values, valid.isValid);
    }, [checkValid, onValueChange, values]);

    const resetForm = () =>
        setFormValue({ ...getValue(options.defaultValues, options.props) });
    const handleSubmit = (
        submitFn: (values: FormValues) => Promise<any>,
    ): FormEventHandler => event => {
        event.preventDefault();
        setSubmitting(true);
        return submitFn(values)
            .then(successfulResponse => {
                if (!options.hideMessages)
                    dispatch(displaySnackbarMessage('success', 'Success'));

                setSubmitting(false);

                if (options.onSuccess) options.onSuccess();

                return successfulResponse;
            })
            .catch(error => {
                if (options.errorReducer) {
                    const apiErrors = options.errorReducer(error);
                    setErrors({ ...errors, ...apiErrors });
                } else {
                    setErrors({
                        ...errors,
                        submit: error && error.toString(),
                    });
                }
                setSubmitting(false);
            });
    };

    return {
        values,
        setFormValue,
        setValue,
        touched,
        formTouched,
        errors,
        handleChange,
        checkValid,
        isValid: isFormValid,
        resetForm,
        handleSubmit,
        submitting,
        hasErrors: !!Object.keys(errors).reduce(
            (hasError, name) => errors[name] || hasError,
            '',
        ),
    };
};

const getValue = (x: Function | { [key: string]: string }, props: any) => {
    if (typeof x === 'function') return x(props);
    else return x;
};
const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
export const emailValidator: Validator = {
    message: 'Please enter a valid email.',
    validate: email => EMAIL_PATTERN.test(email),
};
export const passwordValidator: Validator = {
    message:
        'Password must be longer than 8 characters, have one uppercase, and one number',
    validate: p => p && p.length > 8 && hasUpperCase(p) && hasNumber(p),
};

const hasUpperCase = (str: string) => /[A-Z]/.test(str);
const hasNumber = (str: string) => /[0-9]/.test(str);

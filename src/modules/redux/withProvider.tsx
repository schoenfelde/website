import React from 'react';
import { Provider } from 'react-redux';
import store, { persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

const withProvider = (WrappedComponent: any) => () => (
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <WrappedComponent />
        </PersistGate>
    </Provider>
);

export default withProvider;

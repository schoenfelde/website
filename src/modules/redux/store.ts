import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import snackbar, { SnackbarState } from './reducers/snackbar';
import session, { SessionState } from './reducers/session';
import search, { SearchState } from './reducers/search';
export interface ApplicationState {
    snackbar: SnackbarState;
    session: SessionState;
    search: SearchState;
}
const reducers = combineReducers({
    snackbar,
    session,
    search,
});
const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['search'],
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, {}, applyMiddleware(thunk));
export const persistor = persistStore(store as any);
export default store;

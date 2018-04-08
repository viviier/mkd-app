/**
 * @file index.js
 * @date 2018/4/4
 */

import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { saveState, loadState } from './utils/localstorage'
import reducer from './reducers';
import App from './components';

const persistedState = loadState();
const store = createStore(reducer, persistedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => {
	saveState(store.getState());
}, 1000);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
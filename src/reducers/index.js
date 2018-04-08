/**
 * @file reducer
 * @date 2018/4/4
 */

import { combineReducers } from 'redux';

function mkds(state = [], action) {
    switch (action.type) {
        case 'ADD_MKD':
            return [
                ...state,
                {
                    id: action.id,
                    title: '',
                    value: ''
                }
            ];
        case 'EDITOR_MKD':
            return state.map((item, index) => {
                if (index === action.index) {
                    return {
                        ...item,
                        title: action.title,
                        value: action.value
                    }
                }
                else {
                    return item;
                }
            });
        default: return state;
    }
}

export default combineReducers({
    mkds
});
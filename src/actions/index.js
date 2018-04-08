/**
 * @file actions
 * @date 2018/4/4
 */

import uuid from 'uuid/v4';

export function addMkd() {
    return {
        type: 'ADD_MKD',
        id: uuid()
    };
}

export function editorMkd(index, title, value) {
    return {
        type: 'EDITOR_MKD',
        index,
        title,
        value
    }
}
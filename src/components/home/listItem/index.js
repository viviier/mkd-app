/**
 * @file listItem
 * @date 2018/4/4
 */

import React from 'react';

import './style.less';

export default class ListItem extends React.Component {
    render() {
        const {data = {}, ...other} = this.props;
        const {title} = data;
        
        return (
            <div
                className='list-item'
                {...other}
            >
                <p>{title}</p>
            </div>
        );
    };
}
/**
 * @file home.js
 * @date 2018/4/4
 */

import React from 'react';
import { connect } from 'react-redux';
import './style.less';

// component
import ItemList from './listItem';

// action
import { addMkd } from '../../actions';

class Home extends React.Component {
    
    state = {
        list: []
    }

    componentDidMount() {
        this.setState({
            list: this.props.list
        });
    }

    updatedState() {
        setTimeout(() => {
            this.props.handleAddClick();
            this.setState({
                list: this.props.list
            }); 
        }, 0);
    }

    getListDom(list) {
        let dom = list && list.map((item, key) => {
            return <ItemList data={item} key={key} onClick={() => this.handleItemClick(key)}/>
        });

        return dom;
    }

    handleItemClick(index) {
        // 获取index，title，value
        let {title, value} = this.state.list[index];
        this.props.toEditor(index, title, value);
    }

    render() {
        return (
            <div className="home">
                {this.getListDom(this.state.list)}
               <div className="list-item">
                    <i 
                        className="icon-add"
                        onClick={() => this.updatedState()} />
               </div>
            </div>
        );
    }
}

let Component = connect(
    state => {
        return {
            list: state.mkds
        }
    },
    dispatch => {
        return {
            handleAddClick: function() {
                dispatch(addMkd());
            }
        }
    }
)(Home);

export default Component;
 /**
 * @file editor.js
 * @date 2018/4/7
 */

import React from 'react';
import { connect } from 'react-redux';
import marked from 'marked';
import pako from 'pako';
import { editorMkd } from '../../actions/index';

import './style.less';

class Editor extends React.Component {
    state = {
        title: '',
        value: ''
    }

    componentDidMount() {
        let {title, value} = this.props.data;

        this.setState({
            title,
            value
        });
    }

    handleChange(e) {    
        let value = e.target.value;

        let ary = {
            'INPUT': {
                title: value
            },
            'TEXTAREA': {
                value
            }
        }[e.target.tagName];

        this.setState(ary);
    }

    handleInputChange(e) {
        let value = e.target.value;
        
        this.setState({
            value
        });
    }

    // 增加Tab缩进、 ---ctrl+s保存---
    handleKeyEnter(e) {
        if (e.keyCode === 9) {
            this.setState({
                value: e.target.value + '    '
            });
            e.preventDefault();
        }

        if (e.keyCode === 83 && (e.altKey || e.ctrlKey)) {
            e.preventDefault();
        }
    }

    handleBackClick() {
        this.props.toHome();
    }

    handleSaveClick() {
        let index = this.props.data.index;
        let { title, value } = this.state;
        value = pako.gzip(value, {to: 'string'});
        
        this.props.changeMkd(index, title, value);
    }

    render() {
        return (
            <div className="editor">
                <div className="input-btns">
                    <button className="back" onClick={() => this.handleBackClick()}>返回</button>
                    <button className="save" onClick={() => this.handleSaveClick()} >保存</button>
                </div>
                <div className="input-wrap">
                    <input 
                        placeholder="请输入你的标题"
                        className="title-box" 
                        onChange={e => this.handleChange(e)} 
                        value={this.state.title || ''} 
                    />
                    <div className="marked-wrap">
                        <textarea 
                            placeholder="写点什么..."
                            className="input-box"
                            // 去掉单词拼写检测
                            spellCheck='false'
                            onChange={e => this.handleChange(e)}
                            onKeyDown={e => this.handleKeyEnter(e)}
                            value={this.state.value || ''}></textarea>
                        <div className="div-line"></div>
                        <div className="marked-box" dangerouslySetInnerHTML={{__html: marked(this.state.value || '')}}></div>
                    </div>
                </div>
            </div>
        );
    }
}

let Component = connect(
    null,
    dispatch => {
        return {
            changeMkd: function(index, title, value) {
                dispatch(editorMkd(index, title, value))
            }
        };
    }
)(Editor);

export default Component;
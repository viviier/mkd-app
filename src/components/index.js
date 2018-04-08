import React from 'react';

// component
import Home from './home';
import Editor from './editor';
import 'normalize.css';
import './common/base.less';

export default class App extends React.Component {

    state = {
        editor: false,
        data: {}
    }

    handleToHome() {
        this.setState({
            editor: false
        });
    }

    handleToEditor(index, title, value) {
        this.setState({
            editor: true,
            data: {
                index,
                title,
                value
            }
        });
    }

    render() {
        return (
            this.state.editor
            ? <Editor 
                data={this.state.data}
                toHome={() => this.handleToHome()} 
                />
            : <Home toEditor={(index, title, value) => this.handleToEditor(index, title, value)} />
        );
    }
}
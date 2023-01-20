import { Component } from 'react';
import './Weavy.css';

import WeavyContext from './WeavyContext';

export default class Weavy extends Component {
    constructor(props) {
        super(props);
        this.state = { weavy: new window.Weavy({ jwt: props.jwt, init: false }) };
    };

    componentDidMount() {
        this.state.weavy.init();
    }

    componentWillUnmount() {
        this.state.weavy.destroy();
    };

    render() {
        return <WeavyContext.Provider value={this.state}>{this.props.children}</WeavyContext.Provider>;
    };
}

import {Component} from 'react';

export default class Sair extends Component {
    componentDidMount()
    {
        localStorage.clear();

        this.props.history.push("/");
    }
}
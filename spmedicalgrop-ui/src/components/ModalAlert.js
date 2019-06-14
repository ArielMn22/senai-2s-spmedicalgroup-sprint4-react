import React, { Component } from "react";
import "../assets/css/modalAlert.css";

export default class ModalAlert extends Component {
  constructor(props) {
    super(props);

    this.state = {
        active : true
    }
  }

  onDivClick() {
    console.log("eita");
    
    this.setState({active : false});

    this.props.onClick();
  }

  componentWillReceiveProps()
  {
    this.setState({active : true});
  }

  render() {
    return (
      <div onClick={this.onDivClick.bind(this)} id={this.state.active ? "modal__alert__background" : "modal__alert__none"}>
        <div id="modal__alert__item">
          <span>{this.props.titulo}</span>
          <p>{this.props.descricao}</p>
        </div>
      </div>
    );
  }
}

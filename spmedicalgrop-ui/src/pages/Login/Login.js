import React, { Component } from "react";
import Cabecalho from "../../components/Cabecalho";
import Rodape from "../../components/Rodape";
import "../../assets/css/login.css";
import "../../assets/css/style.css";
import Axios from "axios";
import {Link} from 'react-router-dom';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      senha: ""
    };
  }

  gerarToken(event) {
    event.preventDefault();

    let _email = this.state.email;
    let _senha = this.state.senha;

    console.log(_email);
    console.log(_senha);

    Axios.post(
      "http://localhost:5000/api/login",
      {
        email: _email,
        senha: _senha
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(data => {
        localStorage.setItem("spmedicalgroup-usuario", data.data.token);
        this.props.history.push("/minhasconsultas");
      })
      .catch(erro => console.log(erro));

  }

  atualizaEstadoEmail(event) {
    this.setState({ email: event.target.value });
  }

  atualizaEstadoSenha(event) {
    this.setState({ senha: event.target.value });
  }

  render() {
    return (
      <div>
        <Cabecalho />
        <main>
          <section id="login__banner">
            <div className="login__area">
              <h1>Login</h1>
              <form
                action=""
                onSubmit={this.gerarToken.bind(this)}
                id="login__form"
              >
                <label className="inpt-round">
                  <input
                    className="grande"
                    id="inpt-round"
                    type="text"
                    value={this.state.email}
                    onChange={this.atualizaEstadoEmail.bind(this)}
                    placeholder="&nbsp;"
                  />
                  <span className="inpt-label">E-mail</span>
                </label>
                <label className="inpt-round">
                  <input
                    className="grande"
                    id="inpt-round"
                    type="password"
                    value={this.state.senha}
                    onChange={this.atualizaEstadoSenha.bind(this)}
                    placeholder="&nbsp;"
                  />
                  <span className="inpt-label">Senha</span>
                </label>
                <label htmlFor="">
                  <button className="squared-btn">Login</button>
                </label>
              </form>
                <div className="login__cliqueAqui__div">
                <span>Ainda não é cadastrado?<br /><Link to="/cadastrarusuario" className="login__a__cliqueaqui">Clique aqui</Link> para se cadastrar.</span>
                </div>
            </div>
          </section>
        </main>
        <Rodape />
      </div>
    );
  }
}

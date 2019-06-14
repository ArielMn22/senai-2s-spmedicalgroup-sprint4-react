import "../../assets/css/login.css";
import "../../assets/css/style.css";
import api from "../../services/api";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import Rodape from "../../components/Rodape";
import Cabecalho from "../../components/Cabecalho";
import ModalAlert from "../../components/ModalAlert";

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      senha: "",
      modalAlert: false,
      isSuccessful: false
    };
  }

  gerarToken(event) {
    event.preventDefault();

    let _email = this.state.email;
    let _senha = this.state.senha;

    console.log(_email);
    console.log(_senha);

    api
      .usuarios({
        email: _email,
        senha: _senha
      })
      .Login()
      .then(data => {
        localStorage.setItem("spmedicalgroup-usuario", data.data.token);
        this.setState({ isSuccessful: true });
        this.setState({ modalAlert: true });
        this.props.history.push("/minhasconsultas");
      })
      .catch(() => {
        this.setState({ isSuccessful: false });
        this.setState({ modalAlert: true });
      });
  }

  atualizaEstadoEmail(event) {
    this.setState({ email: event.target.value });
  }

  atualizaEstadoSenha(event) {
    this.setState({ senha: event.target.value });
  }

  onModalClick() {
    this.setState({ modalAlert: false }); // Resetar o estado do modal
  }

  render() {
    return (
      <div>
        <Cabecalho />
        {this.state.modalAlert ? (
          this.state.isSuccessful ? (
            <ModalAlert
              titulo="Sucesso!"
              descricao="Login efetuado com sucesso!"
              onClick={this.onModalClick.bind(this)}
            />
          ) : (
            <ModalAlert
              titulo="Erro"
              descricao="O login não foi efetuado, verifique seu e-mail e sua senha."
              onClick={this.onModalClick.bind(this)}
            />
          )
        ) : null}
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
                <span>
                  Ainda não é cadastrado?
                  <br />
                  <Link to="/cadastrarusuario" className="login__a__cliqueaqui">
                    Clique aqui
                  </Link>{" "}
                  para se cadastrar.
                </span>
              </div>
            </div>
          </section>
        </main>
        <Rodape />
      </div>
    );
  }
}

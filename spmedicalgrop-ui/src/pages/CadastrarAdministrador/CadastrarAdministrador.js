import React, { Component } from "react";
import "../../assets/css/cadastrarconsulta.css";
import Cabecalho from "../../components/Cabecalho";
import Rodape from "../../components/Rodape";
import api from "../../services/api";
import ModalAlert from "../../components/ModalAlert";

export default class CadastrarPaciente extends Component {
  constructor() {
    super();

    this.state = {
      nome: "",
      email: "",
      senha: "",
      telefone: "",
      modalAlert: false,
      isSuccessful: false
    };
  }

  onModalClick()
  {
    this.setState({modalAlert: false});
  }

  cadastrarUsuario(event) {
    event.preventDefault();

    let administradorFormData = new FormData();

    // Setando valores do FormData
    administradorFormData.set("nome", this.state.nome);
    administradorFormData.set("email", this.state.email);
    administradorFormData.set("senha", this.state.senha);
    administradorFormData.set("telefone", this.state.telefone);
    administradorFormData.set("idTipoUsuario", 1);
    administradorFormData.set("idClinica", 1);

    api
      .administrador(administradorFormData)
      .cadastrarAdministrador()
      .then(() => {
        this.setState({ isSuccessful: true });
        this.setState({modalAlert : true});
      })
      .catch(() => {
        this.setState({ isSuccessful: false });
        this.setState({modalAlert : true});
      });
  }

  atualizaNome(event) {
    this.setState({ nome: event.target.value });
  }

  atualizaSenha(event) {
    this.setState({ senha: event.target.value });
  }

  atualizaEmail(event) {
    this.setState({ email: event.target.value });
  }

  atualizaTelefone(event) {
    this.setState({ telefone: event.target.value });
  }

  render() {
    return (
      <div>
        <Cabecalho />
        {this.state.modalAlert ? (
          this.state.isSuccessful ? (
            <ModalAlert
              titulo="Sucesso!"
              decricao="Usuário administrador cadastrado com sucesso!"
              onClick={this.onModalClick.bind(this)}
            />
          ) : (
            <ModalAlert
              titulo="Erro"
              descricao="Usuário administrador não pode ser cadastrado, verifique os campos e tente novamente."
              onClick={this.onModalClick.bind(this)}
            />
          )
        ) : null}
        <main>
          <section id="cadastrarConsulta" class="pa-all-g">
            <h1 class="ma-top-gg">Cadastrar Administrador</h1>
            <div class="formulario pa-all-g ma-top-m">
              <form onSubmit={this.cadastrarUsuario.bind(this)} action="#">
                <label class="inpt-round">
                  <input
                    class="grande"
                    id="inpt-round"
                    type="text"
                    placeholder="&nbsp;"
                    onChange={this.atualizaNome.bind(this)}
                    value={this.state.nome}
                  />
                  <span class="inpt-label">Nome</span>
                </label>
                <label class="inpt-round">
                  <input
                    class="grande"
                    id="inpt-round"
                    type="email"
                    placeholder="&nbsp;"
                    onChange={this.atualizaEmail.bind(this)}
                    value={this.state.email}
                  />
                  <span class="inpt-label">E-mail</span>
                </label>
                <label class="inpt-round">
                  <input
                    class="medio"
                    id="inpt-round"
                    type="password"
                    placeholder="&nbsp;"
                    onChange={this.atualizaSenha.bind(this)}
                    value={this.state.senha}
                  />
                  <span class="inpt-label">Senha</span>
                </label>
                <label class="inpt-round">
                  <input
                    class="medio"
                    id="inpt-round"
                    type="text"
                    placeholder="&nbsp;"
                    onChange={this.atualizaTelefone.bind(this)}
                    vlaue={this.state.telefone}
                  />
                  <span class="inpt-label">Telefone</span>
                </label>

                <label>
                  <button action="submit" class="green-btn">
                    Cadastrar
                  </button><br/>
                </label>
              </form>
            </div>
          </section>
        </main>
        <Rodape />
      </div>
    );
  }
}

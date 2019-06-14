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
      modalAlert: 0,
      prevModalAlert: 0
    };
  }

  showModal(event) 
  {
    event.preventDefault();

    this.setState({modalAlert : this.state.modalAlert + 1});

    console.log("modalAlert", this.state.modalAlert)
    console.log("prevModalAlert", this.state.prevModalAlert)
    console.log("deu")
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
        // this.setState({modalAlert : this.state.modalAlert + 1});
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
        {this.state.prevModalAlert != this.state.modalAlert && (
          <ModalAlert
            titulo="Sucesso!"
            descricao="Administrador cadastrado com sucesso!"
            trigger={this.state.modalAlert}
          />
        )}
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
                  <button onClick={this.showModal.bind(this)} class="green-btn">
                    Modal
                  </button>
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

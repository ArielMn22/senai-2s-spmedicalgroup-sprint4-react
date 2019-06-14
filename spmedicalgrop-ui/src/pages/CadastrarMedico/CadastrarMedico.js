import React, { Component } from "react";
import "../../assets/css/cadastrarconsulta.css";
import Cabecalho from "../../components/Cabecalho";
import Rodape from "../../components/Rodape";
import api from "../../services/api";
import ModalAlert from '../../components/ModalAlert';

export default class CadastrarMedico extends Component {
  constructor() {
    super();

    this.state = {
      nome: "",
      email: "",
      senha: "",
      telefone: "",
      especialidade: "",
      crm: "",
      listaEspecialidades: [],

      isSuccessful: false,
      modalAlert: false
    };
  }

  onModalClick()
  {
    this.setState({modalAlert: false});
    this.setState({isSuccessful: null});
  }

  componentDidMount() {
    api
      .especialidades()
      .ListarEspecialidades()
      .then(data => {
        this.setState({ listaEspecialidades: data.data });
      })
      .catch(erro => {
        console.log(erro);
      });
  }

  cadastrarMedico(event) {
    event.preventDefault();

    let medicoFormData = new FormData();

    // Setando valores do FormData
    medicoFormData.set("nome", this.state.nome);
    medicoFormData.set("email", this.state.email);
    medicoFormData.set("senha", this.state.senha);
    medicoFormData.set("telefone", this.state.telefone);
    // medicoFormData.set('rg', this.state.rg);
    // medicoFormData.set('cpf', this.state.cpf);
    // medicoFormData.set('dataNascimento', this.state.dataNascimento);
    // medicoFormData.set('endereco', this.state.endereco);
    medicoFormData.set("idEspecialidade", this.state.especialidade);
    medicoFormData.set("crm", this.state.crm);
    medicoFormData.set("idTipoUsuario", 2);
    medicoFormData.set("idClinica", 1);

    api
      .medicos(medicoFormData)
      .CadastrarMedico()
      .then(() => {
        this.setState({ isSuccessful: true });
        this.setState({ modalAlert: true });
      })
      .catch(() => {
        this.setState({ isSuccessful: false });
        this.setState({ modalAlert: true });
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

  atualizaEspecialidade(event) {
    this.setState({ especialidade: event.target.value });
  }

  atualizaEstadoCRM(event) {
    this.setState({ crm: event.target.value });
  }

  render() {
    return (
      <div>
        <Cabecalho />
        {this.state.modalAlert ? (
          this.state.isSuccessful ? (
            <ModalAlert
              titulo="Sucesso!"
              descricao="Médico cadastrado com sucesso!"
              onClick={this.onModalClick.bind(this)}
            />
          ) : (
            <ModalAlert
              titulo="Erro"
              descricao="o médico não pode ser cadastrado, verifique os campos e tente novamente."
              onClick={this.onModalClick.bind(this)}
            />
          )
        ) : null}
        <main>
          <section id="cadastrarConsulta" class="pa-all-g">
            <h1 class="ma-top-gg">Cadastrar médico</h1>
            <div class="formulario pa-all-g ma-top-m">
              <form onSubmit={this.cadastrarMedico.bind(this)} action="#">
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
                <label for="select-round" className="select-round">
                  <select
                    value={this.state.especialidade}
                    onChange={this.atualizaEspecialidade.bind(this)}
                    className="medio"
                    name="medico"
                    id="select-round"
                  >
                    <option>Selecione</option>
                    {this.state.listaEspecialidades.map(especialidade => {
                      return (
                        <option value={especialidade.id}>
                          {especialidade.nome}
                        </option>
                      );
                    })}
                  </select>
                  <span className="select-label">Especialidade</span>
                </label>

                <label className="inpt-round">
                  <input
                    className="medio"
                    id="inpt-round"
                    type="number"
                    min="1"
                    step="any"
                    placeholder="&nbsp;"
                    value={this.state.crm}
                    onChange={this.atualizaEstadoCRM.bind(this)}
                  />
                  <span className="inpt-label">CRM</span>
                </label>

                <label>
                  <button action="submit" class="green-btn">
                    Cadastrar
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

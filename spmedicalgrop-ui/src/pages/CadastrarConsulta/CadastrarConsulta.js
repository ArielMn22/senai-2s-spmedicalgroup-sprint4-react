import React, { Component } from "react";
import Cabecalho from "../../components/Cabecalho";
import Rodape from "../../components/Rodape";
import api from "../../services/api";

export default class CadastrarConsulta extends Component {
  constructor() {
    super();

    this.state = {
      listaPacientes: [],
      listaMedicos: [],
      listaStatus: [],

      paciente: "",
      medico: "",
      dataConsulta: "",
      horario: "",
      status: "",
      preco: "",
      descricao: ""
    };
  }

  atualizaEstadoPaciente(event) {
    this.setState({ paciente: event.target.value });
  }

  atualizaEstadoMedico(event) {
    this.setState({ medico: event.target.value });
  }

  atualizaEstadoDataConsulta(event) {
    this.setState({ dataConsulta: event.target.value });
  }

  atualizaEstadoHorario(event) {
    this.setState({ horario: event.target.value });
  }

  atualizaEstadoStatus(event) {
    this.setState({ status: event.target.value });
  }

  atualizaEstadoPreco(event) {
    this.setState({ preco: event.target.value });
  }

  atualizaEstadoDescricao(event) {
    this.setState({ descricao: event.target.value });
  }

  componentDidMount() {
    api
      .pacientes()
      .ListarPacientes()
      .then(data => {
        this.setState({ listaPacientes: data.data });
      })
      .catch(erro => console.log(erro));

    api
      .medicos()
      .ListarMedicos()
      .then(data => {
        this.setState({ listaMedicos: data.data });
      })
      .catch(erro => console.log(erro));

    api
      .status()
      .ListarStatus()
      .then(data => {
        this.setState({ listaStatus: data.data });
      })
      .catch(erro => console.log(erro));
  }

  consultaPost(event) {
    event.preventDefault();

    let consulta = {
      idPaciente: this.state.paciente,
      idMedico: this.state.medico,
      dataConsulta: this.state.dataConsulta + "T" + this.state.horario,
      observacoes: this.state.descricao,
      preco: this.state.preco,
      idStatus: this.state.status
    };

    console.log(consulta);

    // api.consultas(consulta).post()
    // .then(data => {
    //     console.log(data);
    // })
    // .catch(
    //     erro => console.log(erro)
    // );
    api
      .consultas(consulta)
      .cadastrarConsulta()
      .then(data => console.log(data))
      .catch(erro => console.log(erro));
  }

  render() {
    return (
      <div>
        <Cabecalho />
        <main>
          <section id="cadastrarConsulta" className="pa-all-g">
            <h1 className="ma-top-g">Cadastrar consulta</h1>
            <div className="formulario pa-all-g ma-top-m">
              <form onSubmit={this.consultaPost.bind(this)}>
                <label className="select-round">
                  <select
                    value={this.state.paciente}
                    onChange={this.atualizaEstadoPaciente.bind(this)}
                    className="grande"
                    name="paciente"
                    id="select-round"
                  >
                    <option>Selecione</option>
                    {this.state.listaPacientes.map(paciente => {
                      return (
                        <option value={paciente.id}>
                          {paciente.idUsuarioNavigation.nome}
                        </option>
                      );
                    })}
                  </select>
                  <span className="select-label">Paciente</span>
                </label>

                <label for="select-round" className="select-round">
                  <select
                    value={this.state.medico}
                    onChange={this.atualizaEstadoMedico.bind(this)}
                    className="grande"
                    name="medico"
                    id="select-round"
                  >
                    <option>Selecione</option>
                    {this.state.listaMedicos.map(medico => {
                      return (
                        <option value={medico.id}>
                          {medico.idUsuarioNavigation.nome}
                        </option>
                      );
                    })}
                  </select>
                  <span className="select-label">Médico</span>
                </label>

                <label className="inpt-round">
                  <input
                    className="medio"
                    id="inpt-round"
                    type="date"
                    placeholder="&nbsp;"
                    value={this.state.dataConsulta}
                    onChange={this.atualizaEstadoDataConsulta.bind(this)}
                  />
                  <span className="inpt-label">Data da consulta</span>
                </label>

                <label className="inpt-round">
                  <input
                    className="medio"
                    id="inpt-round"
                    type="time"
                    placeholder="&nbsp;"
                    value={this.state.horario}
                    onChange={this.atualizaEstadoHorario.bind(this)}
                  />
                  <span className="inpt-label">Horário da consulta</span>
                </label>

                <label for="select-round" className="select-round">
                  <select
                    value={this.state.status}
                    onChange={this.atualizaEstadoStatus.bind(this)}
                    className="grande"
                    name="paciente"
                    id="select-round"
                  >
                    <option>Selecione</option>
                    {this.state.listaStatus.map(status => {
                      return <option value={status.id}>{status.nome}</option>;
                    })}
                  </select>
                  <span className="select-label">Status</span>
                </label>

                <label className="inpt-round">
                  <input
                    className="medio"
                    id="inpt-round"
                    type="number"
                    min="1"
                    step="any"
                    placeholder="&nbsp;"
                    value={this.state.preco}
                    onChange={this.atualizaEstadoPreco.bind(this)}
                  />
                  <span className="inpt-label">Preço</span>
                </label>

                <label className="text-round">
                  <textarea
                    className="texto"
                    id="text-round"
                    placeholder="&nbsp;"
                    value={this.state.descricao}
                    onChange={this.atualizaEstadoDescricao.bind(this)}
                  />
                  <span className="text-label">Observações</span>
                </label>

                <label>
                  {/* <button action="submit" className="green-btn">
                    Cadastrar
                  </button> */}
                  <input
                    className="green-btn"
                    value="Cadastrar"
                    type="submit"
                  />
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

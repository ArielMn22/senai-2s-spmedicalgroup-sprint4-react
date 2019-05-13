import React, { Component } from "react";
import api from "../services/api";
import { withRouter } from "react-router-dom";

class ConsultasAccordion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listaStatus: [],
      novoStatus: "",
      novaDescricao: "",
      consultaAntiga: {}
    };
  }

  componentDidMount() {
    api
      .status()
      .ListarStatus()
      .then(data => {
        this.setState({ listaStatus: data.data });
      });

    this.setState({ consultaAntiga: this.props.consulta });
  }

  atualizarConsulta(event) {
    event.preventDefault();

    let consulta = this.state.consultaAntiga;

    let novaConsulta = {
      id : consulta.id,
      observacoes: this.state.novaDescricao,
      idStatus: this.state.novoStatus,
      nomeStatus : ""
    };

    console.log(novaConsulta);

    api
      .consultas(novaConsulta)
      .atualizarConsulta()
      .then(data => {
        console.log(data);
      })
      .catch(erro => {
        console.log(erro);
      });

      this.atualizaEstadoEdit();

      // Buscando status por id // Para mandar para o Parent
      this.state.listaStatus.forEach(status => {
        if (status.id == novaConsulta.idStatus)
        {
          novaConsulta.nomeStatus = status.nome;
        } 
      });

      this.props.consultaAtualizada(novaConsulta);
  }

  atualizaEstadoEdit() {
    let consulta = this.state.consultaAntiga;

    console.log("Atualiza estado edit:");
    console.log(consulta);
    consulta.edit = !consulta.edit;

    this.setState({ consultaAntiga: consulta });
  }

  atualizaEstadoStatus(event) {
    this.setState({ novoStatus: event.target.value });
  }

  atualizaEstadoDescricao(event) {
    this.setState({ novaDescricao: event.target.value });
  }

  render() {
    let token = localStorage.getItem("spmedicalgroup-usuario");

    let jwtDecode = require("jwt-decode");

    let decode = jwtDecode(token);

    // Atribui a consulta que foi enviada por props...
    let consulta = this.props.consulta;

    if (decode.tipoUsuario === "Paciente") {
      return (
        <div id="listar__accordion__div">
          <div class="listar__accordion__div__item">
            <h3>Médico</h3>
            <br />
            <p>{consulta.medicoNome}</p>
          </div>
          <div class="listar__accordion__div__item">
            <h3>Especialidade</h3>
            <br />
            <p>{consulta.especialidade}</p>
          </div>

          <div class="listar__accordion__div__item">
            <h3>Observações</h3>
            <br />
            <p>{consulta.descricao}</p>
          </div>
          <div class="listar__accordion__div__item">
            <h3>Data da consulta</h3>
            <br />
            <p>{consulta.dataConsulta}</p>
          </div>
          <div class="listar__accordion__div__item">
            <h3>Preço</h3>
            <br />
            <p>R$ {consulta.preco}</p>
          </div>
          <div class="listar__accordion__div__item">
            <h3>Status</h3>
            <br />
            {consulta.status === "Realizada" ||
            consulta.status === "Confirmada" ? (
              <p style={{ color: "#00ec00" }}>{consulta.status}</p>
            ) : consulta.status === "Cancelada" ||
              consulta.status === "Recusada" ? (
              <p style={{ color: "red" }}>{consulta.status}</p>
            ) : consulta.status === "Adiada" ? (
              <p style={{ color: "#dddd30" }}>{consulta.status}</p>
            ) : (
              <p style={{ color: "#2393ff" }}>{consulta.status}</p>
            )}
          </div>
        </div>
      );
    } else if (decode.tipoUsuario === "Administrador" || decode.tipoUsuario === "Médico") {
      if (consulta.edit === true) {
        return (
          <div id="listar__accordion__div">
            <form class="accordion-form" onSubmit={this.atualizarConsulta.bind(this)}>
              <div class="listar__accordion__div__item">
                <h3>Paciente</h3>
                <br />
                <p>{consulta.pacienteNome}</p>
              </div>
              <div class="listar__accordion__div__item">
                <h3>E-mail Paciente</h3>
                <br />
                <p>{consulta.pacienteEmail}</p>
              </div>
              <div class="listar__accordion__div__item">
                <h3>Médico</h3>
                <br />
                <p>{consulta.medicoNome}</p>
              </div>
              <div class="listar__accordion__div__item">
                <h3>E-mail Médico</h3>
                <br />
                <p>{consulta.medicoEmail}</p>
              </div>
              <div class="listar__accordion__div__item">
                <h3>Observações</h3>
                <br />
                <label className="text-round">
                  <textarea
                    className="texto"
                    id="text-round"
                    placeholder="&nbsp;"
                    value={this.state.novaDescricao}
                    onChange={this.atualizaEstadoDescricao.bind(this)}
                  />
                </label>
              </div>
              <div class="listar__accordion__div__item">
                <h3>Data da consulta</h3>
                <br />
                <p>{consulta.dataConsulta}</p>
              </div>
              <div class="listar__accordion__div__item">
                <h3>Status</h3>
                <br />
                <label for="select-round" className="select-round">
                  <select
                    value={this.state.novoStatus}
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
                </label>{" "}
              </div>

              <div className="listar__accordion__div__item">
                <button className="btn-green-yellow" onClick={this.atualizarConsulta.bind(this)}>Finalizar</button>
              </div>

              <div className="listar__accordion__div__item">
                <button className="btn-red" onClick={this.atualizaEstadoEdit.bind(this)}>Cancelar</button>
              </div>
            </form>
          </div>
        );
      } else {
        return (
          <div id="listar__accordion__div">
            <div class="listar__accordion__div__item">
              <h3>Paciente</h3>
              <br />
              <p>{consulta.pacienteNome}</p>
            </div>
            <div class="listar__accordion__div__item">
              <h3>E-mail Paciente</h3>
              <br />
              <p>{consulta.pacienteEmail}</p>
            </div>
            <div class="listar__accordion__div__item">
              <h3>Médico</h3>
              <br />
              <p>{consulta.medicoNome}</p>
            </div>
            <div class="listar__accordion__div__item">
              <h3>E-mail Médico</h3>
              <br />
              <p>{consulta.medicoEmail}</p>
            </div>
            <div class="listar__accordion__div__item">
              <h3>Observações</h3>
              <br />
              <p>{consulta.descricao}</p>
            </div>
            <div class="listar__accordion__div__item">
              <h3>Data da consulta</h3>
              <br />
              <p>{consulta.dataConsulta}</p>
            </div>
            <div class="listar__accordion__div__item">
              <h3>Status</h3>
              <br />
              {consulta.status === "Realizada" ||
              consulta.status === "Confirmada" ? (
                <p style={{ color: "#00ec00" }}>{consulta.status}</p>
              ) : consulta.status === "Cancelada" ||
                consulta.status === "Recusada" ? (
                <p style={{ color: "red" }}>{consulta.status}</p>
              ) : consulta.status === "Adiada" ? (
                <p style={{ color: "#dddd30" }}>{consulta.status}</p>
              ) : (
                <p style={{ color: "#2393ff" }}>{consulta.status}</p>
              )}
            </div>

            <div className="listar__accordion__div__item">
              <button
                className="btn-green-yellow"
                onClick={this.atualizaEstadoEdit.bind(this)}
              >
                Atualizar
              </button>
            </div>
          </div>
        );
      }
    }
  }
}

export default withRouter(ConsultasAccordion);
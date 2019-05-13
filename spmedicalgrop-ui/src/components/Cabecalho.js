import React, { Component } from "react";
import "../assets/css/style.css";
import Logo from "../assets/imgs/SP Medical Group - logo.png";
import { Link, withRouter } from "react-router-dom";

class Cabecalho extends Component {
  deslogar(event) {
    event.preventDefault();

    localStorage.removeItem("spmedicalgroup-usuario");

    this.props.history.push("/login");
  }

  render() {
    let token = localStorage.getItem("spmedicalgroup-usuario");

    if (token != null) {

      let jwtDecode = require("jwt-decode"); // Importando o jwt-decode
      let decode = jwtDecode(token);

      if (decode.tipoUsuario === "Paciente") {
        return (
          <div>
            <header>
              <nav id="top-bar" className="degrade">
                <div id="logo" className="flex-container">
                  <Link to="/">
                    <div className="logo-img">
                      <img src={Logo} alt="Logo da SP Medical Group" />
                    </div>
                  </Link>

                  <p>SP Medical Group</p>
                </div>
                <div id="menu">
                  <ul className="flex-container">
                    <li>
                      <Link to="/">
                        <i className="fas fa-home" />
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link to="/sobrenos">
                        <i className="fas fa-book" />
                        Sobre Nós
                      </Link>
                    </li>
                    <li>
                      <Link to="/contatenos">
                        <i className="fas fa-phone" />
                        Contato
                      </Link>
                    </li>
                    <li>
                      <Link to="/minhasconsultas">
                        <i className="fas fa-user" />
                        Minhas Consultas
                      </Link>
                    </li>
                    <li>
                      <Link onClick={this.deslogar.bind(this)}>
                        <i className="fas fa-user" />
                        Sair
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </header>
          </div>
        );
      } else if (decode.tipoUsuario === "Médico") {
        return (
          <div>
            <header>
              <nav id="top-bar" className="degrade">
                <div id="logo" className="flex-container">
                  <Link to="/">
                    <div className="logo-img">
                      <img src={Logo} alt="Logo da SP Medical Group" />
                    </div>
                  </Link>

                  <p>SP Medical Group</p>
                </div>
                <div id="menu">
                  <ul className="flex-container">
                    <li>
                      <Link to="/">
                        <i className="fas fa-home" />
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link to="/sobrenos">
                        <i className="fas fa-book" />
                        Sobre Nós
                      </Link>
                    </li>
                    <li>
                      <Link to="/contatenos">
                        <i className="fas fa-phone" />
                        Contato
                      </Link>
                    </li>
                    <li>
                      <Link to="/minhasconsultas">
                        <i className="fas fa-user" />
                        Minhas Consultas
                      </Link>
                    </li>
                    <li>
                      <Link onClick={this.deslogar.bind(this)}>
                        <i className="fas fa-user" />
                        Sair
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </header>
          </div>
        );
      } else if (decode.tipoUsuario === "Administrador") {
        return (
          <div>
            <header>
              <nav id="top-bar" className="degrade">
                <div id="logo" className="flex-container">
                  <Link to="/">
                    <div className="logo-img">
                      <img src={Logo} alt="Logo da SP Medical Group" />
                    </div>
                  </Link>

                  <p>SP Medical Group</p>
                </div>
                <div id="menu">
                  <ul className="flex-container">
                    <li>
                      <Link to="/">
                        <i className="fas fa-home" />
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link to="/sobrenos">
                        <i className="fas fa-book" />
                        Sobre Nós
                      </Link>
                    </li>
                    <li>
                      <Link to="/contatenos">
                        <i className="fas fa-phone" />
                        Contato
                      </Link>
                    </li>
                    <li>
                      <Link to="/cadastrarmedico">
                        <i className="fas fa-phone" />
                        Cadastrar Médico
                      </Link>
                    </li>

                    <li>
                      <Link to="/cadastraradministrador">
                        <i className="fas fa-phone" />
                        Cadastrar Administrador
                      </Link>
                    </li>
                    <li>
                      <Link to="/cadastrarconsulta">
                        <i className="fas fa-user" />
                        Cadastrar Consulta
                      </Link>
                    </li>
                    <li>
                      <Link to="/minhasconsultas">
                        <i className="fas fa-user" />
                        Todas Consultas
                      </Link>
                    </li>
                    <li>
                      <Link onClick={this.deslogar.bind(this)}>
                        <i className="fas fa-user" />
                        Sair
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </header>
          </div>
        );
      }
    } else {
      return (
        <div>
          <header>
            <nav id="top-bar" className="degrade">
              <div id="logo" className="flex-container">
                <Link to="index.html">
                  <div className="logo-img">
                    <img src={Logo} alt="Logo da SP Medical Group" />
                  </div>
                </Link>

                <p>SP Medical Group</p>
              </div>
              <div id="menu">
                <ul className="flex-container">
                  <li>
                    <Link to="/">
                      <i className="fas fa-home" />
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/sobrenos">
                      <i className="fas fa-book" />
                      Sobre Nós
                    </Link>
                  </li>
                  <li>
                    <Link to="/contatenos">
                      <i className="fas fa-phone" />
                      Contato
                    </Link>
                  </li>
                  <li>
                    <Link to="/login">
                      <i className="fas fa-user" />
                      Login
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </header>
        </div>
      );
    }
  }
}

export default withRouter(Cabecalho);

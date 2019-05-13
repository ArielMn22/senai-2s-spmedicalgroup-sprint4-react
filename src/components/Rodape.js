import React, { Component } from "react";
// import logo from "../../logo.svg";
import "../assets/css/style.css";
import "../assets/css/rodape.css";
import {Link} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <footer>
          <section id="rodape" className="pa-all-g">
            <div className="rodape-coluna">
              <h4>Endereço</h4>
              <p>Alameda Barão de Limeira, 539.</p>
              <h4>Contato</h4>
              <p>+55 (11) 95555-5555</p>
            </div>

            <div className="rodape-coluna">
              <ul>
                <li>
                  <Link to="/">Nossas especialidades</Link>
                  <br />
                </li>
                <li>
                  <Link to="/">Localização</Link>
                  <br />
                </li>
                <li>
                  <Link to="/">Nossas instalações</Link>
                  <br />
                </li>
                <li>
                  <Link to="/sobrenos">Sobre nós</Link>
                  <br />
                </li>
                <li>
                  {localStorage.getItem("spmedicalgroup-usuairo") ? (
                    <Link to="/minhasconsultas">Minhas consultas</Link>
                    ) : (
                      <Link to="/login">Minhas consultas</Link>
                    )}
                  <br />
                </li>
              </ul>
            </div>
          </section>
        </footer>
      </div>
    );
  }
}

export default App;

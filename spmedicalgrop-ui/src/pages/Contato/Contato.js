import React, { Component } from "react";
import Cabecalho from '../../components/Cabecalho'
import Rodape from '../../components/Rodape'
import '../../assets/css/contato.css'
// import ContatenosEmail from "../../components/ContatenosEmail";

export default class Contato extends Component {
  render() {
    return (
        <div>
        <Cabecalho />
        <main>
          <section id="contato__banner">
          <div id="contato__banner__layer"></div>
            <div id="contato__banner__text">
              <h1>Contate-nos</h1>
              <h2>Endereço</h2>
              <p>Alameda Barão de Limeira, 539 - Santa Cecília</p>
              <h2>Telefone</h2>
              <p>(11) 91111-1111</p>
            </div>
          </section>
          {/* <ContatenosEmail /> */}
        </main>
        <Rodape />
      </div>
    );
  }
}

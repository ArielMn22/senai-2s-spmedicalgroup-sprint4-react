import React, { Component } from "react";
import "../../assets/css/listarconsulta.css";
import "../../assets/css/style.css";
import Rodape from "../../components/Rodape";
import Cabecalho from "../../components/Cabecalho";
import ListarConsultas from "../../components/ListarConsultas";
import MapaConsultas from "../../components/MapaConsultas";

export default class MinhasConsultas extends Component {

  render() {
    return (
      <div>
        <Cabecalho />
        <main>
          <section id="minhasConsultas" className="pa-all-g">
            <h1 className="ma-top-g">Minhas Consultas</h1>
                <ListarConsultas />
                <MapaConsultas />
          </section>
        </main>
        <Rodape />
      </div>
    );
  }
}

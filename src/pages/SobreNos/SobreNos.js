import React, { Component } from "react";
import "../../assets/css/sobrenos.css";
import Cabecalho from "../../components/Cabecalho";
import Rodape from "../../components/Rodape";
import Livros from "../../assets/imgs/books.png";

export default class SobreNos extends Component {
  render() {
    return (
      <div>
          <Cabecalho />
        <main>
          <section id="sobre__banner">
          <div id="sobre__banner__layer"></div>
            <div id="sobre__banner__text">
              <h1>Sobre nós</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatum quibusdam suscipit dolore natus enim perferendis quia
                adipisci eligendi, nostrum nam. Iusto incidunt enim iste maiores
                sequi cumque delectus possimus quae.
              </p>
            </div>
          </section>

          <section id="sobre__nossaFilosofia__section">
            <div id="sobre__nossaFilofia__img">
              <img src={Livros} alt="Imagem de livros." />
            </div>
            <div id="sobre__nossaFilofia__text">
              <h2>Nossa filosofia</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consectetur quidem dolores aspernatur vero natus quam modi,
                ducimus illo accusamus earum obcaecati. Sequi nostrum
                voluptatum, illo pariatur assumenda exercitationem rerum
                voluptas?
              </p>
            </div>
          </section>
        </main>
        <Rodape />
      </div>
    );
  }
}

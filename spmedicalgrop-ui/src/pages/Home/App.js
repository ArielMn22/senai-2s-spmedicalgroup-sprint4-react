import React, { Component } from "react";
import "../../assets/css/style.css";
import "../../assets/css/index.css";
import Rodape from '../../components/Rodape';
import Woman from "../../assets/imgs/woman.jpg";
import Lobby1 from "../../assets/imgs/lobby2.jpg";
import Lobby2 from "../../assets/imgs/bg1.jpg";
import Cabecalho from '../../components/Cabecalho';
import {Link} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Cabecalho />
        <main>
          <section id="banner">
            <h1>A clínica que cuida da sua família!</h1>
            <Link to="/contato" className="green-btn">Fale Conosco</Link>
          </section>
          <section id="areaPaciente">
            <div id="imgPaciente">
              {/* <img
                src={Woman}
                alt="Imagem de uma paciente do hospital."
              /> */}
            </div>
            <div id="areaPaciente__text">
              <h2>Área do paciente</h2>
              <p>Deseja ver suas consultas ou resultados de exames?</p>
              <Link to="/login" className="green-btn">
                Clique aqui!
              </Link>
            </div>
          </section>
      
          <div className="separador-img" />

          <section id="nossasInstalacoes" className="pa-all-g">
            <h2>Nossas Instalações</h2>

            <div className="instalacao">
              <img src={Lobby1} alt="Lobby do hospital." />
              <p>Excelentes instalações para garantir o seu conforto...</p>
            </div>

            <div className="instalacao">
              <p>...E total agilidade.</p>
              <img src={Lobby2} alt="Lobby do hospital." />
            </div>
          </section>
          <section id="localizacao" className="pa-all-g">
            <h2>Localização</h2>
            <div className="localizacao-conteudo pa-all-g">
              <div className="google-api">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.887132913111!2d-46.648477084454164!3d-23.536561566563364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5843deade6e3%3A0x124f377d06c7e71f!2sAlameda+Bar%C3%A3o+de+Limeira%2C+539+-+Campos+El%C3%ADseos%2C+S%C3%A3o+Paulo+-+SP%2C+01202-001!5e0!3m2!1spt-PT!2sbr!4v1555096014275!5m2!1spt-PT!2sbr"
                  width="800"
                  height="600"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
              <div className="localizacao-text">
                <h3>Endereço</h3>
                <p>Alameda Barão de Limeira, 539.</p>
                <h3>Contato</h3>
                <p>+55 (11) 95555-5555</p>
              </div>
            </div>
          </section>
        </main>
        <Rodape />
      </div>
    );
  }
}

export default App;

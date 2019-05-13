import React, {Component} from 'react';
import '../assets/css/style.css'
import '../assets/css/cadastrarconsulta.css'

export default class ContatenosEmail extends Component {
    render()
    {
        return(
            <div>
                <section id="cadastrarConsulta" className="pa-all-g">
            <h1>Mande-nos um e-mail</h1>
            <div className="formulario pa-all-g ma-top-m">
              <form action="#">
                <label className="inpt-round">
                  <input
                    className="grande"
                    id="inpt-round"
                    type="text"
                    placeholder="&nbsp;"
                  />
                  <span className="inpt-label">Nome</span>
                </label>

                <label className="inpt-round">
                  <input
                    className="grande"
                    id="inpt-round"
                    type="email"
                    placeholder="&nbsp;"
                  />
                  <span className="inpt-label">E-mail</span>
                </label>

                <label className="text-round">
                  <textarea
                    className="texto"
                    id="text-round"
                    placeholder="&nbsp;"
                  />
                  <span className="text-label">Mensagem</span>
                </label>

                <label>
                  <button action="submit" className="green-btn">
                    Enviar
                  </button>
                </label>
              </form>
            </div>
          </section>
            </div>
        );
    }
}
import React, { Component } from "react";
import "../assets/css/mapaConsultas.css";
import "../assets/css/style.css";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import api from "../services/api";
import ListarConsultas from "./ListarConsultas";
import scrollToElement from "scroll-to-element";

const mapStyles = {
  //   width: "80vw",
  //   height: "50vh"
  borderRadius: 5,
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: "100%",
  //   width: "99vw",
  height: "50vh"
};

export class MapaConsultas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false, //Esconde ou mostra as informações do local.
      activeMarker: {}, //Contem as informações do marcador/marker ativado.
      selectedPlace: {}, //Contem as informações do local.
      listaConsultasLocalidade: [],

      mapaDiv: {}
    };

    this.mapa = React.createRef();
  }

  configurarConsultas() {
    let lista = this.state.listaConsultasLocalidade.map(evento => {
      return {
        ...evento,
        mostraInfo: false,
        selecionado: {},
        marcadorAtivo: {}
      };
    });

    this.setState({ listaConsultasLocalidade: lista });
    console.log(this.state.listaConsultasLocalidade);
  }

  onMarkerClick = (props, marker, e) => {
    // Check code
    // console.log("e", e);
    console.log("props", props);
    console.log("marker", marker);
    // console.log("props.id", props.id);

    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

    // Check code
    // console.log("selected", this.state.selectedPlace);
    // console.log("activeMarker", this.state.activeMarker);

    // Mostra info individual
    // let newList = [];

    // this.state.listaConsultasLocalidade.map((consulta, i) => {
    //   if (consulta.id == props.id) {
    //     consulta.mostraInfo = true;

    //     // Check code
    //     // console.log("consulta.mostraInfo", consulta.mostraInfo);
    //   }

    //   newList.push(consulta);
    // });

    // this.setState({ listaConsultasLocalidade: newList });
    // console.log("Listaaa", this.state.listaConsultasLocalidade);
  };

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.state.listaConsultasLocalidade.map((consulta, i) => {
        if (consulta.id == props.id) {
          consulta.mostraInfo = false;
          // Check code
          // console.log("consulta.mostraInfo", consulta.mostraInfo);
        }
      });

      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false
        // activeMarker: null
      });

      this.state.listaConsultasLocalidade.map((consulta, i) => {
        consulta.mostraInfo = true;
        console.log("consulta.mostraInfo", consulta.mostraInfo);
      });

      // Check code
      // console.log("selected", this.state.selectedPlace);
      // console.log("activeMarker", this.state.activeMarker);
    }
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    api
      .consultasLocalidade()
      .ListarConsultasLocalidade()
      .then(res => {
        this.setState({ listaConsultasLocalidade: res.data });
        console.log(this.state.listaConsultasLocalidade);
        this.configurarConsultas();
      });

    this.setState({
      mapaDiv: document.querySelector("#consultas__mapa__container")
    });
  }

  componentDidUpdate(prevProps) {
    console.log("prevProps", prevProps);
    console.log("prevProps.IdConsulta", prevProps.idConsulta);

    if (this.props.idConsulta !== prevProps.idConsulta) {
      this.state.listaConsultasLocalidade.map(marker => {
        if (marker.id === this.props.idConsulta) {
          this.setState({
            selectedPlace: {
              position: {
                lat: marker.latitude,
                lng: marker.longitude
              }
            }
          });
        }
      });
      scrollToElement(this.state.mapaDiv);
    } else if (this.props.idConsulta === prevProps.idConsulta && this.props.idConsulta !== 0)
    {
      scrollToElement(this.state.mapaDiv);
    }
  }

  // componentWillReceiveProps() {
  //   this.state.listaConsultasLocalidade.map(marker => {
  //     if (marker.id === this.props.idConsulta) {
  //       this.setState({
  //         selectedPlace: {
  //           position: {
  //             lat: marker.latitude,
  //             lng: marker.longitude
  //           }
  //         }
  //       });
  //     }
  //   });

  // scrollToElement(this.state.mapaDiv);
  // }

  render() {
    return (
      <div id="consultas__mapa__container" className="pa-all-g">
        <h2>Localização</h2>

        <div className="ma-top-m" id="consultas__mapa_Map">
          <Map
            ref={this.mapa}
            google={this.props.google}
            zoom={15}
            center={this.state.selectedPlace.position}
            style={mapStyles}
            onClick={this.onMapClicked.bind(this)}
            initialCenter={{
              lat: -23.5364933,
              lng: -46.6483345
            }}
          >
            {this.state.listaConsultasLocalidade.map(consultaLocalidade => {
              return (
                <Marker
                  onClick={this.onMarkerClick.bind(this)}
                  id={consultaLocalidade.id}
                  especialidade={consultaLocalidade.especialidade}
                  medicoNome={consultaLocalidade.medicoNome}
                  medicoEmail={consultaLocalidade.medicoEmail}
                  pacienteEmail={consultaLocalidade.pacienteEmail}
                  pacienteNome={consultaLocalidade.pacienteNome}
                  descricao={consultaLocalidade.descricao}
                  status={consultaLocalidade.status}
                  data={consultaLocalidade.dataConsulta}
                  preco={consultaLocalidade.preco}
                  name={consultaLocalidade.especialidade}
                  position={{
                    lat: consultaLocalidade.latitude,
                    lng: consultaLocalidade.longitude
                  }}
                />
              );
            })}

            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClick={this.onClose.bind(this)}
            >
              <div>
                <h2>{this.state.activeMarker.especialidade}</h2>
                <ul>
                  <li>
                    <p>Médico: {this.state.activeMarker.medicoNome}.</p>
                  </li>
                  <li>
                    <p>Paciente: {this.state.activeMarker.pacienteNome}.</p>
                  </li>
                  <li>
                    <p>Data Consulta: {this.state.activeMarker.data}hs.</p>
                  </li>
                  <li>
                    <p>Descrição: {this.state.activeMarker.descricao}</p>
                  </li>
                </ul>
              </div>
            </InfoWindow>
          </Map>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  // apiKey: 'Empty for development purposes.'
})(MapaConsultas);

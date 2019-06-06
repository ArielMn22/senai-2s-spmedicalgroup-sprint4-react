import React, { Component } from "react";
import "../assets/css/mapaConsultas.css";
import "../assets/css/style.css";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import api from "../services/api";

const mapStyles = {
  //   width: "80vw",
  //   height: "50vh"
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
      activeMarker: {}, //Mostra o ícone ativado.
      selectedPlace: {}, //Mostra as informações em cima do local.
      listaConsultasLocalidade: []
    };
  }

  configurarConsultas() {
    let listaAntiga = this.state.listaConsultasLocalidade;
    let lista = listaAntiga.map(evento => {
      return {
        ...evento,
        mostraInfo: false,
        selecionado: false,
        marcadorAtivo: false
      }
    })

    this.setState({listaConsultasLocalidade : lista});
    console.log(this.state.listaConsultasLocalidade)
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  componentDidMount() {
    api
      .consultasLocalidade()
      .ListarConsultasLocalidade()
      .then(res => {
        this.setState({ listaConsultasLocalidade: res.data });
        console.log(this.state.listaConsultasLocalidade);
        this.configurarConsultas();
      });
  }

  render() {
    return (
      <div id="consultas__mapa__container" className="pa-all-g">
        <h2>Localização</h2>

        <div className="ma-top-m" id="consultas__mapa_Map">
          <Map
            google={this.props.google}
            zoom={14}
            style={mapStyles}
            initialCenter={{
              lat: -23.5364933,
              lng: -46.6483345
            }}
          >
            {this.state.listaConsultasLocalidade.map(consultaLocalidade => {
              return (
                <Marker
                  position={{
                    lat: consultaLocalidade.latitude,
                    lng: consultaLocalidade.longitude
                  }}
                  id={consultaLocalidade.id}
                  onClick={this.onMarkerClick.bind(this)}
                  name={"Kenyatta International Convention Centre"}
                >
                  <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose.bind(this)}
                  >
                    <div>
                      <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                  </InfoWindow>
                </Marker>
              );
            })}
            {/* <Marker
              onClick={this.onMarkerClick}
              name={"Kenyatta International Convention Centre"}
            />
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >
              <div>
                <h4>{this.state.selectedPlace.name}</h4>
              </div>
            </InfoWindow> */}
          </Map>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  // apiKey: ''
})(MapaConsultas);

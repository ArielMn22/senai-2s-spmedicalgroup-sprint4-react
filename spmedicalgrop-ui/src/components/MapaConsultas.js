import React, { Component } from "react";
import "../assets/css/mapaConsultas.css";
import "../assets/css/style.css";
import { Map, GoogleApiWrapper } from "google-maps-react";

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

    this.state = {};
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
              lat: -1.2884,
              lng: 36.8233
            }}
          />
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  // apiKey: ''
})(MapaConsultas);

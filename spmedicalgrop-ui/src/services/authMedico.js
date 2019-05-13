export const medicoAutenticado = () => {
    let token = localStorage.getItem("spmedicalgroup-usuario");
    if (token != null) {
      let jwtDecode = require("jwt-decode"); // Importando o jwt-decode
      let decode = jwtDecode(token);
  
      if (decode.tipoUsuario == "Médico") {
        return true;
      } else {
        return false;
      }
    } else {
        return false;
    }
  };
  
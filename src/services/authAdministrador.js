export const administradorAutenticado = () => {
  let token = localStorage.getItem("spmedicalgroup-usuario");
  if (token != null) {
    let jwtDecode = require("jwt-decode"); // Importando o jwt-decode
    let decode = jwtDecode(token);

    if (decode.tipoUsuario === "Administrador") {
      return true;
    } else {
      return false;
    }
  } else {
      return false;
  }
};

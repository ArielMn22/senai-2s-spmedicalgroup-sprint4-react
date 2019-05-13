import axios from "axios";

const url = "http://localhost:5000/api/";

export default {
  consultas(consulta) {
    const auth = "bearer " + localStorage.getItem("spmedicalgroup-usuario");

    return {
      getAll: () =>
        axios.get(url + "consultas/listarporusuariologado", {
          headers: {
            Authorization: auth
          }
        }),

      cadastrarConsulta: () =>
        axios.post(url + "consultas", consulta, {
          headers: { Authorization: auth }
        }),

      atualizarConsulta: () =>
        axios.put(url + "consultas", consulta, {
          headers: {
            Authorization: auth
          }
        })
    };
  },

  pacientes(paciente) {
    const auth = "bearer " + localStorage.getItem("spmedicalgroup-usuario");

    return {
      CadastrarPaciente: () =>
        axios.post(url + "usuarios/paciente", paciente, {
          headers: {
            Authorization: auth,
            "Content-Type": "multipart/form-data"
          }
        }),

      ListarPacientes: () =>
        axios.get(url + "usuarios/pacientes", {
          headers: {
            Authorization: auth
          }
        })
    };
  },

  medicos(medico) {
    const auth = "bearer " + localStorage.getItem("spmedicalgroup-usuario");

    return {
      CadastrarMedico: () =>
        axios.post(url + "usuarios/medico", medico, {
          headers: {
            Authorization: auth,
            "Content-Type": "multipart/form-data"
          }
        }),

      ListarMedicos: () =>
        axios.get(url + "usuarios/medicos", {
          headers: {
            Authorization: auth
          }
        })
    };
  },

  administrador(administrador) {
    const auth = "bearer " + localStorage.getItem("spmedicalgroup-usuario");

    return {
      cadastrarAdministrador: () =>
        axios.post(url + "usuarios/administrador", administrador, {
          headers: {
            Authorization: auth,
            "Content-Type": "multipart/form-data"
          }
        })
    };
  },

  status() {
    const auth = "bearer " + localStorage.getItem("spmedicalgroup-usuario");

    return {
      ListarStatus: () =>
        axios.get(url + "status", {
          headers: {
            Authorization: auth
          }
        })
    };
  },
  especialidades() {
    const auth = "bearer " + localStorage.getItem("spmedicalgroup-usuario");

    return {
      ListarEspecialidades: () =>
        axios.get(url + "especialidades", {
          headers: {
            Authorization: auth
          }
        })
    };
  }
};

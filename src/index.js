import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './pages/Home/App';
import MinhasConsultas from './pages/MinhasConsultas/MinhasConsultas';
import NaoEncontrada from './pages/NaoEncontrada/NaoEncontrada';
import Login from './pages/Login/Login';
import Sair from './pages/Sair/Sair';
import CadastrarConsulta from './pages/CadastrarConsulta/CadastrarConsulta';
import CadastrarPaciente from './pages/CadastrarPaciente/CadastrarPaciente';
import CadastrarMedico from './pages/CadastrarMedico/CadastrarMedico';
import CadastrarAdministrador from './pages/CadastrarAdministrador/CadastrarAdministrador';

import { usuarioAutenticado } from './services/authUsuario';
// import { medicoAutenticado } from './services/authMedico';
import { administradorAutenticado } from './services/authAdministrador';
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import Contato from './pages/Contato/Contato';
import SobreNos from './pages/SobreNos/SobreNos';

const UsuarioPermissao = ({ component : Component}) => (
    <Route
        render = {props => usuarioAutenticado() ?
            (<Component {...props}/>) :
            (<Redirect to={{ pathname : '/login', state: {from: props.location}}} />)
        }
    />
);

// const MedicoPermissao = ({ component : Component}) => (
//     <Route
//         render = {props => medicoAutenticado() ?
//             (<Component {...props}/>) :
//             (<Redirect to={{ pathname : '/login', state: {from: props.location}}} />)
//         }
//     />
// );

const AdministradorPermissao = ({ component : Component}) => (
    <Route
        render = {props => administradorAutenticado() ?
            (<Component {...props}/>) :
            (<Redirect to={{ pathname : '/', state: {from: props.location}}} />)
        }
    />
);

const rotas = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App} />
                <AdministradorPermissao exact path="/cadastrarconsulta" component={CadastrarConsulta}/>
                <Route exact path="/cadastrarusuario" component={CadastrarPaciente}/>
                <AdministradorPermissao exact path="/cadastrarmedico" component={CadastrarMedico}/>
                <AdministradorPermissao exact path="/cadastraradministrador" component={CadastrarAdministrador}/>
                <UsuarioPermissao exact path="/minhasconsultas" component={MinhasConsultas}/>
                <UsuarioPermissao exact path="/sair" component={Sair}/>
                <Route exact path="/login" component={Login}></Route>
                <Route exact path="/contatenos" component={Contato}></Route>
                <Route exact path="/sobrenos" component={SobreNos}></Route>
                <Route component={NaoEncontrada}/>
            </Switch>
        </div>
    </Router>
);

ReactDOM.render(rotas, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

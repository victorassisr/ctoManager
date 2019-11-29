// core components/views for Admin layout
import Home from "views/Home/Home.jsx";

import Box from "views/Caixa/index.jsx";
import addBox from "views/Caixa/add.jsx";
import editBox from "views/Caixa/edit.jsx";
import viewBox from "views/Caixa/view.jsx";

import Login from "views/Login/Login.jsx";

import User from "views/User/index.jsx";
import addUser from "views/User/add.jsx";
import editUser from "views/User/edit.jsx";

import TipoUsuario from "views/TipoUsuario/index.jsx";
import addTipo from "views/TipoUsuario/add.jsx";
import editTipo from "views/TipoUsuario/edit.jsx";

import Location from "views/Location/index.jsx";

import GerarRelatorio from "views/Relatorio/index.jsx";
import Relatorio from "views/Relatorio/relatorio.jsx";

import Cliente from "views/Cliente/index.jsx";
import addCliente from "views/Cliente/addCliente.jsx";
import editCliente from "views/Cliente/edit.jsx";

import Splitter from "views/Spliter/index.jsx";
import addSplitter from "views/Spliter/addSpliter.jsx";
import editSplitter from "views/Spliter/edit.jsx";

import Bairro from "views/Bairro/index.jsx";
import AddBairro from "views/Bairro/add.jsx";
import editBairro from "views/Bairro/edit.jsx";


import Instalacoes from "views/Instalacoes/index.jsx";
import viewInstalacao from "views/Instalacoes/view.jsx";
import addInstalacao from "views/Instalacoes/add.jsx";
import editInstalacao from "views/Instalacoes/edit.jsx";

import Graficos from "views/Graficos/Graficos.jsx"
import Grafico from "views/Graficos/meusGraficos.jsx"
import Mapa from "views/Mapa/mapa.js";

const dashboardRoutes = [
  {
    path: "/home",
    component: Home,
    layout: "/admin"
  },
  {
    path: "/caixa",
    component: Box,
    layout: "/admin"
  },
  {
    path: "/addBox",
    component: addBox,
    layout: "/admin"
  },
  {
    path: "/editBox/:id",
    name: "Editar Caixas",
    component: editBox,
    layout: "/admin"
  },
  {
    path: "/viewBox/:id",
    name: "Visualizar Caixas",
    component: viewBox,
    layout: "/admin"
  },
  {
    path: "/gerarRelatorio",
    component: GerarRelatorio,
    layout: "/admin"
  },
  {
    path: "/relatorio/:dateInicio/:dateFim",
    component: Relatorio,
    layout: "/admin"
  },
  {
    path: "/graficos",
    name: "Gráficos",
    component: Grafico,
    layout: "/admin"
  },
  {
    path: "/user",
    component: User,
    layout: "/admin"
  },
  {
    path: "/client",
    component: Cliente,
    layout: "/admin"
  },
  {
    path: "/addClient",
    component: addCliente,
    layout: "/admin"
  },
  {
    path: "/editClient/:id",
    component: editCliente,
    layout: "/admin"
  },
  {
    path: "/splitter",
    component: Splitter,
    layout: "/admin"
  },
  {
    path: "/addSplitter",
    component: addSplitter,
    layout: "/admin"
  },
  {
    path: "/editSplitter/:id",
    component: editSplitter,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Área de Login",
    component: Login,
    layout: "/admin"
  },
  {
    path: "/addUser",
    name: "Cadastrar Usuário",
    component: addUser,
    layout: "/admin"
  },
  {
    path: "/editUser/:id",
    name: "Editar Usuário",
    component: editUser,
    layout: "/admin"
  },
  /*{
    path: "/location",
    name: "Localizações",
    component: Location,
    layout: "/admin"
  },*/
  {
  path: "/bairros",
  component: Bairro,
  layout: "/admin"
  },
  {
  path: "/addBairro",
  component: AddBairro,
  layout: "/admin"
  },
  {
    path: "/editBairro/:id",
    component: editBairro,
    layout: "/admin"
    },
  {
    path: "/tipos",
    component: TipoUsuario,
    layout: "/admin"
  },
  {
    path: "/addTipo",
    component: addTipo,
    layout: "/admin"
  },
  {
    path: "/editTipo/:id",
    component: editTipo,
    layout: "/admin"
  },
  {
    path: "/instalacoes",
    component: Instalacoes,
    layout: "/admin"
  },
  {
    path: "/mapa",
    name: "Mapa",
    component: Mapa,
    layout: "/admin"
  },
  {
    path: "/detalhesInstalacao/:id/:porta/:dataInstalacao",
    component: viewInstalacao,
    layout: "/admin"
  },
  {
    path: "/addInstalacao",
    component: addInstalacao,
    layout: "/admin"
  },
  {
    path: "/editInstalacao/:id/:porta/:data",
    component: editInstalacao,
    layout: "/admin"
  }

];

export default dashboardRoutes;
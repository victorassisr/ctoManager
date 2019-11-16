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

import Location from "views/Location/index.jsx";

import GerarRelatorio from "views/Relatorio/index.jsx";
import Relatorio from "views/Relatorio/relatorio.jsx";

import Bairro from "views/Bairro/index.jsx";
import Cliente from "views/Cliente/index.jsx";
import Spliter from "views/Spliter/index.jsx";
import addSpliter from "views/Spliter/addSpliter.jsx";
import AddBairro from "views/Bairro/add.jsx";


import Instalacoes from "views/Instalacoes/index.jsx";
import viewInstalacao from "views/Instalacoes/view.jsx";
import addInstalacao from "views/Instalacoes/add.jsx";

const dashboardRoutes = [
  {
    path: "/home",
    name: "Home",
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
    path: "/relatorio",
    component: Relatorio,
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
    path: "/spliter",
    component: Spliter,
    layout: "/admin"
  },
  {
    path: "/addSpliter",
    component: addSpliter,
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
  {
    path: "/location",
    name: "Localizações",
    component: Location,
    layout: "/admin"
  },
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
    path: "/instalacoes",
    component: Instalacoes,
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
  }

];

export default dashboardRoutes;
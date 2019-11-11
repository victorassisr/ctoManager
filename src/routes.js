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

import Location from "views/Location/index.jsx";

import GerarRelatorio from "views/Relatorio/index.jsx";
import Relatorio from "views/Relatorio/relatorio.jsx";

import Cliente from "views/Cliente/index.jsx";

const dashboardRoutes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
    layout: "/admin"
  },
  {
    path: "/caixa",
    name: "Caixas",
    component: Box,
    layout: "/admin"
  },
  {
    path: "/addBox",
    name: "Cadastrar Caixas",
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
    name: "Gerar relatório",
    component: GerarRelatorio,
    layout: "/admin"
  },
  {
    path: "/relatorio",
    name: "Relatório",
    component: Relatorio,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "Usuários",
    component: User,
    layout: "/admin"
  },
  {
    path: "/client",
    name: "Clientes",
    component: Cliente,
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
  }
];

export default dashboardRoutes;

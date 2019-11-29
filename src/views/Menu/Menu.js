// @material-ui/icons
import {Dashboard, Person, LocationOn, Assessment, FormatListBulleted, List, Timeline}
from "@material-ui/icons";
// core components/views for Admin layout
import Home from "views/Home/Home.jsx";
import Box from "views/Caixa/index.jsx";
import Location from "views/Location/index.jsx";
import User from "views/User/index.jsx";
import Login from "views/Login/Login.jsx";
import Relatorio from "views/Relatorio/index.jsx";
import Cliente from "views/Cliente/index.jsx";
import Splitter from "views/Spliter/index.jsx";
import Bairro from "views/Bairro/index.jsx";
import TipoUsuario from "views/TipoUsuario/index.jsx";
import Instalacoes from "views/Instalacoes/index.jsx";
import Graficos from "views/Graficos/Graficos.jsx";
import Grafico from "views/Graficos/meusGraficos.jsx";
import Mapa from "views/Mapa/mapa.js";

const dashboardRoutes = [
  {
    path: "/home",
    name: "Home",
    icon: Dashboard,
    component: Home,
    layout: "/admin"
  },
  {
    path: "/bairros",
    name: "Bairros",
    icon: LocationOn,
    component: Bairro,
    layout: "/admin"
  },
  {
    path: "/caixa",
    name: "Caixas",
    icon: FormatListBulleted,
    component: Box,
    layout: "/admin"
  },
  {
    path: "/gerarRelatorio",
    name: "Relatório de instalações",
    icon: Assessment,
    component: Relatorio,
    layout: "/admin"
  },
  {
    path: "/instalacoes",
    name: "Instalações",
    icon: "work_outline",
    component: Instalacoes,
    layout: "/admin"
  },
  {
    path: "/splitter",
    name: "Splitters",
    icon: List,
    component: Splitter,
    layout: "/admin"
  },
  /*{
    path: "/location",
    name: "Localizações",
    icon: LocationOn,
    component: Location,
    layout: "/admin"
  },*/
  {
    path: "/client",
    name: "Clientes",
    icon: Person,
    component: Cliente,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "Funcionários",
    icon: Person,
    component: User,
    layout: "/admin"
  },
  {
    path: "/tipos",
    name: "Tipos de usuário",
    icon: "supervised_user_circle",
    component: TipoUsuario,
    layout: "/admin"
  },
  {
    path: "/mapa",
    name: "Mapa",
    icon: LocationOn,
    component: Mapa,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Área de Login",
    icon: "account_circle",
    component: Login,
    layout: "/admin"
  }
];

export default dashboardRoutes;

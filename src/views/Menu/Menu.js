// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LocationOn from "@material-ui/icons/LocationOn";
import Assessment from "@material-ui/icons/Assessment";
import FormatListBulleted from "@material-ui/icons/FormatListBulleted";
// core components/views for Admin layout
import Home from "views/Home/Home.jsx";
import Box from "views/Caixa/index.jsx";
import Location from "views/Location/index.jsx";
import User from "views/User/index.jsx";
import Login from "views/Login/Login.jsx";
import Relatorio from "views/Relatorio/index.jsx";
import Cliente from "views/Cliente/index.jsx";
import Spliter from "views/Spliter/index.jsx";
import Bairro from "views/Bairro/index.jsx";


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
    name: "Gerar relatório por período",
    icon: Assessment,
    component: Relatorio,
    layout: "/admin"
  },
  {
    path: "/relatorio",
    name: "Relatório",
    icon: Assessment,
    component: Relatorio,
    layout: "/admin"
  },
  {
    path: "/client",
    name: "Clientes",
    icon: Person,
    component: Cliente,
    layout: "/admin"
  },
  {
    path: "/spliter",
    name: "Spliters",
    icon: Person,
    component: Spliter,
    layout: "/admin"
  },
  {
    path: "/location",
    name: "Localizações",
    icon: LocationOn,
    component: Location,
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
    path: "/client",
    name: "Clientes",
    icon: Person,
    component: Cliente,
    layout: "/admin"
  },
  {
    path: "/spliter",
    name: "Spliters",
    icon: Person,
    component: Spliter,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Área de Login",
    icon: Person,
    component: Login,
    layout: "/admin"
  }
];

export default dashboardRoutes;

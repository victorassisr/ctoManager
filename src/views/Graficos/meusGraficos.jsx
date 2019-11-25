import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { utils } from "../../common";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import {
  dailyChart,
  monthlyChart
} from "variables/charts.jsx";

const styles = {
    cardCategoryWhite: {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none"
    },
    itemNumber: {
      cursor: "pointer",
      marginRight: 5,
      marginLeft: -1,
      userSelect: "none",
      position: "relative",
      float: "left",
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 12,
      paddingRight: 12,
      lineHeight: 1.42857143,
      textDecoration: "none",
      color: "#337ab7",
      backgroundColor: "#FFFFFF",
      borderStyle: "solid",
      border: 1,
      borderColor: "#DDDDDD"
    }
  };
  
  class Grafico extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          instalacoesWeek: [],
          instalacoesMonth: []
        };
        this.loadInstalacoesWeek = this.loadInstalacoesWeek.bind(this);
        this.loadInstalacoesMonth = this.loadInstalacoesMonth.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
      }

      setRedirect = async () => {
        this.setState({
          redirect: true
        });
      };

      renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to={`/admin/${this.state.page}`} />;
        }
      };

      loadInstalacoesMonth = async () => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        axios
          .get(`${utils.URL_BASE_API}/instalacoes/month`, {
            headers: {
              "X-Access-Token": user.token
            }
          })
          .then(res => {
            this.setState({ instalacoesMonth: res.data });
          })
          .catch(err => {
            console.log(err.response);
          });
      };

      loadInstalacoesWeek = async () => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        axios
          .get(`${utils.URL_BASE_API}/instalacoes/week`, {
            headers: {
              "X-Access-Token": user.token
            }
          })
          .then(res => {
            this.setState({
                   instalacoesWeek: res.data
                }); 
            
          })
          .catch(err => {
            console.log(err.response);
          });
      };

      componentDidMount() {
        this.loadInstalacoesMonth();
        this.loadInstalacoesWeek();
      }
    
    render(){
    const { classes } = this.props;
    
    var semana = [];
    var ano = [];

    for(var i = 2; i<=7; i++){
        semana[i] = this.state.instalacoesWeek.find(semana => semana.diaDaSemana == [i]);
    }

    for(var i = 1; i<=12; i++){
        ano[i] = this.state.instalacoesMonth.find(ano => ano.mes == [i]);
    }

    const diasChart = {
        data: {
            labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
            series: [[
                    semana[2] == null ? 0 : semana[2].quantInstalacoes,
                    semana[3] == null ? 0 : semana[3].quantInstalacoes,
                    semana[4] == null ? 0 : semana[4].quantInstalacoes,
                    semana[5] == null ? 0 : semana[5].quantInstalacoes,
                    semana[6] == null ? 0 : semana[6].quantInstalacoes,
                    semana[7] == null ? 0 : semana[7].quantInstalacoes,
                ]]    
        }
      }
    const mesesChart = {
        data: {
            labels: [
              "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
              "Julho","Agosto", "Setembro","Outubro","Novembro","Dezembro"
            ],
            series: [[
                ano[1] == null ? 0 : ano[1].Instalacoes,
                ano[2] == null ? 0 : ano[2].Instalacoes,
                ano[3] == null ? 0 : ano[3].Instalacoes,
                ano[4] == null ? 0 : ano[4].Instalacoes,
                ano[5] == null ? 0 : ano[5].Instalacoes,
                ano[6] == null ? 0 : ano[6].Instalacoes,
                ano[7] == null ? 0 : ano[7].Instalacoes,
                ano[8] == null ? 0 : ano[8].Instalacoes,
                ano[9] == null ? 0 : ano[9].Instalacoes,
                ano[10] == null ? 0 : ano[10].Instalacoes,
                ano[11] == null ? 0 : ano[11].Instalacoes,
                ano[12] == null ? 0 : ano[12].Instalacoes
            ]]
    }
    }

        return (
            <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                <Card chart>
                    <CardHeader color="success">
                    <ChartistGraph
                        className="ct-chart"
                        data={diasChart.data}
                        type="Line"
                        options={dailyChart.options}
                        listener={dailyChart.animation}
                    />
                    </CardHeader>
                    <CardBody>
                    <h4 className={classes.cardTitle}>Instalações na última semana</h4>
                    <p className={classes.cardCategory}>
                        <span className={classes.successText}>
                        <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                        </span>{" "}
                        crescimento das instalações por dia.
                    </p>
                    </CardBody>
                    <CardFooter chart>
                    <div className={classes.stats}>
                        <AccessTime /> atualizado 4 minutos atrás.
                    </div>
                    </CardFooter>
                </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                <Card chart>
                    <CardHeader color="warning">
                    <ChartistGraph
                        className="ct-chart"
                        data={mesesChart.data}
                        type="Bar"
                        options={monthlyChart.options}
                        responsiveOptions={monthlyChart.responsiveOptions}
                        listener={monthlyChart.animation}
                    />
                    </CardHeader>
                    <CardBody>
                    <h4 className={classes.cardTitle}>Instalações mensais</h4>
                    <p className={classes.cardCategory}>Instalações por mês no ano de 2019.</p>
                    </CardBody>
                    <CardFooter chart>
                    <div className={classes.stats}>
                        <AccessTime /> atualizado 4 minutos atrás.
                    </div>
                    </CardFooter>
                </Card>
                </GridItem>
            </GridContainer>
            </div>
        );
    }
}


  export default withStyles(styles)(Grafico);
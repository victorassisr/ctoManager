import React from "react";

import axios from "axios";
import moment from "moment";
import { Redirect } from "react-router-dom";

import "react-confirm-alert/src/react-confirm-alert.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { utils } from "../../common";

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
    backgroundColor: "#fff",
    borderStyle: "solid",
    border: 1,
    borderColor: "#ddd"
  }
};

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instalacao: {},
      currentPage: 1,
      allPerPage: 15,
      redirect: false,
      page: ""
    };
    this.loadInstalacao = this.loadInstalacao.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
  }

  setRedirect = async page => {
    this.setState({
      redirect: true,
      page: page
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={`/admin/${this.state.page}`} />;
    }
  };

  handleClick(event) {
    this.setState({ currentPage: Number(event.target.dataset.id) });
  }

  loadInstalacao = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const handle = this.props.match.params;
    axios
    .get(`${utils.URL_BASE_API}/instalacoes/all/${handle.id}/${handle.porta}/${handle.dataInstalacao}`, {
        headers: {
          "X-Access-Token": user.token
        }
      })
      .then(res => {
        this.setState({ instalacao: res.data }); 
      })      
      .catch(err => {
        alert(err.response);
      });
  };
  componentDidMount() {
    this.loadInstalacao();
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <GridContainer>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Detalhes da instalação</h4>
              </CardHeader>
              <CardBody style={{ paddingTop: 0 }}>                
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6} style= {{marginTop: 40}} >
                        <label className={classes.labelInfo}>
                          Data da Instalação:                           
                          {String(moment(this.state.instalacao.dataInstalacao).format("DD/MM/YYYY"))}
                        </label>  
                      </GridItem>
                    <GridItem xs={12} sm={12} md={6} style= {{marginTop: 40}}>
                        <label className={classes.labelInfo}>
                          Data da liberação da Porta: 
                          {
                            `${this.state.instalacao.dataLiberacaoPorta == null
                              ? " - "
                              : String(moment(this.state.instalacao.dataLiberacaoPorta).format("DD/MM/YYYY"))
                              }`
                          }
                        </label>
                    </GridItem>
                    <GridItem xs={6} sm={6} md={6}>
                      <h4>
                        Funcionário:{" "}
                        <label className={classes.labelInfo}>
                        {this.state.instalacao.NomeFunc} {this.state.instalacao.SobrenomeFunc}
                        </label>
                      </h4>
                      <GridContainer>
                      <GridItem xs={6} sm={6} md={6}>
                      <h4>
                        Porta:{" "}
                        <label className={classes.labelInfo}>
                        {String(this.state.instalacao.Porta)}
                        </label>
                      </h4>
                      </GridItem>
                      <GridItem xs={6} sm={6} md={6}>
                      <h4>
                        Caixa:{" "}
                        <label className={classes.labelInfo}>
                          {String(this.state.instalacao.idCaixa)}
                        </label>
                      </h4>
                      </GridItem>
                      </GridContainer>
                    </GridItem>  
                    <GridItem xs={6} sm={6} md={6}>                      
                      <h4>
                        Cliente:{" "}
                        <label className={classes.labelInfo}>
                        {this.state.instalacao.NomeCliente} {this.state.instalacao.SobrenomeCliente}
                        </label>
                      </h4>
                      <h4>
                        Endereço:{" "}
                        <label className={classes.labelInfo}>
                        { 
                          ` ${this.state.instalacao.rua}, ${this.state.instalacao.numero} 
                          ${this.state.instalacao.complemento == null
                            ? " "
                            : '/' + this.state.instalacao.complemento
                          }
                          - Bairro:  ${this.state.instalacao.descricao} `
                        }
                        </label>
                      </h4>                     
                    </GridItem>
                  </GridContainer>
              </CardBody>
            </Card>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(View);
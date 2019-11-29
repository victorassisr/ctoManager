import React from "react";

import axios from "axios";
import { Redirect } from "react-router-dom";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
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
    backgroundColor: "#FFFFFF",
    borderStyle: "solid",
    border: 1,
    borderColor: "#DDDDDD"
  }
};

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caixas: [],
      currentPage: 1,
      allPerPage: 15,
      redirect: false,
      page: "",
      index: 1
    };
    this.loadCaixa = this.loadCaixa.bind(this);
    this.deleteCaixa = this.deleteCaixa.bind(this);
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

  deleteCaixa = async idCaixa => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    axios
      .delete(`${utils.URL_BASE_API}/cto/${idCaixa}`, {
        headers: {
          "X-Access-Token": user.token
        }
      })
      .then(res => {
        this.setRedirect("home");
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  loadCaixa = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    console.log(user);
    axios
      .get(`${utils.URL_BASE_API}/ctos`, {
        headers: {
          "X-Access-Token": user.token
        }
      })
      .then(res => {
        this.setState({ caixas: res.data });
      })
      .catch(err => {
        console.log("ERROOOOOO");
        console.log(err);
        
        /*
        if (err.response.data.error.message) {
          alert(err.response.data.error.message);
        } else {
          alert("Erro ao carregar os dados.");
        }*/
      });
  };

  confirmDelete = async idCaixa => {
    confirmAlert({
      message: "Você quer deletar essa caixa?",
      buttons: [
        {
          label: "Sim",
          value: "Sim",
          onClick: async () => this.deleteCaixa(idCaixa)
        },
        {
          label: "Não",
          value: "Não"
        }
      ]
    });
  };

  componentDidMount() {
    this.loadCaixa();
  }

  render() {
    const { classes } = this.props;
    //logica pagination
    const indexOfLastAll = this.state.currentPage * this.state.allPerPage;
    const indexOfFirstAll = indexOfLastAll - this.state.allPerPage;
    const currentAll = this.state.caixas.slice(indexOfFirstAll, indexOfLastAll);
    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(this.state.caixas.length / this.state.allPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          className={classes.itemNumber}
          key={number}
          data-id={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    });

    const allCaixas = currentAll.map(caixa => {
      return [
        caixa.idCaixa,
        caixa.descricao,
        caixa.bairro.descricao,
        caixa.spliter.descricao,
        caixa.latitude,
        caixa.longitude,
        caixa.portasUsadas,
        <div>
          <Button
            value="Ver"
            color="success"
            onClick={this.setRedirect.bind(this, `viewBox/${caixa.idCaixa}`)}
          >
            Ver
          </Button>
          <Button
            value="Editar"
            color="info"
            onClick={this.setRedirect.bind(this, `editBox/${caixa.idCaixa}`)}
          >
            Editar
          </Button>
          <Button
            value="Excluir"
            onClick={this.confirmDelete.bind(this, caixa.idCaixa)}
            color="danger"
          >
            Excluir
          </Button>
        </div>
      ];
    });

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Lista Caixas</h4>
              </CardHeader>
              <div style={{ marginTop: 5, marginLeft: 15, marginRight: 15 }}>
                {this.renderRedirect()}
                <Button
                  value="Novo"
                  style={{ float: "right" }}
                  color="info"
                  onClick={this.setRedirect.bind(this, "addBox")}
                >
                  Novo
                </Button>
              </div>
              <CardBody style={{ paddingTop: 0 }}>
                <Table
                  tableHeaderColor="info"
                  tableHead={[
                    "#",
                    "Descrição",
                    "Bairro",
                    "Splitter",
                    "Latitude",
                    "Longitude",
                    "PortasUsadas",
                    "Gerenciar"
                  ]}
                  tableData={allCaixas}
                />
              </CardBody>
              <div>
                <ul style={{ listStyle: "none", display: "flex" }}>
                  <li
                    className={classes.itemNumber}
                    key={this.state.index++}
                    data-id={this.state.index++}
                    onClick={this.handleClick}
                  >
                    {"<<"}
                  </li>
                  {renderPageNumbers}
                  <li
                    className={classes.itemNumber}
                    key={Math.ceil(
                      this.state.caixas.length / this.state.allPerPage
                    )}
                    data-id={Math.ceil(
                      this.state.caixas.length / this.state.allPerPage
                    )}
                    onClick={this.handleClick}
                  >
                    {">>"}
                  </li>
                </ul>
              </div>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(Index);

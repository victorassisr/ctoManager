
import axios from "axios";
import moment from "moment";
import { Redirect } from "react-router-dom";
import "./styles.css";
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
import React from "react";

const styles = {
  html: { 
    marginTop: "0",
    height: "100%",
    weight: "100%"
  },
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
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instalacoes: [],
      currentPage: 1,
      allPerPage: 15,
      redirect: false,
      page: ""
    };
    this.loadInstalacoes = this.loadInstalacoes.bind(this);
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

  loadInstalacoes = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const handle = this.props.match.params;
    console.log(this.props);
    axios
        .get(`${utils.URL_BASE_API}/instalacoes/periodo/${handle.dateInicio}/${handle.dateFim}`, {
        headers: {
          "X-Access-Token": user.token
        }
      })
      .then(res => {
        this.setState({ instalacoes: res.data });
      })
      .catch(err => {
        alert(err.response);
      });
  };

  gerarPDF() {  
    var printContents = document.getElementById("exportToPDF").innerHTML;
     document.body.innerHTML = printContents;
     window.print();  
  }
  
  componentDidMount() {
    this.loadInstalacoes();
  }

  render() {
    const { classes } = this.props;
    //logica pagination
    const indexOfLastAll = this.state.currentPage * this.state.allPerPage;
    const indexOfFirstAll = indexOfLastAll - this.state.allPerPage;
    const currentAll = this.state.instalacoes.slice(indexOfFirstAll, indexOfLastAll);
    const pageNumbers = [];

    for (
      let i = 1;
      i <= Math.ceil(this.state.instalacoes.length / this.state.allPerPage);
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
       const allInstalacoes = currentAll.map(instalacoes => {
      return [
            String(moment(instalacoes.dataInstalacao).format("DD/MM/YYYY"))
        ,
        <div>
                  <GridContainer>
                    <GridItem xs={6} sm={6} md={6}>
                      <h4>
                        Funcionário:{" "}
                        <label className={classes.labelInfo}>
                        {instalacoes.NomeFunc} {instalacoes.SobrenomeFunc}
                        </label>
                      </h4>
                      <GridContainer>
                      <GridItem xs={6} sm={6} md={6}>
                      <h4>
                        Porta:{" "}
                        <label className={classes.labelInfo}>
                        {String(instalacoes.Porta)}
                        </label>
                      </h4>
                      </GridItem>
                      <GridItem xs={6} sm={6} md={6}>
                      <h4>
                        Caixa:{" "}
                        <label className={classes.labelInfo}>
                          {String(instalacoes.idCaixa)}
                        </label>
                      </h4>
                      </GridItem>
                      </GridContainer>
                    </GridItem>  
                    <GridItem xs={6} sm={6} md={6}>                      
                      <h4>
                        Cliente:{" "}
                        <label className={classes.labelInfo}>
                        {instalacoes.NomeCliente} {instalacoes.SobrenomeCliente}
                        </label>
                      </h4>
                      <h4>
                        Endereço:{" "}
                        <label className={classes.labelInfo}>
                        { 
                          ` ${instalacoes.rua}, ${instalacoes.numero} 
                          ${instalacoes.complemento == null
                            ? " "
                            : '/' + instalacoes.complemento
                          }
                          - Bairro:  ${instalacoes.descricao} `
                        }
                        </label>
                      </h4>                     
                    </GridItem>
                  </GridContainer>
        </div>
      ];
    });

    return (
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
          <div id="exportToPDF">
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Relatório de Instalações</h4>
              </CardHeader>
              <CardBody style={{ paddingTop: 0 }}>
                <Table
                  tableHeaderColor="info"
                  tableHead={[
                    "Data da instalação",
                    "Descrição"
                  ]}
                  tableData={allInstalacoes}
                />
              </CardBody>             
            </Card>
            </div> 
            <div>
            <Button color="info" onClick={this.gerarPDF}>
                  Gerar relatório em PDF
                </Button>
            </div>
            <div>
                <ul style={{ listStyle: "none", display: "flex" }}>
                  <li
                    className={classes.itemNumber}
                    key={1}
                    data-id={1}
                    onClick={this.handleClick}
                  >
                    {"<<"}
                  </li>
                  {renderPageNumbers}
                  <li
                    className={classes.itemNumber}
                    key={Math.ceil(
                      this.state.instalacoes.length / this.state.allPerPage
                    )}
                    data-id={Math.ceil(
                      this.state.instalacoes.length / this.state.allPerPage
                    )}
                    onClick={this.handleClick}
                  >
                    {">>"}
                  </li>
                </ul>
              </div>
          </GridItem>
        </GridContainer>
    );
  }
}
export default withStyles(styles)(Index);
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
      users: [],
      currentPage: 1,
      allPerPage: 10,
      redirect: false,
      page: ""
    };
    this.loadUser = this.loadUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
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
    this.setState({ currentPage: Number(event.target.id) });
  }

  deleteUser = async idUser => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      await axios.delete(`${utils.URL_BASE_API}/user/${idUser}`, {
        headers: {
          "X-Access-Token": user.token
        }
      });
      await this.loadUser();
    } catch (err) {
      utils.showError(err);
    }
  };

  loadUser = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const res = await axios.get(`${utils.URL_BASE_API}/funcionarios`, {
        headers: {
          "X-Access-Token": user.token
        }
      });
      this.setState({ users: res.data });
    } catch (err) {
      utils.showError(err);
    }
  };

  confirmDelete = async idUser => {
    confirmAlert({
      message: "Você quer deletar esse usuário?",
      buttons: [
        {
          label: "Sim",
          onClick: async () => this.deleteUser(idUser)
        },
        {
          label: "Não"
        }
      ]
    });
  };

  componentDidMount() {
    this.loadUser();
  }

  render() {
    const { classes } = this.props;
    //logica pagination
    const indexOfLastAll = this.state.currentPage * this.state.allPerPage;
    const indexOfFirstAll = indexOfLastAll - this.state.allPerPage;
    const currentAll = this.state.users.slice(indexOfFirstAll, indexOfLastAll);
    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(this.state.users.length / this.state.allPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          className={classes.itemNumber}
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    });

    const allUsers = currentAll.map(user => {
      return [
        user.tipoUsuario.descricao,
        user.nome + " " + user.sobrenome,
        user.usuario,
        <div>
          <Button
            value="Editar"
            color="info"
            onClick={this.setRedirect.bind(this, `editUser/${user.idPessoa}`)}
          >
            Editar
          </Button>
          <Button
            value="Excluir"
            onClick={this.confirmDelete.bind(this, user.idPessoa)}
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
                <h4 className={classes.cardTitleWhite}>Usuários</h4>
              </CardHeader>
              <div style={{ marginTop: 5, marginLeft: 15, marginRight: 15 }}>
                {this.renderRedirect()}
                <Button
                  value="Novo"
                  style={{ float: "right" }}
                  color="info"
                  onClick={this.setRedirect.bind(this, "addUser")}
                >
                  Novo
                </Button>
              </div>
              <CardBody style={{ paddingTop: 0 }}>
                <Table
                  tableHeaderColor="info"
                  tableHead={["Tipo de Usuário", "Nome", "Usuário", "Gerenciar"]}
                  tableData={allUsers}
                />
              </CardBody>
              <div>
                <ul style={{ listStyle: "none", display: "flex" }}>
                  <li
                    className={classes.itemNumber}
                    key={allUsers.idPessoa}
                    id={1}
                    onClick={this.handleClick}
                  >
                    {"<<"}
                  </li>
                  {renderPageNumbers}
                  <li
                    className={classes.itemNumber}
                    key={Math.ceil(
                      this.state.users.length / this.state.allPerPage
                    )}
                    id={Math.ceil(
                      this.state.users.length / this.state.allPerPage
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

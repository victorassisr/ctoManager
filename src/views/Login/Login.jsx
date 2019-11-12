import React from "react";

import axios from "axios";
import { Redirect } from "react-router-dom";
import { utils } from "../../common";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

let styles = {
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
  divAutocomplete: {
    paddingTop: 30
  },
  input: {
    display: "flex",
    padding: 0
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    overflow: "hidden"
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: "absolute",
    left: 2,
    fontSize: 16
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    left: 0,
    right: 0
  },
  logged: {
    color: "#FFF",
    background: "green",
    padding: "6px 6px",
    textAlign: "center",
    display: "none"
  }
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/admin/home" />;
    }
  };

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  login = async event => {
    event.preventDefault();
    axios({
      method: "post",
      url: `${utils.URL_BASE_API}/auth`,
      data: {
        usuario: this.state.usuario,
        senha: this.state.senha
      }
    })
      .then(data => {
        sessionStorage.setItem("user", JSON.stringify(data.data));
        alert("Logado com sucesso!");
        //Redireciona o usuário após o login.
        this.setRedirect(true);
      })
      .catch(err => {
        if (err.response) {
          utils.showError(err.response);
          return;
        }
        utils.showError("Erro ao realizar o login.\nTente novamente.");
        return;
      });

    //axios.defaults.headers.common["X-Access-Token"] = res.data.token;
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.logged}>Logado com sucesso...</div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={3} />
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Área de Login</h4>
              </CardHeader>
              <form onSubmit={this.login}>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Usuário"
                        id="email"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name: "usuario",
                          onChange: this.onChange,
                          required: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Senha"
                        id="password"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "password",
                          name: "senha",
                          onChange: this.onChange,
                          required: true
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  {this.renderRedirect()}
                  <Button type="submit" color="info">
                    Entrar
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(Login);

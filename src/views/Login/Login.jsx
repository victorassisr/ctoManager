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
    try {
      const res = await axios.post(`${utils.URL_BASE_API}/auth`, {
        usuario: this.state.usuario,
        senha: this.state.senha
      });
      //axios.defaults.headers.common["X-Access-Token"] = res.data.token;
      localStorage.setItem("token", JSON.stringify(res.data.token));
      this.setRedirect();
    } catch (err) {
      utils.showError(err);
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
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
                        labelText="Email"
                        id="email"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name: "email",
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
                          name: "password",
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

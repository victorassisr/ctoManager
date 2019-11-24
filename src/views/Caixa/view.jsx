import React from "react";

import axios from "axios";
import { Redirect } from "react-router-dom";
import { utils } from "../../common";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
//import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

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
  labelInfo: {
    fontSize: 16
  },
  divQRCode: {
    marginTop: 60,
    textAlign: "center"
  }
};

class viewBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caixa: {},
    //  caixa: []
    };
    this.loadCaixa = this.loadCaixa.bind(this);
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

  loadCaixa = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const handle = this.props.match.params;
    axios
      .get(`${utils.URL_BASE_API}/cto/${handle.id}`, {
        headers: {
          "X-Access-Token": user.token
        }
      })
      .then(res => {
        this.setState({ 
          caixa: res.data[0], 
          bairro: res.data[0].bairro.descricao,
          splitter: res.data[0].spliter.descricao,
         });
        console.log(this.state.caixa.bairro);
      })
      .catch(err => {
        if (err.response.data.error.message) {
          alert(err.response.data.error.message);
        } else {
          alert("Erro ao carregar os dados.");
        }
      });
  };

  componentDidMount() {
    this.loadCaixa();
  }

  render() {
    const { classes } = this.props;
        
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Caixas</h4>
              </CardHeader>
              <form onSubmit={this.edit}>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <h4>
                        Latitude:{" "}
                        <label className={classes.labelInfo}>
                          {String(this.state.caixa.latitude)}
                          </label>
                      </h4>
                      <h4>
                        Longitude:{" "}
                        <label className={classes.labelInfo}>
                          {String(this.state.caixa.longitude)}
                        </label>
                      </h4>
                      <h4>
                        Descrição:{" "}
                        <label className={classes.labelInfo}>
                          {this.state.caixa.descricao}
                        </label>
                      </h4>
                      <h4>
                        Portas usadas:{" "}
                        <label className={classes.labelInfo}>
                        {String(this.state.caixa.portasUsadas)}
                        </label>
                      </h4>
                      <h4>
                        Bairro:{" "}
                        <label className={classes.labelInfo}>
                        {this.state.bairro}
                        </label>
                      </h4>
                      <h4>
                        Spliter:{" "}
                        <label className={classes.labelInfo}>
                        {this.state.splitter}
                        </label>
                      </h4>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} />
                  </GridContainer>
                </CardBody>
              </form>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(viewBox);

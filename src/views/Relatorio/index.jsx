import React from "react";
import { Redirect } from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { utils } from "../../common";
import TextField from "@material-ui/core/TextField";
import CardFooter from "components/Card/CardFooter.jsx";
import Relatorio from "views/Relatorio/relatorio.jsx";

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
      currentPage: 1,
      allPerPage: 15,
      redirect: false,
      dataInicial : "",
      dataFinal : "",
      value: ''
    };
    this.renderRedirect = this.renderRedirect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.save = this.save.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.dataInicial});
    this.setState({value: event.target.dataFinal});
  }

  handleSubmit(event) {
    alert('Enviado ' + this.state.dataInicial);
    alert('Enviado ' + this.state.dataFinal);
    event.preventDefault();
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  renderRedirect = lot => {
    if (this.state.redirect) {
      return <Redirect to={`/admin/relatorio/${this.state.dateInicio}/${this.state.dateFim}`} />;
    }
  };

  save = async event => {
    event.preventDefault();
    this.setRedirect.bind(`relatorio/${this.state.dateInicio}/${this.state.dateFim}`);
  };

  render() {
    const { classes } = this.props;
  
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Gerar relatório de instalações</h4>
              </CardHeader>
              <form onSubmit={this.save}>
      
                <CardBody>
                  <GridContainer style={{ paddingTop: 10 }}>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                            id="dataInicio"
                            name="dataInicio"
                            label="Data Inicio:"
                            type="date"                            
                            onChange={(event) => this.setState({dateInicio: event.target.value})}

                            className={classes.textField}
                            InputLabelProps={{                              
                              shrink: true,
                              required: true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                    <TextField
                            id="dataFim"
                            name="dataFim"
                            label="Data Fim:"
                            type="date"                            
                            onChange={(event) => this.setState({dateFim: event.target.value})}

                            className={classes.textField}
                            InputLabelProps={{                              
                              shrink: true,
                              required: true
                            }}
                        />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                {this.renderRedirect(this.state.lot)}
                  <Button
                    value="Enviar"
                    color="info"
                    onClick={this.setRedirect 
                    .bind(this, `relatorio/${this.state.dateInicio}/${this.state.dateFim}`)}
                    >
                    Gerar relatório
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
export default withStyles(styles)(Index);

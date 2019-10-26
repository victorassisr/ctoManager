import React from "react";

import axios from "axios";
import moment from "moment";
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
      caixa: "",
      typeBox: []
    };
    this.newTab = this.newTab.bind(this);
  }

  loadBox = async () => {
    try {
      const resBox = await axios.get(
        `${utils.server}/caixaLot/${this.props.match.params.id}`
      );
      const resType = await axios.get(
        `${utils.server}/caixaTypeBox/${resBox.data.idBox}`
      );

      this.setState({ caixa: resBox.data, typeBox: resType.data });
    } catch (err) {
      utils.showError(err);
    }
  };
  newTab = async () => {
    window.open(
      `${utils.ip}/admin/qrCode/${this.state.caixa.lot}`,
      "_blank",
      "toolbar=0,location=0,menubar=0"
    );
  };

  componentDidMount() {
    this.loadBox();
  }

  render() {
    const { classes } = this.props;

    const caixa = this.state.caixa;

    const typesBox = this.state.typeBox.map(typeBox => {
      return `${typeBox.description} `;
    });

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
                        Lote:{" "}
                        <label className={classes.labelInfo}>{caixa.lot}</label>
                      </h4>
                      <h4>
                        Numero:{" "}
                        <label className={classes.labelInfo}>
                          {String(caixa.number)}
                        </label>
                      </h4>
                      <h4>
                        Adicionada por:{" "}
                        <label className={classes.labelInfo}>
                          {caixa.name}
                        </label>
                      </h4>
                      <h4>
                        Data Entrada:{" "}
                        <label className={classes.labelInfo}>
                          {moment(caixa.entryDate).format("D/M/YYYY, HH:mm")}
                        </label>
                      </h4>
                      <h4>
                        Data Saída:{" "}
                        <label className={classes.labelInfo}>
                          {caixa.outDate == null
                            ? " - "
                            : moment(caixa.outDate).format("D/M/YYYY, HH:mm")}
                        </label>
                      </h4>
                      <h4>
                        Localização:{" "}
                        <label className={classes.labelInfo}>{`Avenida: ${
                          caixa.avenue
                        }; Rua: ${caixa.street}; Posição: ${
                          caixa.position
                        }; Casa: ${caixa.casa};`}</label>
                      </h4>
                      <h4>
                        Nome Cliente:{" "}
                        <label className={classes.labelInfo}>
                          {caixa.clientName}
                        </label>
                      </h4>
                      <h4>
                        Casa do Cliente:{" "}
                        <label className={classes.labelInfo}>
                          {caixa.clientHouse}
                        </label>
                      </h4>
                      <h4>
                        Tipos de Caixa:{" "}
                        <label className={classes.labelInfo}>{typesBox}</label>
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

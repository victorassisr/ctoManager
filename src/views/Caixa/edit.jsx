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

import classNames from "classnames";
import Select from "react-select";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import CancelIcon from "@material-ui/icons/Cancel";

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

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        }
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

class editBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      lot: "",
      isLoading: false,
      caixa: {},
      bairros: [],
      spliters: [],
      portasUsadas: "",
      idBairro: "",
      idSpliter: "",
      descricao: "",
      latitude: "",
      longitude: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.edit = this.edit.bind(this);
    this.loadBox = this.loadBox.bind(this);
    this.getBairros = this.getBairros.bind(this);
    this.getSpliters = this.getSpliters.bind(this);
    this.getUserLogged = this.getUserLogged.bind(this);
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/admin/caixa" />;
    }
  };

  handleChange = name => value => {
    this.setState({
      [name]: value
    });
  };

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  edit = async event => {
    event.preventDefault();
    const handle = this.props.match.params;
    console.log(this.state.idSpliter);
    axios
      .put(
        `${utils.URL_BASE_API}/cto/${handle.id}`,
        {
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          descricao: this.state.descricao,
          portasUsadas: this.state.portasUsadas,
          bairro: { idBairro: this.state.idBairro.value },
          spliter: { idSpliter: this.state.idSpliter.value }
        },
        {
          headers: {
            "X-Access-Token": this.getUserLogged().token
          }
        }
      )
      .then(res => {
        alert("Editado com sucesso!");
      })
      .catch(err => {
        console.log(err);
        alert("Erro ao editar!");
      });
  };

  //Metodo que pega o usuário da session;
  //Nela vc tem disponível o token para as requisições da api.
  //Basta chamar: this.getUserLogged().token
  getUserLogged() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    return user;
  }

  loadBox = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    axios
      .get(`${utils.URL_BASE_API}/cto/${this.props.match.params.id}`, {
        headers: {
          "X-Access-Token": this.getUserLogged().token
        }
      })
      .then(res => {
        this.setState({
          caixa: res.data[0],
          latitude: res.data[0].latitude,
          longitude: res.data[0].longitude,
          descricao: res.data[0].descricao,
          portasUsadas: res.data[0].portasUsadas,
          idBairro: res.data[0].bairro.idBairro,
          idSpliter: res.data[0].spliter.idSpliter
        });
      })
      .catch(err => {
        utils.showError(err);
      });
  };

  getBairros = async () => {
    this.getUserLogged();
    axios
      .get(`${utils.URL_BASE_API}/bairros`, {
        headers: {
          "X-Access-Token": this.getUserLogged().token
        }
      })
      .then(res => {
        this.state.bairros = res.data;
      })
      .catch(err => {
        utils.showError(err);
      });
  };

  getSpliters = async () => {
    this.getUserLogged();
    axios
      .get(`${utils.URL_BASE_API}/spliters`, {
        headers: {
          "X-Access-Token": this.getUserLogged().token
        }
      })
      .then(res => {
        this.state.spliters = res.data;
      })
      .catch(err => {
        utils.showError(err);
      });
  };

  componentDidMount() {
    this.loadBox();
    this.getBairros();
    this.getSpliters();
  }

  render() {
    const { classes } = this.props;

    const components = {
      Control,
      Menu,
      MultiValue,
      NoOptionsMessage,
      Option,
      Placeholder,
      SingleValue
    };

    const allBairros = this.state.bairros.map(bairro => {
      return {
        label: bairro.descricao,
        value: bairro.idBairro
      };
    });

    const allSpliters = this.state.spliters.map(spliter => {
      return {
        label: spliter.descricao,
        value: spliter.idSpliter
      };
    });

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Editar Caixa</h4>
              </CardHeader>
              <form onSubmit={this.edit}>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Latitude"
                        id="lat"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name: "latitude",
                          value: this.state.latitude,
                          onChange: this.onChange,
                          required: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Longitude"
                        id="longitude"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name: "longitude",
                          value: this.state.longitude,
                          onChange: this.onChange,
                          required: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Descricao"
                        id="descricao"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name: "descricao",
                          value: this.state.descricao,
                          onChange: this.onChange,
                          required: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="PortasUsadas"
                        id="portasUsadas"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name: "portasUsadas",
                          value: this.state.portasUsadas,
                          onChange: this.onChange,
                          required: true
                        }}
                      />
                    </GridItem>
                    <GridItem style={{ marginTop: 22 }} xs={12} sm={12} md={4}>
                      <Select
                        classes={classes}
                        options={allBairros}
                        components={components}
                        value={this.state.idBairro}
                        required={true}
                        onChange={this.handleChange("idBairro")}
                        placeholder="Bairro"
                      />
                    </GridItem>
                    <GridItem style={{ marginTop: 22 }} xs={12} sm={12} md={4}>
                      <Select
                        classes={classes}
                        options={allSpliters}
                        components={components}
                        value={this.state.idSpliter}
                        required={true}
                        onChange={this.handleChange("idSpliter")}
                        placeholder="Splitter"
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  {this.renderRedirect(this.state.lot)}
                  <Button value="Editar" type="submit" color="info">
                    Editar
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

export default withStyles(styles)(editBox);

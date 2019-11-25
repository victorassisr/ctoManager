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

class addCliente extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: "",
      sobrenome: "",
      usuario: "",
      rua: "",
      numero: "",
      redirect: false,
      bairros: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
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

  handleChange = name => value => {
    this.setState({
      [name]: value
    });
  };

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  save = async event => {
    event.preventDefault();
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      await axios.post(`${utils.URL_BASE_API}/cliente`, {
        nome: this.state.nome,
        sobrenome: this.state.sobrenome,
        endereco:{
            rua: this.state.rua,
            numero: this.state.numero,
            complemento: this.state.complemento,
            idBairro: this.state.idBairro.value
        }
      },{
        headers : {"X-Access-Token" : user.token}
        });
      this.setRedirect();
    } catch (err) {
      utils.showError(err);
    }
  };

  loadBairros = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const res = await axios
      .get(`${utils.URL_BASE_API}/bairros`, {
        headers: {
          "X-Access-Token": user.token
        }
      })
      .then(res => {
        this.setState({ bairros : res.data });
      });
    } catch (err) {
      utils.showError(err);
    }
  };

  componentDidMount() {
    this.loadBairros();
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

    const allBairros = this.state.bairros
      .map(bairro => {
        return { label: bairro.descricao, value: bairro.idBairro };
      })
      .map(bairros => ({
        value: bairros.value,
        label: bairros.label
      }));

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Novo Cliente</h4>
              </CardHeader>
              <form onSubmit={this.save}>
                <CardBody>
                    <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Nome"
                        id="nome"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name: "nome",
                          value: this.state.nome,
                          onChange: this.onChange,
                          required: true
                        }}
                      />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Sobrenome"
                        id="sobrenome"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name: "sobrenome",
                          value: this.state.sobrenome,
                          onChange: this.onChange,
                          required: true
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Rua"
                        id="rua"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          name: "rua",
                          value: this.state.rua,
                          onChange: this.onChange,
                          required: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={6} sm={6} md={3}>
                      <CustomInput
                        labelText="Número"
                        id="numero"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "number",
                          name: "numero",
                          value: this.state.numero,
                          onChange: this.onChange,
                          required: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={6} sm={6} md={3}>
                      <CustomInput
                        labelText="Complemento"
                        id="complemento"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          name: "complemento",
                          value: this.state.complemento,
                          onChange: this.onChange
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem style={{ marginTop: 22 }} xs={12} sm={12} md={12}>
                      <Select
                        classes={classes}
                        options={allBairros}
                        components={components}
                        value={this.state.idBairro}
                        required={true}
                        onChange={this.handleChange("idBairro")}
                        placeholder="Bairro"                        
                      >
                      <option>{this.state.descricao}</option>
                      </Select>
                    </GridItem>
                    </GridContainer>
                </CardBody>
                <CardFooter>
                  {this.renderRedirect()}
                  <Button type="submit" color="info" value="Cadastrar">
                    Cadastrar
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

export default withStyles(styles)(addCliente);
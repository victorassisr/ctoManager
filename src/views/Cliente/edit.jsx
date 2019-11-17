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
import Select from "react-select";
import classNames from "classnames";
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

class editCliente extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      rua: "",
      numero: "",
      complemento: "",
      nome: "",
      sobrenome: "",      
      cliente: [],
      district: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  renderRedirect = lot => {
    if (this.state.redirect) {
      return <Redirect to="/admin/client" />;
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

      await axios.put(`${utils.URL_BASE_API}/cliente/${this.state.cliente[0].idPessoa}`, {
        nome : this.state.nome,
        sobrenome : this.state.sobrenome,
        endereco: {
          rua : this.state.rua,
          numero : this.state.numero,
          complemento: this.state.complemento,
          idBairro: this.state.idDistrict.value
        }
      },{
           headers : {"X-Access-Token" : user.token}
      });
      this.setRedirect();
    } catch (err) {
      utils.showError(err);
    }
    console.log(this.state);
  };
  
  loadCampos = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const handle = this.props.match.params;
    axios
    .get(`${utils.URL_BASE_API}/cliente/${handle.id}`, {
        headers: {
          "X-Access-Token": user.token
        }
      })
      .then(res => {
        this.setState({ cliente: res.data}); 
        this.setState(
            { 
              nome : this.state.cliente[0].nome,
              sobrenome : this.state.cliente[0].sobrenome,
              rua : this.state.cliente[0].endereco.rua,
              numero : this.state.cliente[0].endereco.numero,
              complemento : this.state.cliente[0].endereco.complemento,
              idBairro: this.state.cliente[0].endereco.idBairro,
              idDistrict: this.state.cliente[0].endereco.idBairro
            }); 
          console.log(this.state.cliente);
      })      
      .catch(err => {
        alert(err.response);
      });
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
        this.setState({ district : res.data });
      });
    } catch (err) {
      utils.showError(err);
    }
  };

  componentDidMount() {
    this.loadBairros();
    this.loadCampos();
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

    const allBairros = this.state.district
      .map(district => {
        return { label: district.descricao, value: district.idBairro };
      })
      .map(dadosSelect => ({
        value: dadosSelect.value,
        label: dadosSelect.label
      }));

    return (      
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Editar Cliente </h4>
              </CardHeader>
              <form onSubmit={this.save}>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={6} sm={6} md={6}>
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
                      <GridItem xs={6} sm={6} md={6}>
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
                    <GridItem xs={6} sm={6} md={6}>
                      <CustomInput
                        labelText="Rua"
                        id="rua"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name: "rua",
                          value: this.state.rua,
                          onChange: this.onChange,
                          required: true
                        }}
                      />
                    </GridItem>  
                    <GridItem xs={3} sm={3} md={3}>
                      <CustomInput
                        labelText="Número"
                        id="numero"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name: "numero",
                          value: this.state.numero,
                          onChange: this.onChange,
                          required: true
                        }}
                      />
                      </GridItem>
                      <GridItem xs={3} sm={3} md={3}>
                      <CustomInput
                        labelText="Complemento"
                        id="complemento"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
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
                        defaultValue={{
                          label: this.state.descricao,
                          value: this.state.idDistrict
                        }}
                        required={true}
                        onChange={this.handleChange("idDistrict")}
                        placeholder="Bairro"
                        isClearable
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

export default withStyles(styles)(editCliente);

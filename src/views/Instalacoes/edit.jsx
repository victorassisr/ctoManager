import React from "react";

import axios from "axios";
import moment from "moment";
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

class editInstalacao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      instalacao: [],      
      funcionario: [],
      cliente: []
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
      return <Redirect to="/admin/instalacoes" />;
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
      const handle = this.state.instalacao;
      await axios.put(`${utils.URL_BASE_API}/instalacao/${handle.idCaixa}/${handle.Porta}/${handle.dataInstalacao}`, {
        
      dataLiberacaoPorta: this.state.dataLiberacaoPorta,
        idPessoaFuncionario: 
          typeof this.state.idPessoaFuncionario.value == "undefined"
            ? this.state.idPessoaFuncionario
            : this.state.idPessoaFuncionario.value,
        idPessoaCliente: 
          typeof this.state.idPessoaCliente.value == "undefined"
              ? this.state.idPessoaCliente
              : this.state.idPessoaCliente.value
      },{
           headers : {"X-Access-Token" : user.token}
      });
      this.setRedirect();
    } catch (err) {
      utils.showError(err);
    }
    console.log(this.state.idPessoaFuncionario);
  };
  
  loadCampos = async () => { 
      try{
        const user = JSON.parse(sessionStorage.getItem("user"));
        const handle = this.props.match.params;
        axios
            .get(`${utils.URL_BASE_API}/instalacoes/${handle.id}/${handle.porta}/${handle.data}`, {
            headers: {
                "X-Access-Token": user.token
            }
            })
        .then(res => {
            this.setState({ instalacao : res.data}); 
            this.setState(
            { 
                Porta: this.state.instalacao.Porta,
                dataInstalacao: this.state.instalacao.dataInstalacao,
                idCaixa: this.state.instalacao.idCaixa,  
                dataLiberacaoPorta: this.state.instalacao.dataLiberacaoPorta,
                idPessoaFuncionario: this.state.instalacao.IdPessoaFuncionario,
                idPessoaCliente: this.state.instalacao.IdPessoaCliente

            }); 
          console.log(this.state.instalacao);
      })      
    }catch (err) {
        utils.showError(err);
      }
  };

  loadCaixas = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const res = await axios
      .get(`${utils.URL_BASE_API}/ctos`, {
        headers: {
          "X-Access-Token": user.token
        }
      })
      .then(res => {
        this.setState({ caixa : res.data });
      });
    } catch (err) {
      utils.showError(err);
    }
  };

  loadClientes = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const res = await axios
      .get(`${utils.URL_BASE_API}/clientes`, {
        headers: {
          "X-Access-Token": user.token
        }
      })
      .then(res => {
        this.setState({ cliente : res.data });
      });
    } catch (err) {
      utils.showError(err);
    }
  };

  loadFuncionarios = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const res = await axios
      .get(`${utils.URL_BASE_API}/funcionarios`, {
        headers: {
          "X-Access-Token": user.token
        }
      })
      .then(res => {
        this.setState({ funcionario : res.data });
      });
    } catch (err) {
      utils.showError(err);
    }
  };

  componentDidMount() {
    this.loadCaixas();
    this.loadClientes();
    this.loadFuncionarios();
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

      const allClientes = this.state.cliente
      .map(cliente => {
        return { label: (cliente.nome + " " + cliente.sobrenome), value: cliente.idPessoa };
      })
      .map(dadosSelect => ({
        value: dadosSelect.value,
        label: dadosSelect.label
      }));

      const allFuncionarios = this.state.funcionario
      .map(funcionario => {
        return { label: (funcionario.nome + " " + funcionario.sobrenome), value: funcionario.idPessoa};
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
                <h4 className={classes.cardTitleWhite}>Editar Instalação</h4>
              </CardHeader>
              <form onSubmit={this.save}>
                <CardBody>
                    <GridContainer>
                      <GridItem style={{ paddingTop: 40 }} xs={12} sm={12} md={12}>
                      <h5>Porta:{this.state.Porta} </h5>
                      <h5> Caixa: {this.state.idCaixa}</h5>
                      <h5> Data da Instalação: {String(moment(this.state.dataInstalacao).format("D/M/YYYY"))}
                      </h5>
                     </GridItem>
                      </GridContainer>
                      <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField
                          id="dataLiberacaoPorta"
                          name="dataLiberacaoPorta"
                          label="Data de Liberação da Porta"
                          type="date"
                          value={this.state.dataLiberacaoPorta}
                          onChange={(event) => this.setState({dataLiberacaoPorta: event.target.value})}
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                        }}
                        />
                     </GridItem>
                        <GridItem style={{ marginTop: 22 }} xs={6} sm={6} md={4}>
                          <Select
                            classes={classes}
                            options={allClientes}
                            components={components}
                            value={this.state.idPessoaCliente}
                            required={true}
                            onChange={this.handleChange("idPessoaCliente")}
                            placeholder="Cliente"                        
                          />
                    </GridItem>
                    <GridItem style={{ marginTop: 22 }} xs={6} sm={6} md={4}>
                          <Select
                            classes={classes}
                            options={allFuncionarios}
                            components={components}
                            value={this.state.idPessoaFuncionario}
                            required={true}
                            onChange={this.handleChange("idPessoaFuncionario")}
                            placeholder="Funcionário"                        
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

export default withStyles(styles)(editInstalacao);

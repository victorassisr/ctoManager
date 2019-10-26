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

class addBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientHouse: "",
      clientName: "",
      lot: "",
      number: "",
      redirect: false,
      city: [],
      location: [],
      typeBox: []
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

  save = async event => {
    event.preventDefault();
    try {
      const tokenUser = JSON.parse(localStorage.getItem("tokenUser"));
      await axios.post(`${utils.server}/caixa`, {
        entryDate: moment(new Date())
          .format("YYYY-MM-DD HH:mm:s")
          .replace(/T/, " "),
        idLocation: this.state.idLocation.value,
        idUser: tokenUser.id,
        lot: this.state.lot,
        number: this.state.number,
        clientName: this.state.clientName,
        clientHouse: this.state.clientHouse,
        idCity: this.state.idCity.value,
        idTypeBox: this.state.idTypeBox.map(item => item.value)
      });

      this.setRedirect();
    } catch (err) {
      utils.showError(err);
    }
  };

  loadCity = async () => {
    try {
      const res = await axios.get(`${utils.server}/city`);
      this.setState({ city: res.data });
    } catch (err) {
      utils.showError(err);
    }
  };

  loadLocation = async () => {
    try {
      const res = await axios.get(`${utils.server}/locationFree`);
      this.setState({ location: res.data });
    } catch (err) {
      utils.showError(err);
    }
  };

  loadTypeBox = async () => {
    try {
      const res = await axios.get(`${utils.server}/typeBox`);
      this.setState({ typeBox: res.data });
    } catch (err) {
      utils.showError(err);
    }
  };

  componentDidMount() {
    this.loadCity();
    this.loadLocation();
    this.loadTypeBox();
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

    const allCity = this.state.city
      .map(city => {
        return { label: city.description, value: city.id };
      })
      .map(cities => ({
        value: cities.value,
        label: cities.label
      }));

    const allLocation = this.state.location
      .map(location => {
        return {
          label: `Avenida: ${location.avenue}; 
                      Rua: ${location.street}; 
                      Posição: ${location.position}; 
                      casa: ${location.casa};`,
          value: location.id
        };
      })
      .map(locations => ({
        value: locations.value,
        label: locations.label
      }));

    const allTypeBox = this.state.typeBox
      .map(typeBox => {
        return { label: typeBox.description, value: typeBox.id };
      })
      .map(typesBox => ({
        value: typesBox.value,
        label: typesBox.label
      }));

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Caixa</h4>
              </CardHeader>
              <form onSubmit={this.save}>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Lote"
                        id="lot"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name: "lot",
                          value: this.state.lot,
                          onChange: this.onChange,
                          required: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Número da caixa"
                        id="number"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "number",
                          name: "number",
                          value: this.state.number,
                          onChange: this.onChange,
                          required: true
                        }}
                      />
                    </GridItem>
                    <GridItem style={{ marginTop: 22 }} xs={12} sm={12} md={6}>
                      <Select
                        classes={classes}
                        options={allLocation}
                        components={components}
                        value={this.state.single}
                        required={true}
                        onChange={this.handleChange("idLocation")}
                        placeholder="Localização"
                        isClearable
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Nome do Cliente"
                        id="clientName"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name: "clientName",
                          value: this.state.clientName,
                          onChange: this.onChange,
                          required: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Casa do Cliente"
                        id="clientHouse"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name: "clientHouse",
                          value: this.state.clientHouse,
                          onChange: this.onChange,
                          required: true
                        }}
                      />
                    </GridItem>
                    <GridItem style={{ marginTop: 22 }} xs={12} sm={12} md={4}>
                      <Select
                        classes={classes}
                        options={allCity}
                        components={components}
                        value={this.state.single}
                        required={true}
                        onChange={this.handleChange("idCity")}
                        placeholder="Cidade do Cliente"
                        isClearable
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer style={{ paddingTop: 10 }}>
                    <GridItem xs={12} sm={12} md={12}>
                      <Select
                        classes={classes}
                        options={allTypeBox}
                        components={components}
                        value={this.state.multi}
                        required={true}
                        onChange={this.handleChange("idTypeBox")}
                        placeholder="Tipos de Caixa"
                        isMulti
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  {this.renderRedirect(this.state.lot)}
                  <Button value="Cadastrar" type="submit" color="info">
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

export default withStyles(styles)(addBox);

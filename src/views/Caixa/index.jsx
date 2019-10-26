import React from "react"

import axios from "axios"
import moment from 'moment'
import { Redirect } from 'react-router-dom'

import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"
// core components
import GridItem from "components/Grid/GridItem.jsx"
import Button from "components/CustomButtons/Button.jsx"
import GridContainer from "components/Grid/GridContainer.jsx"
import Table from "components/Table/Table.jsx"
import Card from "components/Card/Card.jsx"
import CardHeader from "components/Card/CardHeader.jsx"
import CardBody from "components/Card/CardBody.jsx"
import { server, showError } from '../../common'



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
    cursor: 'pointer',
    marginRight: 5,
    marginLeft: -1,
    userSelect: 'none',
    position: 'relative',
    float: 'left',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
    lineHeight: 1.42857143,
    textDecoration: 'none',
    color: '#337ab7',
    backgroundColor: '#fff',
    borderStyle: 'solid',
    border: 1,
    borderColor: '#ddd',
  }
};

class Index extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            caixas: [],
            currentPage: 1,
            allPerPage: 15,
            redirect: false,
            page: '',
        }
        this.loadCaixa = this.loadCaixa.bind(this)
        this.deleteCaixa = this.deleteCaixa.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.renderRedirect = this.renderRedirect.bind(this)
    }

    setRedirect = async page => {
        this.setState({
          redirect: true,
          page: page
        })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={`/admin/${this.state.page}`} />
        }
    }

    handleClick(event) {
        this.setState({ currentPage: Number(event.target.dataset.id) })
    }

    deleteCaixa = async idCaixa => {
        try {
            await axios.delete(`${server}/caixa/${idCaixa}`)
            await this.loadCaixa()
        } catch (err) {
            showError(err)
        }
    }

    loadCaixa = async () => {
        try {
            const res = await axios.get(`${server}/caixa`)
            this.setState({ caixas: res.data })
        } catch (err) {
            showError(err)
        }
    }

    confirmDelete = async idCaixa => {
        confirmAlert({
            message: 'Você quer deletar essa caixa?',
            buttons: [
              {
                label: 'Sim',
                value: 'Sim',
                onClick: async () => this.deleteCaixa(idCaixa),
              },
              {
                label: 'Não',
                value: 'Não',
              }
            ]
        })
    }

    componentDidMount(){
        this.loadCaixa()
    }

    render(){

        const { classes } = this.props
        //logica pagination
        const indexOfLastAll = this.state.currentPage * this.state.allPerPage
        const indexOfFirstAll = indexOfLastAll - this.state.allPerPage
        const currentAll = this.state.caixas.slice(indexOfFirstAll, indexOfLastAll)
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(this.state.caixas.length / this.state.allPerPage); i++) {
            pageNumbers.push(i)
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
              <li className={classes.itemNumber}
                key={number}
                data-id={number}
                onClick={this.handleClick}
              >
                {number}
              </li>
            );
        });

        const allCaixas = currentAll.map(caixa => {
            return ([ caixa.lot, moment(caixa.entryDate).format('D/M/YYYY, HH:mm'), 
                caixa.clientName, caixa.clientHouse, String(caixa.weight), 
                caixa.outDate == null ? " - " : moment(caixa.outDate).format('D/M/YYYY, HH:mm'), 
                      <div>
                            <Button value="Ver" color="success" onClick={this.setRedirect.bind(this, `viewCaixa/${caixa.lot}`)}>Ver</Button>
                            <Button value="Editar" color="warning" onClick={this.setRedirect.bind(this, `editCaixa/${caixa.id}`)}>Editar</Button>
                            <Button value="Excluir" onClick={this.confirmDelete.bind(this, caixa.id)} color="danger">Excluir</Button>
                      </div>
            ])
        })

        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="info">
                                <h4 className={classes.cardTitleWhite}>Lista Caixas</h4>
                            </CardHeader>
                            <div style={{marginTop: 5,marginLeft: 15,marginRight: 15}}>
                                {this.renderRedirect()}
                                <Button value="Novo" style={{float:'right'}} color="info" onClick={this.setRedirect.bind(this, 'addBox')}>Novo</Button>
                            </div>
                            <CardBody style={{paddingTop: 0}}>
                                <Table
                                    tableHeaderColor="info"
                                    tableHead={["Tipo", "Entrada", "Cliente", "Casa", "Id", "Saída", "Gerenciar"]}
                                    tableData={allCaixas}
                                />
                            </CardBody>
                            <div>
                                <ul style={{listStyle: 'none',display: 'flex'}}>
                                    <li className={classes.itemNumber}
                                        key={1}
                                        data-id={1}
                                        onClick={this.handleClick}
                                    >
                                        {'<<'}
                                    </li>
                                    {renderPageNumbers}
                                    <li className={classes.itemNumber}
                                        key={Math.ceil(this.state.caixas.length / this.state.allPerPage)}
                                        data-id={Math.ceil(this.state.caixas.length / this.state.allPerPage)}
                                        onClick={this.handleClick}
                                    >
                                        {'>>'}
                                    </li>
                                </ul>
                            </div>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(styles)(Index);
        


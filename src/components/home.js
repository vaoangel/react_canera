import React from 'react'
import {connect} from 'react-redux'
// import {AnimalsApi} from '../router/agent'
import {Link} from 'react-router-dom'
import { Button } from 'reactstrap'
import { Card } from "react-bootstrap";
import perro from '../fotos_gifs/fotos/perro.png';


    const mapStateToProps = state =>({
        fetch_items: state.AnimalsReducer.animals,
        loading: state.AnimalsReducer.loading,
    })

    const mapDispatchToProps = dispatch =>({
        onLoad: () =>dispatch({type:"FETCH_ANIMALS",  method:"GetAll", api:"AnimalsApi"}),
        success: () => dispatch({type:"FETCH_ANIMALS_SUCCESS"}),
        fetch_current: (data) => dispatch({type:"FETCH_CURRENT", payload:data}),
    })

class Home extends React.Component{
    state = {animals :undefined,filterData:undefined,filterSucces:'vacio' ,showFilterDiv:'false'}
    constructor(props){
        super(props)
        this.props.onLoad()
        this.animals_list = this.animals_list.bind(this)
        this.handleChanges = this.handleChanges.bind(this);
        this.handleFilters = this.handleFilters.bind(this);
        this.renderFilter = this.renderFilter.bind(this);
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        if (prevProps.fetch_items != this.props.fetch_items) {
            // console.log(this.props.fetch_items);
            const snapshot = this.props.fetch_items;
            return snapshot
        }    
        return null;
    } 
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(snapshot != null){
            this.setState({
                animals: snapshot,
            })
            this.props.success()
        }else{
            return snapshot
        }
    }
   
    handleChanges(event){
        this.setState({ [event.target.name]: event.target.value })
    }

    handleFilters(event){
        console.log(this.state.animals.animals);
        
        for(var i=0; i<this.state.animals.animals.length;i++){
            if(this.state.filterData == this.state.animals.animals[i].id){ 
                // console.log(this.state.filterData); 
                this.setState({[event.target.name]: this.state.animals.animals[i] })
            }
        }

        this.state.showFilterDiv = true;
    }
    handleClicks(e){
        this.props.fetch_current(e)
    }
    renderFilter(){
        
        
        let html =[]
        return html =[...html,
            <div key={this.state.filterSucces.id}>
                <p name="id">ID: {this.state.filterSucces.id}</p>
                <p name="aptitut">Aptitud: {this.state.filterSucces.aptitut}</p>
                <p name="capa">Capa: {this.state.filterSucces.capa}</p>
                <p name="color">Color: {this.state.filterSucces.color}</p>
                <p name="dataeixida">Data eixida: {this.state.filterSucces.dataeixida}</p>
                <p name="dataeutanasia">Data Eutanasia: {this.state.filterSucces.dataeutanasia}</p>
                <p name="dataidentificacio">Data identificació: {this.state.filterSucces.dataidentificacio}</p>
                <p name="datanaixement">Data neixement: {this.state.filterSucces.datanaixement}</p>
                <p name="datarecollida">Data recollida: {this.state.filterSucces.datarecollida}</p>
                <p name="domicili">Domicili: {this.state.filterSucces.domicili}</p>
                <p name="especie">Especie: {this.state.filterSucces.especie}</p>
                <p name="estatderecollida">Estat de recollida: {this.state.filterSucces.estatderecollida}</p>
                <p name="idclasseanimal">Classe animal: {this.state.filterSucces.idclasseanimal}</p>
                <p name="idmunicipi">Municipi: {this.state.filterSucces.idmunicipi}</p>
                <p name="idprovincia">Provincia: {this.state.filterSucces.idmunicipi}</p>
                <p name="idraça">Raça: {this.state.filterSucces.idraça}</p>
                <p name="idtamany">Tamany: {this.state.filterSucces.idtamany}</p>
                <p name="nom">Nom: {this.state.filterSucces.nom}</p>
                <p name="sexe">Sexe: {this.state.filterSucces.sexe}</p>
            </div>
        ]
    }
    animals_list(){
        // console.log(this.state.animals);

        let html =[]
        this.state.animals.animals.sort(function(a, b) { 
            return a.id - b.id  ||  a.name.localeCompare(b.name)   
        });            
        this.state.animals.animals.map((elements) =>{
            return html = [
                ...html,
                <div className="col-md-3" key={elements.id}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={perro} />
                        <Card.Body>
                            <Card.Title>Nom: {elements.nom}</Card.Title>
                            <Card.Text>
                               Estat de recollida: {elements.estatderecollida}
                            </Card.Text>
                            <Link class="btn btn-primary" to={`/formAnimal/${elements.id}`} onClick={this.handleClicks(this.state.animals)} >Detalls</Link>
                        </Card.Body>
                    </Card>
                </div>

            ]
        })
        return html
    }

    render(){   
        if(this.props.loading === true){
            return(
                <div>
                    <h1>Loading.....</h1>
                </div>
            )
        }else{
            if((this.state.showFilterDiv === 'false')&&(this.state.animals!== undefined)){
                return(
                    <div>
                        <div className="filterList">
                            <input type="text" name="filterData" onChange={this.handleChanges}/> 
                            <button type="button" value="Buscar" name="filterSucces" onClick={this.handleFilters}>Buscar</button>
                        </div>
                        <div className="container">
                            <div className="row">
                                    {this.animals_list()}
                            </div>
                        </div>
                        <br></br>
        
                    </div>
                )
            }else{
                return(
                <div>
                    <div>{this.renderFilter()}</div>
                    <button type="button" name="showFilterDiv" value="false" onClick={this.handleChanges}>Volver</button>
                </div>
                )
            }
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)
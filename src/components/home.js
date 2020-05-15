import React from 'react'
import {connect} from 'react-redux'
// import {AnimalsApi} from '../router/agent'
import {Link} from 'react-router-dom'
import { Button } from 'reactstrap'
import { Card, FormControl, Form, Table } from "react-bootstrap";
import perro from '../fotos_gifs/fotos/perro.png';
// import { ToastContainer, toast } from 'react-toastify';


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

    //LIST
    renderFilter(){
        let html =[]
        return html =[...html,
                <div key={this.state.filterSucces.id}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>adassd</th>
                                <th>asdasd</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <td>{this.state.filterSucces.id}</td>
                                <th>Aptitut</th>
                                <td>{this.state.filterSucces.aptitut}</td>
                            </tr>
                            <tr>
                                <th>Capa</th>
                                <td>{this.state.filterSucces.capa}</td>
                                <th>Color</th>
                                <td>{this.state.filterSucces.color}</td>
                            </tr>
                            <tr>
                                <th>Data eixida</th>
                                <td>{this.state.filterSucces.dataeixida}</td>
                                <th>Data eutanasia</th>
                                <td>{this.state.filterSucces.dataeutanasia}</td>
                            </tr>
                            <tr>
                                <th>Data identificació</th>
                                <td>{this.state.filterSucces.dataidentificacio}</td>
                                <th>Data neixement</th>
                                <td>{this.state.filterSucces.datanaixement}</td>
                            </tr>
                            <tr>
                                <th>Domicili</th>
                                <td>{this.state.filterSucces.domicili}</td>
                                <th>Especie</th>
                                <td>{this.state.filterSucces.especie}</td>
                            </tr>
                            <tr>
                                <th>Estat de recollida</th>
                                <td>{this.state.filterSucces.estatderecollida}</td>
                                <th>Classe animal</th>
                                <td>{this.state.filterSucces.idclasseanimal}</td>
                            </tr>
                            <tr>
                                <th>Municipi</th>
                                <td>{this.state.filterSucces.idmunicipi}</td>
                                <th>Provincia</th>
                                <td>{this.state.filterSucces.idprovincia}</td>
                            </tr>
                            <tr>
                                <th>Raça</th>
                                <td>{this.state.filterSucces.idraça}</td>
                                <th>Tamany</th>
                                <td>{this.state.filterSucces.idtamany}</td>
                            </tr>
                            <tr>
                                <th>Nom</th>
                                <td>{this.state.filterSucces.nom}</td>
                                <th>Sexe</th>
                                <td>{this.state.filterSucces.sexe}</td>
                            </tr>
                        </tbody>
                    </Table>
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
                    <Card style={{ width: '18rem' }} key={elements.id}>
                        <Card.Img variant="top" src={perro} />
                        <Card.Body>
                            <Card.Title>Nom: {elements.nom}</Card.Title>
                            <Card.Text>
                               Estat de recollida: {elements.estatderecollida}
                               <br></br>
                               ID: {elements.id}
                            </Card.Text>
                            <Link className="btn btn-primary" to={`/formAnimal/${elements.id}`} onClick={this.handleClicks(this.state.animals)} >Detalls</Link>
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
                            {/* <input type="text" name="filterData" onChange={this.handleChanges}/>  */}
                            {/* <button type="button" value="Buscar" name="filterSucces" onClick={this.handleFilters}>Buscar</button> */}
                            <Form inline>
                                <FormControl type="text" name="filterData" placeholder="Buscar" onChange={this.handleChanges} className="mr-sm-2"/>
                                <Button variant="outline-success" name="filterSucces" onClick={this.handleFilters}>Buscar</Button>
                            </Form>
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
                    <button class="btn btn-primary" name="showFilterDiv" value="false" onClick={this.handleChanges}>Volver</button>
                </div>
                )
            }
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)
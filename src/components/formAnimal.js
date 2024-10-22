import React from 'react'
import {AnimalsApi} from '../router/agent'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Form, Button, Table } from 'react-bootstrap'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


const mapStateToProps= state =>({
    current: state.AnimalsReducer.currentAnimal,
    municipis: state.AnimalsReducer.municipis,
    provincies: state.AnimalsReducer.provincies
})

const mapDispatchToProps = dispatch =>({
    insert:(data) =>{
        dispatch({type:"INSERT_ANIMAL", payload: data,method:"InsertAnimal", api:"AnimalsApi"})
    },
    update:(data) =>{
        dispatch({type:"UPDATE_ANIMAL", payload:data,method: "UpdateAnimal", api:"AnimalsApi"})
    },
    onLoadMuni: () =>dispatch({type:"FETCH_MUNICIPIS",method:"GetMunicipis", api:"AnimalsApi"}),
    onLoadProv:() => dispatch({type: "FETCH_PROVINCIES", method:"GetProvincies", api: "AnimalsApi"}),
    success: () => dispatch({type:"FETCH_MUNICIPIS_SUCCESS"})

    
})
class FitxaAnimal extends React.Component{
    state = {
        formData:{
            idclasseanimal:"default",
            idtamany:"default",
            especie:'default',
            idraça:"default",
            capa: 'default',
            color: 'default',
            aptitut:"default",
            sexe:"default",
            cp: null,
            estatderecollida:'default',
            dataeutanasia:null,
            // imatge:"default",
            // llocRecollida:"default",
            idmunicipi:null,
            idprovincia:null,
            dataIdent:null,
            dataeixida:null,
            datanaixement:null,
            nom:"default",
            datarecollida: null,
            idpropietari: "default",
            domicili: "default",
            showFormDiv:'false',

        },
        formUpdate:{
            idclasseanimal:"default",
            idtamany:"default",
            especie:'default',
            idraça:"default",
            capa: 'default',
            color: 'default',
            aptitut:"default",
            sexe:"default",
            cp: null ,
            estatderecollida:'default',
            dataeutanasia:null,
            // imatge:"default",
            // llocRecollida:"default",
            idmunicipi:null,
            idprovincia:null,
            dataIdent:null,
            dataeixida:null,
            datanaixement:null,
            nom:"default",
            datarecollida: null,
            idpropietari: "default",
            domicili: "default",
            showFormDiv:'false',
        },
        update:false,
        currentData: undefined,
    }
    constructor(props){
        super(props);
       
        this.handleChanges = this.handleChanges.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderMunicipis = this.renderMunicipis.bind(this);
        this.renderProvincies = this.renderProvincies.bind(this);
        this.props.onLoadMuni()
        this.props.onLoadProv()
        
        this.state.update = this.props.match.params.updated;
        // console.log(this.props.current);
        
        if((this.state.update !== 'false')&&(this.props.current)){
            // console.log(this.props.current);
            for (let index = 0; index < this.props.current.animals.length; index++) {
                // console.log(this.state.update);

                if(this.state.update == this.props.current.animals[index].id){
                    // console.log(this.props.current.animals[index]);
                    
                    this.state.currentData = this.props.current.animals[index]
                        for (const key in this.state.currentData) {
                          
                            this.state.formUpdate[key] = this.state.currentData[key]
                        }

                }
            }
            console.log(this.state.formUpdate);
            
            
        }
    }
    getSnapshotBeforeUpdate(prevProps, prevState) {
        
        if (prevProps.municipis !== this.props.municipis) {
            
          const snapshot = this.props.municipis;
          return snapshot
        } 
        
        if (prevProps.provincies !== this.props.provincies){
            const snapshot = this.props.provincies
            return snapshot
        }
        
        if(prevProps.current !== this.props.current){
            const snapshot = this.props.current
            return snapshot
        }
      
        return null;
    } 
    componentDidUpdate(prevProps, prevState, snapshot) {
        
        
        if(snapshot != null){
            if(snapshot[1]){
                if(snapshot[1].idmunicipi){
                    this.setState({
                        municipis: snapshot,
                    })
                }else if(snapshot[1].idprovincia){
                    this.setState({
                        provincies: snapshot,
                    })
                }else{
                    this.setState({
                        current: snapshot,
                    })  
                }
            }
   
            this.props.success();
        }else{

            return snapshot

        }
        
    }
    handleChanges(event){
            if(this.state.update != 'false'){
                this.setState({formUpdate:{...this.state.formUpdate, [event.target.name]: event.target.value }})
            }else{
                this.setState({formData:{...this.state.formData, [event.target.name]: event.target.value }})
            }
        }
    handleSubmit(){
        var Datachanges = '';
        var currentDate = new Date()

        if(this.state.update != 'false'){
            Datachanges = this.state.formUpdate
        }else{
            Datachanges = this.state.formData

        }
        console.log(Datachanges);
        
       var errors = false;
        for (const key in Datachanges ) {
        
            if(Datachanges[key] === 'default'){
                alert("Ninguno de los campos puede estar vacio, porfavor revisa los datos introducidos")
                errors= true; 
                break
            }       
        }

        if(errors === false){
        
            var Cpmuni = undefined;
            var dataeixida = undefined;
            var dataeutanasia = undefined;
            var dataIdent = undefined;
            var datanaixement = undefined;
            var datarecollida = undefined;
            if(this.state.update != 'false'){
                for(var i=0; i< this.state.municipis.length; i++){
                    if(this.state.formUpdate.idmunicipi == this.state.municipis[i].idmunicipi){
                        console.log(this.state.municipis[i]);
                        Cpmuni = this.state.municipis[i].cp;
                        
                    }
                }                
                dataeixida = this.state.formUpdate.dataeixida;
                dataeutanasia = this.state.formUpdate.dataeutanasia;
                dataIdent = this.state.formUpdate.dataIdent;
                datanaixement = this.state.formUpdate.datanaixement
                datarecollida = this.state.formUpdate.datarecollida

                if(dataeixida!= this.state.currentData.dataeixida){
                    dataeixida =  Datachanges.dataeixida+"T"+currentDate.getHours()+":"+currentDate.getMinutes()+":"+currentDate.getSeconds()+"Z"
                }else if(dataeutanasia!=this.state.currentData.dataeutanasia){                    
                    dataeutanasia =  Datachanges.dataeutanasia+"T"+currentDate.getHours()+":"+currentDate.getMinutes()+":"+currentDate.getSeconds()+"Z"
                }else if(dataIdent!= this.state.currentData.dataIdent){
                    dataIdent = Datachanges.dataIdent+"T"+currentDate.getHours()+":"+currentDate.getMinutes()+":"+currentDate.getSeconds()+"Z"
                }else if(datanaixement != this.state.currentData.datanaixement){
                    datanaixement = Datachanges.datanaixement+"T"+currentDate.getHours()+":"+currentDate.getMinutes()+":"+currentDate.getSeconds()+"Z"
                }else if(datarecollida != this.state.currentData.datarecollida){
                    datarecollida = Datachanges.datarecollida+"T"+currentDate.getHours()+":"+currentDate.getMinutes()+":"+currentDate.getSeconds()+"Z"
                }
            }else{
                for(var i=0; i< this.state.municipis.length; i++){
                    if(this.state.formData.idmunicipi == this.state.municipis[i].idmunicipi){
                        console.log(this.state.municipis[i]);
                        Cpmuni = this.state.municipis[i].cp;
                        
                    }
                }
                if(dataeixida!= null){
                    dataeixida =  Datachanges.dataeixida+"T"+currentDate.getHours()+":"+currentDate.getMinutes()+":"+currentDate.getSeconds()+"Z"
                }else if(dataeutanasia!= null){                    
                    dataeutanasia =  Datachanges.dataeutanasia+"T"+currentDate.getHours()+":"+currentDate.getMinutes()+":"+currentDate.getSeconds()+"Z"
                }else if(dataIdent!= null){
                    dataIdent = Datachanges.dataIdent+"T"+currentDate.getHours()+":"+currentDate.getMinutes()+":"+currentDate.getSeconds()+"Z"
                }else if(datanaixement != null){
                    datanaixement = Datachanges.datanaixement+"T"+currentDate.getHours()+":"+currentDate.getMinutes()+":"+currentDate.getSeconds()+"Z"
                }else if(datarecollida != null){
                    datarecollida = Datachanges.datarecollida+"T"+currentDate.getHours()+":"+currentDate.getMinutes()+":"+currentDate.getSeconds()+"Z"
                }
         
            }
       

            const animals ={
                "IDanimals": this.state.update,
                "animals": {
                    "transponder": null,
                    "tranpenmusdret": false,
                    "tranpenmusesq": false,
                    "tatuatgeesq": false,
                    "tatuatgedret": false,
                    "dataidentificacio":dataIdent ,
                    "datanaixement": datanaixement,
                    "dataeixida":dataeixida,
                    "idraça": Datachanges.idraça,
                    "idclasseanimal":  Datachanges.idclasseanimal,
                    "especie": Datachanges.especie,
                    "idtamany": Datachanges.idtamany,
                    "sexe": Datachanges.sexe,
                    "nom": Datachanges.nom,
                    "capa":Datachanges.capa,
                    "color": Datachanges.color,
                    "aptitut": Datachanges.aptitut,
                    "domicili": Datachanges.domicili,
                    "cp": Cpmuni,
                    "idmunicipi": Datachanges.idmunicipi,
                    "idprovincia": Datachanges.idprovincia,
                    "dataeutanasia":dataeutanasia ,
                    "estatderecollida": Datachanges.estatderecollida,
                    "idpropietari": Datachanges.idpropietari,
                    "datarecollida": datarecollida,
                }
            }  
            console.log(animals);

            if(this.state.update === 'false'){
                alert("Información Correcta, creando........")
                    this.state.success = "true"
                    this.props.insert(animals)
            }else{
                this.state.success = "true"

                alert("Información Correcta, modificando........")
                console.log(animals);
                this.props.update(animals)
            }
        }
    }
    renderMunicipis(){
        let html = []
        this.state.municipis.map((elements)=>{
            // console.log(elements);
            
            return html = [...html,
            <option value={elements.idmunicipi}>{elements.nom}</option>
            ]
        })
        // console.log(html);
        
        return html
    }
    renderProvincies(){
        let html = []
        this.state.provincies.map((elements)=>{
            // console.log(elements);
            
            return html = [...html,
            <option value={elements.idprovincia}>{elements.nom}</option>
            ]
        })
        // console.log(html);
        
        return html
    }
    
    render(){  
        // console.log(this.state);
   
        if(this.state.success == "true"){
            return<Redirect to='/'/>   
        }
        if(this.state.update === 'false'){
            if((this.state.municipis != undefined) && (this.state.provincies !== undefined)){
                return(
                    //CREATE
                    <div id="formu"> 
                        <div id="form">
                            <form id="form1" onSubmit={this.handleSubmit}>
                                <React.Fragment>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={2}>
                                            <label>Data eixida</label>
                                            <input type="date" name="dataeixida" onChange={this.handleChanges}/>
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <label>Data naixement</label>
                                            <input type="date" name="datanaixement" onChange={this.handleChanges}/>
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <label>Data Eutanasia</label>
                                            <input type="date" name="dataeutanasia" onChange={this.handleChanges}/>
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <label>Data Identificació</label>
                                            <input type="date" name="dataIdent" onChange={this.handleChanges}/>
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <label>Data Recollida</label>
                                            <input type="date" name="datarecollida" onChange={this.handleChanges}/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField name="nom" label="Nom" fullWidth onChange={this.handleChanges}/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField  name="idclasseanimal" label="Classe d'animal" fullWidth onChange={this.handleChanges}/>
                                        </Grid>
                                        <Grid  maxLength="2" item xs={12} sm={6}>
                                            <TextField name="idtamany" label="Tamany" rowsMax="2" fullWidth onChange={this.handleChanges}/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField name="especie" label="Especie" fullWidth onChange={this.handleChanges}/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField name="aptitut" label="Aptitud" fullWidth onChange={this.handleChanges}/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField name="idraça" label="Raça" maxLength="3" fullWidth onChange={this.handleChanges}/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField name="capa" label="Capa" fullWidth onChange={this.handleChanges}/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField name="color" label="Color" fullWidth onChange={this.handleChanges}/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField name="sexe" label="Sexe" maxLength="1" fullWidth onChange={this.handleChanges}/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField name="estatderecollida" label="Estat de recollida" fullWidth onChange={this.handleChanges}/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField name="domicili" label="Domicili" fullWidth onChange={this.handleChanges}/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField name="idpropietari" label="Propietari" fullWidth onChange={this.handleChanges}/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Form.Label>Municipi</Form.Label>
                                            <Form.Control as="select" name="idmunicipi" fullWidth onChange={this.handleChanges}>
                                                {this.renderMunicipis()}
                                            </Form.Control>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                        <Form.Label>Provincia</Form.Label>
                                            <Form.Control as="select" name="idprovincia" fullWidth onChange={this.handleChanges}>
                                                {this.renderProvincies()}
                                            </Form.Control>
                                        </Grid>
                                        <Grid item xs={12} sm={5}>
                                            <button class="btn btn-primary" value="enviar" onClick={this.handleSubmit}>Enviar</button>
                                        </Grid>
                                    
                                    </Grid>
                                </React.Fragment>
                            </form>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div><h1>Loading...</h1></div>
                )
            }

        }else{
            if(!this.state.currentData){
                return<Redirect to='/'/>   
            }
            
            if(this.state.formUpdate.showFormDiv === 'false'){
                //LIST
                return(
                    <div>
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
                                    <td>{this.state.currentData.id}</td>
                                    <th>Aptitut</th>
                                    <td>{this.state.currentData.aptitut}</td>
                                </tr>
                                <tr>
                                    <th>Capa</th>
                                    <td>{this.state.currentData.capa}</td>
                                    <th>Color</th>
                                    <td>{this.state.currentData.color}</td>
                                </tr>
                                <tr>
                                    <th>Data eixida</th>
                                    <td>{this.state.currentData.dataeixida}</td>
                                    <th>Data eutanasia</th>
                                    <td>{this.state.currentData.dataeutanasia}</td>
                                </tr>
                                <tr>
                                    <th>Data identificació</th>
                                    <td>{this.state.currentData.dataidentificacio}</td>
                                    <th>Data neixement</th>
                                    <td>{this.state.currentData.datanaixement}</td>
                                </tr>
                                <tr>
                                    <th>Domicili</th>
                                    <td>{this.state.currentData.domicili}</td>
                                    <th>Especie</th>
                                    <td>{this.state.currentData.especie}</td>
                                </tr>
                                <tr>
                                    <th>Estat de recollida</th>
                                    <td>{this.state.currentData.estatderecollida}</td>
                                    <th>Classe animal</th>
                                    <td>{this.state.currentData.idclasseanimal}</td>
                                </tr>
                                <tr>
                                    <th>Municipi</th>
                                    <td>{this.state.currentData.idmunicipi}</td>
                                    <th>Provincia</th>
                                    <td>{this.state.currentData.idprovincia}</td>
                                </tr>
                                <tr>
                                    <th>Raça</th>
                                    <td>{this.state.currentData.idraça}</td>
                                    <th>Tamany</th>
                                    <td>{this.state.currentData.idtamany}</td>
                                </tr>
                                <tr>
                                    <th>Nom</th>
                                    <td>{this.state.currentData.nom}</td>
                                    <th>Sexe</th>
                                    <td>{this.state.currentData.sexe}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <button class="btn btn-primary" name="showFormDiv" value="true" onClick={this.handleChanges}>Modificar</button>
                    </div>
                )
            
            }else{
                return(
                    //  UPDATE         
                    <div id="formu"> 
                        <div id="form">
                            <form id="form1" onSubmit={this.handleSubmit}>
                                <React.Fragment>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={2}>
                                            <label>Data eixida</label>
                                            <input type="date" name="dataeixida" onChange={this.handleChanges} placeholder={this.state.currentData.dataeixida}/>
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <label>Data naixement</label>
                                            <input type="date" name="datanaixement" onChange={this.handleChanges} placeholder={this.state.currentData.datanaixement}/>
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <label>Data Eutanasia</label>
                                            <input type="date" name="dataeutanasia" onChange={this.handleChanges} placeholder={this.state.currentData.dataeutanasia}/>
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <label>Data Identificació</label>
                                            <input type="date" name="dataIdent" onChange={this.handleChanges}  placeholder={this.state.currentData.dataIdent}/>
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <label>Data Recollida</label>
                                            <input type="date" name="datarecollida" onChange={this.handleChanges} placeholder={this.state.currentData.datarecollida}/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField name="nom" label="Nom" fullWidth onChange={this.handleChanges} placeholder={this.state.currentData.nom}/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField  name="idclasseanimal" label="Classe d'animal" fullWidth onChange={this.handleChanges} placeholder={this.state.currentData.idclasseanimal}/>
                                        </Grid>
                                        <Grid  maxLength="2" item xs={12} sm={6}>
                                            <TextField name="idtamany" label="Tamany" rowsMax="2" fullWidth onChange={this.handleChanges} placeholder={this.state.currentData.idtamany}/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField name="especie" label="Especie" fullWidth onChange={this.handleChanges} placeholder={this.state.currentData.especie}/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField name="aptitut" label="Aptitud" fullWidth onChange={this.handleChanges} placeholder={this.state.currentData.aptitut}/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField name="idraça" label="Raça" maxLength="3" fullWidth onChange={this.handleChanges} placeholder={this.state.currentData.idraça}/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField name="capa" label="Capa" fullWidth onChange={this.handleChanges} placeholder={this.state.currentData.capa}/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField name="color" label="Color" fullWidth onChange={this.handleChanges} placeholder={this.state.currentData.color}/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField name="sexe" label="Sexe" maxLength="1" fullWidth onChange={this.handleChanges} placeholder={this.state.currentData.sexe}/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField name="estatderecollida" label="Estat de recollida" fullWidth onChange={this.handleChanges} placeholder={this.state.currentData.estatderecollida}/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField name="domicili" label="Domicili" fullWidth onChange={this.handleChanges} placeholder={this.state.currentData.domicili}/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField name="idpropietari" label="Propietari" fullWidth onChange={this.handleChanges} placeholder={this.state.currentData.idpropietari}/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Form.Label>Municipi</Form.Label>
                                            <Form.Control as="select" name="idmunicipi" fullWidth onChange={this.handleChanges} placeholder={this.state.currentData.idmunicipi}>
                                                {this.renderMunicipis()}
                                            </Form.Control>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                        <Form.Label>Provincia</Form.Label>
                                            <Form.Control as="select" name="idprovincia" fullWidth onChange={this.handleChanges} placeholder={this.state.currentData.idprovincia}>
                                                {this.renderProvincies()}
                                            </Form.Control>
                                        </Grid>
                                        <Grid item xs={12} sm={5}>
                                            <button class="btn btn-primary" value="enviar" onClick={this.handleSubmit}>Enviar</button>
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                            </form>
                        </div>
                    </div>
                )
            }      
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(FitxaAnimal) 
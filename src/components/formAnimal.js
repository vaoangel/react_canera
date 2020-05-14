import React from 'react'
import {AnimalsApi} from '../router/agent'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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
            estatderecollida:'default',
            dataeutanasia:'default',
            // imatge:"default",
            llocRecollida:"default",
            idmunicipi:"default",
            idprovincia:"default",
            dataIdent:"default",
            dataeixida:"default",
            datanaixement:"default",
            nom:"default",
            datarecollida: "default",
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
                    console.log(this.props.current.animals[index]);
                    
                    this.state.currentData = this.props.current.animals[index]
                }
            }
            
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
            this.props.success();
        }else{

            return snapshot

        }
        
    }
    handleChanges(event){
        this.setState({formData:{...this.state.formData, [event.target.name]: event.target.value }})
        }
    handleSubmit(){
       var Datachanges =this.state.formData 
       var errors = false;
        // for (const key in Datachanges ) {
        
        //     if(Datachanges[key] === 'default'){
        //         alert("Ninguno de los campos puede estar vacio, porfavor revisa los datos introducidos")
        //         errors= true; 
        //         break
        //     }       
        // }

        if(errors === false){
            // var idProv = undefined;
            // var idMuni = undefined;
            var Cpmuni = undefined;
            for(var i=0; i< this.state.municipis.length; i++){
                if(this.state.formData.idmunicipi == this.state.municipis[i].idmunicipi){
                    console.log(this.state.municipis[i]);
                    Cpmuni = this.state.municipis[i].cp;
                    
                }
            }
            var currentDate = new Date()

            const animals ={
                "IDanimals": this.state.update,
                "animals": {
                    "transponder": null,
                    "tranpenmusdret": false,
                    "tranpenmusesq": false,
                    "tatuatgeesq": false,
                    "tatuatgedret": false,
                    "dataidentificacio": Datachanges.dataIdent+"T"+currentDate.getHours()+":"+currentDate.getMinutes()+":"+currentDate.getSeconds()+"Z",
                    "datanaixement":  Datachanges.datanaixement+"T"+currentDate.getHours()+":"+currentDate.getMinutes()+":"+currentDate.getSeconds()+"Z",
                    "dataeixida": Datachanges.dataeixida+"T"+currentDate.getHours()+":"+currentDate.getMinutes()+":"+currentDate.getSeconds()+"Z",
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
                    "dataeutanasia":  Datachanges.dataeutanasia+"T"+currentDate.getHours()+":"+currentDate.getMinutes()+":"+currentDate.getSeconds()+"Z",
                    "estatderecollida": Datachanges.estatderecollida,
                    "idpropietari": Datachanges.idpropietari,
                    "datarecollida": Datachanges.datarecollida+"T"+currentDate.getHours()+":"+currentDate.getMinutes()+":"+currentDate.getSeconds()+"Z",
                }
            }  
            if(this.state.update === 'false'){
                    console.log(animals);
                    this.props.insert(animals)
            }else{
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
        console.log(this.state.formData);
        
        if(this.state.update === 'false'){
            if((this.state.municipis != undefined) && (this.state.provincies !== undefined)){
                return(
                    <div id="formu"> 
                        {/* <h1>CREATE</h1> */}
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
                                            <input type="date" name="dataeutanasia" onChange={this.handleChanges}/>
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
                                        <Grid item xs={12} sm={6}>
                                            <TextField name="idtamany" label="Tamany" maxLength="2" fullWidth onChange={this.handleChanges}/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField name="especie" label="Especie" fullWidth onChange={this.handleChanges}/>
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
                                            <TextField name="llocRecollida" label="Lloc de recollida" fullWidth onChange={this.handleChanges}/>
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
                                                {this.renderProvincies()}
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
            
            if(this.state.formData.showFormDiv === 'false'){
                return(
                    <div>
                    <h1>Details</h1>
                    <div key={this.state.currentData.id}>
                    <p name="id">ID: {this.state.currentData.id}</p>
                    <p name="aptitut">Aptitud: {this.state.currentData.aptitut}</p>
                    <p name="capa">Capa: {this.state.currentData.capa}</p>
                    <p name="color">Color: {this.state.currentData.color}</p>
                    <p name="dataeixida">Data eixida: {this.state.currentData.dataeixida}</p>
                    <p name="dataeutanasia">Data Eutanasia: {this.state.currentData.dataeutanasia}</p>
                    <p name="dataidentificacio">Data identificació: {this.state.currentData.dataidentificacio}</p>
                    <p name="datanaixement">Data neixement: {this.state.currentData.datanaixement}</p>
                    <p name="datarecollida">Data recollida: {this.state.currentData.datarecollida}</p>
                    <p name="domicili">Domicili: {this.state.currentData.domicili}</p>
                    <p name="especie">Especie: {this.state.currentData.especie}</p>
                    <p name="estatderecollida">Estat de recollida: {this.state.currentData.estatderecollida}</p>
                    <p name="idclasseanimal">Classe animal: {this.state.currentData.idclasseanimal}</p>
                    <p name="idmunicipi">Municipi: {this.state.currentData.idmunicipi}</p>
                    <p name="idprovincia">Provincia: {this.state.currentData.idprovincia}</p>
                    <p name="idraça">Raça: {this.state.currentData.idraça}</p>
                    <p name="idtamany">Tamany: {this.state.currentData.idtamany}</p>
                    <p name="nom">Nom: {this.state.currentData.nom}</p>
                    <p name="sexe">Sexe: {this.state.currentData.sexe}</p>
                    <button type="button" name="showFormDiv" value="true" onClick={this.handleChanges}> Show Update form</button>

                </div>
                </div>
                )
            
            }else{
                
            return(
                <div>
                <form id="form" onSubmit={this.handleSubmit}>
                <label htmlFor="dataeixida">Data eixida:</label> <input type="date" name="dataeixida" onChange={this.handleChanges} placeholder={this.state.currentData.dataeixida}/>
                <label htmlFor="datanaixement">Data naixement:</label> <input type="date" name="datanaixement"  onChange={this.handleChanges} placeholder={this.state.currentData.datanaixement}/>
                <label htmlFor="dataeutanasia">Data Eutanasia:</label> <input type="date" name="dataeutanasia" onChange={this.handleChanges} placeholder={this.state.currentData.dataeutanasiaanasia}/>
                <label htmlFor="dataIdent">Data Identificació:</label> <input type="date" name="dataIdent" onChange={this.handleChanges} placeholder={this.state.currentData.dataIdent}/>
                <label htmlFor="datarecollida">Data Recollida:</label> <input type="date" name="datarecollida" onChange={this.handleChanges} placeholder={this.state.currentData.datarecollida}/>
                <br></br>
                <label htmlFor="nom">Nom:</label><input type="text" name="nom"  onChange={this.handleChanges} placeholder={this.state.currentData.nom}/>
                <br></br>
                <label htmlFor="idclasseanimal">Classe d'animal:</label><input type="text" name="idclasseanimal" onChange={this.handleChanges} placeholder={this.state.currentData.idclasseanimal}/>
                <label htmlFor="idtamany">Tamany:</label><input type="text" name="idtamany" maxLength="2" onChange={this.handleChanges} placeholder={this.state.currentData.idtamany}/>
                <br></br>
                <label htmlFor="especie">Especie:</label><input type="text" name="especie" onChange={this.handleChanges}placeholder={this.state.currentData.especie}/>
                <br></br>
                <label htmlFor="idraça">Raça:</label><input type="text" name="idraça" maxLength="3" onChange={this.handleChanges} placeholder={this.state.currentData.idraça}/>
                <br></br>
                <label htmlFor="capa">Capa:</label><input type="text" name="capa" onChange={this.handleChanges} placeholder={this.state.currentData.capa}/>
                <br></br>
                <label htmlFor="color">Color:</label><input type="text" name="color" onChange={this.handleChanges} placeholder={this.state.currentData.color}/>
                <br></br>
                <label htmlFor="aptitut">aptitut:</label><input type="text" name="aptitut" onChange={this.handleChanges} placeholder={this.state.currentData.aptitut}/>
                <br></br>
                <label htmlFor="sexe">Sexe:</label><input type="text" name="sexe" maxLength="1" onChange={this.handleChanges} placeholder={this.state.currentData.sexe}/>
                <br></br>
                <label htmlFor="estatderecollida">Estat de recollida:</label><input type="text" name="estatderecollida" onChange={this.handleChanges} placeholder={this.state.currentData.estatderecollida}/>
                <br></br>
                {/* <label htmlFor="llocRecollida">Lloc de recollida:</label><input type="text" name="llocRecollida" onChange={this.handleChanges} placeholder={this.state.currentData.llocRecollida}/> */}
                <br></br>
                <label htmlFor="domicili">Domicili:</label><input type="text" name="domicili" onChange={this.handleChanges} placeholder={this.state.currentData.domicili}/>
                <br></br>
                <label htmlFor="idpropietari">Propietari:</label><input type="text" name="idpropietari" onChange={this.handleChanges} placeholder={this.state.currentData.idpropietari}/>
                <br></br>
                {/* <label htmlFor="idmunicipi">Municipi:</label><input type="text" name="idmunicipi" onChange={this.handleChanges} placeholder={this.state.currentData.idmunicipi}/>
                <br></br> */}
                <label htmlFor="idmunicipi">Municipi:</label><select type="text" name="idmunicipi" onChange={this.handleChanges} placeholder={this.state.currentData.idmunicipi}>
                    {this.renderMunicipis()}
                </select>
                <label htmlFor="idprovincia">Privincia:</label><select type="text" name="idprovincia" onChange={this.handleChanges} placeholder={this.state.currentData.idprovincia}>
                    {this.renderProvincies()}
                </select>
                <button type="button" value="enviar" onClick={this.handleSubmit}>Enviar</button>
            </form>
            <button type="button" name="showFormDiv" value="false" onClick={this.handleChanges}> Details</button>

            </div>
                )
            }      
        }
        
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(FitxaAnimal) 
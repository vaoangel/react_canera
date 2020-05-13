import React from 'react'
import {AnimalsApi} from '../router/agent'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

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
            if(this.state.update === 'false'){

                var idProv = undefined;
                var idMuni = undefined;
                var Cpmuni = undefined;
                for(var i=0; i< this.state.municipis.length; i++){
                    if(this.state.formData.idmunicipi == this.state.municipis[i].nom){
                        console.log(this.state.municipis[i]);
                        idMuni = this.state.municipis[i].idmunicipi
                        Cpmuni = this.state.municipis[i].cp;
                        
                    }
                }
                for(var i=0; i< this.state.provincies.length; i++){
                    if(this.state.formData.idprovincia == this.state.provincies[i].nom){
                        console.log(this.state.provincies[i]);
                        idProv = this.state.provincies[i].idprovincia
                        
                    }
                }

                if((idMuni === undefined)||(idProv === undefined)){
                    alert("Municipio o Provincia Incorrecto")
                }else{
                    const animals = {
                        "transponder": null,
                        "tranpenmusdret": false,
                        "tranpenmusesq": false,
                        "tatuatgeesq": false,
                        "tatuatgedret": false,
                        "dataidentificacio": Datachanges.dataIdent,
                        "datanaixement": Datachanges.datanaixement,
                        "dataeixida": Datachanges.dataeixida,
                        "idraça": Datachanges.idraça,
                        "idclasseanimal": Datachanges.idclasseanimal,
                        "especie": Datachanges.especie,
                        "idtamany": Datachanges.idtamany,
                        "sexe": Datachanges.sexe,
                        "nom": Datachanges.nom,
                        "capa": Datachanges.capa,
                        "color": Datachanges.color,
                        "aptitut": Datachanges.aptitut,
                        "domicili": Datachanges.domicili,
                        "cp": Cpmuni,
                        "idmunicipi": idMuni,
                        "idprovincia": idProv,
                        "dataeutanasia":Datachanges.dataeutanasia,
                        "estatderecollida": Datachanges.estatderecollida,
                        "idpropietari": Datachanges.idpropietari,
                        "datarecollida": Datachanges.datarecollida  
                    };
                    console.log(animals);
                    
                    this.props.insert(animals)
                }
               
            }else{
                var idProv = undefined;
                var idMuni = undefined;
                var Cpmuni = undefined;
                for(var i=0; i< this.state.municipis.length; i++){
                    if(this.state.formData.idmunicipi == this.state.municipis[i].nom){
                        console.log(this.state.municipis[i]);
                        idMuni = this.state.municipis[i].idmunicipi
                        Cpmuni = this.state.municipis[i].cp;
                        
                    }
                }
                for(var i=0; i< this.state.provincies.length; i++){
                    // console.log(this.state.provincies[i]);

                    if(this.state.formData.idprovincia == this.state.provincies[i].nom){
                        console.log(this.state.provincies[i]);
                        idProv = this.state.provincies[i].idprovincia
                        
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
                        "idmunicipi": idMuni,
                        "idprovincia": idProv,
                        "dataeutanasia":  Datachanges.dataeutanasia+"T"+currentDate.getHours()+":"+currentDate.getMinutes()+":"+currentDate.getSeconds()+"Z",
                        "estatderecollida": Datachanges.estatderecollida,
                        "idpropietari": Datachanges.idpropietari,
                        "datarecollida": Datachanges.datarecollida+"T"+currentDate.getHours()+":"+currentDate.getMinutes()+":"+currentDate.getSeconds()+"Z",
                    }
                }

                console.log(animals);
                
                this.props.update(animals)

            }
        }
    }

    render(){
       
        
        
        if(this.state.update === 'false'){
            return(
                <div> 
                    <h1>CREATE</h1>
                    <form id="form" onSubmit={this.handleSubmit}>
                        <label htmlFor="dataeixida">Data eixida:</label> <input type="date" name="dataeixida" onChange={this.handleChanges} placeholder={this.state.formData.dataeixida}/>
                        <label htmlFor="datanaixement">Data naixement:</label> <input type="date" name="datanaixement" onChange={this.handleChanges} placeholder={this.state.formData.datanaixement}/>
                        <label htmlFor="dataeutanasia">Data Eutanasia:</label> <input type="date" name="dataeutanasia" onChange={this.handleChanges} placeholder={this.state.formData.dataeutanasia}/>
                        <label htmlFor="dataIdent">Data Identificació:</label> <input type="date" name="dataIdent" onChange={this.handleChanges} placeholder={this.state.formData.dataIdent}/>
                        <label htmlFor="datarecollida">Data Recollida:</label> <input type="date" name="datarecollida" onChange={this.handleChanges} placeholder={this.state.formData.datarecollida}/>
                        <br></br>
                        <label htmlFor="nom">Nom:</label><input type="text" name="nom" onChange={this.handleChanges} placeholder={this.state.formData.nom}/>
                        <br></br>
                        <label htmlFor="idclasseanimal">Classe d'animal</label><input type="text" name="idclasseanimal" onChange={this.handleChanges} placeholder={this.state.formData.idclasseanimal}/> 
                        <label htmlFor="idtamany">Tamany:</label><input type="text" name="idtamany" onChange={this.handleChanges} placeholder={this.state.formData.idtamany}/>
                        <br></br>
                        <label htmlFor="especie">Especie:</label><input type="text" name="especie" onChange={this.handleChanges} placeholder={this.state.formData.especie}/>
                        <br></br>
                        <label htmlFor="idraça">Raça:</label><input type="text" name="idraça" onChange={this.handleChanges} placeholder={this.state.formData.raça}/>
                        <br></br>
                        <label htmlFor="capa">Capa:</label><input type="text" name="capa" onChange={this.handleChanges} placeholder={this.state.formData.capa}/>
                        <br></br>
                        <label htmlFor="color">Color:</label><input type="text" name="color" onChange={this.handleChanges} placeholder={this.state.formData.color}/>
                        <br></br>
                        <label htmlFor="aptitut">aptitut:</label><input type="text" name="aptitut" onChange={this.handleChanges} placeholder={this.state.formData.aptitut}/> 
                        <br></br>
                        <label htmlFor="sexe">Sexe:</label><input type="text" name="sexe" onChange={this.handleChanges} placeholder={this.state.formData.sexe}/>
                        <br></br>
                        <label htmlFor="estatderecollida">Estat de recollida:</label><input type="text" name="estatderecollida" onChange={this.handleChanges} placeholder={this.state.formData.estatderecollida}/>
                        <br></br>
                        <label htmlFor="llocRecollida">Lloc de recollida:</label><input type="text" name="llocRecollida" onChange={this.handleChanges} placeholder={this.state.formData.llocRecollida}/>
                        <br></br>
                        <label htmlFor="domicili">Domicili:</label><input type="text" name="domicili" onChange={this.handleChanges} placeholder={this.state.formData.domicili}/>
                        <br></br>
                        <label htmlFor="idpropietari">Propietari:</label><input type="text" name="idpropietari" onChange={this.handleChanges} placeholder={this.state.formData.idpropietari}/>
                        <br></br>
                        <label htmlFor="idmunicipi">Municipi:</label><input type="text" name="idmunicipi" onChange={this.handleChanges} placeholder={this.state.formData.idmunicipi}/>
                        <br></br>
                        <label htmlFor="idprovincia">Privincia:</label><input type="text" name="idprovincia" onChange={this.handleChanges} placeholder={this.state.formData.ididprovincia}/>
                           
                        <button type="button" value="enviar" onClick={this.handleSubmit}>Enviar</button>
                    </form>
                </div>
            )
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
                <label htmlFor="datanaixement">Data naixement:</label> <input type="date" name="datanaixement" value={this.state.currentData.datanaixement} onChange={this.handleChanges} placeholder={this.state.currentData.datanaixement}/>
                <label htmlFor="dataeutanasia">Data Eutanasia:</label> <input type="date" name="dataeutanasia" onChange={this.handleChanges} placeholder={this.state.currentData.dataeutanasiaanasia}/>
                <label htmlFor="dataIdent">Data Identificació:</label> <input type="date" name="dataIdent" onChange={this.handleChanges} placeholder={this.state.currentData.dataIdent}/>
                <label htmlFor="datarecollida">Data Recollida:</label> <input type="date" name="datarecollida" onChange={this.handleChanges} placeholder={this.state.currentData.datarecollida}/>
                <br></br>
                <label htmlFor="nom">Nom:</label><input type="text" name="nom"  onChange={this.handleChanges} placeholder={this.state.currentData.nom}/>
                <br></br>
                <label htmlFor="idclasseanimal">Classe d'animal:</label><input type="text" name="idclasseanimal" onChange={this.handleChanges} placeholder={this.state.currentData.idclasseanimal}/>
                <label htmlFor="idtamany">Tamany:</label><input type="text" name="idtamany" onChange={this.handleChanges} placeholder={this.state.currentData.idtamany}/>
                <br></br>
                <label htmlFor="especie">Especie:</label><input type="text" name="especie" onChange={this.handleChanges}placeholder={this.state.currentData.especie}/>
                <br></br>
                <label htmlFor="idraça">Raça:</label><input type="text" name="idraça" onChange={this.handleChanges} placeholder={this.state.currentData.idraça}/>
                <br></br>
                <label htmlFor="capa">Capa:</label><input type="text" name="capa" onChange={this.handleChanges} placeholder={this.state.currentData.capa}/>
                <br></br>
                <label htmlFor="color">Color:</label><input type="text" name="color" onChange={this.handleChanges} placeholder={this.state.currentData.color}/>
                <br></br>
                <label htmlFor="aptitut">aptitut:</label><input type="text" name="aptitut" onChange={this.handleChanges} placeholder={this.state.currentData.aptitut}/>
                <br></br>
                <label htmlFor="sexe">Sexe:</label><input type="text" name="sexe" onChange={this.handleChanges} placeholder={this.state.currentData.sexe}/>
                <br></br>
                <label htmlFor="estatderecollida">Estat de recollida:</label><input type="text" name="estatderecollida" onChange={this.handleChanges} placeholder={this.state.currentData.estatderecollida}/>
                <br></br>
                {/* <label htmlFor="llocRecollida">Lloc de recollida:</label><input type="text" name="llocRecollida" onChange={this.handleChanges} placeholder={this.state.currentData.llocRecollida}/> */}
                <br></br>
                <label htmlFor="domicili">Domicili:</label><input type="text" name="domicili" onChange={this.handleChanges} placeholder={this.state.currentData.domicili}/>
                <br></br>
                <label htmlFor="idpropietari">Propietari:</label><input type="text" name="idpropietari" onChange={this.handleChanges} placeholder={this.state.currentData.idpropietari}/>
                <br></br>
                <label htmlFor="idmunicipi">Municipi:</label><input type="text" name="idmunicipi" onChange={this.handleChanges} placeholder={this.state.currentData.idmunicipi}/>
                <br></br>
                <label htmlFor="idprovincia">Privincia:</label><input type="text" name="idprovincia" onChange={this.handleChanges} placeholder={this.state.currentData.idprovincia}/>
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
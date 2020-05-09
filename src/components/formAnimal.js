import React from 'react'
import {AnimalsApi} from '../router/agent'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

const mapStateToProps= state =>({
    // current: state.AnimalsReducer.currentAnimal,
    municipis: state.AnimalsReducer.municipis,
    provincies: state.AnimalsReducer.provincies
})

const mapDispatchToProps = dispatch =>({
    insert:(data) =>{
        dispatch({type:"INSERT_ANIMAL", payload: data,method:"InsertAnimal", api:"AnimalsApi"})
    },
    update:(data) =>{
        dispatch({type:"UpdateAnimal", payload: AnimalsApi.UpdateAnimal(data)})
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
            domicili: "default"
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
        if((this.state.update !== 'false')&&(this.props.current)){
            console.log(this.props.current);
            for (let index = 0; index < this.props.current.length; index++) {
                console.log(this.state.update);

                if(this.state.update == this.props.current[index].id){
                    
                    this.state.currentData = this.props.current[index]
                }
            }
            
        }

      
    }
    getSnapshotBeforeUpdate(prevProps, prevState) {
        // console.log(prevProps.municipis);
        
        if (prevProps.municipis !== this.props.municipis) {
            // console.log(this.props.municipis);
            
          const snapshot = this.props.municipis;
          return snapshot
        } 
        
        if (prevProps.provincies !== this.props.provincies){
            const snapshot2 = this.props.provincies
            return snapshot2
        }
        
      
        return null;
    } 
    componentDidUpdate(prevProps, prevState, snapshot) {
        
        
        if(snapshot != null){
            if(snapshot[1].idmunicipi){
                this.setState({
                    municipis: snapshot,
                })
            }else{
                this.setState({
                    provincies: snapshot,
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
       console.log(Datachanges);
       
       var errors = false;
        for (const key in Datachanges ) {
        
            // if(Datachanges[key] === 'default'){
            //     alert("Ninguno de los campos puede estar vacio, porfavor revisa los datos introducidos")
            //     errors= true; 
            //     break
            // }       
        }

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
                    
                    // this.props.insert(animals)
                }
               
            }else{
                this.props.update(this.state.formData)

            }
        }
    }

    render(){
        // if(!this.state.currentData){
        //     return<Redirect to='/'/>   
        // }
        // console.log(this.state.formData);
        // console.log(this.props.municipis);
        
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
            return(
                <div>
                    <h1>Update</h1>
                    <form id="form" onSubmit={this.handleSubmit}>
                        <label htmlFor="dataeixida">Data eixida:</label> <input type="date" name="dataeixida" onChange={this.handleChanges} placeholder={this.state.currentData.dataeixida}/>
                        <label htmlFor="datanaixement">Data naixement:</label> <input type="date" name="datanaixement" value={this.props.currentData.datanaixement} onChange={this.handleChanges} placeholder={this.state.currentData.datanaixement}/>
                        <label htmlFor="dataeutanasiaanasia">Data Eutanasia:</label> <input type="date" name="dataeutanasiaanasia" onChange={this.handleChanges} placeholder={this.state.currentData.dataeutanasiaanasia}/>
                        <label htmlFor="dataIdent">Data Identificació:</label> <input type="date" name="dataIdent" onChange={this.handleChanges} placeholder={this.state.currentData.dataIdent}/>
                        <label htmlFor="datarecollida">Data Recollida:</label> <input type="date" name="datarecollida" onChange={this.handleChanges} placeholder={this.state.currentData.datarecollida}/>
                        <br></br>
                        <label htmlFor="nom">Nom:</label><input type="text" name="nom" value={this.state.currentData.nom} onChange={this.handleChanges} placeholder={this.state.currentData.nom}/>
                        <br></br>
                        <label htmlFor="idclasseanimal">Classe d'animal:</label><input type="text" name="idclasseanimal" onChange={this.handleChanges}value={this.state.currentData.idclasseanimal} placeholder={this.state.currentData.idclasseanimal}/>
                        <label htmlFor="idtamany">Tamany:</label><input type="text" name="idtamany" onChange={this.handleChanges} placeholder={this.state.currentData.idtamany}/>
                        <br></br>
                        <label htmlFor="especie">Especie:</label><input type="text" name="especie" onChange={this.handleChanges}value={this.state.currentData.especie} placeholder={this.state.currentData.especie}/>
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
                        <label htmlFor="llocRecollida">Lloc de recollida:</label><input type="text" name="llocRecollida" onChange={this.handleChanges} placeholder={this.state.currentData.llocRecollida}/>
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
                </div>
            )
        }
        
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(FitxaAnimal) 
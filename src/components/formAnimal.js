import React from 'react'
import {AnimalsApi} from '../router/agent'

import {connect} from 'react-redux'

const mapStateToProps= state =>({
    current: state.AnimalsReducer.currentAnimal

})



const mapDispatchToProps = dispatch =>({
    insert:(data) =>{
        dispatch({type:"InsertAnimal", payload: AnimalsApi.InsertAnimal(data)})
    },
    update:(data) =>{
        dispatch({type:"UpdateAnimal", payload: AnimalsApi.UpdateAnimal(data)})
    },
    onLoad: (data) =>dispatch({type:"FETCH_ANIMAL", payload:AnimalsApi.GetOne(data)}),
    success: () => dispatch({type:"FETCH_ANIMALS_SUCCESS"})

    
})



class FitxaAnimal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            formData:{
                classAnimal:"default",
                tamany:"default",
                especie:'default',
                raça:"default",
                capa: 'default',
                color: 'default',
                aptitud:"default",
                sexo:"default",
                estatRec:'default',
                dataEut:'default',
                // imatge:"default",
                llocRecollida:"default",
                municipi:"default",
                provincia:"default",
                dataIdent:"default",
                dataEixida:"default",
                dataNaixement:"default",
                nom:"default",
            },
            update:false,
        }
        this.handleChanges = this.handleChanges.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);

        this.state.update = this.props.match.params.updated;
        if(this.state.update != 'false'){
            this.props.onLoad(this.state.update)

        }
    }
    getSnapshotBeforeUpdate(prevProps, prevState) {
        if (prevProps.current != this.props.current) {
            // console.log(this.props.current);
            
          const snapshot = this.props.current;
          return snapshot
        }    
        return null;
    } 
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(snapshot != null){
            this.setState({
                animals: snapshot
            })
            this.props.success()
            console.log(this.props.current);

            this.setState({formData:{...this.state.formData,
            nom: this.props.current
            // modificar todo el state cuando llegue el raw exacto del backend
            }})
            
        }
        
    }
    
    handleChanges(event){
        this.setState({formData:{...this.state.formData, [event.target.name]: event.target.value }})
        }
    handleSubmit(){
       var Datachanges =this.state.formData 
       var errors = false;
    for (const key in Datachanges ) {
      
        if(Datachanges[key] === 'default'){
            alert("Ninguno de los campos puede estar vacio, porfavor revisa los datos introducidos")
            errors= true; 
            break
        }       
    }

    if(errors === false){
        this.props.insert(this.state.formData)
    }
    }
    handleSubmitUpdate(){
        var Datachanges =this.state.formData 
        var errors = false;
     for (const key in Datachanges ) {
       
         if(Datachanges[key] === 'default'){
             alert("Ninguno de los campos puede estar vacio, porfavor revisa los datos introducidos")
             errors= true; 
             break
         }       
     }
 
     if(errors === false){
         this.props.update(this.state.formData)
     }
     }
    render(){
        console.log(this.props.current);

        if(this.state.update === 'false'){
            return(
                <div> 
                    <form id="form" onSubmit={this.handleSubmit}>
                            <label htmlFor="dataEixida">Data eixida:</label> <input type="date" name="dataEixida" onChange={this.handleChanges} placeholder={this.state.formData.dataEixida}/>
                            <label htmlFor="dataNaixement">Data naixement:</label> <input type="date" name="dataNaixement" onChange={this.handleChanges} placeholder={this.state.formData.dataNaixement}/>
                            <label htmlFor="dataEut">Data Eutanasia:</label> <input type="date" name="dataEut" onChange={this.handleChanges} placeholder={this.state.formData.dataEut}/>
                            <label htmlFor="dataIdent">Data Identificació:</label> <input type="date" name="dataIdent" onChange={this.handleChanges} placeholder={this.state.formData.dataIdent}/>
                       
    
                        <br></br>
                        <label htmlFor="nom">Nom:</label><input type="text" name="nom" onChange={this.handleChanges} placeholder={this.state.formData.nom}/>
                        <br></br>
                        <label htmlFor="classAnimal">Classe d'animal</label><select type="text" name="classAnimal" onChange={this.handleChanges} placeholder={this.state.formData.classAnimal}>
                            <option value="value1">Value1</option>
                            <option value="value2">Value2</option>
                            <option value="value3">Value3</option>
                            <option value="value4">Value4</option>
    
                        </select>
                        <label htmlFor="tamany">Tamany:</label><select type="text" name="tamany" onChange={this.handleChanges} placeholder={this.state.formData.tamany}>
                            <option value="value1">Value1</option>
                            <option value="value2">Value2</option>
                            <option value="value3">Value3</option>
                            <option value="value4">Value4</option>
    
                        </select>
                        <br></br>
                        <label htmlFor="especie">Especie:</label><input type="text" name="especie" onChange={this.handleChanges} placeholder={this.state.formData.especie}/>
                        <br></br>
                        <label htmlFor="raça">Raça:</label><input type="text" name="raça" onChange={this.handleChanges} placeholder={this.state.formData.raça}/>
                        <br></br>
                        <label htmlFor="capa">Capa:</label><input type="text" name="capa" onChange={this.handleChanges} placeholder={this.state.formData.capa}/>
                        <br></br>
                        <label htmlFor="color">Color:</label><input type="text" name="color" onChange={this.handleChanges} placeholder={this.state.formData.color}/>
                        <br></br>
                        <label htmlFor="aptitud">Aptitud:</label><select type="text" name="aptitud" onChange={this.handleChanges} placeholder={this.state.formData.aptitud}>
                            <option value="value1">Value1</option>
                            <option value="value2">Value2</option>
                            <option value="value3">Value3</option>
                            <option value="value4">Value4</option>
                        </select>
                        <br></br>
                        <label htmlFor="sexo">Sexe:</label><select type="text" name="sexo" onChange={this.handleChanges} placeholder={this.state.formData.sexo}>
                            <option value="value1">Value1</option>
                            <option value="value2">Value2</option>
                            <option value="value3">Value3</option>
                            <option value="value4">Value4</option>
                        </select>
                        <br></br>
                        <label htmlFor="estatRec">Estat de recollida:</label><input type="text" name="estatRec" onChange={this.handleChanges} placeholder={this.state.formData.estatRec}/>
                        <br></br>
                        <label htmlFor="llocRecollida">Lloc de recollida:</label><input type="text" name="llocRecollida" onChange={this.handleChanges} placeholder={this.state.formData.llocRecollida}/>
                        <br></br>
                        <label htmlFor="municipi">Municipi:</label><select type="text" name="municipi" onChange={this.handleChanges} placeholder={this.state.formData.municipi}>
                            <option value="value1">Value1</option>
                            <option value="value2">Value2</option>
                            <option value="value3">Value3</option>
                            <option value="value4">Value4</option>
                        </select>
                        <br></br>
                        <label htmlFor="provincia">Privincia:</label><select type="text" name="provincia" onChange={this.handleChanges} placeholder={this.state.formData.provincia}>
                            <option value="value1">Value1</option>
                            <option value="value2">Value2</option>
                            <option value="value3">Value3</option>
                            <option value="value4">Value4</option>
                        </select>
                        <button type="button" value="enviar" onClick={this.handleSubmit}>Enviar</button>
                    </form>
                </div>
            )
        }else{
            return(
                <div>
                    <h1>Update</h1>
 
                    <form id="form" onSubmit={this.handleSubmit}>
                            <label htmlFor="dataEixida">Data eixida:</label> <input type="date" name="dataEixida" onChange={this.handleChanges} placeholder={this.state.formData.dataEixida}/>
                            <label htmlFor="dataNaixement">Data naixement:</label> <input type="date" name="dataNaixement" onChange={this.handleChanges} placeholder={this.state.formData.dataNaixement}/>
                            <label htmlFor="dataEut">Data Eutanasia:</label> <input type="date" name="dataEut" onChange={this.handleChanges} placeholder={this.state.formData.dataEut}/>
                            <label htmlFor="dataIdent">Data Identificació:</label> <input type="date" name="dataIdent" onChange={this.handleChanges} placeholder={this.state.formData.dataIdent}/>
                       
    
                        <br></br>
                        <label htmlFor="nom">Nom:</label><input type="text" name="nom" value={this.state.formData.nom} onChange={this.handleChanges} placeholder={this.state.formData.nom}/>
                        <br></br>
                        <label htmlFor="classAnimal">Classe d'animal</label><select type="text" name="classAnimal" onChange={this.handleChanges} placeholder={this.state.formData.classAnimal}>
                            <option value="value1">Value1</option>
                            <option value="value2">Value2</option>
                            <option value="value3">Value3</option>
                            <option value="value4">Value4</option>
    
                        </select>
                        <label htmlFor="tamany">Tamany:</label><select type="text" name="tamany" onChange={this.handleChanges} placeholder={this.state.formData.tamany}>
                            <option value="value1">Value1</option>
                            <option value="value2">Value2</option>
                            <option value="value3">Value3</option>
                            <option value="value4">Value4</option>
    
                        </select>
                        <br></br>
                        <label htmlFor="especie">Especie:</label><input type="text" name="especie" onChange={this.handleChanges} placeholder={this.state.formData.especie}/>
                        <br></br>
                        <label htmlFor="raça">Raça:</label><input type="text" name="raça" onChange={this.handleChanges} placeholder={this.state.formData.raça}/>
                        <br></br>
                        <label htmlFor="capa">Capa:</label><input type="text" name="capa" onChange={this.handleChanges} placeholder={this.state.formData.capa}/>
                        <br></br>
                        <label htmlFor="color">Color:</label><input type="text" name="color" onChange={this.handleChanges} placeholder={this.state.formData.color}/>
                        <br></br>
                        <label htmlFor="aptitud">Aptitud:</label><select type="text" name="aptitud" onChange={this.handleChanges} placeholder={this.state.formData.aptitud}>
                            <option value="value1">Value1</option>
                            <option value="value2">Value2</option>
                            <option value="value3">Value3</option>
                            <option value="value4">Value4</option>
                        </select>
                        <br></br>
                        <label htmlFor="sexo">Sexe:</label><select type="text" name="sexo" onChange={this.handleChanges} placeholder={this.state.formData.sexo}>
                            <option value="value1">Value1</option>
                            <option value="value2">Value2</option>
                            <option value="value3">Value3</option>
                            <option value="value4">Value4</option>
                        </select>
                        <br></br>
                        <label htmlFor="estatRec">Estat de recollida:</label><input type="text" name="estatRec" onChange={this.handleChanges} placeholder={this.state.formData.estatRec}/>
                        <br></br>
                        <label htmlFor="llocRecollida">Lloc de recollida:</label><input type="text" name="llocRecollida" onChange={this.handleChanges} placeholder={this.state.formData.llocRecollida}/>
                        <br></br>
                        <label htmlFor="municipi">Municipi:</label><select type="text" name="municipi" onChange={this.handleChanges} placeholder={this.state.formData.municipi}>
                            <option value="value1">Value1</option>
                            <option value="value2">Value2</option>
                            <option value="value3">Value3</option>
                            <option value="value4">Value4</option>
                        </select>
                        <br></br>
                        <label htmlFor="provincia">Privincia:</label><select type="text" name="provincia" onChange={this.handleChanges} placeholder={this.state.formData.provincia}>
                            <option value="value1">Value1</option>
                            <option value="value2">Value2</option>
                            <option value="value3">Value3</option>
                            <option value="value4">Value4</option>
                        </select>
                        <button type="button" value="enviar" onClick={this.handleSubmit}>Enviar</button>
                    </form>
                </div>
            )
        }
        
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(FitxaAnimal) 
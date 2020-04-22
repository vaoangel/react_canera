import React from 'react'

import {RiviaApi} from '../router/agent'

import {connect} from 'react-redux'

function mapStateToProps(state){
    return "test"
}


const mapDispatchToProps = dispatch =>({
    insert:(data) =>{
        dispatch({type:"InsertRivia", payload: RiviaApi.InsertRivia(data)})
    }
    
})

class RegistreRivia extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            formData:{
                idveterinari:"default",
                idtercer: "default",
                codiIncidencia:"default",
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
                dataRegistre:"default",
                nom:"default",
            },
        }
        this.handleChanges = this.handleChanges.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
render(){
    
    console.log(this.state.formData);
    
    return(
        <div> 
            <form id="form" onSubmit={this.handleSubmit}>
            <label htmlFor="dataRegistre">Data Registre:</label> <input type="date" name="dataRegistre" onChange={this.handleChanges} placeholder={this.state.formData.dataRegistre}/>
            <br></br>
            <label htmlFor="codiIncidencia">Codi incidencia:</label><input type="text" name="codiIncidencia" onChange={this.handleChanges} placeholder={this.state.formData.codiIncidencia}/>

                <h1>ANIMAL</h1>
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
                <h1>PROPIETARI RESPONSABLE</h1>
                <label htmlFor="idtercer">idtercer:</label><input type="text" name="idtercer" onChange={this.handleChanges} placeholder={this.state.formData.idtercer}/>
                <h1>VETERINARIO</h1>
                <label htmlFor="idveterinari">idVeterinari:</label><input type="text" name="idveterinari" onChange={this.handleChanges} placeholder={this.state.formData.idveterinari}/>

                <button type="button" value="enviar" onClick={this.handleSubmit}>Enviar</button>
            </form>
        </div>
    )
}
}



export default connect(null,mapDispatchToProps)(RegistreRivia) 
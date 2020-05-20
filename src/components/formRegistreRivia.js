import React from 'react'

import {RiviaApi} from '../router/agent'

import {connect} from 'react-redux'
import { Grid, TextField, Typography } from '@material-ui/core'
import { Form } from 'react-bootstrap'

const mapStateToProps = state =>({
    current: state.RiviaReducer.currentRivia
})


const mapDispatchToProps = dispatch =>({
    insert:(data) =>{
        dispatch({type:"InsertRivia", payload: RiviaApi.InsertRivia(data)})
    },
    update:(data) =>{
        dispatch({type:"UpdateRivia", payload: RiviaApi.UpdateRivia(data)})
    },
    onLoad: (data) =>dispatch({type:"FETCH_RIVIA", payload:RiviaApi.GetOne(data)}),
    success: () => dispatch({type:"FETCH_RIVIA_SUCCESS"})
    
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
            update:false,

        }
        this.handleChanges = this.handleChanges.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);

        this.state.update = this.props.match.params.updated;
        if(this.state.update !== 'false'){
            this.props.onLoad(this.state.update)

        }
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        if (prevProps.current !== this.props.current) {
            // console.log(this.props.current);
            
          const snapshot = this.props.current;
          return snapshot
        }    
        return null;
    } 
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(snapshot != null){
            this.setState({
                rivia: snapshot
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
            if(this.state.update === 'false'){
                this.props.insert(this.state.formData)
            }else{
                this.props.update(this.state.formData)
            }
        }
    }

    // handleSubmitUpdate(){
    //     var Datachanges =this.state.formData 
    //     var errors = false;
    //     for (const key in Datachanges ) {
        
    //         if(Datachanges[key] === 'default'){
    //             alert("Ninguno de los campos puede estar vacio, porfavor revisa los datos introducidos")
    //             errors= true; 
    //             break
    //         }       
    //     }

    //     if(errors === false){
    //         this.props.update(this.state.formData)
    //     }
    // }
render(){
    
    console.log(this.state.formData);
    if(this.state.update === 'false'){
        return(
            //CREATE
            <div id="formu"> 
                <div id="form">
                    <Form id="form1" onSubmit={this.handleSubmit}>
                        <React.Fragment>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <label>Data Registre</label>
                                    <input type="date" name="dataRegistre" onChange={this.handleChanges}/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField name="codiIncidencia" label="Codi incidencia" fullWidth onChange={this.handleChanges}/>
                                </Grid>                                  
                                <Grid item xs={12} sm={12}>
                                    <Typography variant="h6" gutterBottom>Animal</Typography>
                                </Grid>                            
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
                                <Grid item xs={12} sm={6}></Grid>
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
                                <Grid item xs={12} sm={6}></Grid>
                                <Grid item xs={12} sm={6}>
                                    <Form.Label>Municipi</Form.Label>
                                    <Form.Control as="select" name="idmunicipi" fullWidth onChange={this.handleChanges}>
                                        {/* {this.renderMunicipis()} */}
                                    </Form.Control>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                <Form.Label>Provincia</Form.Label>
                                    <Form.Control as="select" name="idprovincia" fullWidth onChange={this.handleChanges}>
                                        {/* {this.renderProvincies()} */}
                                    </Form.Control>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField name="idtercer" label="Tercer" fullWidth onChange={this.handleChanges}/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField name="idveterinari" label="Veterinari" fullWidth onChange={this.handleChanges}/>
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <button class="btn btn-primary" value="enviar" onClick={this.handleSubmit}>Enviar</button>
                                </Grid>
                            
                            </Grid>
                        </React.Fragment>
                    </Form>
                </div>
            </div>
        )
    }else{
        return(
            <div> 
                <h1>UPDATE</h1>
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
}



export default connect(mapStateToProps,mapDispatchToProps)(RegistreRivia) 
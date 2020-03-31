import React from 'react'


import {connect} from 'react-redux'
// import {  Link } from 'react-router-dom';

function mapStateToProps(state){
    return "test"
}


const mapDispatchToProps = dispatch =>{
    return "test"
}



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
                imatge:"default",
                llocRecollida:"default",
                municipi:"default",
                provincia:"default",
                dataIdent:"default",
                dataEixida:"default",
                dataNaixement:"default",
                nom:"default",
            },
        }
        this.handleChanges = this.handleChanges.bind(this);

    }
    handleChanges(event){
        this.setState({formData:{...this.state.formData, [event.target.name]: event.target.value }})
        }
    render(){
        console.log(this.state.formData);
        
        return(
            <div> 
                <form>

                   <label htmlFor="dataEixida">Data eixida:</label> <input type="date" name="dataEixida" onChange={this.handleChanges} value={this.state.formData.dataEixida}/>
                   <label htmlFor="dataNaixement">Data naixement:</label> <input type="date" name="dataNaixement" onChange={this.handleChanges} value={this.state.formData.dataNaixement}/>
                   <label htmlFor="dataEut">Data Eutanasia:</label> <input type="date" name="dataEut" onChange={this.handleChanges} value={this.state.formData.dataEut}/>
                   <label htmlFor="dataIdent">Data Identificació:</label> <input type="date" name="dataIdent" onChange={this.handleChanges} value={this.state.formData.dataIdent}/>
                   <br></br>
                   <label htmlFor="nom">Nombre:</label><input type="text" name="nom" onChange={this.handleChanges} value={this.state.formData.nom}/>


                </form>
            </div>
        )
    }
}


export default connect(null,null)(FitxaAnimal) 
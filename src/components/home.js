import React from 'react'
import {connect} from 'react-redux'
import {AnimalsApi} from '../router/agent'
import {Link} from 'react-router-dom'
const mapStateToProps = state =>({
    fetch_items: state.AnimalsReducer.animals
})

const mapDispatchToProps = dispatch =>({
    onLoad: () =>dispatch({type:"FETCH_ANIMALS", payload:AnimalsApi.GetAll()}),
    success: () => dispatch({type:"FETCH_ANIMALS_SUCCESS"})
})
class Home extends React.Component{
    
    state = {animals :undefined,filterData:undefined,filterSucces:undefined ,showFilterDiv:false}
    constructor(props){
        super(props)
        this.props.onLoad()
        this.animals_list = this.animals_list.bind(this)
        this.handleChanges = this.handleChanges.bind(this);
        this.handleFilters = this.handleFilters.bind(this);


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
                animals: snapshot
            })
            this.props.success()
        }
        
    }
   
    handleChanges(event){
        this.setState({ [event.target.name]: event.target.value })
        }
    handleFilters(event){
        // console.log("sadasdasdsadsa");
        
        for(var i=0; i<this.state.animals.length;i++){
            
                       if(this.state.filterData === this.state.animals[i]){
                           
                        this.setState({[event.target.name]: this.state.animals[i] })
                    }
                       }
                       this.state.showFilterDiv = true;
        

        }
    
    animals_list(){
        // console.log(this.props);
        
        let html =[]
        // console.log(this.state.animals);
        return this.state.animals
    }

    render(){   
    console.log(this.state.showFilterDiv);
             if(this.state.showFilterDiv === false){
                return(
                    <div>
                        <div className="filterList">
                        <input type="text" name="filterData" onChange={this.handleChanges}/> 
                        <button type="button" value="Buscar" name="filterSucces" onClick={this.handleFilters}>Buscar</button>
                        </div>
                        <div className="animalList"> {this.animals_list()} </div>
                        <Link to={`/formAnimal/${this.state.animals}`} >Insertar animal</Link>
                        <Link to={`/formRivia/${this.state.animals}`} >Insertar Rivia</Link>
        
                    </div>
                )
             }else if(this.state.showFilterDiv === 'false'){
                return(
                    <div>
                        <div className="filterList">
                        <input type="text" name="filterData" onChange={this.handleChanges}/> 
                        <button type="button" value="Buscar" name="filterSucces" onClick={this.handleFilters}>Buscar</button>
                        </div>
                        <div className="animalList"> {this.animals_list()} </div>
                        <Link to={`/formAnimal/${this.state.animals}`} >Insertar animal</Link>
                        <Link to={`/formRivia/${this.state.animals}`} >Insertar Rivia</Link>
        
                    </div>
                )
             }else{
                 return(
                    <div>
                        <h1>{this.state.filterSucces}</h1>
                        <button type="button" name="showFilterDiv" value="false" onClick={this.handleChanges}>Volver</button>
                    </div>
                 )
               
             }
 
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)
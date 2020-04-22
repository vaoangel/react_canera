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
    
    state = {animals :undefined}
    constructor(props){
        super(props)
        this.props.onLoad()
        this.animals_list = this.animals_list.bind(this)
    }  
    getSnapshotBeforeUpdate(prevProps, prevState) {
        if (prevProps.fetch_items != this.props.fetch_items) {
            console.log(this.props.fetch_items);
            
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
    animals_list(){
        // console.log(this.props);
        
        let html =[]
        console.log(this.state.animals);
        return this.state.animals
    }

    render(){   
        // console.log(this.state);
             
        return(
            <div>
                <h1>{this.animals_list()}</h1>
                <h1>asd</h1>
                <Link to={`/formAnimal/${this.state.animals}`} >Insertar animal</Link>
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)
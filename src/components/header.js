import React from 'react'
import {  Link } from 'react-router-dom';
class Header extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <div id="button">
                    <Link to='/' >Home</Link>
                </div>
                <div id="button">
                <Link to={`/formAnimal/${'false'}`} >Insertar animal</Link>
                </div>
                <div id="button">
                    <Link to='/formRivia' >Insertar Registre Rivia</Link>
                </div>
            </div>

        )
    }
}


export default Header
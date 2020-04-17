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
                    <Link to='/formAnimal' >Insertar animal</Link>
                </div>
            </div>

        )
    }
}


export default Header
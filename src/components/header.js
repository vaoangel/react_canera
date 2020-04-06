import React from 'react'
import {  Link } from 'react-router-dom';
class Header extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div id="button">
                <Link to='/formAnimal' >formAnimal</Link>
            </div>
        )
    }
}


export default Header
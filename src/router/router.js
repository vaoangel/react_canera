import React from 'react'
import { Route } from 'react-router-dom'
import {FitxaA,Home} from '../components/index'

const BaseRouter = () => {

    //Contiene todas las rutas possibles de la app
    return( 
        <div>
            <Route exact path="/formAnimal" component={FitxaA}/>
            <Route exact path="/" component={Home}/>
        </div>
    )
}
 
export default BaseRouter
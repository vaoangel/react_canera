import React from 'react'
import { Route } from 'react-router-dom'
import {FitxaA,Home,FormRivia} from '../components/index'

const BaseRouter = () => {

    //Contiene todas las rutas possibles de la app
    return( 
        <div>
            <Route exact path="/formAnimal/:updated" component={FitxaA}/>
            <Route exact path="/" component={Home}/>
            <Route exact path="/formRivia/:updated" component={FormRivia}/>
        </div>
    )
}
 
export default BaseRouter
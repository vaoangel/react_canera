import axios from 'axios'
let token = null
let API = axios.create({
    baseURL: `http://0.0.0.0:8000/`,
    headers: {
        'Authorization': token!==null ? `Token ${token}` : "",
    },
});

const request ={
    // del:  url => API.delete(url).then().catch(),
    post:(url, body) => API.post(url,body).then(function (data) {       
        return data.data
    }).catch((e)=>{
        console.log(e)
        console.log(url);
    }),
    get:  url => API.get(url).then(function (data){
        return new Promise((resolve,reject)=>{
            if(data.data!==undefined){
                   resolve(data.data)
                   
            }else{
                reject("error")
            }
       })

    }).catch(),
    put: (url,body) => API.put(url,body).then((data)=>{
        console.log(data);
        
        return data
    }).catch((e)=>{
        console.log(e)
        console.log(url);
    })
}


const AnimalsApi ={
    InsertAnimal: (data) =>{
        console.log(data)
        return data
        // request.post('UrlQuanJuananVullga', {
        //     "model": {"campo": data, "campo": "data"}
        // })
    },
    UpdateAnimal: (data) =>{
        // console.log(data)
        return data
        // request.put('UrlQuanJuananVullga', {
        //     "model": {"campo": data, "campo": "data"}
        // })
    },
    GetAll:()=>{
        const info =    request.get('animals/tblanimals/').then(function(data){
            // console.log(data.results);
            
            return data
        }).catch(function(error){
            return error
        })
     
        return info
    },

    GetOne: (data) =>{
        var animals = Array("test1GetOne,","Test2GetOne")
        console.log(data);
        
        // request.get('UrlQuanJuananFajaFaena')
        return animals
    }

    
}

const RiviaApi={
    InsertRivia: (data) =>{
        console.log(data)
        return data
        // request.post('UrlQuanJuananVullga', {
        //     "model": {"campo": data, "campo": "data"}
        // })
    },
    UpdateRivia: (data) =>{
        // console.log(data)
        return data
        // request.put('UrlQuanJuananVullga', {
        //     "model": {"campo": data, "campo": "data"}
        // })
    },

    GetOne: (data) =>{
        var rivia = Array("test1GetOne,","Test2GetOne")
        console.log(data);
        
        // request.get('UrlQuanJuananFajaFaena')
        return rivia
    }
}

export {
    AnimalsApi,
    RiviaApi
}
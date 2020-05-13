import axios from 'axios'
let token = null
let API = axios.create({
    baseURL: `http://localhost:8000/`,
    headers: {
        'Authorization': token!==null ? `Token ${token}` : "",
    },
});

const request ={
    // del:  url => API.delete(url).then().catch(),
    post:(url, body) => API.post(url,body).then(function (data) {       
        return new Promise((resolve,reject)=>{
            console.log(data);
            
            if(data!==undefined){
                   resolve(data.data)
                   
            }else{
                reject("error")
            }
       })
    
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
        return new Promise((resolve,reject)=>{
            console.log(data);
            
            if(data!==undefined){
                   resolve(data.data)
                   
            }else{
                reject("error")
            }
       })
    }).catch((e)=>{
        console.log(e)
        console.log(url);
    })
}


const AnimalsApi ={
    InsertAnimal: (data) =>{
        console.log(data)

        const info = request.post('tblanimals/', {"animals":data}).then(function(data){
            console.log(data);
            
        return data
    })
    return info
    },
    UpdateAnimal: (data) =>{
        console.log(data)

        const info = request.put('tblanimals/update/?id='+data.IDanimals, {"IDanimals":data.IDanimals,"animals":data.animals}).then(function(data){
            console.log(data);
            
        return data
    })
    return info
    },
    GetAll:()=>{
        const info = request.get('tblanimals/?limit=10&offset=0&orderby=id"').then(function(data){
            // console.log(data);
            
            return data
        }).catch(function(error){
            return error
        })
     
        return info
    },

    // GetOne: (data) =>{
    //     var animals = Array("test1GetOne,","Test2GetOne")
    //     console.log(data);
        
    //     // request.get('UrlQuanJuananFajaFaena')
    //     return animals
    // },

    GetMunicipis:()=>{
        const info = request.get('municipis/tblMunicipi/?limit=100&offset=100"').then(function(data){
            // console.log(data);
            
            return data.results
        }).catch(function(error){
            return error
        })
     
        return info
    },
    GetProvincies:()=>{
        const info = request.get('municipis/tblProvi/?limit=100&offset=100"').then(function(data){
            // console.log(data);
            
            return data.results
        }).catch(function(error){
            return error
        })
     
        return info
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
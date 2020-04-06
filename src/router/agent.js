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
        return data
    }).catch(),
    patch: (url,body) => API.patch(url,body).then((data)=>{
        console.log(data);
        
        return data
    })
}


const Animals ={
    InsertAnimal: (data) =>{
        request.post('UrlQuanJuananVullga', {
            "model": {"campo": data, "campo": "data"}
        })
    }

    
}
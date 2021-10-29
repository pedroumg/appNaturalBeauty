import axios from "axios";
export default {
    state:{
        allitems:[],
        token:false
    },
    mutations:{
        setProductos(state,items){
            state.allitems=items
        },
        setTokenUser(state,token){
            state.token = token
        }
    },
    actions:{
        async setProductos({commit,rootState,getters}){           
           await axios.get(`${rootState.urlapi}/articulos`,getters.getTokenUser).then(response=>{
                    commit('setProductos',response.data)  
              }).catch(err=>{console.error(err)});
        },
        async updateStockVenta({rootState,getters},idventa){
            await axios.put(`${rootState.urlapi}/articulos/updatestock/${idventa}`,{},getters.getTokenUser).then(response=>{
                console.log(response)
            }) 
        },
        setTokenUser({commit},token){
            commit('setTokenUser',token)
        }
    },
    getters:{
        getAllProductos(state){
            //Si existe un registro retornamos el arreglo
            if(state.allitems[0])return state.allitems
            //Sino existen registros retornamos un array vacio
            return []
        },
        getProductosActivos(state){
            return state.allitems.filter(item=>item.estado=='Activo')
        },
        getTokenUser(state){
            if(!state.token){
                return {headers:{'Authorization':'Bearer '+JSON.parse(sessionStorage.getItem('token')) }}
            }else{

                return {headers:{'Authorization':'Bearer '+state.token}};
            }

            
        }
    }
}
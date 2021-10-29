import axios from "axios";
export default {
    state:{
        allitems:[],
    },
    mutations:{
        setAllItems(state,items){
            state.allitems=items
        }
    },
    actions:{
        async setAllCategorias({commit,rootState,getters}){
           await axios.get(`${rootState.urlapi}/categorias`,getters.getTokenUser).then(res=>{
                    commit("setAllItems",res.data)
              }).catch(err=>{console.error(err)});
        }
    },
    getters:{
        getAllCategorias(state){
            return state.allitems
        },
        getCategoriasActivas(state){
            return state.allitems.filter(item=>item.estado=='Activo')
        }
    }
}
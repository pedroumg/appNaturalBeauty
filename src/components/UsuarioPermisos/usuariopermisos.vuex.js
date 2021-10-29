import axios from 'axios'
export default{
    state:{
        itemspermisos:[],
        permisosasignados:[],
        encontrado:false,
    },
    mutations:{
        setPermisos(state,items){
            state.itemspermisos = items
        },
        setUsuarioPermisos(state,usuariopermisos){
            state.permisosasignados =usuariopermisos
        }
    },
    actions:{
        async setPermisos({commit,rootState,getters}){
          await  axios.get(`${rootState.urlapi}/usuariopermisos`,getters.getTokenUser).then(res=>{
             //   console.log(res.data)
                commit("setPermisos",res.data)
            })
        },
        async setUsuarioPermisos({commit,rootState,getters},username){
           await axios.get(`${rootState.urlapi}/usuarios/permisos/${username}`,getters.getTokenUser).then(res=>{
                commit("setUsuarioPermisos",res.data)
            })
        }
    },
    getters:{
        getPermisos(state){
            return state.itemspermisos
        },
        getOnePermiso: (state) => (item) =>{
            return state.itemspermisos.find(element => element.idpermiso == item.idpermiso)
        },
        getPermisosAsignados(state){
            return state.permisosasignados
        }
    }
}
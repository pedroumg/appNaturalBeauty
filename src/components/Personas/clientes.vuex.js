import axios from "axios";
import Swal from "sweetalert2";

export default {
    state:{
        itemsclientes:[],
        itemselected:false,
    },
    mutations:{
        setClientes(state,clientes){
            state.itemsclientes=clientes
        },
        setItemSelected(state,cliente){
            state.itemselected=cliente
        }
    },
    actions:{
       async setClientes({commit,rootState,getters}){
           await axios.get(`${rootState.urlapi}/personas/`,getters.getTokenUser).then(response=>{
                commit("setClientes",response.data)
              }).catch(err=>{console.error(err)});
        },
       async createCliente({rootState,getters},item){
           await axios.post(`${rootState.urlapi}/personas`,item,getters.getTokenUser)
            .then(res => {
                if(res.status==201){
                    Swal.fire({
                        icon: "success",
                        title: "Realizado",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                 return res.data     
                }else{
                    Swal.fire({
                        icon: "error",
                        title: "Ocurrio un error al crear el registro",                      
                      });
                }
              
            });
        },
        setItemSelected({commit},cliente){
            commit("setItemSelected",cliente)
        }
    },
    getters:{
        getAllClientes(state){
            return state.itemsclientes
        },
        getClientes: (state) => (nit) => {
            return state.itemsclientes.find(elemento=>elemento.nit==nit)
        }
    }
}
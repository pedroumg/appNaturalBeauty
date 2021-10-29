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
        async setAllVentas({commit,rootState,getters}){
           await axios.get(`${rootState.urlapi}/ventas`,getters.getTokenUser).then(res=>{
                commit("setAllItems",res.data)
              }).catch(err=>{console.error(err)});
        },
        async createVenta({rootState,getters},item){
            const data = await axios.post(`${rootState.urlapi}/ventas`,item,getters.getTokenUser)
            return data
        },
        printDocument({getters},idventa){
            window.open(`${getters.getUrlProd}/reportes/factura.php?id=${idventa}`,"blank")
        }
    },
    getters:{
        getAllVentas(state){
            return state.allitems
        },
    }
}
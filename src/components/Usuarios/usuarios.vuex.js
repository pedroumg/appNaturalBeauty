import axios from 'axios'
export default{
    state:{
        allitems:[],
    },
    mutations:{
        setAllUser(state,data){
            state.allitems=data;
        }
    },
    actions:{
        async setAllUser({commit,rootState,getters}){
            await axios.get(`${rootState.urlapi}/usuarios`,getters.getTokenUser).then(res =>{
                commit('setAllUser',res.data)
            })
            
        }
    },
    getters:{
        getAllUsers(state){
            return state.allitems;
        }
    }
}
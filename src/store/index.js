import Vue from 'vue'
import Vuex from 'vuex'
import clientes from '../components/Personas/clientes.vuex'
import Auth from '../components/Auth/auth.vuex'
import Categorias from '../components/Categorias/categoria.vuex'
import Productos from '../components/Productos/productos.vuex'
import Ventas from '../components/Ventas/ventas.vuex'
import Usuarios from '../components/Usuarios/usuarios.vuex'
import UsuarioPermisos from '../components/UsuarioPermisos/usuariopermisos.vuex'
import Establecimiento from './establecimiento'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navigation:true,
    productos:[],
    auth:false,
    urlprod:'https://naturalbeauty.microsystems.com.gt',
    urlapi:'https://naturalbeauty.microsystems.com.gt/api/v1'
    //urlapi:'https://marmolerianicole.microsystems.com.gt/api/v1'
  },
  //Las mutations sirven para asignarle un valor a las variables del state
  mutations: {
    setAuth(state,value){
      state.auth = value
    },
    setNavigation(state){
      state.navigation=!state.navigation
    }
  },
  //Las actions realizan acciones de PUT, GET, POST y envian datos a las mutations con un commit
  actions: {
    autenticar({commit}){
      commit("setAuth",true)
    },
    setNavigation({commit}){
      commit("setNavigation")
    }
  },
  //Los getters son como el computed de los componentes
  getters:{
    getNavigation(state){
      return state.navigation
    },
    getUrlApi(state){
      return state.urlapi;
    },
    getUrlProd(state){
      return state.urlprod;
    }
    
  },
  modules: {
    clientes,UsuarioPermisos,Establecimiento,Auth,Categorias,Productos,
    Ventas,Usuarios
  }
})

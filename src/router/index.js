import Vue from 'vue'
import vuex from '../store/index'
import VueRouter from 'vue-router'
import LoginUser from '@/components/Auth/LoginUser.vue'
import Categorias from '../components/Categorias/Categorias.vue'
import Clientes from '../components/Clientes/Clientes.vue'
import Proveedores from '../components/Proveedores/Proveedores.vue'
import Productos from '../components/Productos/Productos.vue'
import Almacen from '../components/Almacen.vue'
import Usuarios from '../components/Usuarios/Usuarios.vue'
import Ventas from '../components/Ventas/Ventas.vue'
import ReporteVentas from '../components/Reportes.vue'
import POS from '../components/Ventas/PuntodeVenta.vue'
import UsuarioPermisos from '../components/UsuarioPermisos/UsuarioPermisos.vue'
import Profile from '../components/UsuarioPerfil.vue'

Vue.use(VueRouter)
const router = new VueRouter({ 
  mode: 'history',
  routes : [
    {
      path: '*',
      redirect:'/login'
    },
  {
    path: '/',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'login',
    component:LoginUser
  },
  {
    path: '/categorias',
    name: 'Categorias',
    component:Categorias,
    meta:{autenticado:true}, 
  },
  {
    path: '/almacen',
    name: 'Almacen',
    component:Almacen,
    meta:{autenticado:true},
  },
  {
    path: '/productos',
    name: 'Productos',
    component:Productos,
    meta:{autenticado:true},   
  },
  {
    path: '/ventas',
    name: 'Ventas',
    component:Ventas,
    meta:{autenticado:true},   
  },
  {
    path: '/clientes',
    name: 'Clientes',
    component:Clientes,
    meta:{autenticado:true},   
  },
  {
    path: '/proveedores',
    name: 'Proveedores',
    component:Proveedores,
    meta:{autenticado:true},   
  },
  {
    path: '/usuarios',
    name: 'Usuarios',
    component:Usuarios,
    meta:{autenticado:true},   
  },
  {
    path: '/puntodeventa',
    name: 'Puntodeventa',
    component:POS,
    meta:{autenticado:true},   
  },
  {
    path: '/permisos',
    name: 'UsuarioPermisos',
    component:UsuarioPermisos,
    meta:{autenticado:true},   
  },
  {
    path: '/user/profile',
    name: 'Profile',
    component:Profile,
    meta:{autenticado:true},   
  },
  {
    path: '/reporte/ventas',
    name: 'ReporteVentas',
    component:ReporteVentas,
    meta:{autenticado:true},   
  }
  
],

})


router.beforeEach((to, from, next) => {
  //Obtenemos la autenticacion del getter
  let autenticado = vuex.getters.getAutenticado
  //Verificamos que la ruta este protegida
  let autorizacion = to.matched.some(record=> record.meta.autenticado)
  //Si tiene autorizacion per no esta autenticado lo enviamos a login
  if(!autenticado && autorizacion){
    next({ path: '/login' })
    //Si esta autenticado pero no tiene accesso a esa ruta lo regresamos a productos
  }else if(autenticado && !autorizacion){ 
    next({ path: '/productos' })
  }else{
    next()
  }
  
})

export default router

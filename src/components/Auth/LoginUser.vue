<template >
    <!-- Login 17 start -->
<div class="login-17">
    <div class="contenedor">
        <div class="col-md-12 pad-0">
            <div class="row login-box-6">
                <div class="col-lg-5 col-md-12 col-sm-12 col-pad-0 bg-img align-self-center none-992">
                    
                    <a href="login-17.html">
                        <img src="@/assets/loginfel.png" width="70%" alt="logo"> 
                    </a>
                    <p>Sistema de Facturación</p>
                    
                </div>
                <div class="col-lg-7 col-md-12 col-sm-12 col-pad-0 align-self-center">
                    <div class="login-inner-form">
                        <div class="details" v-show="spinner">
                            <div class="spinner-border text-primary" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                            <br>
                                <span>Verificando clave y contraseña...</span>
                        </div>
                        <div class="details" v-show="!spinner">
                            <h2>INGRESO</h2>
                            <form v-on:submit.prevent="autenticacion"> 
                                <div class="form-group">
                                    <input type="text" v-model="user.usuario" class="input-text" placeholder="Usuario" autofocus>
                                </div>
                                <div class="form-group">
                                    <input type="password" v-model="user.password"  class="input-text" placeholder="Contraseña" autocomplete="false">
                                </div>
                                
                                <div class="form-group">
                                    <button type="submit" class="btn-md btn-theme btn-block">ENTRAR</button>
                                </div>
                            </form>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Login 17 end -->
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
//import {Cryptr} from 'cryptr'
//require('@/assets/styles/style.css')
export default {
    name:'LoginUser',
      
    data: () => ({
    //Login
    spinner:false, 
    user:{
        usuario:'',
        password:'',
    }
    }),
    computed:{
        urlApi(){
           return this.$store.getters.getUrlApi
        }
    },
    methods:{
      autenticacion(){

          this.spinner=true
         axios.post(`${this.urlApi}/auth/login`,this.user).then(res=>{
             if(res.status==201){
                this.spinner=false
                this.$store.dispatch('setTokenUser',res.data.accessToken)
                this.$store.dispatch("postAutenticacion",res.data)
                this.$router.push(res.data.usuario.usuariopermiso[0].path)
             }else{
                 this.notificationSwal('error','Error al Ingresar','Verifique que el usuario y contraseña sean correctos')
                 this.spinner=false
                 
             }
           

          }).catch(error=> {
              this.spinner=false
               this.notificationSwal('error','Error al Ingresar','Verifique que el usuario y contraseña sean correctos')
               console.log(error)
            })

        },
        notificationSwal(icon,title,text){
            Swal.fire({
            icon: icon,
            title: title,
            text: text,
            })
        }
    }
}
</script>
<style scoped src="@/assets/css/style.css"></style>
    

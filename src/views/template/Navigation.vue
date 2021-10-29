<template>
<div>
        <v-navigation-drawer
      :value="getNavigation"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
    
          <v-list>
            <!-- avatar -->
            <v-card
              class="mx-auto"
              max-width="434"
              tile
            >
              <v-img
                height="100%"
                 src="https://picsum.photos/510/300?random?blur=5"
              >
                <v-row align="end" class="fill-height">
                  
                  <v-col class="py-0">
                    <v-list-item color="rgba(0, 0, 0, .4)" dark>
                      <v-list-item-content>
                        <v-list-item-title class="title">{{getUsuario.usuario.nombre +' '+getUsuario.usuario.apellidos}}</v-list-item-title>
                        <v-list-item-subtitle>{{getUsuario.usuario.usuario}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col class="text-center">
                      <v-btn depressed color="primary" @click="logOut"><v-icon>mdi-account-arrow-left</v-icon>Cerrar sesión</v-btn>
                  </v-col>
                  
                </v-row>
                
              </v-img>
            </v-card>
          </v-list>

          <v-divider></v-divider>

        
   <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-list>
      <v-list-item-group
        mandatory
        dense
        color="indigo"
      >
        <v-list-item
          v-for="(item, i) in usuarioPermisos"
          :key="i"
          @click="menu(item.path)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icono"></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="item.nombre"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>

        </v-navigation-drawer>

</div>    
</template>



<script>
import Swal from 'sweetalert2'

export default {
  name:'Navigation',
  data() {
    return {
      items: [],
    }
  },
  computed:{
    getNavigation(){
      return this.$store.getters.getNavigation
    },
    getUsuario(){
      
      return this.$store.getters.usuarioAuth
    },
    usuarioPermisos(){
      return this.$store.getters.usuarioPermisos;
    },
    getUrlApi(){
      return this.$store.getters.getUrlApi
    },
    getTokenUser(){
      return this.$store.getters.getTokenUser
    }
  },
  methods:{  
       menu(path){
         const rutaActual = this.$route.path;
          //Validamos que se pidan rutas diferentes
         if(rutaActual !==path){this.$router.push(path)}   
       },
       logOut(){
         this.$store.dispatch('updateAuth',false)
         this.$router.push('/login')
       },
       //Notificaciones Swal
      doneSwal(message){
        Swal.fire({
          icon: 'success',
          title: message,
          showConfirmButton: false,
          timer: 1500
        })
      },
      errorSwal(message){
        Swal.fire({
          icon: 'error',
          title: message,        
        })
      }
    }
    
}
</script>
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .9;
  position: absolute;
  width: 100%;
}

.app-sidebar__overlay {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 9;
  }
</style>
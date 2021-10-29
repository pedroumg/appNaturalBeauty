<template>
<div id="main">
    <div v-if="estadoAuth">
      <v-app>
          <NavBar/>
         <Navigation/>
        <v-main>
          <v-container fluid>         
          <router-view/>
          </v-container>
        </v-main>
        
      </v-app>
    </div>
    <div id="salida" v-else>
      
            <LoginUser/>
         
      
    </div>
</div>
</template>

<script>
import LoginUser from './components/Auth/LoginUser';
import NavBar from '@/views/template/NavBar.vue'
import Navigation from '@/views/template/Navigation.vue'
import moment from 'moment-timezone'
moment.tz.setDefault('America/Guatemala')
export default {
  name: 'App',

  components: {
    LoginUser,
    NavBar,
    Navigation
  },

  data: () => ({
    //
  }),
computed:{
    estadoAuth(){
      return this.$store.getters.getAutenticado
    }
}
};
</script>
<style>
.v-main{
  background:rgb(245, 245, 245);
}
</style>
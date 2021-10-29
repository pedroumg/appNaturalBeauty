<template>
  
     <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
        @click="setNavigation"
      >
        <span class="hidden-sm-and-down">FACTURACION</span>
          <v-divider class="mx-4" vertical></v-divider>
        <v-icon>mdi-menu-open</v-icon>
      </v-toolbar-title>
      
      <v-spacer></v-spacer>
      <p>Guatemala, {{fechahora}}</p>
      <!-- MENU USUARIO -->
      <!-- <v-row justify="end">
      <v-menu
        bottom
        min-width="200px"
        rounded
        offset-y
        
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            x-large           
            v-on="on"
          >
            <v-avatar
              color="amber"
              size="48"
            >
              <v-icon>mdi-account</v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar
                color="amber"
              >
                 <v-icon>mdi-account</v-icon>
              </v-avatar>
              <h4>PEDRO RAMIREZ</h4>
              <p class="text-caption mt-1">
                pedroumg2015@gmail.com
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                text
              >
                Edit Account
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                text
              >
                Cerrar Sesion
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-row> -->

    </v-app-bar>

</template>

<script>
import moment from 'moment'

export default {
  name:'NavBar',
  data:()=>({
  fechahora:moment().locale('es').format('MMMM Do YYYY, h:mm:ss a')
  }),
  created () {
    this.fechaHoraActual()
  },
  methods: {
    fechaHoraActual(){
      setInterval(() => {
        this.fechahora = moment().locale('es').format('DD MMMM YYYY - h:mm:ss a');
      },1000);
    },
    setNavigation(){
      this.$store.dispatch("setNavigation",false)
    }
  },
}
</script>

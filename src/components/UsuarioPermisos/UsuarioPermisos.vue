<template>

  <v-data-table
    :headers="headers"
    :items="getPermisos"
    :search="search"
    sort-by="nombre"
    class="elevation-1"
  >
    <template v-slot:top >
      <v-toolbar flat color="white" >
        <v-toolbar-title>{{title}}</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Buscar..."
        single-line
        hide-details
      ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >NUEVO</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="editedItem.nombre" label="Nombre"></v-text-field>
                  </v-col>   
                  <v-col cols="12">
                    <v-text-field v-model="editedItem.icono" label="Icono"></v-text-field>
                  </v-col>  
                  <v-col cols="12">
                    <v-text-field v-model="editedItem.path" label="Path(Ruta)"></v-text-field>
                  </v-col>                                                                       
                </v-row>                
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2"  @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary">Sin Datos</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
     data: () => ({
      title:'MODULOS SISTEMA',
      search:'',
      estado:false,
      dialog: false,
      headers: [       
        { text: 'Nombre', value: 'nombre' },
        { text: 'icono',align: 'center', value: 'icono' },      
        { text: 'path',align: 'center', value: 'path',sortable: false, },
        { text: 'Actions',align: 'center', value: 'actions', sortable: false },
      ],
      itemslist: [],
      editedIndex: -1,
      editedItem: {
        nombre: '',
        icono: '',
        path: '',
      },
      defaultItem: {
        nombre: '',
        icono: '',
        path: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Registro' : 'Editar Registro'
      },
      getPermisos(){
          return this.$store.getters.getPermisos
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
        this.$store.dispatch("postPermisos")
    },

    methods: {
        init(){
            this.$store.dispatch("postPermisos")
        },
      editItem (item) {
          const permiso = this.$store.getters.getOnePermiso(item)
          this.editedIndex=permiso.idpermiso
          this.editedItem = Object.assign({}, permiso)
          this.dialog = true
      },

      deleteItem (item) {
        Swal.fire({
          title: 'Esta Seguro?',
          text: "El registro será eliminado!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, Eliminarlo!',
          cancelButtonText: 'Cancelar!'
        }).then((result) => {
          if (result.isConfirmed) {
            //Procedimiento para eliminarlo
            axios.delete(`${this.$store.state.urlapi}/permisos/${item.idpermiso}`).then(()=>{        
              this.init()        
              this.alertDone()        
            }).catch(res=>{ 
              console.log('Entro aqui :)))')
              console.error(res)
            })
          }
        })
       
              
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {       
          this.putItem()
        } else {
          this.postItem()
        }
        this.close()
      },
      postItem(){
        axios.post(`${this.$store.state.urlapi}/permisos/`,this.editedItem).then(()=>{    
            this.init()             
            this.alertDone('¡Permiso Creado!')       
        })
      },
      putItem(){       
        const formData={
          nombre:this.editedItem.nombre,
          icono:this.editedItem.icono,
          path:this.editedItem.path,
        }      
       axios.put(`${this.$store.state.urlapi}/permisos/${this.editedItem.idpermiso}`,formData).then(()=>{     
          this.init()     
          this.alertDone('Cambios Realizados')
               
        })
        
      },

      //Notificaciones Swal
      alertDone(message){
        Swal.fire({
          icon: 'success',
          title: message,
          showConfirmButton: false,
          timer: 1500
        })
      }
    },

    
}
</script>
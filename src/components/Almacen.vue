<template>

  <v-data-table
    :headers="headers"
    :items="itemslist"
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
                    <v-text-field v-model="editedItem.establecimiento" label="Almacen"></v-text-field>
                  </v-col>                  
                  <v-col cols="12">
                    <v-switch
                      v-model="editedItem.condicion"
                      :label="editedItem.condicion ==1 ? 'Activado' :'Desactivado'"
                      color="green"
                      :value="editedItem.condicion ==1 ? editedItem.condicion=1 : editedItem.condicion=0"
                      hide-details                   
                    ></v-switch>              
                  </v-col>                  
                  <v-col cols="12">
                    <v-textarea outlined v-model="editedItem.descripcion" label="Descripcion"></v-textarea>
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
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Recargar</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
     name:'Almacen',
     data: () => ({
      title:'Listado de Almacenes',
      search:'',
      estado:false,
      dialog: false,
      headers: [       
        { text: 'Almacen', value: 'establecimiento' },
        { text: 'Nit',align: 'center', value: 'nit' },      
        { text: 'Estado',align: 'center', value: 'estado',sortable: false, },
        { text: 'Actions',align: 'center', value: 'actions', sortable: false },
      ],
      itemslist: [],
      editedIndex: -1,
      editedItem: {
        establecimiento: '',
        nit: '',
        condicion:1
      },
      defaultItem: {
        establecimiento: '',
        nit: '',
        condicion:1
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Registro' : 'Editar Registro'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        axios.get(`${this.$store.state.urlapi}/establecimientos`).then(response=>{
          this.itemslist = response.data
        })        
      }, 
      editItem (item) {
        this.editedIndex = this.itemslist.indexOf(item)
        this.editedItem = Object.assign({}, item)
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
            axios.put(`${this.$store.state.urlapi}/establecimientos/${item.idcategoria}`,{condicion:2}).then(()=>{                
              this.alertDone()
              this.initialize()          
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
        axios.post(`${this.$store.state.urlapi}/establecimientos/`,this.editedItem).then(()=>{                
          this.alertDone()
          this.initialize()          
        })
      },
      putItem(){       
        const formData={
          nombre:this.editedItem.nombre,
          descripcion:this.editedItem.descripcion,
          condicion:this.editedItem.condicion,
        }      
       axios.put(`${this.$store.state.urlapi}/establecimientos/${this.editedItem.idcategoria}`,formData).then(()=>{         
          this.alertDone()
          this.initialize()          
        })
        
      },

      //Notificaciones Swal
      alertDone(){
        Swal.fire({
          icon: 'success',
          title: 'Realizado',
          showConfirmButton: false,
          timer: 1500
        })
      }
    },

    
}
</script>
<template>

  <v-data-table
    :headers="headers"
    :items="getItems"
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
      <v-icon small  class="mr-2"  @click="editItem(item)"  v-if="item.estado == 'Activo'" >
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item.idcategoria)" v-if="item.estado == 'Activo'">
        mdi-delete
      </v-icon>
      <v-btn color="red" small v-if="item.estado !== 'Activo'" @click="cambiarestado('Activo',item.idcategoria)" x-small dark>
        Activar
      </v-btn>
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
     data: () => ({
      title:'CATEGORIAS',
      search:'',
      estado:false,
      dialog: false,
      headers: [       
        { text: 'Nombre', value: 'nombre' },
        { text: 'Descripcion',align: 'center', value: 'descripcion' },      
        { text: 'Estado',align: 'center', value: 'estado',sortable: false, },
        { text: 'Actions',align: 'center', value: 'actions', sortable: false },
      ],
      itemslist: [],
      editedIndex: -1,
      editedItem: {
        nombre: '',
        descripcion: '',
        condicion: 1,
      },
      defaultItem: {
        nombre: '',
        descripcion: '',
        condicion: 1,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Registro' : 'Editar Registro'
      },
      getItems(){
        return this.$store.getters.getAllCategorias
      },
      getTokenUser(){
        return this.$store.getters.getTokenUser
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    async created () {
      await this.initialize()
    },

    methods: {
      async initialize () {
       await this.$store.dispatch('setAllCategorias')       
      }, 
      editItem (item) {
        this.editedIndex = this.getItems.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (idcategoria) {
        
        Swal.fire({
          title: 'Esta Seguro?',
          text: "El registro será desactivado!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, Desactivar!',
          cancelButtonText: 'Cancelar!'
        }).then((result) => {
          if (result.isConfirmed) {
            //Procedimiento para eliminarlo
            this.cambiarestado('Desactivado',idcategoria)
          }
        })
        
      },
      cambiarestado(estado,idcategoria) {
        axios.put(`${this.$store.state.urlapi}/categorias/${idcategoria}`,{estado:estado},this.getTokenUser)
          .then(() => {
            this.alertDone();
            this.initialize();
          });
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
        axios.post(`${this.$store.state.urlapi}/categorias/`,this.editedItem,this.getTokenUser).then(()=>{                
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
       axios.put(`${this.$store.state.urlapi}/categorias/${this.editedItem.idcategoria}`,formData,this.getTokenUser).then(()=>{         
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
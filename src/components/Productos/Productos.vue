<template >
<div id="pdf">
  <!-- <v-bottom-navigation
    background-color="blue"
    color="white"
    horizontal
  >
    <v-btn>
      <span>Productos</span>

      <v-icon>mdi-package-variant-closed</v-icon>
    </v-btn>

    <v-btn to="/almacen">
      <span>Bodegas</span>

      <v-icon>mdi-hexagon-slice-6</v-icon>
    </v-btn>

    <v-btn>
      <span>Movimientos</span>

      <v-icon>mdi-file-replace-outline</v-icon>
    </v-btn>
  </v-bottom-navigation> -->

  <v-data-table
    :headers="headers"
    :items="getAllItems"
    :search="search"
    class="elevation-1"
  >
    <template v-slot:top >
      <v-toolbar flat color="white" >
        <v-toolbar-title>PRODUCTOS</v-toolbar-title>
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
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.nombre" label="Nombre"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.codigo" label="Codigo"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4" md="4">
                    <v-text-field v-model="editedItem.preciocompra" label="Precio Compra" prefix="Q " @change="parsedata"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4" md="4">
                    <v-text-field v-model="editedItem.preciominimo" label="Precio Minimo" prefix="Q " @change="parsedata"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4" md="4">
                    <v-text-field v-model="editedItem.preciosugerido" label="Precio Sugerido" prefix="Q " @change="parsedata"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4" md="4">
                    <v-text-field v-model="editedItem.stockminimo" label="Stock Minimo" type="number" @change="parsedata"></v-text-field>
                  </v-col> 
                  <v-col cols="12" sm="4" md="4">
                    <v-text-field v-model="editedItem.stockactual" label="Stock Actual" type="number" @change="parsedata"></v-text-field>
                  </v-col>
                  <!--                 
                  <v-col cols="12" sm="4" md="4">
                    <v-select  v-model="editedItem.tipo" :items="itemstipo" label="Tipo"></v-select>
                  </v-col>
                  
                  <v-col cols="12">
                    <v-switch
                      v-model="editedItem.estado"
                      :label="editedItem.estado"
                      color="green"
                      :value="editedItem.estado =='Activo' ? editedItem.estado='Activo' : editedItem.estado='Desactivado' "
                      hide-details                   
                    ></v-switch>              
                  </v-col> 
                  -->
                  <v-col cols="12">
                    <v-textarea outlined v-model="editedItem.descripcion" label="Descripcion"></v-textarea>
                  </v-col>                 
                            
                </v-row>
                <v-row>
                    <v-autocomplete  v-model="editedItem.idcategoria" :items="getCategoriasActivas" outlined  clearable hide-selected item-text="nombre" item-value="idcategoria" label="Seleccione Categoria" >
                      </v-autocomplete>
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
      <v-btn color="green" class="ma-2" @click="print">Imprimir</v-btn>
    </template>
    <template v-slot:[`item.tipo`]="{ item }">
      <p v-text="item.tipo"></p>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small  class="mr-2"  @click="editItem(item)"  v-if="item.estado == 'Activo'" >
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item.idarticulo)" v-if="item.estado == 'Activo'">
        mdi-delete
      </v-icon>
      <v-btn color="red" small v-if="item.estado !== 'Activo'" @click="cambiarestado('Activo',item.idarticulo)" x-small dark>
        Activar
      </v-btn>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Recargar</v-btn>
    </template>
  </v-data-table>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
     name:'Productos',  
     data: () => ({
      search:'',
      dialog: false,
      headers: [       
        { text: 'Cod.',align: 'center', value: 'codigo' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Descripcion', value: 'descripcion' },
        { text: 'Stock Minimo',align: 'center', value: 'stockminimo' },
        { text: 'Stock Actual',align: 'center', value: 'stockactual' },
        { text: 'Precio Compra',align: 'center', value: 'preciocompra' },
        { text: 'Precio Sugerido',align: 'center', value: 'preciosugerido' },
        { text: 'Precio Minimo',align: 'center', value: 'preciominimo'},
        { text: 'Categoria', value: 'idcategoria.nombre' },
        { text: 'Estado',align: 'center', value: 'estado',sortable: false, },
        { text: 'Actions',align: 'center', value: 'actions', sortable: false },
      ],
      itemstipo:["Bien","Servicio"],
      itemscategorias:[],
      editedIndex: -1,
      editedItem: {
        codigo: '',
        nombre: '',
        descripcion: '',
        preciocompra:1,
        preciosugerido:1,
        preciominimo:1,
        imagen:'/demo.png',
        stockminimo: 1,
        stockactual: 1,
        idcategoria: 1,
      },
      defaultItem: {
        codigo: '',
        nombre: '',
        descripcion: '',
        preciocompra:1,
        preciosugerido:1,
        preciominimo:1,
        imagen:'/demo.png',
        stockminimo: 1,
        stockactual: 1,
        idcategoria: 1
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Registro' : 'Editar Registro'
      },
      getAllItems(){
        return this.$store.getters.getAllProductos
      },
      getCategoriasActivas(){
        return this.$store.getters.getCategoriasActivas
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
        await this.$store.dispatch('setProductos')      
      },
      parsedata(){      
        this.editedItem.preciocompra=parseFloat(this.editedItem.preciocompra)
        this.editedItem.preciosugerido=parseFloat(this.editedItem.preciosugerido)
        this.editedItem.preciominimo=parseFloat(this.editedItem.preciominimo)
        this.editedItem.stockminimo=parseInt(this.editedItem.stockminimo)
        this.editedItem.stockactual=parseInt(this.editedItem.stockactual)
        this.editedItem.idcategoria=parseInt(this.editedItem.idcategoria.idcategoria)
      },
      editItem (item) {
        this.editedIndex = this.getAllItems.indexOf(item);
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        this.parsedata() 
        
      },
      deleteItem (idarticulo) {
        
        Swal.fire({
          title: 'Esta Seguro?',
          text: "El registro será Desactivado!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, Desactivar!',
          cancelButtonText: 'Cancelar!'
        }).then((result) => {
          if (result.isConfirmed) {
            //Procedimiento para eliminarlo
            this.cambiarestado("Desactivado",idarticulo)
          }
        })
       
              
      },
      cambiarestado(estado,idarticulo) {
        axios.put(`${this.$store.state.urlapi}/articulos/${idarticulo}`,{estado:estado},this.getTokenUser)
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
        axios.post(`${this.$store.state.urlapi}/articulos`,this.editedItem,this.getTokenUser).then(()=>{                
          this.alertDone()
          this.initialize()          
        }).catch(err=> {this.alertError(), console.log(err)})
      },
      putItem(){     
       axios.put(`${this.$store.state.urlapi}/articulos/${this.editedItem.idarticulo}`,this.editedItem,this.getTokenUser).then(()=>{         
          this.alertDone()
          this.initialize()          
        })
        
      },
      print(){
        window.open("/reportes/inventarioprod.php","blank")
      },
      //Notificaciones Swal
      alertDone(){
        Swal.fire({
          icon: 'success',
          title: 'Realizado',
          showConfirmButton: false,
          timer: 1500
        })
      },
      alertError(){
        Swal.fire({
          icon: 'error',
          title: 'No pudo realizarse la solicitud',
          showConfirmButton: false,
          timer: 1500
        })
      }
    },

    
}
</script>
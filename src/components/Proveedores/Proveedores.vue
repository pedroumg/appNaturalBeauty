<template>
  <v-data-table
    :headers="headers"
    :items="getItems"
    :search="search"
    sort-by="nombre"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
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
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"
              >NUEVO</v-btn
            >
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="4" md="4">
                    <v-text-field
                      v-model="editedItem.nit"
                      label="Nit *"
                      @change="findClienteSat"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="8" md="8">
                    <v-text-field
                      v-model="editedItem.nombre"
                      label="Nombre *"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.direccion"
                      label="Direccion *"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4" md="4">
                    <v-text-field
                      v-model="editedItem.telefono"
                      label="Telefono"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="8" md="8">
                    <v-text-field
                      v-model="editedItem.email"
                      label="Correo"
                    ></v-text-field>
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
      <v-icon small @click="deleteItem(item.idpersona)" v-if="item.estado == 'Activo'">
        mdi-delete
      </v-icon>
      <v-btn color="red" small v-if="item.estado !== 'Activo'" @click="cambiarestado('Activo',item.idpersona)" x-small dark>
        Activar
      </v-btn>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Recargar</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import findClienteSat from '@/utils/buscarNit'

export default {
  data: () => ({
    title: "PROVEEDORES",
    search: "",
    estado: false,
    dialog: false,
    headers: [
      { text: "Nit", align: "center", value: "nit" },
      { text: "Nombre", value: "nombre" },
      { text: "Direccion", align: "center", value: "direccion" },
      { text: "Telefono", align: "center", value: "telefono" },
      { text: "Correo", align: "center", value: "email" },
      { text: "Estado", align: "center", value: "estado" },
      { text: "Actions", align: "center", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      nombre: "",
      nit: "",
      direccion: "",
      email: "",
      telefono: "",
      tipo:"Proveedor"
    },
    defaultItem: {
      nombre: "",
      nit: "",
      direccion: "",
      email: "",
      telefono: "",
      tipo:"Proveedor"
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Registro" : "Editar Registro";
    },
    getItems(){
        return this.$store.getters.getAllClientes
    },
    getTokenUser(){
      return this.$store.getters.getTokenUser
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  async created() {
   await this.initialize();
  },

  methods: {
    async initialize() {
      
      await this.$store.dispatch('setClientes','Proveedor')       
    },
    editItem(item) {
      this.editedIndex = this.getItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    async findClienteSat(){
      if(this.editedIndex<0){
      const cliente = await findClienteSat(this.editedItem.nit) ;
      this.editedItem.nombre = cliente
      }
    
    },
    deleteItem(idpersona) {
      Swal.fire({
        title: "Esta Seguro?",
        text: "El registro será Desactivado!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, Desactivarlo!",
        cancelButtonText: "Cancelar!",
      }).then((result) => {
        if (result.isConfirmed) {
          //Procedimiento para eliminarlo
           this.cambiarestado("Desactivado",idpersona)
        }
      });
    },
    cambiarestado(estado,idpersona) {
      axios.put(`${this.$store.state.urlapi}/personas/${idpersona}`,{estado:estado},this.getTokenUser)
        .then(() => {
          this.alertDone();
          this.initialize();
        });
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      if (this.editedIndex > -1) {
        await this.putItem();
      } else {
        await this.postItem();
      }
      await this.initialize(); 
      this.close();
    },
    async postItem() {
      await this.$store.dispatch('createCliente',this.editedItem) 
    },
    async putItem() {
      await axios
        .put(
          `${this.$store.state.urlapi}/personas/${this.editedItem.idpersona}`,
          this.editedItem,this.getTokenUser
        )
        .then(() => {
          this.alertDone();
        });
    },

    //Notificaciones Swal
    alertDone() {
      Swal.fire({
        icon: "success",
        title: "Realizado",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  },
};
</script>

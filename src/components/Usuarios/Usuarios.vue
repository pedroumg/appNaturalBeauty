<template>
  <div>
  <v-data-table
    :headers="headers"
    :items="getAllUsers"
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
                  <v-col cols="6">
                    <v-text-field v-model="editedItem.nombre" label="Nombre"></v-text-field>
                  </v-col>
                  <v-col cols="6"> 
                      <v-text-field v-model="editedItem.apellidos" label="Apellidos"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6"> 
                      <v-text-field v-model="editedItem.usuario" label="Usuario"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6"> 
                      <v-text-field v-model="editedItem.password" label="Contraseña"></v-text-field>
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
      <v-icon class="mr-2" color="blue" v-if="item.estado == 'Activo'" @click="editItem(item)">mdi-account-edit</v-icon>
      <v-icon class="mr-2" color="orange" v-if="item.estado == 'Activo'" @click="setPermisosAsignados(item)">mdi-shield-account</v-icon>
      <v-icon class="mr-2" color="red" v-if="item.estado == 'Activo'" @click="deleteItem(item.idusuario)">mdi-account-remove</v-icon>
      <v-btn color="red" small v-if="item.estado !== 'Activo'" @click="cambiarestado('Activo',item.idusuario)" x-small dark>
        Activar
      </v-btn>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Recargar</v-btn>
    </template>
  </v-data-table>


 <!-- MODAL PERMISOS USUARIO -->
  <v-row justify="center">
 
    <v-dialog
      v-model="dialogpermisos"
      max-width="700"
    >
      <v-card>
        <v-card-title class="headline">
          ASIGNACION DE PERMISOS
        </v-card-title>

        <v-card-text>
         <v-row>
          <v-col cols="12" sm="6">
             <v-card class="mx-auto" tile>
                <v-list>
                  <v-subheader><h4>Permisos del Sistema</h4></v-subheader>
                  <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th colspan="2">
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="item in getPermisos"
                            :key="item.idpermiso"
                            @click="savePermisos(item)"
                          >
                            <td>{{ item.nombre }}</td>
                            <td><v-icon  color="green">mdi-chevron-right-circle</v-icon></td>
                          </tr>
                        </tbody>
                      </template>
                  </v-simple-table>
                </v-list>
              </v-card>
           </v-col>
           <v-col cols="12" sm="6">
             <v-card class="mx-auto" tile>
               <v-list>
                  <v-subheader><h3>Permisos del Usuario</h3></v-subheader>
                  <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th colspan="2">
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="item in getPermisosAsignados"
                            :key="item.idpermiso"
                            @click="deletePermisos(item)"
                          >
                            <td>{{ item.nombre }}</td>
                            <td><v-icon  color="red">mdi-close-circle</v-icon></td>
                          </tr>
                        </tbody>
                      </template>
                  </v-simple-table>
                </v-list>
             </v-card>
           </v-col>       
         </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="text-white red" @click="dialogpermisos = false">CANCELAR</v-btn>
          <v-btn color="text-white green darken-1">¡LISTO!</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
     data: () => ({
      title:'USUARIOS',
      search:'',
      estado:false,
      dialog: false,
      dialogpermisos:false,
      headers: [       
        { text: 'Nombre', value: 'nombre' },
        { text: 'Apellidos',align: 'left', value: 'apellidos' },     
        { text: 'Usuario',align: 'left', value: 'usuario' },      
        { text: 'Estado',align: 'center', value: 'estado',sortable: false, },
        { text: 'Actions',align: 'center', value: 'actions', sortable: false },
      ],
      usuarioactual:0,
      itemslist: [],
      editedIndex: -1,
      editedItem: {
        nombre: '',
        apellidos: '',
        usuario:'',
        password:'',
      },
      defaultItem: {
        nombre: '',
        apellidos: '',
        usuario:'',
        password:'',
      },
      selectCargo:['Administrador','Cajero','Vendedor']
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Registro' : 'Editar Registro'
      },
      getPermisosAsignados(){
        return this.$store.getters.getPermisosAsignados
      },
      getPermisos(){
        return this.$store.getters.getPermisos
      },
      getAllUsers(){
        return this.$store.getters.getAllUsers
      },
      getUrlApi(){
        return this.$store.getters.getUrlApi
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

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.$store.dispatch('setAllUser')  
        this.$store.dispatch('setPermisos')      
      }, 
      editItem (item) {
        this.editedIndex = this.getAllUsers.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (idusuario) {
        
        Swal.fire({
          title: 'Esta Seguro?',
          text: "El registro será Desactivado y no podrá iniciar session!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Desactivar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            //Procedimiento para eliminarlo
            this.cambiarestado('Desactivado',idusuario)
          }
        })
             
      },
      cambiarestado(estado,idusuario){
            axios.put(`${this.getUrlApi}/usuarios/${idusuario}`,{estado:estado},this.getTokenUser).then(()=>{                
              this.alertDone('Usuario Desactivado')
              this.initialize()          
            })
      },
      close () {
        this.dialog = false
        this.initialize()
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
      //Crear nuevo usuario
      postItem(){
        axios.post(`${this.getUrlApi}/usuarios/`,this.editedItem,this.getTokenUser).then(()=>{                
          this.alertDone('Usuario Creado') 
        })
      },
      //Crear editar usuario
      putItem(){       
       axios.put(`${this.getUrlApi}/usuarios/${this.editedItem.idusuario}`,this.editedItem,this.getTokenUser).then(()=>{         
          this.alertDone('Usuario actualizado')                
        })
        
      },
      //METODOS USUARIO_PERMISOS
      loadPermisos(){
        this.$store.dispatch("setPermisos") //Obtenemos Todos los permisos
        this.$store.dispatch("setUsuarioPermisos",this.usuarioactual.usuario) //Obtenemos los permisos del usuario
      },
      setPermisosAsignados(user){    
        this.dialogpermisos=true
        this.usuarioactual=user
        this.loadPermisos()
      },
      deletePermisos(permiso){   
        const usuario_id = parseInt(this.usuarioactual.idusuario)
        const permiso_id = parseInt(permiso.idpermiso)
       
        axios.delete(`${this.getUrlApi}/usuarios/permisos/${usuario_id}/${permiso_id}`,this.getTokenUser).then(()=>{
          this.loadPermisos()
        })
      },

      savePermisos(permiso){
        const index = this.$store.getters.getPermisosAsignados.findIndex(buscar => buscar.idpermiso == permiso.idpermiso);
        if(index>=0){
          this.alertError('El usuario ya cuenta con el permiso')
          }else{
            const usuario_id = parseInt(this.usuarioactual.idusuario)
            const permiso_id = parseInt(permiso.idpermiso)
            axios.post(`${this.getUrlApi}/usuarios/permisos`,{usuario_id,permiso_id},this.getTokenUser).then(()=>{
              this.loadPermisos()
              this.alertDone('¡Permisos Asignados!')
            })
          }
      },
      //Notificaciones Swal
      alertDone(message){
        Swal.fire({
          icon: 'success',
          title: message,
          showConfirmButton: false,
          timer: 1500
        })
      },
      alertError(message){
        Swal.fire({
          icon: 'info',
          title: message
        })
      }
    },

    
}
</script>
<template>
    <div>
      <v-data-table
        :headers="headers"
        :items="getAllItems"
        :search="search"
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
          </v-toolbar>
        </template>
        <template v-slot:[`item.serie`]="{ item }">
          {{item.tipo}} {{item.serie}}
        </template>
        <template v-slot:[`item.fecha`]="{ item }">
          <p v-text="formatoFecha(item.fecha)"></p>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon class="mr-2 mdi-24px" @click="printPDF(item.idventa)" color="blue">mdi-printer</v-icon>
          <v-icon class="mr-2 mdi-24px" @click="anularFactura(item)" color="red" :disabled="item.estado =='Anulada'">mdi-close-circle-outline</v-icon>
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
import moment from 'moment'

export default {
     data: () => ({
      title:'FACTURAS',
      search:'',
      headers: [       
        { text: 'Fecha', value: 'fecha' },
        { text: 'Cliente',align: 'left', value: 'cliente',},      
        { text: 'Tipo',align: 'left', value: 'serie',width: '10%' },      
        { text: 'Numero',align: 'center', value: 'numero'},      
        { text: 'Descuento',align: 'center', value: 'descuento'},      
        { text: 'Total Factura',align: 'center', value: 'total'},      
        { text: 'Estado',align: 'center', value: 'estado',sortable: false, },
        { text: 'Opciones',align: 'center', value: 'actions', sortable: false },
      ],
      itemslist: [],
    }),

    async created () {
      await this.initialize()
    },
    computed: {
      getAllItems () {
        return this.$store.getters.getAllVentas
      },
      getTokenUser(){
      return this.$store.getters.getTokenUser
    }
    },
    methods: {
      formatoFecha(fecha){
        return moment(fecha).format('DD/MM/YYYY')
      },
      async initialize () {
       await  this.$store.dispatch('setAllVentas')       
      }, 
      
       async anularFactura(item) {       
         Swal.fire({
          title: 'ANULAR FACTURA',
          text:'Escriba el motivo de la anulación',
          input: 'text',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, Anular!',
          cancelButtonText: 'Cancelar!'
        }).then((result) => {
          if (result.isConfirmed) {           
             this.anularFc(parseInt(item.idventa))
          }
        })
                 
      },
      async anularFc(idventa){
        await axios.put(`${this.$store.state.urlapi}/ventas/anular/${idventa}`,{},this.getTokenUser).then(()=>{      
              this.alertDone('Factura Anulada')
              this.initialize()          
        }).catch(()=>{this.errorSwal('Error al anular la factura') })
      },         
      printPDF(idventa){
        console.log(idventa)
        this.$store.dispatch('printDocument',idventa)
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
      errorSwal(message){
        Swal.fire({
          icon: 'error',
          title: message,        
        })
      }
    },

    
}
</script>
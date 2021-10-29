<template>
    <div>
       
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
            <!--FECHA INICIO-->    
            <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
            >
                <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="fechainicio"
                    label="Fecha inicio"
                    prepend-icon="mdi-calendar"
                    outlined
                    dense
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
                </template>
                <v-date-picker
                v-model="fechainicio"
                @input="menu = false"
                locale="es-GT"
                @change="validarfechas"
                ></v-date-picker>
            </v-menu>
            <!--FECHA FIN-->    
            <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
            >
                <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    ref="fechafin"
                    v-model="fechafin"
                    label="Fecha Fin"
                    prepend-icon="mdi-calendar"
                    outlined
                    dense
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
                </template>
                <v-date-picker
                v-model="fechafin"
                @input="menu2 = false"
                locale="es-GT"
                @change="validarfechas"
                ></v-date-picker>
            </v-menu>
            
          </v-toolbar>
         
          <v-btn color="blue" class="ml-5 text-white" @click="printPDF"> <v-icon color="white" class="mr-2">mdi-cloud-print-outline</v-icon> Imprimir</v-btn>
      
        </template>
        <template v-slot:[`item.fecha_DTE`]="{ item }">
          <p v-text="formatoFecha(item.fecha_DTE)"></p>
        </template>
        <template v-slot:no-data>
          <h1>No hay ventas en este periodo</h1>
          <h5>Seleccione otro rango de fechas</h5>
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
      title:'REPORTE VENTAS',
      search:'',
      menu: false,
      menu2: false,
      modalfechafin:false,
      fechainicio:moment().format('YYYY-MM-DD'),
      fechafin:moment().format('YYYY-MM-DD'),
      headers: [       
        { text: 'Fecha', value: 'fecha_DTE' },
        { text: 'Cliente',align: 'center', value: 'cliente' },      
        { text: 'Serie',align: 'center', value: 'serie'},      
        { text: 'Numero',align: 'center', value: 'numero'},          
        { text: 'Descuento',align: 'center', value: 'descuento'},      
        { text: 'Total Factura',align: 'center', value: 'total'},      
        { text: 'Estado',align: 'center', value: 'estado',sortable: false, }
      ],
      itemslist: [],
    }),

    created () {
      this.initialize()
    },

    methods: {
        validarfechas(){
            this.modal=false;
            this.modalfechafin=false;
            if(this.fechafin<this.fechainicio){
                Swal.fire('Error!! Fecha Fin no puede ser menor a fecha inicio')
                Swal.fire({
                icon: 'error',
                title: 'Error rango de fechas',
                text:'Error!! Fecha Fin no puede ser menor a fecha inicio',
                showConfirmButton:false,
                timer:1500
                })
                this.$refs.fechafin.focus()
            }else{
                this.initialize()
            }
        },
      formatoFecha(fecha){
        return moment(fecha).format('DD/MM/YYYY')
      },
      initialize () {
        axios.get(`${this.$store.state.urlapi}/reporte/ventasporfecha/${this.fechainicio}/${this.fechafin}`).then(response=>{
          this.itemslist = response.data
        })        
      }, 
              
      printPDF(){
        window.open("/reportes/salesbydate.php?d1="+this.fechainicio+'&d2='+this.fechafin,"blank")
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
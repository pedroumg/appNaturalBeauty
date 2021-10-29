<template>
  <main class="main">
    <v-row>
      <v-col cols="12" md="6" style="background-color: #F5F5F5;">
        <v-card class="pa-5" shaped>
          <v-row id="ticket">
            <v-col>
              <v-simple-table dense>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Producto</th>
                      <th class="text-center" width="8%">Cantidad</th>
                      <th class="text-center" width="8%">Precio</th>
                      <th class="text-center" width="8%">Descuento</th>
                      <th class="text-center" width="10%">Subtotal</th>
                      <th class="text-center" width="5%"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in carrito"
                      :key="item.idarticulo"
                      class="text-center"
                    >
                      <td class="text-left">{{ item.nombre }}</td>
                      <td>
                        <v-text-field
                          v-model="item.cantidad"
                          @keyup="calculos(item)"
                          dense
                        ></v-text-field>
                      </td>
                      <td>
                        <v-text-field
                          v-model="item.precioventa"
                          @change="calculos(item)"
                          dense
                        ></v-text-field>
                      </td>
                      <td class="text-center">
                        <v-text-field
                          class="text-center"
                          v-model="item.descuento"
                          @change="calculos(item)"
                          dense
                        ></v-text-field>
                      </td>
                      <td>
                        <v-text-field
                          :value="
                            item.cantidad * item.precioventa - item.descuento
                          "
                          dense
                          readonly
                        ></v-text-field>
                      </td>

                      <td>
                        <v-btn icon @click="removeItemCart(item)" dense
                          ><v-icon color="red">mdi-close-box</v-icon></v-btn
                        >
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row justify="center">
            <v-col class="text-right" v-show="carrito.length > 0">
              <h3>TOTAL: Q {{ sumatoria || 0.0 }}</h3>
              <p>Total Descuento: Q {{ totalDescuento || 0.0 }}</p>
              <v-btn
                class="ma-2"
                color="blue-grey darken-2"
                dark
                large
                @click="carrito.splice(0, carrito.length)"
                ><v-icon left>mdi-close</v-icon> VACIAR LISTA
              </v-btn>
              <v-btn
                class="ma-2"
                color="orange accent-3"
                v-show="sumatoria > 0"
                @click="modalcliente = true,ventaCredito=true"
                dark
                large
                ><v-icon class="mdi-20px" left>mdi-cash-multiple</v-icon
                >Crédito</v-btn
              >
              <v-btn
                class="ma-2"
                color="green"
                v-show="sumatoria > 0"
                @click="modalcliente = true,ventaCredito=false"
                dark
                large
                ><v-icon class="mdi-20px" left>mdi-cash-multiple</v-icon
                >Contado</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <!-- PANEL DE PRODUCTOS -->
      <v-col cols="12" sm="6" md="6" style="background-color: #F5F5F5;">
        <v-card>
          <v-card-title>
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="Buscar producto...."
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="getProductosActivos"
            :search="search"
          >
            <template v-slot:[`item.stockactual`]="{ item }">
              <p v-if="item.stockactual > 0">{{ item.stockactual }}</p>
              <v-chip
                class="ma-2"
                color="red"
                text-color="white"
                v-if="item.stockactual < 1"
                >0</v-chip
              >
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn
                icon
                color="blue"
                @click="pusCarrito(item)"
                v-if="item.stockactual > 0"
              >
                <v-icon>mdi-plus-box</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <!-- Modal Seleccionar Cliente -->
    <v-dialog v-model="modalcliente" persistent width="700">
      <v-card>
        <v-card-title class="headline blue text-white">
          <v-icon color="white mdi-24px">mdi-account-circle</v-icon>
          <v-divider class="mx-4" vertical></v-divider>
          DATOS DEL CLIENTE
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="8">
              <v-text-field
                v-model="editedItemCliente.nit"
                label="Nit"
                @change="buscarCliente"
                autofocus
              ></v-text-field>
              <v-text-field
                v-model="editedItemCliente.nombre"
                label="Nombre Cliente"
              ></v-text-field>
              <v-text-field
                v-model="editedItemCliente.direccion"
                label="Dirección"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="editedItem.tipo"
                :items="tipo"
                label="Tipo documento"
                @change="buscarVentaPorTipo"
              ></v-select>
              <v-text-field
                v-model="editedItem.serie"
                label="Serie"
                :readonly="editedItem.tipo !== 'Factura'"
              ></v-text-field>
              <v-text-field
                v-model="editedItem.numero"
                label="Número Factura"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row v-if="ventaCredito">
            <v-col>
              <h4>VENTA AL CREDITO</h4>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-grey darken-2" @click="modalcliente = false" dark>
            <v-icon left>mdi-keyboard-backspace</v-icon> Volver</v-btn
          >
          <v-btn
            class="text-white"
            color="red"
            style="text-decoration:none"
            @click="createCliente"
            v-if="!clienteencontrado"
          >
            REGISTRAR CLIENTE
          </v-btn>
          <v-btn class="text-white" color="green" @click="postVenta" v-else>
            REGISTRAR VENTA
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--DIALOG PROCESANDO DATA-->
    <v-dialog v-model="procesardatos" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Procesando Factura...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </main>
</template>

<script>
import currency from "@/utils/currency.js";
import Swal from "sweetalert2";
import axios from "axios";
import findClienteSat from "@/utils/buscarNit";
//import moment from 'moment'
import moment from "moment-timezone";
moment.tz.setDefault("America/Guatemala");
export default {
  name: "PuntodeVenta",
  data() {
    return {
      procesardatos: false,
      search: "",
      modalcliente: false,
      clienteencontrado: true,
      ventaCredito:false,
      headers: [
        { text: "Cod.", align: "center", value: "codigo" },
        { text: "Nombre", value: "nombre" },
        { text: "Stock", align: "center", value: "stockactual" },
        { text: "Precio Venta", align: "center", value: "preciosugerido" },
        { text: "Precio Minimo", align: "center", value: "preciominimo" },
        { text: "Actions", align: "center", value: "actions", sortable: false },
      ],
      carrito: [],
      tipo: ["Factura", "Proforma", "Recibo"],
      editedItemCliente: {
        nombre: "CONSUMIDOR FINAL",
        nit: "CF",
        direccion: "JALAPA",
      },
      defaultItemCliente: {
        nombre: "CONSUMIDOR FINAL",
        nit: "CF",
        direccion: "JALAPA",
      },
      carritoObj: {
        cantidad: 1,
        preciocompra: 0,
        descuento: 0,
        precioventa: 0,
        total: 0,
        idarticulo: 1,
      },
      cleancarritoObj: {
        cantidad: 1,
        preciocompra: 0,
        descuento: 0,
        precioventa: 0,
        total: 0,
        idarticulo: 1,
      },
      editedItem: {
        idpersona: 1,
        idusuario: 1,
        cliente: "CONSUMIDOR FINAL",
        numero: 1,
        serie: "",
        descuento: 0,
        anticipo: 0,
        total: 0,
        tipo: "Recibo",
      },
      defaultItem: {
        idpersona: 1,
        idusuario: 1,
        cliente: "CONSUMIDOR FINAL",
        numero: 1,
        serie: "",
        descuento: 0,
        anticipo: 0,
        total: 0,
        tipo: "Recibo",
      },
      idventa: false,
    };
  },
  async created() {
    await this.initialize();
  },
  computed: {
    getProductosActivos() {
      return this.$store.getters.getProductosActivos;
    },
    sumatoria() {
      return currency(
        this.carrito.reduce(
          (total, current) =>
            total +
            (current.cantidad * current.precioventa - current.descuento),
          0
        )
      );
    },
    totalDescuento() {
      return currency(
        this.carrito.reduce(
          (descuento, current) => descuento + parseFloat(current.descuento),
          0
        )
      );
    },
    getTokenUser() {
      return this.$store.getters.getTokenUser;
    },
  },
  methods: {
    calculos(item) {
      const producto = this.getProductosActivos.find(
        (element) => element.idarticulo === item.idarticulo
      );
      const index = this.carrito.indexOf(item);
      //Validamos que la cantidad no supere al stock
      if (producto.stockactual >= this.carrito[index].cantidad) {
        this.carrito[index].total =
          parseFloat(item.cantidad) * parseFloat(item.precio_venta) -
          parseFloat(item.descuento);
      } else {
        item.cantidad = parseFloat(producto.stockactual);
        Swal.fire(
          "Cantidad maxima que puede vender es de " + producto.stockactual
        );
      }
      //Validamos que el precio de venta no supere al preciominimo

      if (
        parseFloat(this.carrito[index].precioventa) <
        parseFloat(producto.preciominimo)
      ) {
        item.precioventa = producto.preciominimo;
        Swal.fire(
          "El precio minimo del producto es Q " + producto.preciominimo
        );
      }
      console.log(this.carrito[index].descuento.length);
      if (this.carrito[index].descuento.length == 0) {
        item.descuento = 0;
        Swal.fire("El campo descuento no puede estar vacio");
      }
    },
    async initialize() {
      await this.$store.dispatch("setProductos");
      await this.$store.dispatch("setClientes");
      await this.$store.dispatch("setAllVentas");
      this.$store.dispatch("setNavigation");
      this.buscarVentaPorTipo();
    },
    async postVenta() {
      if (!this.procesardatos) {
        this.procesardatos = true;
        this.parsearValores();
        const respuesta = await this.$store.dispatch(
          "createVenta",
          this.editedItem
        );
        if (respuesta.status > 299)
          this.errorSwal("Error al registrar la venta");
        this.idventa = respuesta.data.idventa;
        await this.createDetalleVenta();
      }
    },
    async createDetalleVenta() {
      let errores = false;
      this.carrito.forEach((item) => {
        item.idventa = parseInt(this.idventa);
        item.cantidad = parseInt(item.cantidad);
        item.preciocompra = parseFloat(item.preciocompra);
        item.descuento = parseFloat(item.descuento);
        item.precioventa = parseFloat(item.precioventa);
        item.idarticulo = parseInt(item.idarticulo);

        const res = axios.post(
          `${this.$store.state.urlapi}/ventadetalles/`,
          item,
          this.getTokenUser
        );
        if (res.status > 299) errores = true;
      });
      if (errores) this.errorSwal("Error al generar factura");
      else {
        //Actualizamos el stock si es una factura ó Recibo
        if (this.editedItem.tipo != "Proforma") {
          await this.$store.dispatch("updateStockVenta", this.idventa);
          await this.$store.dispatch("setProductos");
        }

        this.procesardatos = false;
        this.printSwal();
        this.clearData();
        this.modalcliente = false;
      }
    },
    parsearValores() {
      this.editedItem.cliente = this.editedItemCliente.nombre;
      this.editedItem.total = parseFloat(this.sumatoria.value);
      this.editedItem.numero = parseInt(this.editedItem.numero);
      this.editedItem.anticipo = parseInt(this.editedItem.anticipo);
      this.editedItem.idpersona = parseInt(this.editedItem.idpersona);
      this.editedItem.descuento = this.totalDescuento.value;
      this.editedItem.carrito = this.carrito;
    },
    clearData() {
      //defaultItemCliente
      //const data = this.$store.getters.getClientes('CF');
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedItemCliente = Object.assign({}, this.defaultItemCliente);
      this.carrito = [];
    },
    async buscarCliente() {
      const data = this.$store.getters.getClientes(
        this.editedItemCliente.nit.toUpperCase()
      );
      if (data) {
        this.clienteencontrado = true;
        this.editedItem.idpersona = data.idpersona;
        this.editedItem.cliente = data.nombre;
        this.editedItemCliente.nombre = this.editedItem.cliente;
        this.editedItemCliente.direccion = data.direccion;
      } else {
        this.clienteencontrado = false;
        const cliente = await findClienteSat(
          this.editedItemCliente.nit.toUpperCase()
        );
        this.editedItemCliente.nombre = cliente;
      }
    },
    async createCliente() {
      await this.$store.dispatch("createCliente", this.editedItemCliente);
      //Recargamos el inicio para obtener los clientes
      await this.initialize();
      //Buscamos nuevamente el cliente invocando al metodo buscarCliente
      await this.buscarCliente();
    },
    //METODOS PARA AGREGAR Y ELIMINAR ELEMENTOS DEL CARRITO
    pusCarrito(item) {
      const articulo = this.carrito.find(
        (elemento) => elemento.idarticulo == item.idarticulo
      );
      //Si es diferente de vacio que inserte el producto
      if (!articulo) {
        this.carritoObj.nombre = item.nombre;
        this.carritoObj.cantidad = parseInt(1);
        this.carritoObj.preciocompra = item.preciocompra;
        this.carritoObj.descuento = parseFloat(0.0);
        this.carritoObj.precioventa = parseFloat(item.preciosugerido);
        this.carritoObj.total =
          this.carritoObj.cantidad * this.carritoObj.precioventa;
        this.carritoObj.idarticulo = parseInt(item.idarticulo);
        this.carrito.push(this.carritoObj);
      } else {
        this.addItemCart(articulo, item);
      }
      this.carritoObj = Object.assign({}, this.cleancarritoObj);
    },
    addItemCart(articulo, item) {
      if (item.stockactual > articulo.cantidad) {
        articulo.cantidad++;
      } else {
        Swal.fire("Cantidad supera a las existencias");
      }
    },
    removeItemCart(item) {
      const index = this.carrito.indexOf(item);
      this.carrito.splice(index, 1);
    },
    printSwal() {
      Swal.fire({
        icon: "success",
        title: "La Factura Fue Emitida Exitosamente",
        showCloseButton: true,
        confirmButtonText: `IMPRIMIR FACTURA`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.$store.dispatch("printDocument", this.idventa);
        }
      });
    },
    buscarVentaPorTipo() {
      const ventas = this.$store.getters.getAllVentas;
      //Si el Tipo es = Factura le Asignamos serie B
      if (this.editedItem.tipo == "Factura") this.editedItem.serie = "B";
      else this.editedItem.serie = "";

      if (ventas) {
        //Filtramos las ventas por tipo
        const filtro = ventas.filter(
          (elemento) => elemento.tipo == this.editedItem.tipo
        );
        if (!filtro) this.editedItem.numero = 1;
        else {
          //Buscamos el ultimo numero del tipo de documento
          const numeroSiguiente = filtro.sort((item1, item2) => {
            return parseInt(item2.numero) - parseInt(item1.numero);
          });
          this.editedItem.numero = parseInt(numeroSiguiente[0].numero) + 1;
        }
      }
    },
    //Notificaciones Swal
    alertDone(message) {
      Swal.fire({
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    errorSwal(message) {
      Swal.fire({
        icon: "error",
        title: message,
        text: "La factura no pudo ser procesada intentelo mas tarde",
      });
    },
    infoSwal(message, texto) {
      Swal.fire({
        icon: "info",
        title: message,
        text: texto,
      });
    },
  },
};
</script>
<style scoped>
.main {
  margin-top: -10px;
  height: 100vh;
}
</style>

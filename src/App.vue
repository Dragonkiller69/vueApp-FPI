<template>
  <div>
    <!-- navigation bar -->
    <div class="title">
      <h1 class="text-center principal ">Sistema de Ofertas por Llamada Telefonico</h1>
      <hr>
      <div class="row filtros">
        <v-card>
          <v-card-text>
            <v-slider v-model="value" step="10" thumb-label ticks></v-slider>
          </v-card-text>
        </v-card>
        <v-text-field class="filtro" color="white" label="Filtrar" hint="Ingrese el nombre que desea filtrar" v-model="search"></v-text-field>
      </div>
    </div>
    <!-- cards, modal notification -->
    <div class="cardwrapper">
      <v-card class="col-xs-1 col-sm-1 white--text carta" v-ripple="{class: 'black--text'}" v-for="(cliente, index) in filter"
        :key="index" color="white">
        <v-flex class="text-center" @click="getCliente(cliente), showM(true,true)">
          <v-img :src="cliente.picture.large" aspect-ratio="1" class="imagen img-responsive img-circle center-block">
            <div class="circle__spin img-responsive">
              <svg viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#8a3ab9" />
                    <stop offset="100%" stop-color="#f00" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="49" stroke="url(#gradient)" stroke-width="2" fill="none" transform='rotate(90 50 50)' />
              </svg>
            </div>
          </v-img>
          <div class="titulo">
            <div>
              <h4 class="text-capitalize nombre">{{cliente.name.title}} {{cliente.name.first}} {{cliente.name.last}}</h4>
              <hr>
            </div>
          </div>
        </v-flex>
        <v-card-actions class="center-block botones">
          <v-btn flat color="white darken-4" @click="aceptarCliente(index)">Aceptar</v-btn>
          <v-btn flat color="white darken-4">Rechazar</v-btn>
        </v-card-actions>
      </v-card>

      <div>
        <notifications group="foo-css" position="top left" :speed="500" />

        <modal name="hello-world" transition="nice-modal-fade" :delay="100" :adaptive="adaptive" :draggable="draggable">
          <div class="row" v-if="cliente">
            <img v-bind:src="cliente.picture.large" class="img-responsive img-circle col-sm-4">
            <div class="col-sm-7">
              <div class="well text-capitalize">
                <p><strong> {{cliente.name.title+" "+cliente.name.first+" "+cliente.name.last}} </strong></p>
                <p><strong>Genero:</strong> {{cliente.gender}} </p>
                <p><span class="glyphicon glyphicon-gift"></span> {{cliente.dob.date}} ({{cliente.dob.age}}) </p>
                <p><span class="glyphicon glyphicon-phone"></span> {{cliente.phone}} </p>
                <p><span class="glyphicon glyphicon-envelope"></span> {{cliente.email}} </p>
                <p><span class="glyphicon glyphicon-globe"></span> {{cliente.location.city}} </p>

              </div>
            </div>
          </div>
        </modal>

      </div>
    </div>
  </div>
</template>


<script>
  const axios = require("axios");
  export default {
    data() {
      return {
        clientes: null,
        cantidad: 10,
        cliente: null,
        back: "",
        adaptive: false,
        draggable: false,
        fecha: null,
        search: "",
        value: 0
      };
    },
    beforeMount() {
      this.getClientes();
    },
    computed: {
      filter() {
        if (this.clientes != null) {
          console.log(this.search);
          let clients = "";
          clients = this.clientes;
          return clients.filter(cliente => {
            return cliente.name.first
              .toLowerCase()
              .includes(this.search.toLowerCase());
          });
        }
      }
    },
    methods: {
      getClientes() {
        axios
          .get("https://randomuser.me/api/?results=" + this.cantidad)
          .then(response => {
            this.clientes = response.data.results;
            console.log(response);
          });
      },

      aceptarCliente(index) {
        this.clientes.splice(index, 1);
      },

      getCliente(client) {
        this.cliente = client;
        this.fecha = this.cliente.dob.date;
        console.log(this.fecha);
        console.log(this.cliente.name.first);
      },

      show(group, type = "") {
        const text = `
        This is notification text!
        <br>
        Date: ${new Date()}
      `;
        this.$notify({
          group,
          title: `Test ${type} notification #${this.id++}`,
          text,
          type,
          data: {
            randomNumber: Math.random()
          }
        });
      },

      showM(adaptive, draggable) {
        this.adaptive = adaptive;
        this.draggable = draggable;
        this.$modal.show("hello-world");
      },
      hide() {
        this.$modal.hide("hello-world");
      }
    }
  };
</script>



<style lang="stylus">
  .custom-ripple {
    user-select: none;
  }
</style>

<style scoped>
</style>

<style>
  .custom-template {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    text-align: left;
    font-size: 13px;
    margin: 5px;
    margin-bottom: 0;
    align-items: center;
    justify-content: center;
    background: #e8f9f0;
    border: 2px solid #d0f2e1;

    &,
    &>div {
      box-sizing: border-box;
    }

    .custom-template-icon {
      flex: 0 1 auto;
      color: #15c371;
      font-size: 100px;
    }

    .custom-template-close {
      flex: 0 1 auto;
      padding: 0 20px;
      font-size: 16px;
      opacity: 0.2;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }

    .custom-template-content {
      padding: 10px;
      flex: 1 0 auto;

      .custom-template-title {
        letter-spacing: 1px;
        text-transform: uppercase;
        font-size: 10px;
        font-weight: 600;
      }
    }
  }

  .v-fade-left-enter-active,
  .v-fade-left-leave-active,
  .v-fade-left-move {
    transition: all 0.5s;
  }

  .v-fade-left-enter,
  .v-fade-left-leave-to {
    opacity: 0;
    transform: translateX(-500px) scale(0.2);
  }
</style>
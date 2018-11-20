<template>
  <div>
    <!-- navigation bar -->
    <div class="title">
      <v-toolbar dark color="primary" fixed>
        <v-toolbar-side-icon @click="sheet=true"></v-toolbar-side-icon>
        <v-toolbar-title class="text-center ">Sistema de Ofertas por Llamada Telefonico</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat>Link One</v-btn>
          <v-btn flat>Link Two</v-btn>
          <v-btn flat>Link Three</v-btn>
        </v-toolbar-items>
      </v-toolbar>

    </div>

    <div class="row va ">
      <div class="col-lg-3 va">
        <h3>Clientes: {{cantidad}}</h3>
        <input type="range" v-model="cantidad" name="points" step="5" min="0" max="25" @mouseup="getClientes(), dialog = true">
      </div>

      <div class="col-lg-4 va">
        <div class="col-sm-4">
          <v-switch v-model="titulo" hide-details label="Titulo" color="red" ripple="true" dark></v-switch>
          <v-switch v-model="genero" hide-details label="Genero"></v-switch>
        </div>
        <div class="col-sm-4">
          <v-switch v-model="nombre" hide-details label="Nombre"></v-switch>
          <v-switch v-model="edad" hide-details label="Edad"></v-switch>
        </div>
        <div class="col-sm-4">
          <v-switch v-model="correo" hide-details label="Correo"></v-switch>
          <v-switch v-model="ciudad" hide-details label="Ciudad"></v-switch>
        </div>

      </div>
      <div class="col-lg-5 va">
        <v-text-field class="filtro" color="white" label="Filtrar por nombre" hint="Ingrese el nombre que desea filtrar" v-model="search"></v-text-field>
      </div>
    </div>

     <!-- loading -->
    <div>
      <v-dialog v-model="dialog" hide-overlay persistent width="300">
        <v-card  color="primary"  dark  >
          <v-card-text>
            Por favor espere
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  
    <!-- cards -->]
    <div class="cardwrapper" v-show="!dialog" >
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
                <circle cx="50" cy="50" r="49" stroke="url(#gradient)" stroke-width="3" fill="none" transform='rotate(90 50 50)' />
              </svg>
            </div>
          </v-img>
          <div class="titulo">
            <div>
              <h4 class="text-capitalize nombre">{{cliente.name.first}} {{cliente.name.last}}</h4>
              <hr>
            </div>
          </div>
        </v-flex>
        <div>
          <v-card-actions class="center-block botones">
            <v-btn flat color="white darken-4" @click="aceptarCliente(index)">Aceptar</v-btn>
            <v-btn flat color="white darken-4">Rechazar</v-btn>
          </v-card-actions>
        </div>
      </v-card>
      
    </div>
    <!--  modal notification -->
    <div>
      <notifications group="foo-css" position="top left" :speed="500" />

      <modal name="hello-world" transition="nice-modal-fade" :delay="100" :adaptive="adaptive" :draggable="draggable">
        <div class="row" v-if="cliente">
          <img v-bind:src="cliente.picture.large" class="img-responsive img-circle col-sm-4">
          <div class="col-sm-7">
            <div class="well text-capitalize">
              <p><strong><span v-if="titulo">{{cliente.name.title}}</span><span v-if="nombre"> {{cliente.name.first}} {{cliente.name.last}}</span></strong></p>
              <p><span v-if="genero"><span class="glyphicon glyphicon-user"></span> {{cliente.gender}}</span></p>
              <p><span v-if="edad"><span class="glyphicon glyphicon-gift"></span>{{cliente.dob.date}} ({{cliente.dob.age}})</span></p>
              <p><span class="glyphicon glyphicon-phone"></span> {{cliente.phone}} </p>
              <p><span v-if="correo"><span class="glyphicon glyphicon-envelope"></span> {{cliente.email}} </span></p>
              <p><span v-if="ciudad"><span class="glyphicon glyphicon-globe"></span> {{cliente.location.city}} </span></p>

            </div>
          </div>
        </div>
      </modal>

    </div>
    <div>
      <div class="text-xs-center">
    <v-bottom-sheet v-model="sheet">
      <v-btn
        slot="activator"
        color="purple"
        dark
      >
        Click me
      </v-btn>

      <v-list>
        <v-subheader>Open in</v-subheader>
        <v-list-tile
          v-for="tile in tiles"
          :key="tile.title"
          @click="sheet = false"
        >
          <v-list-tile-avatar>
            <v-avatar size="32px" tile>
              <img
                :src="`https://cdn.vuetifyjs.com/images/bottom-sheets/${tile.img}`"
                :alt="tile.title"
              >
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-title>{{ tile.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-bottom-sheet>
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
        titulo: true,
        nombre: true,
        edad: true,
        genero: true ,
        correo: true ,
        ciudad: true,
        dialog: false,
        sheet: false,
         tiles: [
        { img: 'keep.png', title: 'Keep' },
        { img: 'inbox.png', title: 'Inbox' },
        { img: 'hangouts.png', title: 'Hangouts' },
        { img: 'messenger.png', title: 'Messenger' },
        { img: 'google.png', title: 'Google+' }
      ]
      };
    },
    beforeMount() {
      this.getClientes();
    },
    computed: {
      filter() {
        if (this.clientes != null) {
          console.log(this.search);
          return this.clientes.filter(cliente => {
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
    },
    watch: {
    dialog (val) {
      if (!val) return

      setTimeout(() => (this.dialog = false), 3300)
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
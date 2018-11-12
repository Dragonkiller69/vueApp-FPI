<template>
  <div>
    <button @click="show('custom-template')">
      show top left
    </button>
    <v-card class="col-xs-2 col-sm-2 white--text carta" v-ripple="{ class: 'black--text' }" v-for="(cliente, index) in clientes"
      :key="index" color="white">
      <v-flex class="text-center">
        <v-img :src="cliente.picture.large" aspect-ratio="1" class="imagen img-responsive img-circle center-block">
          <div class="circle__spin img-responsive">
            <svg  viewBox="0 0 100 100">
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
      <notifications group="custom-template" :duration="5000" :width="500" animation-name="v-fade-left" position="top left">

        <template slot="body" slot-scope="props">
          <div class="custom-template">
            <div class="custom-template-icon">
              <i class="icon ion-android-checkmark-circle"></i>
            </div>
            <div class="custom-template-content">
              <div class="custom-template-title">
                {{props.item.title}}
              </div>
              <div class="custom-template-text" v-html="props.item.text"></div>
            </div>
            <div class="custom-template-close" @click="props.close">
              <i class="icon ion-android-close"></i>
            </div>

          </div>
        </template>
      </notifications>
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
        back: ""
      };
    },
    beforeMount() {
      this.getClientes();
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
        this.show = true;
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
  .carta {
    filter: blur(0.17px);
    transition: filter 500ms;
    transition: box-shadow 0.6s;
    margin: 10px;
    padding: 0%;
    width: 20%;
    height: 100%;
  }

  .imagen {
    position: relative;
    margin-top: 5%;
    margin-bottom: 0%;
    padding: 0%;
    width: 60%;
  
  }

  .circle__spin {
    left: 0%;
    top: 0%;
    position: absolute;
  }

  .circle__spin svg {
    width: auto;
    height: auto;
  }

  svg:hover {
     animation: spin 1s linear infinite;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }

  .titulo {
    text-align: center;
    color: black;
    margin-top: 0%;
    padding-top: 0%;
    padding-left: 2px;
    padding-right: 2px;
  }

  .nombre {
    margin-bottom: 2px;
  }

  .botones {
    background-color: #004d40;
    align-content: center;
    position: relative;
    padding-left: 30px;
  }

  hr {
    margin: 5%;
    margin-top: 0%;
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.75),
      rgba(0, 0, 0, 0));
  }

  .carta:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 15px 0 rgba(0, 0, 0, 0.19);
    filter: brightness(103%);
  }
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
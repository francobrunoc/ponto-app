<template>
  <v-app id="ponto-app">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list class="mt-5">
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-wallet</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <router-link to="/cliente">
              <v-list-item-title><h3>Clientes</h3></v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <router-link to="/funcionario">
              <v-list-item-title><h3>Funcionário</h3></v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-clock</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <router-link to="/ponto">
              <v-list-item-title><h3>Ponto</h3></v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title><h3>Empresa</h3></v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col>
            <router-view/>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; 2020 - Relógio Ponto Online</span>
    </v-footer>
  </v-app>
</template>
<script>
export default {
  name: 'App',
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  }),
  created () {
    this.$vuetify.theme.dark = true
  }
}
</script>

<style>
  a {
    color: white !important;
    text-decoration: none; /* no underline */
  }
</style>

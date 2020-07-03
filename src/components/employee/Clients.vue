<template>
  <div id="clients">
  <v-select dense v-model="clientId" outlined :items="list" item-text="companyName"
            item-value="id" label="Clientes Atendidos" persistent-hint/>
  <v-menu
    :close-on-content-click="true"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="startDate"
        label="Data de Início"
        prepend-icon="mdi-calendar"
        readonly
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="startDate" no-title scrollable />
  </v-menu>
    <div align="center">
      <v-btn @click="push"><v-icon>mdi-plus</v-icon></v-btn>
    </div>
    <v-list>
        <v-list-item  v-for="c in clients" v-bind:key="c.clientPeopleId.clientId">
          <v-alert dense type="info">
            {{ list.filter(value => value.id === c.clientPeopleId.clientId)[0].companyName }} ({{ c.startDate | formatDate }})
            <v-icon small class="mr-2" @click="erase(c.clientPeopleId.clientId)">mdi-delete-empty</v-icon>
          </v-alert>
        </v-list-item>
    </v-list>
  </div>
</template>

<script>
import store from '../../store/store'
import moment from 'moment'
export default {
  name: 'Clients',
  store,
  props: {
    list: Array
  },
  data () {
    return {
      clientId: null,
      startDate: null
    }
  },
  computed: {
    clients () {
      return this.$store.state.cli.clients
    }
  },
  methods: {
    push: function () {
      store.commit('cli/insertIntoClients', { clientPeopleId: { clientId: this.clientId }, startDate: this.startDate })
    },
    erase: function (id) {
      store.commit('cli/removeClient', { id })
    }
  },
  filters: {
    formatDate (value) {
      if (value) {
        return moment(String(value)).format('DD/MM/YYYY')
      }
    }
  }
}
</script>

<style scoped>

</style>

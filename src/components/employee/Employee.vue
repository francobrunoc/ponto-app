<template>
  <div>

    <v-container>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="employees"
        item-key="name"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar>
            <v-toolbar-title>Funcionários</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog"> <!-- max-width="500px" -->
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >Incluir
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col>
                        <v-form ref="form" v-model="valid">
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="employee.name" label="Nome" required :rules="nameRules"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="employee.enrolment" label="Matrícula" required :rules="nameRules"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="employee.cpf" label="CPF" required :rules="nameRules"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="employee.email" label="Email" required :rules="nameRules"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-menu :close-on-content-click="true" transition="scale-transition" offset-y min-width="290px">
                                <template v-slot:activator="{ on }">
                                  <v-text-field
                                    v-model="employee.dateOfBirth"
                                    label="Data de Nascimento"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-on="on"
                                  ></v-text-field>
                                </template>
                                <v-date-picker v-model="employee.dateOfBirth" no-title scrollable />
                              </v-menu>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-menu :close-on-content-click="true" transition="scale-transition" offset-y min-width="290px">
                                <template v-slot:activator="{ on }">
                                  <v-text-field
                                    v-model="employee.admissionDate"
                                    label="Data de Admissão"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-on="on"
                                  ></v-text-field>
                                </template>
                                <v-date-picker v-model="employee.admissionDate" no-title scrollable />
                              </v-menu>
                            </v-col>
                          </v-row>
                        </v-form>
                        <Clients :list="clients" :selected="employee" @clients="insertClient($event)"></Clients>
                      </v-col>
                      <v-col>
                        <Scale />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="save" :disabled="!valid">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="_delete(item)"
          >
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary">Sem Registros de Funcionários</v-btn>
        </template>
      </v-data-table>
    </v-container>

  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import Clients from './Clients'
import store from '../../store/store'
import Scale from './Scale'

export default {
  name: 'Employee',
  components: { Scale, Clients },
  store,
  data () {
    return {
      nameRules: [
        v => !!v || 'Name is required'
      ],
      valid: true,
      dialog: false,
      editedIndex: -1,
      employee: {
        clients: [],
        id: '',
        name: '',
        enrolment: '',
        cpf: '',
        dateOfBirth: '',
        email: '',
        admissionDate: '',
        scale: []
      },
      defaultEmployee: {
        clients: [],
        id: '',
        name: '',
        enrolment: '',
        cpf: '',
        dateOfBirth: '',
        email: '',
        admissionDate: '',
        scale: []
      },
      selected: [],
      headers: [
        {
          text: 'Nome',
          align: 'start',
          value: 'name'
        },
        {
          text: 'Matrícula',
          value: 'enrolment'
        },
        {
          value: 'actions',
          sortable: false
        }
      ],
      clients: [],
      employees: [],
      BASE_URL_EMPLOYEE: 'http://localhost:8081/employees/',
      BASE_URL_CLIENTS: 'http://localhost:8081/clients/'
    }
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Novo Funcionário' : 'Alterar Funcionário'
    }
  },
  methods: {
    insertClient (client) {
      this.employee.clients.push(client)
    },
    editItem (item) {
      this.editedIndex = this.clients.indexOf(item)
      this.employee = Object.assign({}, item)
      store.commit('cli/setSelectedClients', item.clients)
      store.commit('scl/setScale', item.scale)
      this.dialog = true
    },
    close () {
      store.commit('cli/clearSelectedClients')
      store.commit('scl/clearSelectedScale')
      this.dialog = false
      this.$nextTick(() => {
        this.employee = Object.assign({}, this.defaultEmployee)
        this.editedIndex = -1
      })
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.employees[this.editedIndex], this.employee)
      } else {
        this.employees.push(this.employee)
        this._submit()
      }
      this.close()
    },
    _listClients: function () {
      // eslint-disable-next-line no-return-assign
      axios.get(this.BASE_URL_CLIENTS + 'list').then(res =>
        this.clients = res.data
      ).catch(err => console.log(err))
    },
    _list: function () {
      // eslint-disable-next-line no-return-assign
      axios.get(this.BASE_URL_EMPLOYEE + 'list').then(res =>
        this.employees = res.data
      ).catch(err => console.log(err))
    },
    _submit: function () {
      this.employee.clients = store.state.cli.clients
      this.employee.scale = store.state.scl.scale
      axios.post(this.BASE_URL_EMPLOYEE + 'save', this.employee).then(
        this._list
      ).catch(err => console.log(err))
    },
    _delete: function (employee) {
      if (confirm('Você tem certeza que deseja apagar este funcionário?')) {
        axios.delete(this.BASE_URL_EMPLOYEE + employee.id).then(
          this._list
        ).catch(err => console.log(err))
      }
    }
  },
  filters: {
    formatDate (value) {
      if (value) {
        return moment(String(value)).format('DD/MM/YYYY')
      }
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  mounted () {
    this._list()
  },
  created () {
    this._listClients()
  }
}
</script>

<style scoped>

</style>

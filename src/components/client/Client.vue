<template>
  <div>

    <v-container>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="clients"
        item-key="name"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar>
            <v-toolbar-title>Clientes</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                  @click="reset"
                >Incluir
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-form ref="form" v-model="valid">
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.companyName" label="Razão Social" required :rules="nameRules"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.fantasyName" label="Nome Fantasia" required :rules="nameRules"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>
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
          <v-btn color="primary">Sem Registros de Clientes</v-btn>
        </template>
      </v-data-table>
    </v-container>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  methods: {
    editItem (item) {
      this.editedIndex = this.clients.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    reset () {
      this.$refs.form.reset()
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.clients[this.editedIndex], this.editedItem)
      } else {
        this.clients.push(this.editedItem)
        this._submit()
      }
      this.close()
    },

    _list: function () {
      // eslint-disable-next-line no-return-assign
      axios.get(this.BASE_URL_CLIENTS + 'list').then(res =>
        this.clients = res.data
      ).catch(err => console.log(err))
    },

    _submit: function () {
      axios.post(this.BASE_URL_CLIENTS + 'save', this.editedItem).then(
      ).catch(err => console.log(err))
    },

    _delete: function (client) {
      if (confirm('Você tem certeza que deseja apagar este cliente?')) {
        axios.delete(this.BASE_URL_CLIENTS + client.id).then(() =>
          this.clients.splice(this.clients.indexOf(client), 1)
        ).catch(err => console.log(err))
      }
    }

  },
  name: 'Client',

  data () {
    return {
      nameRules: [
        v => !!v || 'Name is required'
      ],
      valid: true,
      dialog: false,
      editedIndex: -1,
      editedItem: {
        companyName: '',
        fantasyName: ''
      },
      defaultItem: {
        companyName: '',
        fantasyName: ''
      },
      singleSelect: false,
      selected: [],
      headers: [
        {
          text: 'Razão Social',
          align: 'start',
          value: 'companyName'
        },
        {
          text: 'Nome Fantasia',
          value: 'fantasyName'
        },
        {
          value: 'actions',
          sortable: false
        }
      ],
      client: {
        id: null,
        companyName: null,
        fantasyName: null
      },
      clients: [],
      BASE_URL_CLIENTS: 'http://localhost:8081/clients/'
    }
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Novo Cliente' : 'Alterar Cliente'
    }
  },

  mounted () {
    this._list()
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  }
}
</script>

<style scoped>

</style>

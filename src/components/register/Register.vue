<template>
  <div>

    <v-container>
      <v-card class="mx-auto" max-width="350" outlined>
        <v-card-title>
          <v-select @change="_list()" v-model="time.employee.id" label="Funcionário" :items="employees" item-value="id" item-text="name"></v-select>
        </v-card-title>
        <v-list-item>
          <v-list-item-content>
            <div align="center">
              <v-avatar v-if="entering" color="indigo" size="60">
                <span class="white--text headline">E</span>
              </v-avatar>
              <v-avatar v-else color="orange" size="60">
                <span class="white--text headline">S</span>
              </v-avatar>
              <v-list-item-title class="headline mb-3 mt-3">{{currentDate}}</v-list-item-title>
              <v-list-item-title class="headline mb-1">{{now}}</v-list-item-title>
            </div>
            <v-text-field v-model="time.justification" placeholder="Justificativa"/>
            <div align="center">
              <v-btn @click="_submit" fab x-large :disabled="time.employee.id == null">
                <v-icon>mdi-fingerprint</v-icon>
              </v-btn>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-container>

    <v-container>
      <v-simple-table>
        <table>
          <thead>
          <th><h2>Dia</h2></th>
          <th><h2>Entrada</h2></th>
          <th><h2>Saída</h2></th>
          <th><h2>Justificativa</h2></th>
          <th><h2>Balanço</h2></th>
          </thead>
          <tbody>
          <tr v-for="(time, index) in times" v-bind:key="time.id">
            <td>{{time.date | formatDate}}</td>
            <td>{{time.markingIn | formatTime}}</td>
            <td>{{time.markingOut | formatTime}}</td>
            <td>
              <div v-if="time.justification">
                <v-tooltip v-model="show" top>
                  <template v-slot:activator="{ on }">
                      <v-icon v-on="on">mdi-check</v-icon>
                  </template>
                  <span>{{time.justification}}</span>
                </v-tooltip>
              </div>
            </td>
            <td>{{time.markingOut?timeConversion(time.markingOut, times[index -1].markingIn):''}}</td>
          </tr>
          </tbody>
        </table>
      </v-simple-table>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'Register',
  data () {
    return {
      employees: [],
      times: [],
      time: {
        id: null,
        employee: { id: null },
        markingOut: null,
        markingIn: null,
        date: null,
        justification: null,
        balance: null
      },
      BASE_URL_PONTO: 'http://localhost:8081/register/',
      BASE_URL_FUNCIONARIO: 'http://localhost:8081/employees/',
      show: false,
      now: null
    }
  },
  methods: {
    _listEmployees: function () {
      // eslint-disable-next-line no-return-assign
      axios.get(this.BASE_URL_FUNCIONARIO + 'list').then(res =>
        this.employees = res.data
      ).catch(err => console.log(err))
    },
    _list: function () {
      // eslint-disable-next-line no-return-assign
      axios.get(this.BASE_URL_PONTO + 'list?employeeId=' + this.time.employee.id).then(res =>
        this.times = res.data
      ).catch(err => console.log(err))
    },
    _submit: function () {
      this.time.date = new Date()
      if (this.entering) {
        this.time.markingIn = new Date().getTime()
      } else {
        this.time.markingOut = new Date().getTime()
        this.time.balance = this.time.markingOut - this.time.markingIn
      }
      axios.post(this.BASE_URL_PONTO + 'save', this.time).then(
        this.reset
      ).catch(err => console.log(err))
    },
    reset: function () {
      this._list()
      this.time.id = null
      this.time.date = null
      this.time.markingIn = null
      this.time.markingOut = null
      this.time.justification = null
    },
    timeConversion: function (markingOut, markingIn) {
      const millisec = markingOut - markingIn
      const seconds = (millisec / 1000).toFixed(1)
      const minutes = (millisec / (1000 * 60)).toFixed(1)
      const hours = (millisec / (1000 * 60 * 60)).toFixed(1)
      const days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1)
      if (seconds < 60) {
        return seconds + ' Seg'
      } else if (minutes < 60) {
        return minutes + ' Min'
      } else if (hours < 24) {
        return hours + ' Hrs'
      } else {
        return days + ' Dias'
      }
    }
  },
  computed: {
    currentDate: function () {
      return new Date().toDateString()
    },
    entering: function () {
      if (this.times.length > 0) {
        if (this.times[this.times.length - 1].markingIn == null) return true
        if (this.times[this.times.length - 1].markingOut == null) return false
      }
      return true
    }
  },
  filters: {
    formatDate (value) {
      if (value) {
        return moment(String(value)).format('DD/MM/YYYY')
      }
    },
    formatTime (value) {
      if (value) {
        return new Date(value).toLocaleTimeString()
      }
    }
  },
  mounted () {
    this._listEmployees()
  },
  created () {
    // eslint-disable-next-line no-return-assign
    setInterval(() => this.now = new Date().toLocaleTimeString(), 1000)
  }
}
</script>

<style scoped>

</style>

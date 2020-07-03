<template>
  <div id="weekday">
    <v-checkbox v-model="dayOff" label="Dia Livre"></v-checkbox>
      <v-row>
        <v-col cols="11" sm="5">
          <v-menu
            :disabled="dayOff"
            ref="menuIn"
            v-model="menuIn"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="markingIn"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                :disabled="dayOff"
                v-model="markingIn"
                @change="setMarkingIn"
                label="Entrada"
                prepend-icon="mdi-clock"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="menuIn"
              v-model="markingIn"
              full-width
              @click:minute="$refs.menuIn.save(markingIn)"
            ></v-time-picker>
          </v-menu>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="11" sm="5">
          <v-menu
            :disabled="dayOff"
            ref="menuOut"
            v-model="menuOut"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="markingOut"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                :disabled="dayOff"
                v-model="markingOut"
                @change="setMarkingOut"
                label="Saida"
                prepend-icon="mdi-clock"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="menuOut"
              v-model="markingOut"
              full-width
              @click:minute="$refs.menuOut.save(markingOut)"
            ></v-time-picker>
          </v-menu>
        </v-col>
      </v-row>
  </div>
</template>

<script>
import store from '../../store/store'

export default {
  props: {
    weekday: Number
  },
  name: 'Weekday',
  store,
  data () {
    return {
      dayOff: false,
      markingIn: null,
      markingOut: null,
      menuIn: false,
      menuOut: false
    }
  },
  methods: {
    parseTime: function (time) {
      const timeParts = time.split(':')
      return (+timeParts[0] * (60000 * 60)) + (+timeParts[1] * 60000)
    },
    setMarkingIn: function (event) {
      console.log(event)
      console.log(this.weekday)
      store.commit('scl/setMarkingIn', { weekday: this.weekday, markingIn: this.parseTime(event) })
    },
    setMarkingOut: function (event) {
      console.log(event)
      console.log(this.weekday)
      store.commit('scl/setMarkingOut', { weekday: this.weekday, markingOut: this.parseTime(event) })
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div id="scale">
      <v-stepper v-model="e1" alt-labels non-linear>
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1" editable>Domingo</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 2" step="2" editable>Segunda</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 3" step="3" editable>Terça</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 4" step="4" editable>Quarta</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 5" step="5" editable>Quinta</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 6" step="6" editable>Sexta</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="7" editable>Sábado</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
           <Weekday :weekday="0" />
            <v-btn color="primary" @click="e1 = 2">
              >>
            </v-btn>
          </v-stepper-content>

          <v-stepper-content step="2">
            <Weekday :weekday="1" />
            <v-btn color="primary" @click="e1 = 3">
              >>
            </v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
            <Weekday :weekday="2" />
            <v-btn color="primary" @click="e1 = 4">
              >>
            </v-btn>
          </v-stepper-content>

          <v-stepper-content step="4">
            <Weekday :weekday="3" />
            <v-btn color="primary" @click="e1 = 5">
              >>
            </v-btn>
          </v-stepper-content>

          <v-stepper-content step="5">
            <Weekday :weekday="4" />
            <v-btn color="primary" @click="e1 = 6">
              >>
            </v-btn>
          </v-stepper-content>

          <v-stepper-content step="6">
            <Weekday :weekday="5" />
            <v-btn color="primary" @click="e1 = 7">
              >>
            </v-btn>
          </v-stepper-content>

          <v-stepper-content step="7">
            <Weekday :weekday="6" />
            <v-btn color="primary" @click="e1 = 1">
              >>
            </v-btn>
          </v-stepper-content>

        </v-stepper-items>
      </v-stepper>
  </div>
</template>

<script>
import Weekday from './Weekday'
export default {
  name: 'Scale',
  components: { Weekday },
  data () {
    return {
      e1: 1
    }
  }
}
</script>

<style scoped>

</style>

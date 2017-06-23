<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs10>
        <v-text-field
          name="input-1"
          label="Task description"
          multi-line
        ></v-text-field>
      </v-flex>
      <v-flex xs2>
        <v-btn
          :light="currentTaskState == taskStates.START_DISCUSSION"
          class="orange taskButton"
          :disabled="currentTaskState !== taskStates.START_DISCUSSION"
          @click.native="startDiscussion"
        >
          Start discussion
        </v-btn>
        <v-btn
          :light="currentTaskState == taskStates.START_ESTIMATION"
          class="orange taskButton"
          :disabled="currentTaskState !== taskStates.START_ESTIMATION"
          @click.native="startEstimation"
        >
          Start estimation
        </v-btn>
        <v-btn
          :light="currentTaskState == taskStates.END_ESTIMATION"
          class="orange taskButton"
          :disabled="currentTaskState !== taskStates.END_ESTIMATION"
          @click.native="endEstimation"
        >
          End estimation
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const START_DISCUSSION = 0;
const START_ESTIMATION = 1;
const END_ESTIMATION = 2;

export default {
  name: 'task-from',
  data: () => ({
    taskStates: {
      START_DISCUSSION,
      START_ESTIMATION,
      END_ESTIMATION,
    },
    currentTaskState: START_DISCUSSION,
  }),
  methods: {
    startDiscussion() {
      this.currentTaskState = this.taskStates.START_ESTIMATION;
    },
    startEstimation() {
      this.currentTaskState = this.taskStates.END_ESTIMATION;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.taskButton {
  width: 100%;
}
</style>

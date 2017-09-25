<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-stepper v-model="currentTaskStatus">
          <v-stepper-header>
            <v-stepper-step step="0" :complete="currentTaskStatus > taskStatuses.INITIAL_STATUS">Prepare task description</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="1" :complete="currentTaskStatus > taskStatuses.START_DISCUSSION">Begin task discussion</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="2">Begin task estimation</v-stepper-step>
          </v-stepper-header>
        </v-stepper>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { plannings } from '@/mocks/mockData.json';
import _get from 'lodash/get';
import taskStatuses from '../constants/taskStatuses';

export default {
  name: 'task-stepper',
  data: () => ({
    taskStatuses,
  }),
  computed: {
    currentTaskStatus() {
      const status = _get(this, `tasks[${this.taskKey}].status`, taskStatuses.INITIAL_STATUS);
      return status === taskStatuses.END_ESTIMATION ? taskStatuses.INITIAL_STATUS : status;
    },
    plannings() {
      return plannings;
    },
  },
  // beforeCreate() {
  created() {
    const planningId = this.$route.params.id;
    if (planningId) {
      this.tasks = this.plannings[planningId].tasks;
      this.taskKey = _get(this.tasks, ['0', '.key'], '-KncLoPuXEAx_AkBCqok');
    }
  },
};
</script>

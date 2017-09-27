<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs10>
        <v-text-field
          v-if="isOwner && currentTaskStatus == taskStatuses.INITIAL_STATUS"
          v-model="taskDescription"
          label="Task description"
          multi-line
        ></v-text-field>
        <h4 class="text-xs-left" v-else>{{ currentTaskDescription }}</h4>
      </v-flex>
      <v-flex xs2 v-if="isOwner">
        <v-btn
          :light="currentTaskStatus == taskStatuses.INITIAL_STATUS"
          class="blue darken-2 task-button"
          :disabled="currentTaskStatus !== taskStatuses.INITIAL_STATUS"
          @click.native="startDiscussion"
        >
          Start discussion
        </v-btn>
        <v-btn
          :light="currentTaskStatus == taskStatuses.START_DISCUSSION"
          class="blue darken-2 task-button"
          :disabled="currentTaskStatus !== taskStatuses.START_DISCUSSION"
          @click.native="startEstimation"
        >
          Start estimation
        </v-btn>
        <v-btn
          :light="currentTaskStatus == taskStatuses.START_ESTIMATION"
          class="blue darken-2 task-button"
          :disabled="currentTaskStatus !== taskStatuses.START_ESTIMATION"
          @click.native="endEstimation"
        >
          End estimation
        </v-btn>
      </v-flex>
      <v-flex xs12 v-if="isOwner">
        <v-alert error class="task-form-alert" :value="isTaskIncorrect">
          Task description cannot be blank.
        </v-alert>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { plannings } from '@/mocks/mockData.json';
// import _get from 'lodash/get';
import taskStatuses from '@/constants/taskStatuses';

export default {
  name: 'task-from',
  props: ['isOwner'],
  data: () => ({
    taskStatuses,
    isTaskIncorrect: false,
    currentTask: {},
    taskDescription: '',
  }),
  computed: {
    currentTaskStatus() {
      const status = this.$store.state.currentTask.status || this.currentTask.status;
      return status === taskStatuses.END_ESTIMATION ? taskStatuses.INITIAL_STATUS : status;
    },
    currentTaskDescription() {
      const description = this.$store.state.currentTask.description || this.currentTask.description;
      return this.currentTaskStatus === taskStatuses.INITIAL_STATUS ? '' : description;
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
      this.taskKey = '-KncLoPuXEAx_AkBCqok';
      this.currentTask = this.tasks[this.taskKey];
      this.$store.commit('saveCurrentTask', { currentTask: this.currentTask });
    }
  },
  methods: {
    startDiscussion() {
      this.isTaskIncorrect = !this.taskDescription.trim().length;
      if (!this.isTaskIncorrect) {
        const newTask = {
          description: this.taskDescription.trim(),
          status: taskStatuses.START_DISCUSSION,
          taskKey: '-KncLoPuXEAx_AkBCqok',
        };
        this.tasks[newTask.taskKey] = newTask;
        this.taskKey = newTask.taskKey;
        this.currentTask = newTask;
        this.$store.commit('saveCurrentTask', { currentTask: this.currentTask });
      }
    },
    startEstimation() {
      this.tasks[this.taskKey].status = taskStatuses.START_ESTIMATION;
    },
    endEstimation() {
      this.tasks[this.taskKey].status = taskStatuses.END_ESTIMATION;
      this.taskDescription = '';
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.task-button {
  width: 100%;
}

.task-form-alert {
  width: 100%;
  margin-bottom: 15px;
}
</style>

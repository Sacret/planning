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
          class="orange task-button"
          :disabled="currentTaskStatus !== taskStatuses.INITIAL_STATUS"
          @click.native="startDiscussion"
        >
          Start discussion
        </v-btn>
        <v-btn
          :light="currentTaskStatus == taskStatuses.START_DISCUSSION"
          class="orange task-button"
          :disabled="currentTaskStatus !== taskStatuses.START_DISCUSSION"
          @click.native="startEstimation"
        >
          Start estimation
        </v-btn>
        <v-btn
          :light="currentTaskStatus == taskStatuses.START_ESTIMATION"
          class="orange task-button"
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
import _get from 'lodash/get';
import db from '../firebase';
import taskStatuses from '../constants/taskStatuses';

export default {
  name: 'task-from',
  props: ['isOwner'],
  data: () => ({
    taskStatuses,
    isTaskIncorrect: false,
    taskDescription: '',
  }),
  computed: {
    currentTaskStatus() {
      const status = _get(this, 'tasks[0].status', taskStatuses.INITIAL_STATUS);
      return status === taskStatuses.END_ESTIMATION ? taskStatuses.INITIAL_STATUS : status;
    },
    currentTaskDescription() {
      const description = _get(this, 'tasks[0].description', '');
      return this.currentTaskStatus === taskStatuses.INITIAL_STATUS ? '' : description;
    },
  },
  beforeCreate() {
    const planningId = this.$route.params.id;
    if (planningId) {
      this.$bindAsArray('tasks', db.ref(`plannings/${planningId}/tasks`).limitToLast(1), null, () => {
        this.taskKey = _get(this.tasks, ['0', '.key'], '');
      });
    }
  },
  methods: {
    startDiscussion() {
      this.isTaskIncorrect = !this.taskDescription.trim().length;
      if (!this.isTaskIncorrect) {
        const newTask = this.$firebaseRefs.tasks.push({
          description: this.taskDescription.trim(),
          status: taskStatuses.START_DISCUSSION,
        });
        this.taskKey = newTask.getKey();
      }
    },
    startEstimation() {
      this.$firebaseRefs.tasks.child(this.taskKey).child('status').set(taskStatuses.START_ESTIMATION);
    },
    endEstimation() {
      this.$firebaseRefs.tasks.child(this.taskKey).child('status').set(taskStatuses.END_ESTIMATION);
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

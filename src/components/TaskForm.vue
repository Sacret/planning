<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs10 v-if="isOwner">
        <v-text-field
          v-model="taskDescription"
          label="Task description"
          :readonly="currentTaskStatus !== taskStatuses.START_DISCUSSION"
          multi-line
        ></v-text-field>
      </v-flex>
      <v-flex xs2 v-if="isOwner">
        <v-btn
          :light="currentTaskStatus == taskStatuses.START_DISCUSSION"
          class="orange taskButton"
          :disabled="currentTaskStatus !== taskStatuses.START_DISCUSSION"
          @click.native="startDiscussion"
        >
          Start discussion
        </v-btn>
        <v-btn
          :light="currentTaskStatus == taskStatuses.START_ESTIMATION"
          class="orange taskButton"
          :disabled="currentTaskStatus !== taskStatuses.START_ESTIMATION"
          @click.native="startEstimation"
        >
          Start estimation
        </v-btn>
        <v-btn
          :light="currentTaskStatus == taskStatuses.END_ESTIMATION"
          class="orange taskButton"
          :disabled="currentTaskStatus !== taskStatuses.END_ESTIMATION"
          @click.native="endEstimation"
        >
          End estimation
        </v-btn>
      </v-flex>
      <v-flex xs12 v-if="isOwner">
        <v-alert error class="taskFormAlert" :value="isTaskIncorrect">
          Task description cannot be blank.
        </v-alert>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import TaskStepper from '@/components/TaskStepper';
import db from '../firebase';

const START_DISCUSSION = 1;
const START_ESTIMATION = 2;
const END_ESTIMATION = 3;

export default {
  name: 'task-from',
  props: ['isOwner'],
  components: { TaskStepper },
  data: () => ({
    taskStatuses: {
      START_DISCUSSION,
      START_ESTIMATION,
      END_ESTIMATION,
    },
    isTaskIncorrect: false,
    taskKey: '',
  }),
  computed: {
    currentTaskStatus() {
      debugger;
      return this.tasks && this.tasks[0]
        ? this.tasks[0].status
        : START_DISCUSSION;
    },
    taskDescription() {
      return this.tasks && this.tasks[0]
        ? this.tasks[0].description
        : '';
    },
  },
  beforeCreate() {
    const planningId = this.$route.params.id;
    if (planningId) {
      // this.$bindAsObject('planning', db.ref(`plannings/${planningId}`));
      this.$bindAsArray('tasks', db.ref(`plannings/${planningId}/tasks`).limitToLast(1), null, () => {
        if (this.tasks && this.tasks[0] && this.tasks[0]['.key']) {
          this.taskKey = this.tasks[0]['.key'];
        }
      });
    }
  },
  methods: {
    startDiscussion() {
      if (this.taskDescription.trim().length) {
        debugger;
        const newTask = this.$firebaseRefs.tasks.push({
          description: this.taskDescription.trim(),
          status: START_ESTIMATION,
        });
        this.taskKey = newTask.getKey();
        this.isTaskIncorrect = false;
      } else {
        this.isTaskIncorrect = true;
      }
    },
    startEstimation() {
      this.$firebaseRefs.tasks.child(this.taskKey).child('status').set(END_ESTIMATION);
    },
    endEstimation() {
      this.taskDescription = '';
      this.$firebaseRefs.tasks.child(this.taskKey).child('status').set(START_DISCUSSION);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.taskButton {
  width: 100%;
}

.taskFormAlert {
  width: 100%;
  margin-bottom: 15px;
}
</style>

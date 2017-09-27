<template>
  <v-layout row wrap class="estimation-block">
    <template v-if="isUserEstimated">
      <v-icon class="orange--text icon-estimation">done</v-icon>
    </template>
    <template v-else-if="isCurrentUserEstimating">
      <v-select
        v-bind:items="hours"
        v-model="selectedHour"
        label="Hours"
        dark
        single-line
        auto
      ></v-select>
      <v-select
        v-bind:items="minutes"
        v-model="selectedMin"
        label="Minutes"
        dark
        single-line
        auto
      ></v-select>
      <v-btn
        icon
        class="orange--text btn-set-estimation"
        @click.native="setEstimation"
        :disabled="!selectedHour && !selectedMin"
      >
        <v-icon>done</v-icon>
      </v-btn>
    </template>
    <template v-else-if="isUserEstimating">
      <v-icon class="icon-estimation">help</v-icon>
    </template>
    <template v-else>
      <v-icon class="icon-estimation">not_interested</v-icon>
    </template>
  </v-layout>
</template>

<script>
import { plannings } from '@/mocks/mockData.json';
import _some from 'lodash/some';
import taskStatuses from '@/constants/taskStatuses';

export default {
  name: 'estimation-block',
  props: ['userName', 'uid'],
  data: () => ({
    taskStatuses,
    selectedHour: '',
    selectedMin: '',
    hours: ['0h', '1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '10h', '12h', '14h'],
    minutes: ['0m', '10m', '20m', '30m', '40m', '50m'],
  }),
  computed: {
    currentTaskStatus() {
      const status = this.$store.state.currentTask.status || this.currentTask.status;
      return status === taskStatuses.END_ESTIMATION ? taskStatuses.INITIAL_STATUS : status;
    },
    currentUid() {
      return this.$store.state.uid;
    },
    isCurrentUserEstimating() {
      return this.currentUid === this.uid
        && this.currentTaskStatus === taskStatuses.START_ESTIMATION;
    },
    isUserEstimating() {
      return this.currentUid !== this.uid
        && this.currentTaskStatus === taskStatuses.START_ESTIMATION;
    },
    isUserEstimated() {
      const estimations = this.tasks[this.taskKey].estimations || [];
      const estimated = _some(estimations, { uid: this.uid });
      return estimated && this.currentTaskStatus === taskStatuses.START_ESTIMATION;
    },
    time() {
      const hour = this.selectedHour ? parseInt(this.selectedHour, 10) : 0;
      const min = this.selectedMin ? parseInt(this.selectedMin, 10) : 0;
      return (hour * 60) + min;
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
    }
  },
  methods: {
    setEstimation() {
      if (!this.tasks[this.taskKey].estimations) {
        this.tasks[this.taskKey].estimations = [];
      }
      this.tasks[this.taskKey].estimations.push({
        uid: this.uid,
        userName: this.userName,
        time: this.time,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.estimation-block {
  width: 200px;
  height: 75px;
  margin: 0 auto 15px;
}

.btn-set-estimation {
  margin: 15px 0 15px 5px;
}

.icon-estimation {
  margin: auto;
}
</style>

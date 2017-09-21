<template>
  <v-container v-if="currentTaskStatus === taskStatuses.END_ESTIMATION">
    <h6>Estimation for "{{ description }}"</h6>
    <v-layout row wrap>
      <v-flex xs12>
        <v-data-table
          :headers="headers"
          :items="items"
          hide-actions
          class="elevation-2"
        >
        <template slot="items" scope="props">
          <td
            v-for="(item, key) in props.item"
            class="text-xs-right"
          >
            {{ item }}
          </td>
        </template>
      </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { plannings } from '@/mocks/mockData.json';
import _get from 'lodash/get';
import _map from 'lodash/map';
import _union from 'lodash/union';
import _forEach from 'lodash/forEach';
import _reduce from 'lodash/reduce';
import _sortBy from 'lodash/sortBy';
import taskStatuses from '../constants/taskStatuses';

export default {
  name: 'task-result',
  data: () => ({
    taskStatuses,
    headers: [],
    items: [],
    description: '',
  }),
  computed: {
    currentTaskStatus() {
      const status = _get(this, 'tasks[0].status', taskStatuses.INITIAL_STATUS);
      return status;
    },
    currentTaskDescription() {
      const description = _get(this, 'tasks[0].description', '');
      return description;
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
      // const taskKey = _get(this.tasks, ['0', '.key'], '');
      // this.$bindAsArray(
      //   'estimations',
      //   db.ref(`plannings/${planningId}/tasks/${taskKey}/estimations`),
      //   null,
      //   this.updateData);
    }
  },
  methods: {
    updateData() {
      this.averageEstimation = this.getAverageEstimation();
      this.medianEstimation = this.getMedianEstimation();
      this.headers = this.getHeaders();
      this.items = this.getItems();
    },
    formatTime(time) {
      const hours = Math.floor(time / 60);
      const mins = time % 60;
      return (hours ? `${hours}h ` : '') + (mins ? `${mins}m` : '');
    },
    getAverageEstimation() {
      const estimationsLength = this.estimations.length;
      if (!estimationsLength) return 0;
      return _reduce(
        this.estimations,
        (result, estimation) => result + estimation.time,
        0,
      ) / estimationsLength;
    },
    getMedianEstimation() {
      const estimationsLength = this.estimations.length;
      if (!estimationsLength) return 0;
      const sortedEstimations = _sortBy(this.estimations, [o => o.time]);
      const isOdd = estimationsLength % 2;
      return isOdd
        ? sortedEstimations[Math.ceil(estimationsLength / 2)].time
        : (
          sortedEstimations[Math.ceil(estimationsLength / 2) - 1].time +
          sortedEstimations[Math.ceil(estimationsLength / 2)].time
        ) / 2;
    },
    getHeaders() {
      const userNames = _map(this.estimations, estimation => ({
        text: estimation.userName,
        value: estimation.uid,
        sortable: false,
      }));
      const recommendedTimes = [];
      if (this.averageEstimation) {
        recommendedTimes.push({
          text: 'Average time',
          value: 'average',
          sortable: false,
        });
      }
      if (this.medianEstimation) {
        recommendedTimes.push({
          text: 'Median time',
          value: 'median',
          sortable: false,
        });
      }
      return _union(userNames, recommendedTimes);
    },
    getItems() {
      const item = {};
      _forEach(this.estimations, (estimation) => {
        item[estimation.uid] = this.formatTime(estimation.time);
      });
      if (this.averageEstimation) {
        item.average = this.formatTime(this.averageEstimation);
      }
      if (this.medianEstimation) {
        item.median = this.formatTime(this.medianEstimation);
      }
      return [item];
    },
  },
};
</script>

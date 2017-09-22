<template>
  <v-container>
    <h6>Estimation for "{{ planningTitle }}"</h6>
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
import _map from 'lodash/map';
import _union from 'lodash/union';
import _forEach from 'lodash/forEach';
import _reduce from 'lodash/reduce';
import _sortBy from 'lodash/sortBy';
import taskStatuses from '@/constants/taskStatuses';

export default {
  name: 'task-result',
  data: () => ({
    taskStatuses,
    headers: [],
    items: [],
  }),
  computed: {
    plannings() {
      return plannings;
    },
    planningTitle() {
      return this.$store.state.planningTitle || 'pokerplanning.online';
    },
  },
  // beforeCreate() {
  created() {
    const planningId = this.$route.params.id;
    if (planningId) {
      this.currentPlanning = this.plannings[planningId];
      this.tasks = this.currentPlanning.tasks;
      this.estimations = this.plannings[planningId].estimations;
      this.updateData();
    }
  },
  methods: {
    updateData() {
      this.headers = this.getHeaders();
      this.items = this.getItems();
    },
    formatTime(time) {
      const hours = Math.floor(time / 60);
      const mins = time % 60;
      return (hours ? `${hours}h ` : '') + (mins ? `${mins}m` : '');
    },
    getAverageEstimation(estimations) {
      const estimationsLength = estimations.length;
      if (!estimationsLength) return 0;
      return _reduce(
        estimations,
        (result, estimation) => result + estimation.time,
        0,
      ) / estimationsLength;
    },
    getMedianEstimation(estimations) {
      const estimationsLength = estimations.length;
      if (!estimationsLength) return 0;
      const sortedEstimations = _sortBy(estimations, [o => o.time]);
      const isOdd = estimationsLength % 2;
      return isOdd
        ? sortedEstimations[Math.ceil(estimationsLength / 2)].time
        : (
          sortedEstimations[Math.ceil(estimationsLength / 2) - 1].time +
          sortedEstimations[Math.ceil(estimationsLength / 2)].time
        ) / 2;
    },
    getHeaders() {
      const description = {
        text: 'Description',
        value: 'description',
        sortable: true,
      };
      const userNames = _map(this.currentPlanning.users, user => ({
        text: user.userName,
        value: user.uid,
        sortable: false,
      }));
      const recommendedTimes = [{
        text: 'Average time',
        value: 'average',
        sortable: true,
      }, {
        text: 'Median time',
        value: 'median',
        sortable: true,
      }];
      return _union([description], userNames, recommendedTimes);
    },
    getItems() {
      const items = [];
      _forEach(this.tasks, (task) => {
        const item = {};

        item.description = task.description;
        _forEach(task.estimations, (estimation) => {
          item[estimation.uid] = this.formatTime(estimation.time);
        });
        item.average = this.formatTime(this.getAverageEstimation(task.estimations));
        item.median = this.formatTime(this.getMedianEstimation(task.estimations));

        items.push(item);
      });
      return items;
    },
  },
};
</script>

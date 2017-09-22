<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <TaskResult></TaskResult>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import TaskResult from '@/components/TaskResult';

export default {
  name: 'results',
  components: { TaskResult },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>

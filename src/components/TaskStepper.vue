<template>
  <v-stepper v-model="currentTaskState">
    <v-stepper-header>
      <v-stepper-step step="0" :complete="currentTaskState > 0">Preparing task description</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="1" :complete="currentTaskState > 1">Begin task discussion</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="2">Begin task estimation</v-stepper-step>
    </v-stepper-header>
  </v-stepper>
</template>

<script>
  export default {
    name: 'task-stepper',
    props: ['currentTaskState'],
  };
</script>

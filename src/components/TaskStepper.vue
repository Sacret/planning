<template>
  <v-stepper v-model="currentTaskStatus">
    <v-stepper-header>
      <v-stepper-step step="0" :complete="currentTaskStatus > 0">Prepare task description</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="1" :complete="currentTaskStatus > 1">Begin task discussion</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="2">Begin task estimation</v-stepper-step>
    </v-stepper-header>
  </v-stepper>
</template>

<script>
  export default {
    name: 'task-stepper',
    props: ['currentTaskStatus'],
  };
</script>

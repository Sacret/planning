<template>
  <v-card class="planning-card">
    <v-toolbar class="orange" light>
      <v-toolbar-title>Hi, {{ userName }}! Let's create new planning:</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-text-field
        v-model="title"
        label="Planning title"
        class="mt-5"
        maxlength="50"
        required
      ></v-text-field>
      <v-select
        v-bind:items="min"
        v-model="e1"
        label="Select"
        dark
        single-line
        auto
      ></v-select>
    </v-card-text>
    <v-btn
      light
      class="orange btn-create"
      @click.native="createPlanning"
    >
      Create planning
    </v-btn>
  </v-card>
</template>

<script>
export default {
  name: 'planning-form',
  data: () => ({
    title: '',
    min: ['10m', '20m', '30m', '40m', '50m', '1h'],
    max: ['2h', '4h', '6h', '8h', '10h', '12h'],
  }),
  computed: {
    userName() {
      return this.$store.state.userName;
    },
  },
  methods: {
    createPlanning() {

    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.planning-card {
  margin-top: 15px;
}

.btn-create {
  margin-bottom: 16px;
}
</style>

<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <h2>{{ msg }}</h2>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'main',
  data() {
    return {
      msg: 'Planning',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>

<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>{{ msg }}</h1>
        <h2>Essential Links</h2>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'hello',
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

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

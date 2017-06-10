<template>
  <v-footer class="pa-3">
    <v-spacer></v-spacer>
    <div>© {{author}} {{ new Date().getFullYear() }}</div>
  </v-footer>
</template>

<script>
export default {
  name: 'footer',
  data() {
    return {
      author: 'Sacret',
    };
  },
};
</script>

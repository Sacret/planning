<template>
  <v-toolbar class="orange" light>
    <v-toolbar-title></v-toolbar-title>
    <v-toolbar-items class="hidden-md-and-down">
      <v-btn icon light>
        <v-icon>share</v-icon>
      </v-btn>
      <v-btn icon light>
        <v-icon>star</v-icon>
      </v-btn>
      <v-toolbar-item ripple v-if="userName">{{ userName }}</v-toolbar-item>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'header',
  computed: {
    userName() {
      return this.$store.state.userName;
    },
  },
};
</script>

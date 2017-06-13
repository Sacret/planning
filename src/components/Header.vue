<template>
  <v-toolbar class="orange" light>
    <v-toolbar-title></v-toolbar-title>
    <v-toolbar-items class="hidden-md-and-down">
      <v-toolbar-item ripple>Link</v-toolbar-item>
      <v-toolbar-item ripple>Link</v-toolbar-item>
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

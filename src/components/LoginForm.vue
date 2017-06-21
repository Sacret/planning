<template>  
  <v-card class="user-card">
    <v-toolbar class="orange" light>
      <v-toolbar-title>Hello, friend! Tell us about you:</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-text-field
        v-model="name"
        label="Your name"
        class="mt-5"
        maxlength="50"
        required
      ></v-text-field>
    </v-card-text>
    <v-btn
      light
      class="orange btn-remember"
      @click.native="saveUserName"
    >
      Remember me
    </v-btn>
  </v-card>
</template>

<script>
export default {
  name: 'login-form',
  data: () => ({
    name: '',
  }),
  methods: {
    saveUserName() {
      const userName = this.name.trim();
      this.$store.commit('saveUserName', { userName });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user-card {
  margin-top: 15px;
}

.btn-remember {
  margin-bottom: 16px;
}
</style>

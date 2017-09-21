<template>
  <v-card class="user-card">
    <v-toolbar class="grey darken-3" light>
      <v-toolbar-title>Hello, friend! Tell us about you:</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-text-field
        v-model="name"
        label="Your name"
        maxlength="50"
        required
      ></v-text-field>
      <v-text-field
        v-model="email"
        label="E-mail"
        maxlength="50"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        maxlength="50"
        type="password"
        required
      ></v-text-field>
    </v-card-text>
    <v-btn
      light
      class="blue darken-2 btn-remember"
      @click.native="saveUser"
    >
      Remember me
    </v-btn>
  </v-card>
</template>

<script>
import uuid from 'uuid/v4';

export default {
  name: 'registration-form',
  data: () => ({
    name: '',
    email: '',
    password: '',
  }),
  methods: {
    saveUser() {
      debugger;
      const userName = this.name.trim();
      const email = this.email.trim();
      const uid = uuid();
      this.$store.commit('saveUser', { userName, email, uid });
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

<template>
  <v-card class="user-card">
    <v-toolbar class="grey darken-3" light>
      <v-toolbar-title>Hello, friend!</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
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
        required
      ></v-text-field>
    </v-card-text>
    <v-btn
      light
      class="blue darken-2 btn-remember"
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

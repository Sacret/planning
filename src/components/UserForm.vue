<template>
  <v-card class="user-card">
    <v-toolbar class="blue darken-2" light>
      <v-toolbar-title>You can edit your user info:</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <img :src="'https://api.adorable.io/avatars/100/' + uid + '.png'" />
    </v-card-text>
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
        required
      ></v-text-field>
    </v-card-text>
    <v-btn
      light
      class="blue darken-2 btn-remember"
      @click.native="saveUserName"
    >
      Save changes
    </v-btn>
  </v-card>
</template>

<script>
export default {
  name: 'user-form',
  props: ['user'],
  computed: {
    name() {
      return this.user.userName;
    },
    uid() {
      return this.user.uid;
    },
    email() {
      return this.user.email;
    },
  },
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

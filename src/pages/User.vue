<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 md4 offset-md4>
        <UserForm :user="user"></UserForm>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { user } from '@/mocks/mockData.json';
import UserForm from '@/components/UserForm';

export default {
  name: 'user',
  components: { UserForm },
  computed: {
    userName() {
      return this.$store.state.userName;
    },
  },
  beforeCreate() {
    if (user) {
      this.user = user;
      this.$store.commit('saveUserId', { uid: user.uid });
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>

<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <p>This tool is created to help you and your team to estimate effort of development goals in software development using planning poker technique.</p>
        <p>In planning poker, members of the group make estimates by playing numbered cards face-down to the table, instead of speaking them aloud. The cards are revealed, and the estimates are then discussed. By hiding the figures in this way, the group can avoid the cognitive bias of anchoring, where the first number spoken aloud sets a precedent for subsequent estimates.</p>
      </v-flex>
      <v-flex xs12 md4 offset-md4>
        <p v-if="uid && userName">
          <PlanningForm></PlanningForm>
        </p>
        <p v-else-if="uid && !userName">
          <LoginForm></LoginForm>
        </p>
        <p v-else-if="!userName">
          <RegistrationForm></RegistrationForm>
        </p>
        <p v-else>
          Oops! Something went wrong. Try later or reload the page.
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { user } from '@/mocks/mockData.json';
import LoginForm from '@/components/LoginForm';
import RegistrationForm from '@/components/RegistrationForm';
import PlanningForm from '@/components/PlanningForm';

export default {
  name: 'main',
  components: { LoginForm, RegistrationForm, PlanningForm },
  computed: {
    userName() {
      return this.$store.state.userName;
    },
    uid() {
      return this.$store.state.uid;
    },
  },
  beforeCreate() {
    if (user) {
      if (!this.$route.query.user) {
        this.user = user;
        this.$store.commit('saveUserId', { uid: user.uid });
        this.$store.commit('saveUserName', { userName: user.userName });
      } else {
        this.user = {};
      }
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

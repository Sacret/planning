<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <h2>{{ message }}</h2>
        <p>This tool is created to help you and your team to estimate effort of development goals in software development using planning poker technique.</p>
        <p>In planning poker, members of the group make estimates by playing numbered cards face-down to the table, instead of speaking them aloud. The cards are revealed, and the estimates are then discussed. By hiding the figures in this way, the group can avoid the cognitive bias of anchoring, where the first number spoken aloud sets a precedent for subsequent estimates.</p>

      </v-flex>
      <v-flex xs12 md4 offset-md4>
        <p v-if="user.uid && userName">
          <PlanningForm></PlanningForm>
        </p>
        <p v-else-if="user.uid && !userName">
          <LoginForm></LoginForm>
        </p>
        <p v-else>
          Oops! Something went wrong. Try later or reload the page.
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Firebase from 'firebase';
import LoginForm from '@/components/LoginForm';
import PlanningForm from '@/components/PlanningForm';
import db from '../firebase';

export default {
  name: 'main',
  components: { LoginForm, PlanningForm },
  data: () => ({
    message: 'Planning',
    user: {},
  }),
  computed: {
    userName() {
      return this.$store.state.userName;
    },
  },
  beforeCreate() {
    // Setup Firebase onAuthStateChanged handler
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.$bindAsArray('plannings', db.ref(`plannings/${user.uid}`));
      } else {
        Firebase.auth().signInAnonymously().catch(console.error);
      }
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>

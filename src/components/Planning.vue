<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        test test test
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Firebase from 'firebase';

export default {
  name: 'planning',
  computed: {
    userName() {
      return this.$store.state.userName;
    },
  },
  beforeCreate() {
    // Setup Firebase onAuthStateChanged handler
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.commit('saveUserId', { uid: user.uid });
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

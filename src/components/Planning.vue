<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        {{ planning.title }}
      </v-flex>
      <v-flex xs2>
          <User userName="Anastasia" uid="123"></User>
        </v-flex>
        <v-flex xs2>
          <user userName="Nastia" uid="1243"></User>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Firebase from 'firebase';
import User from '@/components/User';
import db from '../firebase';

export default {
  name: 'planning',
  components: { User },
  data: () => ({
    planning: {
      title: '',
    },
  }),
  // firebase: {
  //   planning: {
  //     source: db.ref('users'),
  //     // Optional, allows you to handle any errors.
  //     cancelCallback(err) {
  //       console.error(err);
  //     }
  //   }
  // }
  beforeCreate() {
    // Setup Firebase onAuthStateChanged handler
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.commit('saveUserId', { uid: user.uid });
        const planningId = this.$route.params.id;
        if (planningId) {
          this.$bindAsObject('planning', db.ref(`plannings/${planningId}`));
        }
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

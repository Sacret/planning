<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <h2>{{ planning.title }}</h2>
      </v-flex>
      <template v-for="(user, key) in users">
        <v-flex xs2 v-if="user.uid">
          <User :userName="user.userName" :uid="user.uid" :userKey="key" :isOwner="isOwner"></User>
        </v-flex>
      </template>
    </v-layout>
  </v-container>
</template>

<script>
import Firebase from 'firebase';
import _find from 'lodash/find';
import User from '@/components/User';
import db from '../firebase';

export default {
  name: 'planning',
  components: { User },
  data: () => ({
    planning: {
      title: '',
    },
    users: [],
    isOwner: false,
  }),
  computed: {
    userName() {
      return this.$store.state.userName;
    },
    uid() {
      return this.$store.state.uid;
    },
  },
  beforeCreate() {
    // Setup Firebase onAuthStateChanged handler
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.commit('saveUserId', { uid: user.uid });
        const planningId = this.$route.params.id;
        if (planningId) {
          this.$bindAsObject('planning', db.ref(`plannings/${planningId}`), null, () => {
            this.isOwner = this.uid === this.planning.uid;
          });
          this.$bindAsObject('users', db.ref(`plannings/${planningId}/users`), null, () => {
            const isUserInArray = _find(this.users, { uid: this.uid });
            if (this.userName && !isUserInArray) {
              this.$firebaseRefs.users.push({
                uid: this.uid,
                userName: this.userName,
              });
            }
          });
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

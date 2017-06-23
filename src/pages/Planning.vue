<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <h2>{{ planning.title }}</h2>
      </v-flex>
      <template v-if="uid && userName">
        <template v-for="(user, key) in users">
          <v-flex xs2 v-if="user.uid">
            <User :userName="user.userName" :uid="user.uid" :userKey="key" :isOwner="isOwner"></User>
          </v-flex>
        </template>
        <TaskForm></TaskForm>
      </template>
      <template v-else>
        <v-flex xs12 justify-center>If you want to join this planning please log in!</v-flex>
        <v-flex xs12 md4 offset-md4>
          <LoginForm></LoginForm>
        </v-flex>
      </template>
    </v-layout>
  </v-container>
</template>

<script>
import Firebase from 'firebase';
import _find from 'lodash/find';
import User from '@/components/User';
import LoginForm from '@/components/LoginForm';
import TaskForm from '@/components/TaskForm';
import db from '../firebase';

export default {
  name: 'planning',
  components: { User, LoginForm, TaskForm },
  data: () => ({
    planning: {
      title: '',
    },
    users: [],
    isOwner: false,
    dialog: true,
    isUsersArrayBinded: false,
  }),
  computed: {
    userName() {
      return this.$store.state.userName;
    },
    uid() {
      return this.$store.state.uid;
    },
  },
  watch: {
    userName() {
      debugger;
      this.checkOwner();
      this.checkUid();
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
    const planningId = this.$route.params.id;
    if (planningId) {
      this.$bindAsObject('planning', db.ref(`plannings/${planningId}`), null, () => {
        this.checkOwner();
      });
      this.$bindAsObject('users', db.ref(`plannings/${planningId}/users`), null, () => {
        this.isUsersArrayBinded = true;
        this.checkUid();
      });
    }
  },
  methods: {
    checkUid() {
      if (this.isUsersArrayBinded) {
        const isUserInArray = _find(this.users, { uid: this.uid });
        if (this.userName && !isUserInArray) {
          this.$firebaseRefs.users.push({
            uid: this.uid,
            userName: this.userName,
          });
        }
      }
    },
    checkOwner() {
      if (this.uid) {
        this.isOwner = this.uid === this.planning.uid;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>

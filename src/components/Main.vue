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
          <v-card class="planning-card">
            <v-toolbar class="orange" light>
              <v-toolbar-title>Hi, {{ userName }}! Let's create new planning:</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-text-field
                v-model="title"
                label="Planning title"
                class="mt-5"
                maxlength="50"
                required
              ></v-text-field>
            </v-card-text>
            <v-btn
              light
              class="orange btn-create"
              @click.native="createPlanning"
            >
              Create planning
            </v-btn>
          </v-card>
        </p>
        <p v-else-if="user.uid && !userName">
          <v-card class="user-card">
            <v-toolbar class="orange" light>
              <v-toolbar-title>Hello, friend! Tell us about you:</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-text-field
                v-model="name"
                label="Your name"
                class="mt-5"
                maxlength="50"
                required
              ></v-text-field>
            </v-card-text>
            <v-btn
              light
              class="orange btn-remember"
              @click.native="saveUserName"
            >
              Remember me
            </v-btn>
          </v-card>
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
import db from '../firebase';

export default {
  name: 'main',
  data: () => ({
    message: 'Planning',
    user: {},
    name: '',
  }),
  computed: {
    userName() {
      return this.$store.state.userName;
    },
  },
  methods: {
    saveUserName() {
      const userName = this.name.trim();
      this.$store.commit('saveUserName', { userName });
    },
    createPlanning() {

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

.user-card, .planning-card {
  margin-top: 15px;
}

.btn-remember, .btn-create {
  margin-bottom: 16px;
}
</style>

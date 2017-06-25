<template>
  <v-card class="planning-card">
    <v-toolbar class="orange" light>
      <v-toolbar-title>Hi, {{ userName }}! Let's create new planning:</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-text-field
        v-if="!planningKey"
        v-model="title"
        label="Planning title"
        class="mt-5"
        maxlength="50"
        required
      ></v-text-field>
      <v-btn
        v-if="!planningKey"
        light
        class="orange btn-create"
        @click.native="createPlanning"
      >
        Create planning
      </v-btn>
      <v-text-field
        v-if="planningKey"
        :value="planningLink"
        label="Generated link"
        hint="Copy this link and share with your team to start time estimating"
        persistent-hint
        class="mt-5"
        maxlength="50"
        autofocus
        readonly
      ></v-text-field>
      <v-btn
        v-if="planningKey"
        light
        class="orange btn-create"
        router
        :to="'/plannings/' + planningKey"
      >
        Go to planning
      </v-btn>
      <span v-if="planningKey">or</span>
      <v-btn
        v-if="planningKey"
        light
        class="primary btn-create"
        @click.native="resetPlanning"
      >
        Reset form data
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import db from '../firebase';

export default {
  name: 'planning-form',
  data: () => ({
    title: '',
    planningKey: '',
  }),
  computed: {
    userName() {
      return this.$store.state.userName;
    },
    planningLink() {
      return `${window.location.href}plannings/${this.planningKey}`;
    },
  },
  firebase: {
    plannings: {
      source: db.ref('plannings'),
    },
  },
  methods: {
    createPlanning() {
      const newPlanning = this.$firebaseRefs.plannings.push({
        title: this.title,
        uid: this.$store.state.uid,
      });
      this.planningKey = newPlanning.getKey();
      this.$firebaseRefs.plannings.child(this.planningKey).child('users').push({
        uid: this.$store.state.uid,
        userName: this.userName,
      });
    },
    resetPlanning() {
      this.$firebaseRefs.plannings.child(this.planningKey).remove();
      this.planningKey = '';
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.planning-card {
  margin-top: 15px;
}

.btn-create {
  margin-bottom: 15px;
}
</style>

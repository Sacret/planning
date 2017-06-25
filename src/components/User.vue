<template>
  <v-card class="user-block">
    <v-card-row
      :img="'https://api.adorable.io/avatars/150/' + uid + '.png'"
      height="150px"
      class="user-row"
    >
      <v-btn
        icon
        light
        class="orange remove-button"
        v-if="hasRemoveIcon"
        @click.native="removeUser"
      >
        <v-icon>delete</v-icon>
      </v-btn>
    </v-card-row>
    <v-list>
      <v-list-item>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>{{ userName }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-item>    
    </v-list>
  </v-card>
</template>

<script>
import db from '../firebase';

export default {
  name: 'user',
  props: ['userName', 'uid', 'userKey', 'isOwner'],
  computed: {
    currentUid() {
      return this.$store.state.uid;
    },
    hasRemoveIcon() {
      return this.isOwner && this.uid !== this.currentUid;
    },
  },
  methods: {
    removeUser() {
      if (this.isOwner) {
        this.$firebaseRefs.user.remove();
      }
    },
  },
  created() {
    const planningId = this.$route.params.id;
    if (planningId) {
      this.$bindAsObject('user', db.ref(`plannings/${planningId}/users/${this.userKey}`));
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user-block {
  width: 150px;
  margin: auto;
}

.remove-button {
  display: none;
}

.user-row {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
}

.user-row:hover .remove-button {
  display: block;
}
</style>

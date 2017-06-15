<template>
  <v-toolbar class="orange" light>
    <v-toolbar-title></v-toolbar-title>
    <v-toolbar-items>
      <v-btn icon light>
        <v-icon>share</v-icon>
      </v-btn>
      <v-btn icon light>
        <v-icon>star</v-icon>
      </v-btn>
      <v-menu left top origin="bottom right" transition="v-scale-transition">
        <v-btn light icon slot="activator">
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-item>
            <v-list-tile>
              <v-list-tile-title>Change Account</v-list-tile-title>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-title>Invite Friends</v-list-tile-title>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-title>Log Out</v-list-tile-title>
            </v-list-tile>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-toolbar-item ripple v-if="userName">{{ userName }}</v-toolbar-item>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'header',
  computed: {
    userName() {
      return this.$store.state.userName;
    },
  },
};
</script>

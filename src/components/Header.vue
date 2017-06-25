<template>
  <v-toolbar class="orange" light>
    <v-toolbar-title class="text-xs-left">{{ planningTitle }}</v-toolbar-title>
    <v-toolbar-items>
      <v-menu left bottom origin="bottom right" transition="v-scale-transition">
        <v-btn light icon slot="activator">
          <v-icon>share</v-icon>
        </v-btn>
        <v-list>
          <template v-for="socialLink in socialLinks">
            <v-list-item>
              <v-list-tile>
                <v-list-tile-title>
                  <social-sharing :url="sharingURL" inline-template>
                    <network :network="socialLink">
                      {{ socialLink | capitalize }}
                    </network>
                  </social-sharing>
                </v-list-tile-title>
              </v-list-tile>
            </v-list-item>
          </template>
        </v-list>
      </v-menu>
      <v-toolbar-item>
        <a
          href="https://github.com/Sacret/planning"
          target="_blank"
          class="star-icon"
        >
          <v-icon light>star</v-icon>
        </a>
      </v-toolbar-item>
      <v-toolbar-item ripple v-if="userName">{{ userName }}</v-toolbar-item>
      <v-menu left bottom origin="bottom right" transition="v-scale-transition" v-if="userName">
        <v-btn light icon slot="activator">
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-item>
            <v-list-tile>
              <v-list-tile-title>Log Out</v-list-tile-title>
            </v-list-tile>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'header',
  data: () => ({
    sharingURL: window.location.origin,
    socialLinks: ['facebook', 'twitter', 'vk'],
  }),
  computed: {
    userName() {
      return this.$store.state.userName;
    },
    planningTitle() {
      return this.$store.state.planningTitle;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.star-icon {
  text-decoration: none;
}
</style>

<template>
  <v-card class="userBlock">
    <v-card-row
      :img="'https://api.adorable.io/avatars/150/' + uid + '.png'"
      height="150px"
    >
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
export default {
  name: 'user',
  props: ['userName', 'uid'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.userBlock {
  width: 150px;
}
</style>

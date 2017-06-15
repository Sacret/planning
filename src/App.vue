<template>
  <v-app id="app">
    <Header></Header>
    <main>
      <router-view></router-view>
    </main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default {
  components: { Footer, Header },
  name: 'app',
};
</script>

<style>
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>

<style lang="stylus">
  @import './stylus/main';
</style>

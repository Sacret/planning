<template>
  <div id="app">
    <Header></Header>
    <div class="app-content">
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
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

.app-content {
  flex: 1;
}
</style>

<style lang="stylus">
  @import './stylus/main';
</style>

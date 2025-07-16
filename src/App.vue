<template>
  <HomeView />
</template>

<script lang="ts">
import HomeView from '@/views/HomeView.vue';
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  components: {
    HomeView,
  },
});
</script>

<style lang="scss">
body {
  font-family: 'Ubuntu', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $color-black;
}
</style>

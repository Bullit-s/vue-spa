<template>
  <div class="app-layout">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppLayout',
});
</script>

<style lang="scss" scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
  padding: spacing(12) spacing(16);

  @include media-min(md) {
    padding: spacing(14) spacing(24);
  }

  @include media-min(lg) {
    padding: spacing(20) spacing(40);
  }
}
</style>

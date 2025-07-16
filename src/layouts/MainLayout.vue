<template>
  <div class="main-layout">
    <header>
      <slot name="header" />
    </header>
    <div class="sidebar-content-wrapper">
      <aside class="layout-sidebar">
        <slot name="sidebar" />
      </aside>
      <main class="layout-content">
        <slot name="content" />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',
});
</script>

<style lang="scss" scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  gap: spacing(12);
  min-height: 100vh;
  max-height: 100vh;
  padding-top: spacing(8);

  @include media-min(md) {
    padding-top: spacing(12);
  }

  @include media-min(lg) {
    padding-top: spacing(20);
  }
}

.sidebar-content-wrapper {
  display: flex;
  gap: spacing(7.5);
  flex: 1;
  min-height: 0;
}

.layout-sidebar {
  min-width: 240px;
  max-width: 240px;
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;

  @include media-min(md) {
    min-width: 360px;
    max-width: 360px;
  }
}

.layout-content {
  flex: 1;
  overflow: hidden;
}
</style>

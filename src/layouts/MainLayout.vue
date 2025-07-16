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
  min-height: calc(100vh - #{spacing(24)});
  max-height: calc(100vh - #{spacing(24)});

  @include media-min(md) {
    min-height: calc(100vh - #{spacing(28)});
    max-height: calc(100vh - #{spacing(28)});
  }

  @include media-min(lg) {
    min-height: calc(100vh - #{spacing(40)});
    max-height: calc(100vh - #{spacing(40)});
  }
}

.sidebar-content-wrapper {
  display: flex;
  gap: spacing(7.5);
  flex: 1;
  min-height: 0;
}

.layout-sidebar {
  max-width: 360px;
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.layout-content {
  flex: 1;
}

@include media-min(sm) {
}
</style>

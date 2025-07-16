<template>
  <div class="main-content-panel">
    <slot name="category-block" />
    <slot name="filters-block" />
    <slot name="products-block" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainContentPanel',
});
</script>

<style lang="scss" scoped>
.main-content-panel {
  display: flex;
  flex-direction: column;
  gap: spacing(8);
  height: 100%;
  min-height: 0;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: $color-gray-3;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: $color-purple-2;
  }
}
</style>

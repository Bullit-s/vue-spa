<template>
  <span class="spinner" :style="{ width: sizePx, height: sizePx }" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseSpinner',
  props: {
    size: {
      type: [Number, String],
      default: 24,
    },
  },
  computed: {
    sizePx(): string {
      return typeof this.size === 'number' ? `${this.size}px` : this.size;
    },
  },
});
</script>

<style lang="scss" scoped>
.spinner {
  display: inline-block;
  border: 3px solid $color-gray-2;
  border-top: 3px solid $color-purple-1;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  vertical-align: middle;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<template>
  <span class="spinner" :style="{ width: sizePx, height: sizePx }" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseSpinner',
  props: {
    size: {
      type: [Number, String],
      default: 24,
    },
  },
  setup(props) {
    const sizePx = computed(() =>
      typeof props.size === 'number' ? `${props.size}px` : props.size,
    );
    return { sizePx };
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

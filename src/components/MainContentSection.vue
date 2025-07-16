<template>
  <div class="main-content-section" :class="sectionClasses">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'MainContentSection',
  props: {
    padding: {
      type: String as PropType<'none' | 'sm' | 'lg' | 'xl'>,
      default: 'none',
      validator(value: string): boolean {
        return ['none', 'sm', 'lg', 'xl'].includes(value);
      },
    },
  },
  computed: {
    sectionClasses(): Record<string, boolean> {
      return {
        [`main-content-section--padding-${this.padding}`]: !!this.padding,
      };
    },
  },
});
</script>

<style lang="scss" scoped>
.main-content-section {
  flex-shrink: 0;
  background: $color-gray-2;
  border-radius: radius(6);
  margin-bottom: spacing(4);

  &--padding-none {
    padding: 0;
  }

  &--padding-sm {
    padding: spacing(4) spacing(6);
  }

  &--padding-lg {
    padding: spacing(8) spacing(5);
  }

  &--padding-xl {
    padding: spacing(7.5) spacing(7.5);
  }
}
</style>

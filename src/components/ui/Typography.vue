<template>
  <component
    :is="tag"
    :class="[
      'typography',
      `typography--${variant}`,
      { [`typography--${color}`]: color },
    ]"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

type TypographyTag =
  | 'p'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'span'
  | 'div'
  | 'label';
type TypographyVariant =
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'body1'
  | 'body2'
  | 'body3';

type TypographyColor = 'primary' | 'secondary' | 'muted' | 'error' | 'success';

export default defineComponent({
  name: 'BaseTypography',
  props: {
    tag: {
      type: String as PropType<TypographyTag>,
      default: 'p',
    },
    variant: {
      type: String as PropType<TypographyVariant>,
      default: 'body1',
    },
    color: {
      type: String as PropType<TypographyColor>,
      default: '',
    },
  },
});
</script>

<style lang="scss" scoped>
.typography {
  margin: 0;
  font-family: inherit;

  &--heading1 {
    font-size: $text-2xl;
    font-weight: $weight-bold;
    line-height: $line-height-2xl;
  }

  &--heading2 {
    font-size: $text-base;
    font-weight: $weight-bold;
    line-height: $line-height-5;
  }

  &--heading3 {
    font-size: $text-sm;
    font-weight: $weight-bold;
    line-height: $line-height-5;
  }

  &--body1 {
    font-size: $text-xs;
    font-weight: $weight-regular;
    line-height: $line-height-xs;
  }

  &--body2 {
    font-size: $text-base;
    font-weight: $weight-regular;
    line-height: $line-height-base;
  }

  &--body3 {
    font-size: $text-lg;
    font-weight: $weight-regular;
    line-height: $line-height-lg;
  }

  &--primary {
    color: $color-black;
  }

  &--secondary {
    color: $color-black;
  }

  &--muted {
    color: rgba($color-black, 0.6);
  }
}
</style>

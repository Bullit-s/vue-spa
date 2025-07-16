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
  | 'caption'
  | 'small';

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
@import '@/styles/variables.scss';

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
    font-size: 20px;
    font-weight: 600;
    line-height: 1.4;
  }

  &--body1 {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
  }

  &--body2 {
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
  }

  &--caption {
    font-size: 12px;
    font-weight: 500;
    line-height: 1.4;
  }

  &--small {
    font-size: 10px;
    font-weight: 400;
    line-height: 1.4;
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

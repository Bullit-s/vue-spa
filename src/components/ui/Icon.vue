<template>
  <span class="icon-wrapper">
    <i
      :class="[
        `ri-${name}`,
        'icon',
        `icon--${size}`,
        { [`icon--${color}`]: color },
      ]"
    />
  </span>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BaseIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: 'base',
      validator(value: string): boolean {
        return ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'].includes(value);
      },
    },
    color: {
      type: String,
      default: '',
      validator(value: string): boolean {
        return [
          '',
          'black',
          'white',
          'purple-1',
          'purple-2',
          'purple-3',
          'purple-4',
          'gray-1',
          'gray-2',
          'gray-3',
          'red-1',
          'red-2',
          'success',
          'warning',
          'error',
        ].includes(value);
      },
    },
  },
});
</script>

<style lang="scss" scoped>
.icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
}

.icon {
  display: inline-block;
  font-weight: $weight-bold;
  line-height: 1;

  &--xs {
    font-size: $text-xs;
  }

  &--sm {
    font-size: $text-sm;
  }

  &--base {
    font-size: $text-base;
  }

  &--lg {
    font-size: $text-lg;
  }

  &--xl {
    font-size: $text-xl;
  }

  &--2xl {
    font-size: $text-2xl;
  }

  &--3xl {
    font-size: $text-3xl;
  }

  &--black {
    color: $color-black;
  }

  &--white {
    color: $color-white;
  }

  &--purple-1 {
    color: $color-purple-1;
  }

  &--purple-2 {
    color: $color-purple-2;
  }

  &--purple-3 {
    color: $color-purple-3;
  }

  &--purple-4 {
    color: $color-purple-4;
  }

  &--gray-1 {
    color: $color-gray-1;
  }

  &--gray-2 {
    color: $color-gray-2;
  }

  &--gray-3 {
    color: $color-gray-3;
  }

  &--red-1 {
    color: $color-red-1;
  }

  &--red-2 {
    color: $color-red-2;
  }
}
</style>

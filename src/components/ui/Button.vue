<template>
  <button
    :class="[
      'base-button',
      `base-button--${variant}`,
      `base-button--${size}`,
      {
        'is-selected': selected,
        'is-active': active,
        'is-full-width': fullWidth,
      },
    ]"
    :disabled="disabled"
    @mousedown="$emit('mousedown', $event)"
    @mouseup="$emit('mouseup', $event)"
    @click="handleClick"
  >
    <span
      v-if="leftSection || $slots.leftSection"
      class="base-button__left-section"
    >
      <slot name="leftSection">{{ leftSection }}</slot>
    </span>
    <span class="base-button__content">
      <slot />
    </span>
    <span
      v-if="rightSection || $slots.rightSection"
      class="base-button__right-section"
    >
      <slot name="rightSection">{{ rightSection }}</slot>
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'BaseButton',
  props: {
    variant: {
      type: String as PropType<'primary' | 'secondary' | 'outlined' | 'danger'>,
      default: 'primary',
    },
    size: {
      type: String as PropType<'small' | 'default' | 'large' | 'xl'>,
      default: 'default',
    },
    selected: Boolean,
    active: Boolean,
    disabled: Boolean,
    leftSection: {
      type: String,
      default: '',
    },
    rightSection: {
      type: String,
      default: '',
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick(event: MouseEvent) {
      (event.target as HTMLButtonElement).blur();
      this.$emit('click', event);
    },
  },
});
</script>

<style lang="scss" scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: radius(5);
  font-weight: 500;
  border: 1px solid transparent;
  outline: none;
  cursor: pointer;
  transition: all 0.15s;
  user-select: none;
  background: $color-white;
  font-family: inherit;
  gap: spacing(2);

  &__left-section {
    display: flex;
    align-items: center;
  }

  &__content {
    display: flex;
    align-items: center;
  }

  &__right-section {
    display: flex;
    align-items: center;
  }

  &--small {
    height: 24px;
    font-size: $text-xs;
    padding: 0 spacing(4);
    min-width: 55px;
    border-radius: radius(4);
  }
  &--default {
    height: 32px;
    font-size: $text-sm;
    padding: 0 spacing(5);
    min-width: 66px;
    border-radius: radius(5);
  }
  &--large {
    height: 40px;
    font-size: $text-base;
    padding: 0 spacing(6);
    min-width: 70px;
    border-radius: radius(6);
  }
  &--xl {
    height: 48px;
    font-size: $text-base;
    padding: 0 spacing(8);
    min-width: 84px;
    border-radius: radius(6);
  }

  &.is-full-width {
    width: 100%;
  }

  &--primary {
    color: $color-white;
    background: $color-purple-1;
    border: 1px solid rgba($color-black, 0.12);

    &:hover:not(:disabled):not(:focus):not(:active) {
      background: $color-purple-2;
      border-color: $color-purple-1;
    }
    &:focus {
      background: $color-purple-3;
      border-color: transparent;
    }
    &:active {
      background: $color-purple-1;
      border: 1px solid $color-purple-3;
      border-color: $color-purple-3;
      box-shadow: 0 0 0 2px $color-purple-3;
    }
    &:disabled {
      background: $color-gray-2;
      color: rgba($color-black, 0.12);
      border-color: transparent;
      box-shadow: none;
    }
  }

  &--secondary {
    color: $color-black;
    background: $color-gray-1;
    border: 1px solid $color-gray-3;

    &:hover:not(:disabled):not(:focus):not(:active) {
      background: $color-gray-3;
      border-color: $color-gray-3;
    }
    &:focus {
      background: $color-gray-2;
      border: 1px solid $color-gray-3;
    }
    &:active {
      background: $color-gray-1;
      border: 1px solid $color-purple-3;
      border-color: $color-purple-3;
      box-shadow: 0 0 0 2px $color-purple-3;
    }
    &:disabled {
      background: $color-gray-2;
      color: rgba($color-black, 0.12);
      border-color: transparent;
      box-shadow: none;
    }
  }

  &--outlined {
    color: $color-purple-1;
    background: $color-white;
    border: 1px solid $color-purple-1;

    &:hover:not(:disabled):not(:focus):not(:active) {
      color: $color-purple-2;
      border: 1px solid $color-purple-2;
      border-color: $color-purple-2;
      box-shadow: 0 0 0 1px $color-purple-2;
    }
    &:focus {
      border: 1px solid $color-purple-3;
      color: $color-purple-1;
    }
    &:active {
      color: $color-purple-1;
      border: 1px solid $color-purple-3;
      border-color: $color-purple-3;
      box-shadow: 0 0 0 2px $color-purple-3;
    }
    &:disabled {
      background: $color-gray-2;
      color: rgba($color-black, 0.12);
      border-color: transparent;
      box-shadow: none;
    }
  }

  &--danger {
    color: $color-white;
    background: $color-red-1;
    border-color: transparent;

    &:hover:not(:disabled):not(:focus):not(:active) {
      background: $color-red-2;
    }
    &:focus {
      background: $color-red-1;
    }
    &:active {
      background: $color-red-1;
      border: 1px solid $color-purple-3;
      border-color: $color-purple-3;
      box-shadow: 0 0 0 2px $color-purple-3;
    }
    &:disabled {
      background: $color-gray-2;
      color: rgba($color-black, 0.12);
      border-color: transparent;
      box-shadow: none;
    }
  }
}
</style>

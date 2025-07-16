<template>
  <button
    :class="['action-icon', `action-icon--${size}`, `action-icon--${variant}`]"
    :disabled="disabled"
    @click="$emit('click', $event)"
    @mousedown="$emit('mousedown', $event)"
    @mouseup="$emit('mouseup', $event)"
  >
    <Icon :name="icon" :size="iconSize" />
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Icon from './Icon.vue';

type ActionIconSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';
type ActionIconVariant = 'default' | 'secondary';

export default defineComponent({
  name: 'ActionIcon',
  components: {
    Icon,
  },
  props: {
    icon: {
      type: String,
      required: true,
    },
    size: {
      type: String as PropType<ActionIconSize>,
      default: 'base',
    },
    variant: {
      type: String as PropType<ActionIconVariant>,
      default: 'default',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    iconSize(): string {
      const sizeMap: Record<ActionIconSize, string> = {
        xs: 'xs',
        sm: 'xs',
        base: 'xs',
        lg: 'lg',
        xl: 'sm',
      };
      return sizeMap[this.size as ActionIconSize];
    },
  },
});
</script>

<style lang="scss" scoped>
.action-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease,
    border-color 0.2s ease;
  border-radius: radius(3);
  outline: none;
  width: 32px;
  height: 32px;

  &:active:not(:disabled) {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &--default {
    border: none;

    &:hover:not(:disabled) {
      background: $color-gray-2;
    }
  }

  &--secondary {
    color: $color-black;
    background: $color-gray-1;
    border: 1px solid $color-gray-3;

    &:hover:not(:disabled) {
      background: $color-gray-3;
      border-color: $color-gray-3;
    }

    &:focus {
      box-shadow: 0 0 0 2px rgba($color-purple-1, 0.2);
    }
  }

  &--xs {
    width: spacing(10);
    height: spacing(10);
  }

  &--sm {
    width: spacing(12);
    height: spacing(12);
  }

  &--base {
    width: spacing(16);
    height: spacing(16);
  }

  &--lg {
    width: spacing(18);
    height: spacing(18);
  }

  &--xl {
    width: spacing(20);
    height: spacing(20);
  }
}
</style>

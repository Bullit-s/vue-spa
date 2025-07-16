<template>
  <button
    :class="['action-icon', `action-icon--${size}`]"
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
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click', 'mousedown', 'mouseup'],
  computed: {
    iconSize(): string {
      const sizeMap: Record<ActionIconSize, string> = {
        xs: 'xs',
        sm: 'sm',
        base: 'base',
        lg: 'lg',
        xl: 'xl',
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
  transition: background-color 0.2s ease, transform 0.1s ease;
  border-radius: radius(4);
  outline: none;
  width: 32px;
  height: 32px;

  &:focus {
    box-shadow: 0 0 0 2px rgba($color-purple-1, 0.2);
  }

  &:active:not(:disabled) {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover:not(:disabled) {
    background: $color-gray-2;
  }

  &--xs {
    min-width: spacing(4);
    min-height: spacing(4);
  }

  &--sm {
    min-width: spacing(5);
    min-height: spacing(5);
  }

  &--base {
    min-width: spacing(6);
    min-height: spacing(6);
  }

  &--lg {
    min-width: spacing(8);
    min-height: spacing(8);
  }

  &--xl {
    min-width: spacing(10);
    min-height: spacing(10);
  }
}
</style>

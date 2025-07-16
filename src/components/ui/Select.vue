<template>
  <div class="base-select-wrapper">
    <label v-if="label" class="base-select__label">{{ label }}</label>
    <div class="base-select">
      <select
        :value="value"
        @input="onInput"
        @change="onChange"
        class="base-select__native"
      >
        <option v-if="placeholder" disabled value="">
          {{ placeholder }}
        </option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <span class="base-select__icon">
        <Icon name="arrow-down-s-line" size="lg" color="purple-4" />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Icon from './Icon.vue';

export interface SelectOption {
  value: string | number;
  label: string;
}

export default defineComponent({
  name: 'BaseSelect',
  components: { Icon },
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    options: {
      type: Array as PropType<SelectOption[]>,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['input', 'change'],
  methods: {
    onInput(event: Event) {
      const target = event.target as HTMLSelectElement;
      this.$emit('input', target.value);
    },
    onChange(event: Event) {
      const target = event.target as HTMLSelectElement;
      this.$emit('change', target.value);
    },
  },
});
</script>

<style lang="scss" scoped>
.base-select-wrapper {
  width: 100%;
}

.base-select__label {
  display: block;
  margin-bottom: spacing(2);
  font-size: $text-xs;
  line-height: $line-height-xs;
  font-weight: $weight-regular;
  color: rgba($color-black, 0.7);
}

.base-select {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
  min-width: 120px;

  &__native {
    width: 100%;
    padding: spacing(3) spacing(8) spacing(3) spacing(4);
    border: 1px solid $color-gray-3;
    border-radius: radius(6);
    background: $color-white;
    font-size: $text-sm;
    color: $color-black;
    appearance: none;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    cursor: pointer;

    &:focus {
      border-color: $color-purple-1;
      box-shadow: 0 0 0 2px rgba($color-purple-1, 0.1);
    }
    &:disabled {
      background: $color-gray-2;
      color: $color-gray-3;
      cursor: not-allowed;
    }
  }

  &__icon {
    position: absolute;
    right: spacing(5);
    pointer-events: none;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>

<template>
  <div class="input-wrapper">
    <label v-if="label" class="input-label" :for="inputId">
      <Typography variant="body2" color="secondary">{{ label }}</Typography>
    </label>

    <div
      class="input-container"
      :class="{ 'is-error': error, 'is-focused': isFocused }"
    >
      <input
        :id="inputId"
        ref="input"
        :type="type"
        :value="value"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        class="input-field"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown.enter="$emit('enter', $event)"
        @keydown.escape="$emit('escape', $event)"
      />
    </div>

    <div v-if="error" class="input-error">
      <Typography variant="small" color="error">{{ error }}</Typography>
    </div>

    <div v-else-if="hint" class="input-hint">
      <Typography variant="small" color="secondary">{{ hint }}</Typography>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Typography from './Typography.vue';

let inputIdCounter = 0;

export default defineComponent({
  name: 'BaseInput',
  components: {
    Typography,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    error: {
      type: String,
      default: '',
    },
    hint: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['input', 'focus', 'blur', 'enter', 'escape'],
  data() {
    return {
      isFocused: false,
      inputId: `input-${++inputIdCounter}`,
    };
  },
  methods: {
    handleInput(event: Event) {
      const target = event.target as HTMLInputElement;
      this.$emit('input', target.value);
    },
    handleFocus(event: FocusEvent) {
      this.isFocused = true;
      this.$emit('focus', event);
    },
    handleBlur(event: FocusEvent) {
      this.isFocused = false;
      this.$emit('blur', event);
    },
    focus() {
      const input = this.$refs.input as HTMLInputElement;
      if (input) {
        input.focus();
      }
    },
    blur() {
      const input = this.$refs.input as HTMLInputElement;
      if (input) {
        input.blur();
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.input-wrapper {
  width: 100%;
}

.input-label {
  display: block;
  margin-bottom: spacing(4);
  opacity: 0.7;
}

.input-container {
  position: relative;
  width: 100%;
  border: 1px solid $color-gray-3;
  border-radius: radius(6);
  background: $color-white;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &.is-focused {
    border-color: $color-purple-1;
    box-shadow: 0 0 0 2px rgba($color-purple-1, 0.1);
  }

  &.is-error {
    border-color: $color-red-1;

    &.is-focused {
      box-shadow: 0 0 0 2px rgba($color-red-1, 0.1);
    }
  }
}

.input-field {
  width: 100%;
  padding: spacing(4) spacing(8);
  border: none;
  outline: none;
  background: transparent;
  font-size: $text-base;
  font-weight: $weight-regular;
  line-height: $line-height-base;
  color: $color-black;

  &::placeholder {
    color: rgba($color-black, 0.36);
  }

  &:disabled {
    color: $color-gray-2;
    cursor: not-allowed;
  }
}

.input-error,
.input-hint {
  margin-top: spacing(1);
}
</style>

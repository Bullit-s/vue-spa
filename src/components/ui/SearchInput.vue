<template>
  <div class="search-input">
    <span class="search-input__icon">
      <Icon name="search-line" size="sm" color="purple-4" />
    </span>
    <input
      :value="value"
      type="text"
      :placeholder="placeholder"
      class="search-input__field"
      @input="onInput"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Icon from './Icon.vue';

export default defineComponent({
  name: 'SearchInput',
  components: {
    Icon,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Search',
    },
  },
  methods: {
    onInput(event: Event): void {
      const target = event.target as HTMLInputElement;
      this.$emit('input', target.value);
    },
  },
});
</script>

<style lang="scss" scoped>
.search-input {
  position: relative;

  &__icon {
    position: absolute;
    left: spacing(6);
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
  }

  &__field {
    width: 100%;
    height: 32px;
    padding: spacing(2.5) spacing(5) spacing(2.5) spacing(20);
    border-bottom: 1px solid $color-gray-3;
    font-size: $text-sm;
    font-weight: $weight-medium;
    line-height: $line-height-sm;
    background-color: $color-white;
    transition: all 0.2s ease;

    &::placeholder {
      color: rgba($color-black, 0.36);
    }

    &:hover {
      border-color: $color-purple-3;
    }

    &:focus {
      outline: none;
      box-shadow: 0 2px 0 0 $color-purple-3;
    }
  }
}
</style>

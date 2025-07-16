<template>
  <div
    class="category-item"
    :class="{ 'category-item--active': isActive }"
    @click="$emit('click')"
  >
    <span class="category-item__name">{{ name }}</span>
    <span class="category-item__count">
      <span class="category-item__count__label">count</span>
      <span>
        {{ count }}
      </span>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'CategoryItem',
  props: {
    name: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: spacing(2);
  border-radius: radius(6);
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
  background-color: $color-gray-2;
  border: 1px solid $color-gray-3;

  &:hover {
    background-color: $color-gray-2;
  }

  &--active {
    background-color: $color-purple-1;
    color: $color-white;

    .category-item__count {
      background-color: $color-white;
      color: $color-black;
    }

    &:hover {
      background-color: $color-purple-2;
    }
  }

  &__name {
    font-size: $text-xs;
    font-weight: $weight-bold;
    flex: 1;
    margin-left: spacing(3);
  }

  &__count {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: spacing(2);
    font-size: $text-xs;
    font-weight: $weight-medium;
    background-color: $color-white;
    color: $color-purple-4;
    padding: spacing(2) spacing(4);
    border-radius: radius(5);
    width: 56px;
    text-align: center;
    margin-left: spacing(2);
    height: 100%;

    &__label {
      font-weight: $weight-bold;
      font-size: 6px;
      text-transform: uppercase;
    }
  }
}

@include media-min(md) {
}
</style>

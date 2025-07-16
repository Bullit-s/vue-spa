<template>
  <div class="product-item">
    <div class="product-item__image">
      <img :src="product.image" :alt="product.title" />
    </div>
    <div class="product-item__content">
      <Typography class="product-item__title" tag="p" variant="heading3">{{
        product.title
      }}</Typography>
      <Typography class="product-item__description" tag="p" variant="body1">{{
        product.description
      }}</Typography>
    </div>
    <div class="product-item__actions">
      <ActionIcon
        icon="settings-4-line"
        variant="secondary"
        size="xs"
        class="product-item__action"
        aria-label="Редактировать продукт"
        @click="$emit('edit', product)"
      />
      <ActionIcon
        icon="delete-bin-6-line"
        variant="secondary"
        size="xs"
        class="product-item__action"
        aria-label="Удалить продукт"
        @click="$emit('delete', product)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ProductType } from '@/api/methods/products/types';
import { defineComponent, PropType } from 'vue';
import ActionIcon from './ui/ActionIcon.vue';
import Typography from './ui/Typography.vue';

export default defineComponent({
  name: 'MainContentProductsItem',
  components: { ActionIcon, Typography },
  props: {
    product: {
      type: Object as PropType<ProductType>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.product-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: spacing(4);
  border-radius: radius(4);
  background: $color-white;
  margin-bottom: spacing(3);
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba($color-black, 0.1);
  }

  &:last-child {
    margin-bottom: 0;
  }
}

.product-item__image {
  flex-shrink: 0;
  width: 90px;
  height: 90px;
  margin-right: spacing(10);
  border-radius: radius(45);
  overflow: hidden;
  background: $color-gray-2;
  border: 1px solid $color-gray-3;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.product-item__content {
  flex: 1;
  min-width: 0;
}

.product-item__title {
  color: $color-black;
  margin-bottom: spacing(4);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: spacing(30);
}

.product-item__description {
  color: rgba($color-black, 0.7);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: calc(#{$line-height-sm} * 2);
}

.product-item__actions {
  position: absolute;
  top: spacing(2);
  right: spacing(2);
  display: flex;
  align-items: center;
  gap: spacing(2);
}

.product-item__action {
  opacity: 0.6;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
}
</style>

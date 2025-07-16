<template>
  <MainContentSection padding="sm">
    <div class="category-block">
      <span class="category-block__name">
        <slot>{{ name }}</slot>
      </span>
      <div class="category-block__actions">
        <ActionIcon
          icon="settings-3-line"
          size="lg"
          class="category-block__action"
          @click="$emit('settings')"
          aria-label="Настроить категорию"
        />
        <ActionIcon
          icon="delete-bin-line"
          size="lg"
          class="category-block__action"
          @click="$emit('remove')"
          aria-label="Удалить категорию"
        />
      </div>
    </div>
  </MainContentSection>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainContentSection from './MainContentSection.vue';
import ActionIcon from './ui/ActionIcon.vue';

export default defineComponent({
  name: 'MainContentCategory',
  components: { ActionIcon, MainContentSection },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  emits: ['remove', 'settings'],
});
</script>

<style lang="scss" scoped>
.category-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 48px;
  font-size: $text-lg;
  font-weight: 600;
  color: $color-black;
  gap: spacing(4);
}

.category-block__name {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.category-block__actions {
  display: flex;
  align-items: center;
  gap: spacing(2);
}

.category-block__action {
  color: rgb($color-black, 0.3);
  &:hover {
    color: $color-black;
  }
}
</style>

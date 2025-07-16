<template>
  <MainContentSection padding="lg">
    <div class="filters-block">
      <div class="filters-block__row">
        <div class="filters-block__item">
          <BaseSelect
            :value="sort"
            :options="sortOptions"
            label="Sort"
            placeholder="Sort by"
            @input="$emit('update:sort', $event)"
          />
        </div>
        <div class="filters-block__item">
          <BaseSelect
            :value="limit"
            :options="limitOptions"
            label="Limit"
            placeholder="Limit"
            @input="$emit('update:limit', $event)"
          />
        </div>
      </div>
    </div>
  </MainContentSection>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import MainContentSection from './MainContentSection.vue';
import BaseSelect, { SelectOption } from './ui/Select.vue';

export default defineComponent({
  name: 'MainContentFilters',
  components: { BaseSelect, MainContentSection },
  props: {
    sort: {
      type: [String, Number],
      required: true,
    },
    limit: {
      type: [String, Number],
      required: true,
    },
    sortOptions: {
      type: Array as PropType<SelectOption[]>,
      required: true,
    },
    limitOptions: {
      type: Array as PropType<SelectOption[]>,
      required: true,
    },
  },
  emits: ['update:sort', 'update:limit'],
});
</script>

<style lang="scss" scoped>
.filters-block__row {
  display: flex;
  gap: spacing(8);
}

.filters-block__item {
  flex: 1;
  min-width: 120px;
}
</style>

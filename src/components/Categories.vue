<template>
  <div class="categories">
    <div class="categories__header">
      <Typography tag="h5" variant="heading2">Список</Typography>
    </div>

    <div class="categories__search">
      <SearchInput
        :value="searchQuery"
        placeholder="Search"
        @input="onSearchInput"
      />
    </div>

    <div class="categories__list">
      <CategoryItem
        v-for="category in filteredCategories"
        :key="category.id"
        :name="category.name"
        :count="category.count"
        :is-active="category.id === activeCategoryId"
        @click="handleSelectCategory(category.id)"
      />
    </div>

    <div class="categories__add">
      <Button variant="primary" size="large" @click="handleAddCategory">
        <template #leftSection>
          <Icon name="add-line" size="lg" color="white" />
        </template>
        Добавить
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import CategoryItem from '@/components/CategoryItem.vue';
import Button from '@/components/ui/Button.vue';
import Icon from '@/components/ui/Icon.vue';
import SearchInput from '@/components/ui/SearchInput.vue';
import Typography from '@/components/ui/Typography.vue';
import Vue from 'vue';

export default Vue.extend({
  name: 'CategoriesList',
  components: {
    Button,
    CategoryItem,
    Icon,
    Typography,
    SearchInput,
  },
  computed: {
    filteredCategories() {
      return this.$store.getters['categories/filteredCategories'];
    },
    activeCategoryId() {
      return this.$store.getters['categories/activeCategoryId'];
    },
    searchQuery(): string {
      return this.$store.state.categories.searchQuery;
    },
  },
  methods: {
    onSearchInput(value: string): void {
      this.$store.dispatch('categories/updateSearchQuery', value);
      this.$emit('search', value);
    },

    handleSelectCategory(categoryId: number): void {
      this.$store.dispatch('categories/selectCategory', categoryId);
      this.$emit('category-selected', categoryId);
    },

    handleAddCategory(): void {
      this.$store.dispatch('categories/addCategory');
      this.$emit('add-category');
    },
  },
});
</script>

<style lang="scss" scoped>
.categories {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;

  &__header {
    flex-shrink: 0;
    margin-bottom: spacing(6);
  }

  &__search {
    flex-shrink: 0;
    margin-bottom: spacing(6);
  }

  &__list {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    gap: spacing(4);
    margin-bottom: spacing(6);

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: $color-gray-3;
      border-radius: radius(2);
    }

    &::-webkit-scrollbar-thumb:hover {
      background: $color-purple-4;
    }
  }

  &__add {
    flex-shrink: 0;
    margin-top: auto;

    > button {
      width: 100%;
    }
  }
}
</style>

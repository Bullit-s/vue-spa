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
      <div v-if="loading" class="categories__loading">
        <BaseSpinner :size="32" />
      </div>

      <div v-else-if="error" class="categories__error">
        <Typography variant="body2" color="error">{{ error }}</Typography>
      </div>

      <template v-else>
        <CategoryItem
          v-for="category in filteredCategories"
          :key="category.id"
          :name="category.name"
          :count="category.count"
          :is-active="category.id === activeCategoryId"
          @click="handleSelectCategory(category.id)"
        />
      </template>
    </div>

    <div class="categories__add">
      <Button variant="primary" size="large" fullWidth @click="showCreateModal">
        <template #leftSection>
          <Icon name="add-line" size="lg" color="white" />
        </template>
        Добавить
      </Button>
    </div>

    <CreateCategoryModal
      :visible="isCreateModalVisible"
      @create="handleCreateCategory"
      @close="hideCreateModal"
    />
  </div>
</template>

<script lang="ts">
import CategoryItem from '@/components/CategoryItem.vue';
import CreateCategoryModal from '@/components/CreateCategoryModal.vue';
import Button from '@/components/ui/Button.vue';
import Icon from '@/components/ui/Icon.vue';
import SearchInput from '@/components/ui/SearchInput.vue';
import BaseSpinner from '@/components/ui/Spinner.vue';
import Typography from '@/components/ui/Typography.vue';
import Vue from 'vue';

export default Vue.extend({
  name: 'CategoriesList',
  components: {
    Button,
    CategoryItem,
    CreateCategoryModal,
    Icon,
    Typography,
    SearchInput,
    BaseSpinner,
  },
  data() {
    return {
      isCreateModalVisible: false,
    };
  },
  computed: {
    filteredCategories() {
      return this.$store.getters['categories/filteredCategories'];
    },
    activeCategoryId() {
      return this.$store.getters['categories/activeCategoryId'];
    },
    searchQuery() {
      return this.$store.state.categories.searchQuery;
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    error() {
      return this.$store.state.categories.error;
    },
  },
  async mounted() {
    // Загружаем категории при монтировании компонента
    await this.$store.dispatch('categories/loadCategories');
  },
  methods: {
    onSearchInput(value: string): void {
      this.$store.dispatch('categories/updateSearchQuery', value);
    },

    handleSelectCategory(categoryId: number): void {
      this.$store.dispatch('categories/selectCategory', categoryId);
      this.$emit('category-selected', categoryId);
    },

    showCreateModal(): void {
      this.isCreateModalVisible = true;
    },

    hideCreateModal(): void {
      this.isCreateModalVisible = false;
    },

    handleCreateCategory(categoryName: string): void {
      this.$store.dispatch('categories/addCategory', categoryName);
      this.$emit('category-created', categoryName);
    },

    handleAddCategory(): void {
      this.$store.dispatch('categories/addCategory', 'New Category');
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
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: spacing(4);

    /* Custom scrollbar */
    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba($color-gray-3, 0.5);
      border-radius: 2px;

      &:hover {
        background: $color-purple-1;
      }
    }
  }

  &__loading,
  &__error {
    padding: spacing(4);
    text-align: center;
  }

  &__add {
    flex-shrink: 0;
    margin-top: spacing(6);
  }
}
</style>

<template>
  <AppLayout>
    <MainLayout>
      <template #header>
        <Typography tag="h1" variant="heading1">Заголовок</Typography>
      </template>
      <template #sidebar>
        <CategoriesSection />
      </template>
      <template #content>
        <MainContentPanel v-if="!isLoading">
          <template #category-block>
            <MainContentCategory
              v-if="activeCategory"
              :name="activeCategory.name"
            />
          </template>
          <template #filters-block>
            <MainContentFilters
              :sort="sort"
              :limit="limit"
              :sort-options="sortOptions"
              :limit-options="limitOptions"
              @update:sort="updateSort"
              @update:limit="updateLimit"
            />
          </template>
          <template #products-block>
            <MainContentProducts />
          </template>
        </MainContentPanel>
      </template>
    </MainLayout>
  </AppLayout>
</template>

<script lang="ts">
import { LIMIT_PRODUCTS_OPTIONS, SORT_PRODUCTS_OPTIONS } from '@/api/constants';
import CategoriesSection from '@/components/CategoriesSection.vue';
import MainContentCategory from '@/components/MainContentCategory.vue';
import MainContentFilters from '@/components/MainContentFilters.vue';
import MainContentPanel from '@/components/MainContentPanel.vue';
import MainContentProducts from '@/components/MainContentProducts.vue';
import Typography from '@/components/ui/Typography.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    AppLayout,
    MainLayout,
    Typography,
    CategoriesSection,
    MainContentPanel,
    MainContentCategory,
    MainContentFilters,
    MainContentProducts,
  },
  data() {
    return {
      sortOptions: SORT_PRODUCTS_OPTIONS,
      limitOptions: LIMIT_PRODUCTS_OPTIONS,
    };
  },
  computed: {
    activeCategory() {
      const state = this.$store.state.categories;
      return (
        state.categories.find(
          (cat: { id: string }) => cat.id === state.activeCategory,
        ) || null
      );
    },
    isLoading() {
      return this.$store.state.categories.loading;
    },
    sort() {
      return this.$store.state.categories.filters.sort;
    },
    limit() {
      return this.$store.state.categories.filters.limit;
    },
  },
  methods: {
    updateSort(sort: string) {
      this.$store.dispatch('categories/updateSortFilter', sort);
    },
    updateLimit(limit: number) {
      this.$store.dispatch('categories/updateLimitFilter', limit);
    },
  },
});
</script>

<style scoped lang="scss">
.button-demo {
  display: flex;
  gap: 24px;
  justify-content: center;
  margin: 40px 0;
}

.content-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 400px;
  padding: spacing(8);
}
</style>

<template>
  <AppLayout>
    <MainLayout>
      <template #header>
        <Typography tag="h1" variant="heading1">Заголовок</Typography>
      </template>
      <template #sidebar>
        <CategoriesList />
      </template>
      <template #content>
        <div>content</div>
      </template>
    </MainLayout>
  </AppLayout>
</template>

<script lang="ts">
import CategoriesList from '@/components/Categories.vue';
import Typography from '@/components/ui/Typography.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  components: { AppLayout, MainLayout, Typography, CategoriesList },
});
</script>

<style scoped>
.button-demo {
  display: flex;
  gap: 24px;
  justify-content: center;
  margin: 40px 0;
}
</style>

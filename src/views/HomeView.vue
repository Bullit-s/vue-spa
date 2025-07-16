<template>
  <AppLayout>
    <template #default>
      <section>
        <div class="button-demo">
          <BaseButton size="small" variant="primary">Primary</BaseButton>
          <BaseButton size="small" variant="secondary">Gray</BaseButton>
          <BaseButton size="small" variant="outlined">Outlined</BaseButton>
          <BaseButton size="small" variant="danger">Danger</BaseButton>
        </div>
        <div class="button-demo">
          <BaseButton size="default" variant="primary">Primary</BaseButton>
          <BaseButton size="default" variant="secondary">Gray</BaseButton>
          <BaseButton size="default" variant="outlined">Outlined</BaseButton>
          <BaseButton size="default" variant="danger">Danger</BaseButton>
        </div>
        <div class="button-demo">
          <BaseButton size="large" variant="primary">Primary</BaseButton>
          <BaseButton size="large" variant="secondary">Gray</BaseButton>
          <BaseButton size="large" variant="outlined">Outlined</BaseButton>
          <BaseButton size="large" variant="danger">Danger</BaseButton>
        </div>
        <div class="button-demo">
          <BaseButton size="xl" variant="primary">Primary</BaseButton>
          <BaseButton size="xl" variant="secondary">Gray</BaseButton>
          <BaseButton size="xl" variant="outlined">Outlined</BaseButton>
          <BaseButton size="xl" variant="danger">Danger</BaseButton>
        </div>
        <div class="button-demo">
          <BaseButton disabled size="xl" variant="primary">Primary</BaseButton>
          <BaseButton disabled size="xl" variant="secondary">Gray</BaseButton>
          <BaseButton disabled size="xl" variant="outlined">Outlined</BaseButton>
          <BaseButton disabled size="xl" variant="danger">Danger</BaseButton>
        </div>
      </section>
    </template>
  </AppLayout>
</template>

<script lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  components: { AppLayout, BaseButton },
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

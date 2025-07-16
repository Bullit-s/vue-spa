<template>
  <AppLayout>
    <template #default>
      <section>
        <div class="button-demo">
          <Button size="small" variant="primary">Primary</Button>
          <Button size="small" variant="secondary">Gray</Button>
          <Button size="small" variant="outlined">Outlined</Button>
          <Button size="small" variant="danger">Danger</Button>
        </div>
        <div class="button-demo">
          <Button size="default" variant="primary">Primary</Button>
          <Button size="default" variant="secondary">Gray</Button>
          <Button size="default" variant="outlined">Outlined</Button>
          <Button size="default" variant="danger">Danger</Button>
        </div>
        <div class="button-demo">
          <Button size="large" variant="primary">Primary</Button>
          <Button size="large" variant="secondary">Gray</Button>
          <Button size="large" variant="outlined">Outlined</Button>
          <Button size="large" variant="danger">Danger</Button>
        </div>
        <div class="button-demo">
          <Button size="xl" variant="primary">Primary</Button>
          <Button size="xl" variant="secondary">Gray</Button>
          <Button size="xl" variant="outlined">Outlined</Button>
          <Button size="xl" variant="danger">Danger</Button>
        </div>
        <div class="button-demo">
          <Button disabled size="xl" variant="primary">Primary</Button>
          <Button disabled size="xl" variant="secondary">Gray</Button>
          <Button disabled size="xl" variant="outlined">Outlined</Button>
          <Button disabled size="xl" variant="danger">Danger</Button>
        </div>
      </section>
    </template>
  </AppLayout>
</template>

<script lang="ts">
import Button from '@/components/ui/Button.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ButtonsView',
  components: { AppLayout, Button },
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

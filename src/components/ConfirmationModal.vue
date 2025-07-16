<template>
  <Modal :visible="visible" @close="handleCancel">
    <div class="confirmation-modal">
      <ActionIcon
        icon="close-line"
        variant="default"
        size="lg"
        class="close-button"
        @click="handleCancel"
      />
      <div class="confirmation-header">
        <div class="confirmation-icon">
          <Icon name="alert-fill" size="3xl" color="red-1" />
        </div>
      </div>

      <div class="confirmation-content">
        <Typography tag="h2" variant="heading1" class="confirmation-title">
          {{ title }}
        </Typography>

        <Typography
          tag="p"
          variant="body3"
          color="secondary"
          class="confirmation-message"
        >
          {{ message }}
        </Typography>
      </div>

      <div class="confirmation-actions">
        <Button variant="secondary" size="xl" fullWidth @click="handleCancel">
          {{ cancelText }}
        </Button>

        <Button variant="danger" size="xl" @click="handleConfirm" fullWidth>
          <template #leftSection>
            <Icon :name="confirmIcon" size="lg" />
          </template>
          {{ confirmText }}
        </Button>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ActionIcon from './ui/ActionIcon.vue';
import Button from './ui/Button.vue';
import Icon from './ui/Icon.vue';
import Modal from './ui/Modal.vue';
import Typography from './ui/Typography.vue';

export default defineComponent({
  name: 'ConfirmationModal',
  components: {
    ActionIcon,
    Modal,
    Button,
    Icon,
    Typography,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Подтвердите действие',
    },
    message: {
      type: String,
      default: 'Вы уверены, что хотите выполнить это действие?',
    },
    confirmText: {
      type: String,
      default: 'Подтвердить',
    },
    cancelText: {
      type: String,
      default: 'Отменить',
    },
    confirmIcon: {
      type: String,
      default: 'check-line',
    },
  },
  methods: {
    handleConfirm() {
      this.$emit('confirm');
      this.$emit('close');
    },
    handleCancel() {
      this.$emit('cancel');
      this.$emit('close');
    },
  },
});
</script>

<style lang="scss" scoped>
.confirmation-modal {
  padding: spacing(8);
  width: 440px;
  max-width: calc(100vw - spacing(16));
  position: relative;
}

.close-button {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
}

.confirmation-header {
  display: flex;
  align-items: flex-start;
  margin-bottom: spacing(12);
}

.confirmation-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 1px solid $color-gray-3;
  box-shadow: 0px 1px 2px 0px rgba($color-black, 0.08);
  background-color: $color-white;
  border-radius: radius(6);
  flex-shrink: 0;
}

.confirmation-content {
  margin-bottom: spacing(12);
}

.confirmation-title {
  margin-bottom: spacing(6);
}

.confirmation-message {
  line-height: 1.5;
}

.confirmation-actions {
  display: flex;
  gap: spacing(3);
}

@include media-min(sm) {
  .confirmation-actions {
    gap: spacing(4);
  }
}
</style>

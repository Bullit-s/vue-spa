<template>
  <Modal :visible="visible" @close="handleCancel">
    <div class="create-category-modal">
      <ActionIcon
        icon="close-line"
        variant="ghost"
        size="base"
        class="close-button"
        @click="handleCancel"
      />
      <div class="modal-header">
        <Typography tag="h2" variant="heading1"> Создать категорию </Typography>
      </div>

      <div class="modal-content">
        <Input
          ref="nameInput"
          v-model="categoryName"
          label="Название категории"
          placeholder="Введите название категории"
          :error="error"
          required
          @enter="handleConfirm"
          @escape="handleCancel"
        />
      </div>

      <div class="modal-actions">
        <Button
          variant="secondary"
          size="large"
          fullWidth
          @click="handleCancel"
          class="cancel-button"
        >
          Отменить
        </Button>

        <Button
          variant="primary"
          size="large"
          fullWidth
          @click="handleConfirm"
          :disabled="!categoryName.trim() || isLoading"
          class="confirm-button"
        >
          <template v-if="!isLoading" #leftSection>
            <Icon name="add-line" size="lg" />
          </template>
          {{ isLoading ? 'Создание...' : 'Добавить' }}
        </Button>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import Vue, { defineComponent } from 'vue';
import ActionIcon from './ActionIcon.vue';
import Button from './Button.vue';
import Icon from './Icon.vue';
import Input from './Input.vue';
import Modal from './Modal.vue';
import Typography from './Typography.vue';

export default defineComponent({
  name: 'CreateCategoryModal',
  components: {
    ActionIcon,
    Modal,
    Button,
    Icon,
    Typography,
    Input,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['create', 'cancel', 'close'],
  data() {
    return {
      categoryName: '',
      error: '',
      isLoading: false,
    };
  },
  watch: {
    visible(newVal: boolean) {
      if (newVal) {
        this.resetForm();
        this.$nextTick(() => {
          const input = this.$refs.nameInput as Vue & { focus: () => void };
          if (input) {
            input.focus();
          }
        });
      }
    },
    categoryName() {
      if (this.error) {
        this.error = '';
      }
    },
  },
  methods: {
    resetForm() {
      this.categoryName = '';
      this.error = '';
      this.isLoading = false;
    },
    validateName(): boolean {
      const name = this.categoryName.trim();

      if (!name) {
        this.error = 'Название категории обязательно';
        return false;
      }

      if (name.length < 2) {
        this.error = 'Название должно содержать минимум 2 символа';
        return false;
      }

      if (name.length > 50) {
        this.error = 'Название не может быть длиннее 50 символов';
        return false;
      }

      return true;
    },
    async handleConfirm() {
      if (!this.validateName()) {
        return;
      }

      this.isLoading = true;

      try {
        await new Promise((resolve) => setTimeout(resolve, 300));

        this.$emit('create', this.categoryName.trim());
        this.$emit('close');
      } catch (error) {
        this.error = 'Произошла ошибка при создании категории';
      } finally {
        this.isLoading = false;
      }
    },
    handleCancel() {
      this.$emit('cancel');
      this.$emit('close');
    },
  },
});
</script>

<style lang="scss" scoped>
.create-category-modal {
  padding: spacing(12) spacing(16);
  width: 588px;
  max-width: calc(100vw - spacing(16));
  position: relative;
}

.close-button {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: spacing(6);
}

.modal-content {
  margin-bottom: spacing(8);
}

.modal-actions {
  display: flex;
  gap: spacing(8);
}

.cancel-button,
.confirm-button {
  flex: 1;
}
</style>

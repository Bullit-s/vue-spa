<template>
  <Modal :visible="visible" @close="handleCancel">
    <div class="edit-product-modal">
      <ActionIcon
        icon="close-line"
        variant="default"
        size="lg"
        class="close-button"
        @click="handleCancel"
      />
      <div class="modal-header">
        <Typography tag="h2" variant="heading1"
          >Редактировать {{ product?.model || '' }}</Typography
        >
      </div>

      <div class="modal-content">
        <Input
          ref="modelInput"
          v-model="productModel"
          label="Название"
          placeholder="Введите название"
          :error="error"
          required
          @enter="handleConfirm"
          @escape="handleCancel"
        />
      </div>

      <div class="modal-actions">
        <Button
          variant="secondary"
          size="xl"
          fullWidth
          @click="handleCancel"
          class="cancel-button"
        >
          Отменить
        </Button>

        <Button
          variant="primary"
          size="xl"
          fullWidth
          class="confirm-button"
          @click="handleConfirm"
          :disabled="!productModel.trim() || isLoading"
        >
          <template v-if="!isLoading" #leftSection>
            <Icon name="check-line" size="lg" />
          </template>
          {{ isLoading ? 'Сохранение...' : 'Сохранить' }}
        </Button>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import { ProductType } from '@/api/methods/products/types';
import { defineComponent, PropType } from 'vue';
import ActionIcon from './ui/ActionIcon.vue';
import Button from './ui/Button.vue';
import Icon from './ui/Icon.vue';
import Input from './ui/Input.vue';
import Modal from './ui/Modal.vue';
import Typography from './ui/Typography.vue';

export default defineComponent({
  name: 'EditProductModal',
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
    product: {
      type: Object as PropType<ProductType | null>,
      default: null,
    },
  },
  emits: ['save', 'cancel', 'close'],
  data() {
    return {
      productModel: '',
      error: '',
      isLoading: false,
    };
  },
  watch: {
    visible(newVal: boolean) {
      if (newVal) {
        this.resetForm();
        this.$nextTick(() => {
          const input = this.$refs.modelInput as any;
          if (input) {
            input.focus();
          }
        });
      }
    },
    product: {
      handler(newProduct: ProductType | null) {
        if (newProduct) {
          this.productModel = newProduct.model || '';
        }
      },
      immediate: true,
    },
    productModel() {
      if (this.error) {
        this.error = '';
      }
    },
  },
  methods: {
    resetForm() {
      this.productModel = this.product?.model || '';
      this.error = '';
      this.isLoading = false;
    },
    validateModel(): boolean {
      const model = this.productModel.trim();

      if (!model) {
        this.error = 'Модель продукта обязательна';
        return false;
      }

      if (model.length < 2) {
        this.error = 'Модель должна содержать минимум 2 символа';
        return false;
      }

      if (model.length > 100) {
        this.error = 'Модель не может быть длиннее 100 символов';
        return false;
      }

      return true;
    },
    async handleConfirm() {
      if (!this.validateModel() || !this.product) {
        return;
      }

      this.isLoading = true;

      try {
        await new Promise((resolve) => setTimeout(resolve, 300));

        const updatedProduct = {
          ...this.product,
          model: this.productModel.trim(),
        };

        this.$emit('save', updatedProduct);
        this.$emit('close');
      } catch (error) {
        this.error = 'Произошла ошибка при сохранении продукта';
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
.edit-product-modal {
  padding: spacing(12) spacing(16);
  width: 588px;
  max-width: calc(100vw - spacing(16));
  position: relative;
}

.close-button {
  position: absolute;
  top: spacing(4);
  right: spacing(4);
  z-index: 1;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: spacing(12);
}

.modal-content {
  margin-bottom: spacing(12);
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

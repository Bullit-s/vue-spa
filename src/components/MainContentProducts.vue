<template>
  <MainContentSection padding="xl">
    <div class="products-block">
      <div v-if="productsLoading" class="products-loading">
        <BaseSpinner :size="32" />
      </div>

      <div v-else-if="productsError" class="products-error">
        <p>{{ productsError }}</p>
      </div>

      <div v-else-if="products.length === 0" class="products-empty">
        <p>Продукты не найдены</p>
      </div>

      <div v-else class="products-list">
        <MainContentProductsItem
          v-for="product in products"
          :key="`${product.id}-${product.model}`"
          :product="product"
          @edit="handleEditProduct"
          @delete="handleDeleteProduct"
        />
      </div>
    </div>

    <ConfirmationModal
      :visible="showDeleteModal"
      :title="deleteTitle"
      :message="deleteMessage"
      confirmText="Удалить"
      cancelText="Отменить"
      confirmIcon="delete-bin-6-line"
      @confirm="confirmDeleteProduct"
      @cancel="cancelDeleteProduct"
      @close="cancelDeleteProduct"
    />

    <EditProductModal
      :visible="showEditModal"
      :product="productToEdit"
      @save="handleSaveProduct"
      @cancel="cancelEditProduct"
      @close="cancelEditProduct"
    />
  </MainContentSection>
</template>

<script lang="ts">
import { ProductType } from '@/api/methods/products/types';
import { defineComponent } from 'vue';
import ConfirmationModal from './ConfirmationModal.vue';
import EditProductModal from './EditProductModal.vue';
import MainContentProductsItem from './MainContentProductsItem.vue';
import MainContentSection from './MainContentSection.vue';
import BaseSpinner from './ui/Spinner.vue';

export default defineComponent({
  name: 'MainContentProducts',
  components: {
    MainContentSection,
    MainContentProductsItem,
    BaseSpinner,
    ConfirmationModal,
    EditProductModal,
  },
  data() {
    return {
      showDeleteModal: false,
      productToDelete: null as ProductType | null,
      showEditModal: false,
      productToEdit: null as ProductType | null,
    };
  },
  computed: {
    products(): ProductType[] {
      return this.$store.state.categories.products;
    },
    productsLoading(): boolean {
      return this.$store.state.categories.productsLoading;
    },
    productsError(): string | null {
      return this.$store.state.categories.productsError;
    },
    deleteTitle(): string {
      if (!this.productToDelete) return '';
      const model = this.productToDelete.model;
      return `Удалить "${model}" ?`;
    },
    deleteMessage(): string {
      if (!this.productToDelete) return '';
      const model = this.productToDelete.model;
      return `Вы уверены, что хотите удалить "${model}" ?`;
    },
  },
  mounted() {
    this.loadProducts();
  },
  watch: {
    '$store.state.categories.activeCategory'() {
      this.loadProducts();
    },
  },
  methods: {
    loadProducts() {
      this.$store.dispatch('categories/loadProducts');
    },
    handleEditProduct(product: ProductType) {
      this.productToEdit = product;
      this.showEditModal = true;
    },
    handleDeleteProduct(product: ProductType) {
      this.productToDelete = product;
      this.showDeleteModal = true;
    },
    confirmDeleteProduct() {
      if (this.productToDelete) {
        this.$store.dispatch(
          'categories/deleteProduct',
          this.productToDelete.id,
        );
      }
      this.cancelDeleteProduct();
    },
    cancelDeleteProduct() {
      this.showDeleteModal = false;
      this.productToDelete = null;
    },
    async handleSaveProduct(updatedProduct: ProductType) {
      await this.$store.dispatch('categories/updateProduct', updatedProduct);
      this.cancelEditProduct();
    },
    cancelEditProduct() {
      this.showEditModal = false;
      this.productToEdit = null;
    },
  },
});
</script>

<style lang="scss" scoped>
.products-block {
  min-height: 200px;
}

.products-loading,
.products-error,
.products-empty {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  text-align: center;
}

.products-error p,
.products-empty p {
  color: rgba($color-black, 0.6);
  font-size: $text-sm;
  margin: 0;
}
</style>

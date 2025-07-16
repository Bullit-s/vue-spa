<template>
  <transition name="modal" appear>
    <div v-if="visible" class="modal-overlay" @click="handleOverlayClick">
      <div class="modal-backdrop"></div>
      <div class="modal-container" @click.stop>
        <div class="modal-content">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseModal',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    closeOnOverlayClick: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    handleOverlayClick() {
      if (this.closeOnOverlayClick) {
        this.$emit('close');
      }
    },
  },
  mounted() {
    if (this.visible) {
      document.body.style.overflow = 'hidden';
    }
  },
  beforeDestroy() {
    document.body.style.overflow = '';
  },
  watch: {
    visible(newVal: boolean) {
      if (newVal) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: spacing(4);
}

.modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  will-change: opacity;
}

.modal-container {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: $color-white;
  border-radius: radius(6);
  box-shadow: 0 spacing(2) spacing(12) rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
  width: fit-content;
  min-width: 320px;
  max-width: calc(100vw - spacing(8));
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease-out;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.2s ease-out;
  will-change: transform;
}

.modal-enter .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.95) translateY(-spacing(2));
}
</style>

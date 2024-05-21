<template>
  <div class="Modal">
    <div class="Overlay" @click="$emit('closeModal')"></div>
    <div class="Modal-card">
      <slot />
    </div>
  </div>
</template>

<script>
import useKeydown from '../composables/use-keydown';
export default {
  setup(props, { emit }) {
    useKeydown([
      {
        key: 'Escape',
        fn: () => {
          emit('closeModal');
        },
      },
    ]);
  },
};
</script>
<style scoped>
.Modal,
.Overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
}
.Overlay {
  opacity: 0.5;
  background-color: black;
}
.Modal-card {
  position: relative;
  max-width: 80%;
  margin: auto;
  margin-top: 30px;
  padding: 20px;
  background-color: white;
  min-height: 500px;
  z-index: 10;
  opacioy: 1;
}
</style>

<template>
  <div class="modal">
    <div class="overlay" @click="$emit('closeModal')"></div>
    <div class="modal-card">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  emits: ['closeModal'],

  setup(props, { emit }) {
    emit('closeModal');
  },
};
</script>
<style scoped></style>

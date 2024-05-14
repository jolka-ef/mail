<template>
  <button>
    <slot></slot>
  </button>
</template>
<style scoped>
button {
  display: flex;
}
button:disabled {
  cursor: auto;
}
</style>

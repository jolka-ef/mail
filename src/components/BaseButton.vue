<template>
  <button>
    <slot></slot>
  </button>
</template>
<style scoped>
button {
  display: flex;
  background-color: transparent;
  border: none;
  font-size: 1em;
  cursor: pointer;
  padding: 0;
}
button:disabled {
  cursor: auto;
}
</style>

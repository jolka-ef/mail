<template>
  <label :checked="checked">
    <input
      :class="[partialCheck ? 'PartialCheck' : '', 'ActionBar-checkbox']"
      type="checkbox"
      name="checkbox"
    />
  </label>
</template>
<script>
export default {
  props: {
    checked: Boolean,
    partialCheck: Boolean,
  },
};
</script>
<style>
.ActionBar-checkbox {
  border: 0.1em solid currentColor;
  border-radius: 0.1em;
}

.ActionBar-checkbox:checked {
  background: var(--form-control-color);
}
.ActionBar-checkbox.PartialCheck {
  background: #abc;
}
</style>

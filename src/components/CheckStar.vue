<template>
  <label>
    <input
      class="MailPreview-star"
      type="checkbox"
      name="checkbox"
      :checked="checked"
      @change="$emit('toggleStar', $event.target.checked)"
    />
  </label>
</template>
<script>
export default {
  props: {
    checked: Boolean,
    toggleStar: Function,
  },
};
</script>
<style scoped>
.MailPreview-star {
  grid-area: star;
  justify-self: center;
}
.MailPreview-star::before {
  content: '';
  width: 1.25em;
  height: 1.25em;
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
  box-shadow: inset 1.25em 1.25em #aeaeae;
}

input[type='checkbox']:checked::before {
  box-shadow: inset 1em 1em var(--form-control-color);
}
</style>

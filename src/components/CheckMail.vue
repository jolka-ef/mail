<template>
  <label class="MailPreview-checkboxLabel">
    <input
      class="MailPreview-checkbox"
      type="checkbox"
      :checked="emailSelection.emails.has(email)"
      @change="emailSelection.toggle(email)"
      name="checkbox"
    />
  </label>
</template>
<script>
import useEmailSelection from '../composables/use-email-selection.js';

export default {
  async setup() {
    return {
      emailSelection: useEmailSelection(),
    };
  },
  props: {
    email: Object,
  },
};
</script>
<style>
.MailPreview-checkboxLabel {
  align-self: center;
  grid-area: checkbox;
}

.MailPreview-checkbox {
  border: 0.1em solid currentColor;
  border-radius: 0.1em;
  transform: translateY(-0.075em);
}
.MailPreview-checkbox::before {
  content: '';
  width: 0.65em;
  height: 0.65em;
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  transform: scale(0);
  transform-origin: bottom left;
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em var(--form-control-color);
  /* Windows High Contrast Mode */
  background-color: CanvasText;
}
.MailPreview-checkbox:checked::before {
  transform: scale(1);
}
</style>

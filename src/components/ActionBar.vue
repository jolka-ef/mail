<template>
  <nav class="ActionBar">
    <ActionBarCheckbox
      :partialCheck="someEmailsSelected"
      :checked="allEmailsSelected"
      @click="bulkSelect"
    />

    <BaseButton
      class="ActionButton"
      @click="emailSelection.markRead()"
      :disabled="[...emailSelection.emails].every((e) => e.read)"
    >
      <CloseEnvelope />
      <span class="ActionName"> Mark Read </span>
    </BaseButton>

    <BaseButton
      class="ActionButton"
      @click="emailSelection.markUnread()"
      :disabled="[...emailSelection.emails].every((e) => !e.read)"
    >
      <OpenEnvelope />
      <span class="ActionName"> Mark Unread </span>
    </BaseButton>

    <BaseButton
      class="ActionButton"
      v-if="screen !== 'archive'"
      @click="emailSelection.archive()"
      :disabled="[...emailSelection.emails].every((e) => e.folder == 'archive')"
    >
      <Archive />
      <span class="ActionName"> Archive </span>
    </BaseButton>

    <BaseButton
      class="ActionButton"
      v-if="screen !== 'trash'"
      @click="emailSelection.moveToTrash()"
      :disabled="[...emailSelection.emails].every((e) => e.folder == 'trash')"
    >
      <Trash />
      <span class="ActionName"> Trash </span>
    </BaseButton>

    <BaseButton
      class="ActionButton"
      v-if="screen !== 'spam'"
      @click="emailSelection.moveToSpam()"
      :disabled="[...emailSelection.emails].every((e) => e.folder == 'spam')"
    >
      <Spam />
      <span class="ActionName"> Spam </span>
    </BaseButton>

    <BaseButton
      class="ActionButton"
      v-if="screen !== 'inbox'"
      @click="emailSelection.moveToInbox()"
      :disabled="[...emailSelection.emails].every((e) => e.folder == 'inbox')"
    >
      <Inbox />
      <span class="ActionName"> Inbox </span>
    </BaseButton>
  </nav>
</template>
<script>
import Archive from '../icons/Archive.vue';
import CloseEnvelope from '../icons/CloseEnvelope.vue';
import Inbox from '../icons/Inbox.vue';
import OpenEnvelope from '../icons/OpenEnvelope.vue';
import Spam from '../icons/Spam.vue';
import Trash from '../icons/Trash.vue';
import useEmailSelection from '@/composables/use-email-selection';
import { computed } from 'vue';
import BaseButton from './BaseButton.vue';
import ActionBarCheckbox from './ActionBarCheckbox.vue';

export default {
  setup(props) {
    let emailSelection = useEmailSelection();
    let numberSelected = computed(() => emailSelection.emails.size);
    let numberEmails = computed(() => props.emails.length);
    let allEmailsSelected = computed(
      () => numberSelected.value === numberEmails.value
    );
    let someEmailsSelected = computed(
      () =>
        numberSelected.value > 0 && numberSelected.value < numberEmails.value
    );
    let bulkSelect = function () {
      if (allEmailsSelected.value) {
        emailSelection.clear();
      } else {
        emailSelection.addMultiple(props.emails);
      }
    };

    return {
      allEmailsSelected,
      bulkSelect,
      emailSelection,
      numberSelected,
      someEmailsSelected,
    };
  },
  components: {
    ActionBarCheckbox,
    Archive,
    BaseButton,
    CloseEnvelope,
    OpenEnvelope,
    Inbox,
    Spam,
    Trash,
  },
  props: {
    emails: {
      type: Array,
      required: true,
    },
    screen: {
      type: String,
      required: true,
    },
  },
};
</script>
<style>
.ActionBar {
  grid-area: bulkAction;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 1.25em;
  background-color: var(--color-background);
  padding: var(--gap) 0;
}

@media (max-width: 580px) {
  .ActionName:not(:focus):not(:active) {
    /* Hiding name, making content visible only to screen readers but not visually */
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
}
.ActionButton {
  display: flex;
  gap: 0.25em;
  align-items: center;
}
</style>
